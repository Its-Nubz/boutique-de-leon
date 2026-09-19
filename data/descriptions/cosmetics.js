(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const descriptions = [
    ["ILIA","Fullest Volumizing Mascara - Classic Black","A clean volumizing mascara that wraps each lash in weightless, buildable volume without flaking or smudging. It thickens and defines lashes from root to tip while nourishing ingredients condition with every coat. Ophthalmologist-tested and safe for sensitive eyes and contact lens wearers."],
    ["LA PRÉDIRÉ PRESTIGE PARIS","La Belle Flawless Matte Liquid Foundation","A lightweight, full-coverage foundation that provides a smooth matte finish designed to last throughout the day. The breathable formula blends easily, helps minimize the appearance of pores and imperfections, controls shine, and leaves the complexion with an even, natural-looking velvety finish."]
  ];
  for (const [brand, product, description] of descriptions) {
    const item = window.BDL_PRODUCTS.find(p => p.brand === brand && p.product === product);
    if (item) item.description = description;
  }
})();