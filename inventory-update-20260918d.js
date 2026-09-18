(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const existing = window.BDL_PRODUCTS;
  const addition = {
    brand:"SECRET GOLD 24K",
    product:"Luxury Skincare Collection",
    size:"6-Piece Skincare Collection",
    retail:"",
    price:"",
    categoryLabel:"Skincare / Set",
    categories:["new","skincare","gifts"],
    status:"1 Available",
    image:""
  };
  const exists = existing.some(p => p.brand === addition.brand && p.product === addition.product);
  if (!exists) window.BDL_PRODUCTS = [addition, ...existing];
})();