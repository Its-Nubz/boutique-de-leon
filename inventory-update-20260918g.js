// Inventory identified from the two user-supplied photos of the same boxed set.
// Verified against Below Zero's official product listing.
(() => {
  const products = window.BDL_PRODUCTS || (window.BDL_PRODUCTS = []);
  const name = "Timeless Age Defying Ritual Collection 6-Piece Set";
  const brand = "Below Zero";
  const existing = products.find(p => (p.name || "").toLowerCase() === name.toLowerCase() && (p.brand || "").toLowerCase() === brand.toLowerCase());

  const product = {
    brand,
    name,
    size: "6-Piece Skincare Set",
    retail: "$8,600",
    price: "$350",
    category: "Skincare / Set",
    categories: ["new", "skincare", "gifts"],
    status: "1 Available",
    image: "https://belowzeroswiss.com/cdn/shop/files/BZ-Timeless-Age-Defying-Ritual-Collection.jpg",
    description: "Six-piece age-defying skincare ritual with Silken Milk Cleanser, Balancing Facial Toner, Finishing Cream, Refining Serum, Heat-Infused Mask, and Day & Night Veil Moisturizer."
  };

  if (existing) Object.assign(existing, product);
  else products.unshift(product);
})();
