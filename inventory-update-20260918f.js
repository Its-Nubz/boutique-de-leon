(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const existing = window.BDL_PRODUCTS;
  const additions = [
    {brand:"M. MICALLEF",product:"Royal Vintage Eau de Parfum",size:"100 mL / 3.3 fl oz",retail:"",price:"",categoryLabel:"Fragrance / Eau de Parfum",categories:["new","fragrance"],status:"1 Available",image:""},
    {brand:"M. MICALLEF",product:"Mon Parfum Cristal Eau de Parfum",size:"",retail:"",price:"",categoryLabel:"Fragrance / Eau de Parfum",categories:["new","fragrance"],status:"1 Available",image:""},
    {brand:"M. MICALLEF",product:"Ylang in Gold Eau de Parfum",size:"",retail:"",price:"",categoryLabel:"Fragrance / Eau de Parfum",categories:["new","fragrance"],status:"1 Available",image:""},
    {brand:"CELLAbeauti",product:"PDRN Solution Salmon Ampoule",size:"35 mL / 1.18 fl oz",retail:"",price:"$35",categoryLabel:"Skincare / Ampoule",categories:["new","skincare"],status:"1 Available",image:"images/products/cellabeauti-pdrn-salmon-ampoule.jpg"},
    {brand:"CELLAbeauti",product:"PDRN Ampoule — Cica",size:"",retail:"",price:"$35",categoryLabel:"Skincare / Ampoule",categories:["new","skincare"],status:"1 Available",image:"Cellabeauti PDRN ampoule-cica.png"},
    {brand:"CELLAbeauti",product:"PDRN Ampoule — Collagen",size:"",retail:"",price:"",categoryLabel:"Skincare / Ampoule",categories:["new","skincare"],status:"1 Available",image:""}
  ];
  const key = p => `${p.brand}::${p.product}`.toLowerCase();
  const known = new Set(existing.map(key));
  window.BDL_PRODUCTS = [...additions.filter(p => !known.has(key(p))), ...existing];
})();