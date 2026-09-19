(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const existing = window.BDL_PRODUCTS;
  const addition = {
    brand:"SECRET COLLAGEN",
    product:"24K Gold Luxury Skincare Collection",
    size:"6-Piece Skincare Collection",
    retail:"",
    price:"",
    categoryLabel:"Skincare / Set",
    categories:["new","skincare","gifts"],
    status:"1 Available",
    image:"Secret Collagen Timeless Age-defying Ritual Collection.png"
  };
  const legacyMatch = existing.find(p => p.brand === "SECRET GOLD 24K" && p.product === "Luxury Skincare Collection");
  const match = legacyMatch || existing.find(p => p.brand === addition.brand && p.product === addition.product);
  if (match) Object.assign(match, addition);
  else window.BDL_PRODUCTS = [addition, ...existing];
})();