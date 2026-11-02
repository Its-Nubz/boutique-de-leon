const checkoutHtml = "<!doctype html><html lang=\"en\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta charset=\"utf-8\"><title>Boutique de Leon Checkout</title><style>body{font:16px system-ui;max-width:600px;margin:auto;padding:18px;background:#171923;color:white}input,select,button{font:inherit;padding:10px;margin:5px 0}input,select{width:100%;box-sizing:border-box}button{background:#dfb76b;border:0;border-radius:5px}li{padding:8px}</style><h1>Boutique de Leon</h1><p>Private checkout — pending orders only</p><label>Checkout API key<input type=\"password\" id=\"secret\" autocomplete=\"off\"></label><label>Scan QR product ID<input id=\"product\" placeholder=\"rec...\"></label><button id=\"add\">Add to cart</button><p id=\"message\"></p><ul id=\"items\"></ul><h2 id=\"total\">Total $0.00</h2><label>Payment method<select id=\"payment\"><option>Cash</option><option>Zelle</option><option>Venmo</option><option>Cash App</option></select></label><button id=\"save\">Create pending order</button><button id=\"clear\">Clear</button><p>Inventory is not deducted until a separate payment-confirmation workflow is enabled.</p><script>\nconst cart=[];const el=id=>document.getElementById(id);const msg=t=>el('message').textContent=t;\nfunction render(){el('items').replaceChildren();let sum=0;cart.forEach((p,i)=>{sum+=p.qty*p.price;const li=document.createElement('li');li.textContent=p.name+' — $'+p.price.toFixed(2)+' × ';const q=document.createElement('input');q.type='number';q.min=1;q.max=p.stock;q.value=p.qty;q.style.width='65px';q.onchange=()=>{p.qty=Math.max(1,Math.min(p.stock,Number(q.value)||1));render()};const remove=document.createElement('button');remove.textContent='Remove';remove.onclick=()=>{cart.splice(i,1);render()};li.append(q,remove);el('items').append(li)});el('total').textContent='Total $'+sum.toFixed(2)}\nasync function call(path,body){const r=await fetch(path,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+el('secret').value,'content-type':'application/json'},body:body?JSON.stringify(body):undefined});const data=await r.json();if(!r.ok)throw Error(data.error||'Request failed');return data}\nel('add').onclick=async()=>{try{const id=el('product').value.trim();if(!/^rec[A-Za-z0-9]{14}$/.test(id))throw Error('Invalid QR product ID');const p=await call('/product?id='+encodeURIComponent(id));const stock=Number(p.available),price=Number(p.price);if(!Number.isFinite(price)||stock<1)throw Error('Unavailable product');let found=cart.find(x=>x.id===id);if(found){if(found.qty>=stock)throw Error('Out of stock');found.qty++}else cart.push({id,name:p.product,price,stock,qty:1});el('product').value='';msg('Added '+p.product);render()}catch(e){msg(e.message)}};\nel('save').onclick=async()=>{try{if(!cart.length)throw Error('Cart empty');const key=crypto.randomUUID().replaceAll('-','');const data=await call('/orders',{key,paymentMethod:el('payment').value,items:cart.map(p=>({id:p.id,qty:p.qty}))});msg('Pending order '+data.orderId+' saved. Inventory unchanged.');cart.length=0;render()}catch(e){msg(e.message)}};\nel('clear').onclick=()=>{cart.length=0;render();msg('Cart cleared')};render();\n</script></html>";
// Boutique de Leon private checkout — Cloudflare Worker
// Required secrets: AIRTABLE_TOKEN, CHECKOUT_API_KEY
// Use a long random CHECKOUT_API_KEY, never a short PIN.
// Owner-only endpoints; never embed the API key in a public storefront.
const BASE = "appgKdhaAA8UBPV8o";
const PRODUCTS = "tblb0GN8xENO2opAM";
const SALES = "tblFP6DSlDtaBYgn8";
const MOVES = "tbl3yGzkTm8yXX4BH";
const api = (table) => "https://api.airtable.com/v0/" + BASE + "/" + table;
const json = (body, status=200) => new Response(JSON.stringify(body), {status, headers:{"content-type":"application/json","cache-control":"no-store"}});
async function airtable(env, table, method="GET", path="", body) {
  const r = await fetch(api(table)+path, {method, headers:{"Authorization":"Bearer "+env.AIRTABLE_TOKEN,"Content-Type":"application/json"}, body:body?JSON.stringify(body):undefined});
  const data=await r.json();
  if(!r.ok) throw new Error("Airtable request failed ("+r.status+")");
  return data;
}

async function checkoutRecords(env,table,formula){let all=[],offset;do{const p=new URLSearchParams({pageSize:"100"});if(formula)p.set("filterByFormula",formula);if(offset)p.set("offset",offset);const data=await airtable(env,table,"GET","?"+p);all.push(...data.records);offset=data.offset}while(offset);return all}
function validCart(items){return Array.isArray(items)&&items.length>0&&items.length<=40&&items.every(x=>/^rec[A-Za-z0-9]{14}$/.test(x.id)&&Number.isInteger(x.qty)&&x.qty>=1&&x.qty<=100)&&new Set(items.map(x=>x.id)).size===items.length}
async function pendingSale(env,b){
 if(!b||!validCart(b.items)||!["Cash","Zelle","Venmo","Cash App"].includes(b.paymentMethod)||!/^[a-zA-Z0-9_-]{16,100}$/.test(b.key||""))return json({error:"Invalid cart, payment method or unique key"},400);
 const safeKey=b.key.replace(/\\/g,"\\\\").replace(/"/g,'\\"');
 const existing=await checkoutRecords(env,SALES,'{Idempotency Key}="'+safeKey+'"');
 if(existing.length)return json({id:existing[0].id,orderId:existing[0].fields["Order ID"],status:existing[0].fields.Status,duplicate:true});
 let items=[],total=0;
 for(const item of b.items){
  const r=await airtable(env,PRODUCTS,"GET","/"+item.id),f=r.fields,price=Number(f["Boutique Price"]),available=Number(f["Inventory On Hand — PRIVATE"]||0)-Number(f["Units Reserved — PRIVATE"]||0);
  if(!Number.isFinite(price)||price<0||available<item.qty)return json({error:"Insufficient stock or invalid price: "+(f.Product||item.id)},409);
  items.push({id:item.id,name:f.Product,variant:f["Size / Variant"]||"",qty:item.qty,price});
  total+=item.qty*price;
 }
 total=Math.round(total*100)/100;
 const orderId="BDL-"+b.key.slice(0,20);
 const result=await airtable(env,SALES,"POST","",{records:[{fields:{"Order ID":orderId,"Status":"Pending","Payment Method":b.paymentMethod,"Total":total,"Items JSON":JSON.stringify(items),"Idempotency Key":b.key,"Created At":new Date().toISOString(),"Notes":"Awaiting explicit payment confirmation; no inventory deducted"}}]});
 return json({id:result.records[0].id,orderId,status:"Pending",total,items},201);
}

export default {
 async fetch(request, env) {
  try {
   if(request.method==="GET" && new URL(request.url).pathname==="/") return new Response(checkoutHtml,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","content-security-policy":"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'none'"}});
   if(!env.AIRTABLE_TOKEN || !env.CHECKOUT_API_KEY) return json({error:"Server configuration incomplete"},503);
   const key=request.headers.get("Authorization")||"";
   if(key!=="Bearer "+env.CHECKOUT_API_KEY) return json({error:"Unauthorized"},401);
   const url=new URL(request.url);
   if(request.method==="GET" && url.pathname==="/health") return json({ok:true});
   if(request.method==="GET" && url.pathname==="/product") {
    const id=url.searchParams.get("id");
    if(!id || !/^rec[A-Za-z0-9]{14}$/.test(id)) return json({error:"Invalid product record ID"},400);
    const rec=await airtable(env,PRODUCTS,"GET","/"+id);
    return json({id:rec.id,product:rec.fields.Product,variant:rec.fields["Size / Variant"],price:rec.fields["Boutique Price"],available:rec.fields["Inventory On Hand — PRIVATE"]});
   }
   if(request.method==="GET" && url.pathname==="/inventory") {
    const data=await airtable(env,PRODUCTS,"GET","?pageSize=100");
    return json({products:data.records.map(r=>({id:r.id,product:r.fields["Product"],variant:r.fields["Size / Variant"],price:r.fields["Boutique Price"],available:r.fields["Inventory On Hand — PRIVATE"]})) ,nextOffset:data.offset||null});
   }
   if(request.method==="GET" && url.pathname==="/sales") {
    const data=await airtable(env,SALES,"GET","?pageSize=100");
    return json({sales:data.records.map(r=>({id:r.id,orderId:r.fields["Order ID"],status:r.fields["Status"],total:r.fields["Total"],paymentMethod:r.fields["Payment Method"]})),nextOffset:data.offset||null});
   }
   if(request.method==="POST" && url.pathname==="/orders")return pendingSale(env,await request.json());
   if(request.method==="POST" && url.pathname==="/orders/complete")return json({error:"Safe inventory completion requires durable locking; pending sale unchanged"},503);
   // Deliberately no sale-write endpoint until atomicity, authorization and
   // payment confirmation workflow have been validated. Avoid stock corruption.
   return json({error:"Not found"},404);
  } catch(e) { return json({error:"Request failed; see Worker logs"},500); }
 }
};
