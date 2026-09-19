(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;

  const existing = window.BDL_PRODUCTS;
  const setStatus = (brand, product, status) => {
    const item = existing.find(p => p.brand === brand && p.product === product);
    if (item) item.status = status;
  };

  // Visible in the latest inventory photos; update existing item instead of duplicating it.
  setStatus("ADORE COSMETICS", "Essence Facial Milk", "1 Available");

  const additions = [
    {brand:"PRÉDIRÉ PARIS",product:"Vitamin C & E Booster Facial Toner",size:"250 mL / 8.45 fl oz",retail:"$165",price:"$65",categoryLabel:"Skincare / Toner",categories:["new","skincare"],status:"1 Available",image:"images/products/Predire Paris Vitamin C & E Booster Facial Toner.png"},
    {brand:"BELOW ZERO",product:"Frozen Gold Multi-Vitamin Magnetic Mud Mask",size:"50 mL / 1.7 fl oz",retail:"$950",price:"$85",categoryLabel:"Skincare / Face Mask",categories:["new","skincare"],status:"1 Available",image:"images/products/below zero Multi-Vitamin Magnetic Mud Mask.png"},
    {brand:"BELOW ZERO",product:"Frozen Gold Firming & Tightening Peeling Mask with Multi-Peptide & Caffeine",size:"100 g / 3.53 fl oz",retail:"$3,750",price:"$85",categoryLabel:"Skincare / Peel-Off Mask",categories:["new","skincare"],status:"1 Available",image:"images/products/Below Zero Frozen Gold - Firming & Tightening Below Zero Peeling Mask enriched with Multi-Peptide & Caffeine.png"},
    {brand:"PRÉDIRÉ PARIS",product:"Daily Defence Vitamin C Brightening Dropper",size:"30 mL / 1 fl oz",retail:"$299.99",price:"",categoryLabel:"Skincare / Serum",categories:["new","skincare"],status:"1 Available",image:""},
    {brand:"PRÉDIRÉ PARIS",product:"24K Gold Intensive Care Ritual Set",size:"4-Piece Skincare Set + 5 Pairs Eye Mask Pads",retail:"$269.99",price:"",categoryLabel:"Skincare / Set",categories:["new","skincare","gifts"],status:"1 Available",image:""}
  ];

  const key = p => `${p.brand}::${p.product}`.toLowerCase();
  const known = new Set(existing.map(key));
  window.BDL_PRODUCTS = [...additions.filter(p => !known.has(key(p))), ...existing];
})();
