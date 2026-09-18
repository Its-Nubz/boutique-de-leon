(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) window.BDL_PRODUCTS = [];
  const cosmetics = [
    {brand:"ILIA",product:"Fullest Volumizing Mascara - Classic Black",size:"Full Size / 0.32 fl oz / 9.5 mL",retail:"$29",price:"$25",categoryLabel:"Cosmetics / Mascara",categories:["new","makeup","cosmetics"],status:"2 Available",image:"https://iliabeauty.com/cdn/shop/files/FullestVolumizingMascara_whiteBG.png?v=1758120352&width=640"},
    {brand:"LA PRÉDIRÉ PRESTIGE PARIS",product:"La Belle Flawless Matte Liquid Foundation",size:"30 mL / 1 fl oz — Shade not visible in inventory photo",retail:"$160",price:"$35",categoryLabel:"Cosmetics / Foundation",categories:["new","makeup","cosmetics"],status:"2 Available",image:"https://di2ponv0v5otw.cloudfront.net/posts/2026/09/07/6a9ef7097aaa64562b2237bf/l_6a9ef740b55223b0018fb235.jpg"}
  ];
  cosmetics.forEach(item => {
    const existing = window.BDL_PRODUCTS.find(p => p.brand === item.brand && p.product === item.product);
    if (existing) Object.assign(existing, item);
    else window.BDL_PRODUCTS.unshift(item);
  });
})();