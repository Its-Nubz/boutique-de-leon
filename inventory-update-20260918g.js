// Inventory identified from the two user-supplied photos of the same boxed set.
(() => {
  const products = window.BDL_PRODUCTS || (window.BDL_PRODUCTS = []);
  const productName = "Timeless Age Defying Ritual Collection 6-Piece Set";
  const brand = "BELOW ZERO";
  const existing = products.find(p => (p.product || "").toLowerCase() === productName.toLowerCase() && (p.brand || "").toLowerCase() === brand.toLowerCase());

  const product = {
    brand,
    product: productName,
    size: "6-Piece Skincare Set",
    retail: "$8,600",
    price: "$350",
    categoryLabel: "Skincare / Set",
    categories: ["new", "skincare", "gifts"],
    status: "1 Available",
    image: "images/products/Below Zero Timeless Age Defying Ritual Collection.png",
    description: "Six-piece age-defying skincare ritual with Silken Milk Cleanser, Balancing Facial Toner, Finishing Cream, Refining Serum, Heat-Infused Mask, and Day & Night Veil Moisturizer."
  };

  if (existing) Object.assign(existing, product);
  else products.unshift(product);
})();
