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
