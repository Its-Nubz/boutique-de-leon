// Boutique De Leon additions from September 27, 2026.
(() => {
  const products = window.BDL_PRODUCTS || (window.BDL_PRODUCTS = []);
  const key = (brand, product) => `${brand}::${product}`.toLowerCase();
  const upsert = item => {
    const match = products.find(p => key(p.brand || "", p.product || "") === key(item.brand, item.product));
    if (match) Object.assign(match, item); else products.unshift(item);
  };

  [
    {brand:"BELOW ZERO",product:"Arctic Essence Age-Defying Thermal Mask",size:"50 mL / 1.7 fl oz",retail:"$900",price:"$90",categoryLabel:"Skincare / Face Mask",categories:["new","skincare"],status:"Available",image:""},
    {brand:"COLMI",product:"R02 Smart Ring",size:"Size #8 / Gold",retail:"$59.99",price:"$45",categoryLabel:"Electronics / Smart Ring",categories:["new","electronics"],status:"Available",image:""},
    {brand:"RECBLUE",product:"Wireless Headset",size:"Over-Ear Wireless Headphones",retail:"$39.99",price:"$25",categoryLabel:"Electronics / Wireless Headphones",categories:["new","electronics"],status:"Available",image:""},
    {brand:"GENERIC",product:"P8 Colorful Karaoke Set",size:"5W Wireless Karaoke Speaker + Microphone / Pink",retail:"$39.99",price:"$25",categoryLabel:"Electronics / Karaoke",categories:["new","electronics","gifts"],status:"Available",image:""},
    {brand:"CORTEX BEAUTY",product:"Cleansing Face Wash - Brightening & Lightening Formula",size:"200 mL / 6.76 fl oz",retail:"$159",price:"$45",categoryLabel:"Skincare / Cleanser",categories:["new","skincare"],status:"Available",image:""},
    {brand:"CORTEX BEAUTY",product:"Collagen Face Serum",size:"30 mL / 1 fl oz",retail:"$159",price:"$45",categoryLabel:"Skincare / Serum",categories:["new","skincare"],status:"Available",image:""},
    {brand:"CORTEX BEAUTY",product:"Peptide Face Serum",size:"30 mL / 1 fl oz",retail:"$159",price:"$45",categoryLabel:"Skincare / Serum",categories:["new","skincare"],status:"Available",image:""},
    {brand:"RARE BEAUTY",product:"True to Myself Tinted Pressed Finishing Powder",size:"0.28 oz / 8 g — Almond",retail:"$32",price:"$25",categoryLabel:"Cosmetics / Face Powder",categories:["new","cosmetics"],status:"1 Available",image:""},
    {brand:"BODY CEO",product:"Pure Mansa Eau de Parfum",size:"35 mL / 1.17 fl oz",retail:"$15",price:"$10",categoryLabel:"Fragrance / Eau de Parfum",categories:["new","fragrance"],status:"1 Available",image:""},
    {brand:"ILIA",product:"True Skin Serum Concealer - SC6.5 Cayenne",size:"5 mL / 0.16 fl oz",retail:"$32",price:"$20",categoryLabel:"Cosmetics / Concealer",categories:["new","cosmetics"],status:"1 Available",image:""},
    {brand:"NAKERY BEAUTY",product:"PLUMParadise Lip Peptide Color Drench - Naked Rose",size:"Dual-Ended Lip Color + Precision Liner",retail:"$30",price:"$15",categoryLabel:"Cosmetics / Lips",categories:["new","cosmetics"],status:"1 Available",image:""}
  ].forEach(upsert);
})();
