(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const existing = window.BDL_PRODUCTS;
  const additions = [
    {brand:"ROYALE",product:"Flawless Magic Oil Hair Serum",size:"120 mL / 4.05 fl oz",retail:"$250",price:"",categoryLabel:"Hair / Serum",categories:["new","hair"],status:"1 Available",image:""},
    {brand:"ROYALE",product:"5 IN 1 Hair Mask",size:"200 g / 7.05 oz",retail:"$75",price:"",categoryLabel:"Hair / Mask",categories:["new","hair"],status:"1 Available",image:""},
    {brand:"ROYALE",product:"Royale Rescue Revitalizing Shampoo",size:"250 mL / 8.45 fl oz",retail:"$75",price:"",categoryLabel:"Hair / Shampoo",categories:["new","hair"],status:"1 Available",image:""},
    {brand:"ROYALE",product:"Brilliant Gloss & Humidity Shield Mist",size:"",retail:"$150",price:"",categoryLabel:"Hair / Styling Mist",categories:["new","hair"],status:"1 Available",image:""},
    {brand:"ROYALE",product:"Hair Rescue Repair Essence Mist",size:"",retail:"$150",price:"",categoryLabel:"Hair / Repair Mist",categories:["new","hair"],status:"1 Available",image:""}
  ];
  const key = p => `${p.brand}::${p.product}`.toLowerCase();
  const known = new Set(existing.map(key));
  window.BDL_PRODUCTS = [...additions.filter(p => !known.has(key(p))), ...existing];
})();