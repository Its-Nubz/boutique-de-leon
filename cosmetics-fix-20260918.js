(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) window.BDL_PRODUCTS = [];
  const cosmetics = [
    {brand:"ILIA",product:"Fullest Volumizing Mascara - Classic Black",size:"Full Size / 0.32 fl oz / 9.5 mL",retail:"$29",price:"$25",categoryLabel:"Cosmetics / Mascara",categories:["new","makeup","cosmetics"],status:"2 Available",image:"images/products/Ilia fullest volumizing mascara.webp",description:"A clean volumizing mascara that wraps each lash in weightless, buildable volume without flaking or smudging. It thickens and defines lashes from root to tip while nourishing ingredients condition with every coat. Ophthalmologist-tested and safe for sensitive eyes and contact lens wearers."},
    {brand:"LA PRÉDIRÉ PRESTIGE PARIS",product:"La Belle Flawless Matte Liquid Foundation",size:"30 mL / 1 fl oz — Shade not visible in inventory photo",retail:"$160",price:"$35",categoryLabel:"Cosmetics / Foundation",categories:["new","makeup","cosmetics"],status:"2 Available",image:"",description:"A lightweight, full-coverage foundation that provides a smooth matte finish designed to last throughout the day. The breathable formula blends easily, helps minimize the appearance of pores and imperfections, controls shine, and leaves the complexion with an even, natural-looking velvety finish."}
  ];
  cosmetics.forEach(item => {
    const existing = window.BDL_PRODUCTS.find(p => p.brand === item.brand && p.product === item.product);
    if (existing) Object.assign(existing, item);
    else window.BDL_PRODUCTS.unshift(item);
  });
})();