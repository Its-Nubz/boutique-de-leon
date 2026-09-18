(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const existing = window.BDL_PRODUCTS;
  const additions = [
    {brand:"BELOW ZERO SWISS",product:"Pink Diamond Divine Summit Cell Renewal Cream",size:"50 mL / 1.7 fl oz",retail:"$950",price:"",categoryLabel:"Skincare / Moisturizer",categories:["new","skincare"],status:"1 Available",image:""},
    {brand:"BELOW ZERO SWISS",product:"Pink Diamond Hydrolyzed Collagen Cell-Renewal Thermal Mask",size:"50 mL",retail:"$900",price:"",categoryLabel:"Skincare / Face Mask",categories:["new","skincare"],status:"1 Available",image:""},
    {brand:"BELOW ZERO SWISS",product:"Pink Diamond Firm & Rejuvenate Collagen Overnight Threading Mask",size:"",retail:"",price:"",categoryLabel:"Skincare / Overnight Mask",categories:["new","skincare"],status:"1 Available",image:""},
    {brand:"BELOW ZERO SWISS",product:"Pink Diamond Radiant Essence",size:"",retail:"",price:"",categoryLabel:"Skincare / Essence",categories:["new","skincare"],status:"1 Available",image:""},
    {brand:"BELOW ZERO SWISS",product:"Pink Diamond Eye Serum",size:"",retail:"",price:"",categoryLabel:"Skincare / Eye Serum",categories:["new","skincare"],status:"1 Available",image:""},
    {brand:"ELIYA SKIN",product:"Skin Nourish Mask - Infused with Coral Grass & Green Algae Extracts",size:"100 mL / 3.4 fl oz",retail:"$299.99",price:"",categoryLabel:"Skincare / Face Mask",categories:["new","skincare"],status:"1 Available",image:""},
    {brand:"ROYALE",product:"Multi-Purpose Ceramic Hair Brush - Rose Gold",size:"Dual Voltage 110V-240V",retail:"$500",price:"",categoryLabel:"Hair / Styling Tool",categories:["new","hair"],status:"1 Available",image:""}
  ];
  const key = p => `${p.brand}::${p.product}`.toLowerCase();
  const known = new Set(existing.map(key));
  window.BDL_PRODUCTS = [...additions.filter(p => !known.has(key(p))), ...existing];
})();