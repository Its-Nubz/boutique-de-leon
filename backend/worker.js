// Boutique de Leon private checkout API — Cloudflare Worker
// Bind secrets: AIRTABLE_TOKEN, ACCESS_TEAM_DOMAIN, ACCESS_AUD
// Bind vars: ALLOWED_ORIGIN (exact GitHub Pages origin)
// Require Cloudflare Access policy on the Worker route. JWT is verified here too.
const BASE='appgKdhaAA8UBPV8o',PRODUCTS='tblb0GN8xENO2opAM',SALES='tblFP6DSlDtaBYgn8',MOVEMENTS='tbl3yGzkTm8yXX4BH';
const json=(data,status=200,origin='')=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...(origin?{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Credentials':'true','Vary':'Origin'}:{})}});
const enc=s=>encodeURIComponent(s);
const b64=s=>Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
async function verifyAccess(request,env){
 const jwt=request.headers.get('Cf-Access-Jwt-Assertion');if(!jwt||!env.ACCESS_TEAM_DOMAIN||!env.ACCESS_AUD)throw Error('Staff login required');
 const parts=jwt.split('.');if(parts.length!==3)throw Error('Invalid session');
 const head=JSON.parse(new TextDecoder().decode(b64(parts[0]))),claims=JSON.parse(new TextDecoder().decode(b64(parts[1])));
 const domain=env.ACCESS_TEAM_DOMAIN.replace(/^https?:\/\//,'').replace(/\/$/,'');
 const issuer='https://'+domain;
 if(head.alg!=='RS256'||!head.kid||claims.iss!==issuer||!(Array.isArray(claims.aud)?claims.aud.includes(env.ACCESS_AUD):claims.aud===env.ACCESS_AUD)||!claims.exp||claims.exp*1000<Date.now()||claims.nbf&&claims.nbf*1000>Date.now())throw Error('Invalid staff session');
 const resp=await fetch(issuer+'/cdn-cgi/access/certs');if(!resp.ok)throw Error('Access key retrieval failed');
 const keys=(await resp.json()).keys;const jwk=keys.find(k=>k.kid===head.kid&&k.kty==='RSA');if(!jwk)throw Error('Unrecognized staff session');
 const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
 if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,b64(parts[2]),new TextEncoder().encode(parts[0]+'.'+parts[1])))throw Error('Invalid signature');
 return claims;
}
async function airtable(env,table,path='',options={}){
 const res=await fetch('https://api.airtable.com/v0/'+BASE+'/'+table+path,{...options,headers:{Authorization:'Bearer '+env.AIRTABLE_TOKEN,'Content-Type':'application/json',...(options.headers||{})}});
 const body=await res.json().catch(()=>({}));if(!res.ok)throw Error('Airtable '+res.status+': '+(body.error?.message||'request failed'));return body;
}
const product=p=>({id:p.id,name:p.fields.Product||'Unnamed',price:Number(p.fields['Boutique Price']||0),available:Math.max(0,Number(p.fields['Inventory On Hand — PRIVATE']||0)-Number(p.fields['Units Reserved — PRIVATE']||0)),onHand:Number(p.fields['Inventory On Hand — PRIVATE']||0),sold:Number(p.fields['Units Sold — PRIVATE']||0)});
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'',allowed=env.ALLOWED_ORIGIN||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':origin===allowed?origin:'','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Idempotency-Key','Access-Control-Allow-Credentials':'true','Vary':'Origin'}});
 const url=new URL(request.url);if(origin&&origin!==allowed)return json({error:'Origin not permitted'},403);
 const cors=origin===allowed?origin:'';
 try{
 await verifyAccess(request,env);
 if(request.method==='GET'&&url.pathname==='/health')return json({name:'Boutique de Leon'},200,cors);
 const m=url.pathname.match(/^\/products\/(rec[A-Za-z0-9]{14})$/);
 if(request.method==='GET'&&m){const p=product(await airtable(env,PRODUCTS+'/'+m[1]));return json({name:p.name,price:p.price,available:p.available},200,cors)}
 if(request.method!=='POST'||url.pathname!=='/checkout')return json({error:'Not found'},404,cors);
 const key=request.headers.get('Idempotency-Key');if(!key||! /^[0-9a-f-]{36}$/i.test(key))return json({error:'Idempotency key required'},400,cors);
 const input=await request.json();if(!Array.isArray(input.items)||!input.items.length||input.items.length>25||!['Cash','Zelle','Venmo','Cash App','Other'].includes(input.paymentMethod))return json({error:'Invalid checkout'},400,cors);
 const existing=await airtable(env,SALES+'?'+new URLSearchParams({filterByFormula:'{Idempotency Key}="'+key+'"',maxRecords:'1'}));
 if(existing.records.length){const x=existing.records[0];return json({error:'Order already submitted; status: '+x.fields.Status,orderId:x.fields['Order ID']},409,cors)}
 const lines=[];const seen=new Set();let total=0;
 for(const item of input.items){
 if(!/^rec[A-Za-z0-9]{14}$/.test(item.id)||!Number.isSafeInteger(item.qty)||item.qty<1||item.qty>100||seen.has(item.id))return json({error:'Invalid line item'},400,cors);
 seen.add(item.id);const raw=await airtable(env,PRODUCTS+'/'+item.id);const p=product(raw);
 if(!Number.isFinite(p.price)||p.price<=0||p.available<item.qty)return json({error:'Price or stock unavailable for '+p.name},409,cors);
 lines.push({...p,qty:item.qty});total+=Math.round(p.price*100)*item.qty;
 }
 // Airtable is not transactional: only one checkout writer should be enabled.
 // Any partial failure leaves an explicit FAILED order for manual reconciliation.
 const orderId='BDL-'+crypto.randomUUID();
 const created=await airtable(env,SALES,'',{method:'POST',body:JSON.stringify({fields:{'Order ID':orderId,Status:'Processing','Payment Method':input.paymentMethod,Total:total/100,'Items JSON':JSON.stringify(lines.map(({id,name,price,qty})=>({id,name,price,qty}))), 'Idempotency Key':key,'Created At':new Date().toISOString()}})});
 try{
 for(const p of lines){
 await airtable(env,PRODUCTS+'/'+p.id,'',{method:'PATCH',body:JSON.stringify({fields:{'Inventory On Hand — PRIVATE':p.onHand-p.qty,'Units Sold — PRIVATE':p.sold+p.qty}})});
 await airtable(env,MOVEMENTS,'',{method:'POST',body:JSON.stringify({fields:{Movement:orderId+' '+p.name,'Product / Variant':p.name,'Quantity Change':-p.qty,Date:new Date().toISOString(),'Reference / Order':orderId,Notes:'QR checkout · '+input.paymentMethod}})});
 }
 await airtable(env,SALES+'/'+created.id,'',{method:'PATCH',body:JSON.stringify({fields:{Status:'Completed'}})});
 return json({orderId},200,cors);
 }catch(e){
 await airtable(env,SALES+'/'+created.id,{method:'PATCH',body:JSON.stringify({fields:{Status:'Failed',Notes:'RECONCILE MANUALLY: possible partial stock or movement updates. '+String(e.message).slice(0,350)}})}).catch(()=>{});
 return json({error:'Checkout needs manual reconciliation. Do not retry until reviewed. Order '+orderId,orderId},503,cors);
 }
 }catch(e){return json({error:e.message==='Staff login required'?'Staff login required':'Checkout API error: '+e.message},e.message==='Staff login required'?401:400,cors)}
}};