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
   // Deliberately no sale-write endpoint until atomicity, authorization and
   // payment confirmation workflow have been validated. Avoid stock corruption.
   return json({error:"Not found"},404);
  } catch(e) { return json({error:"Request failed; see Worker logs"},500); }
 }
};
