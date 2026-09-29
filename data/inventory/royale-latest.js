// Boutique De Leon — latest Royale inventory additions.
(() => {
  const products = window.BDL_PRODUCTS || (window.BDL_PRODUCTS = []);
  const key = (brand, product) => `${brand}::${product}`.toLowerCase();
  const upsert = item => {
    const match = products.find(p => key(p.brand || "", p.product || "") === key(item.brand, item.product));
    if (match) Object.assign(match, item); else products.unshift(item);
  };

  upsert({
    brand: "ROYALE HAIR RESCUE",
    product: "Perfect Rescue Revitalizing Hair Spray",
    size: "100 mL / 3.38 fl oz",
    retail: "$150",
    price: "$20",
    categoryLabel: "Hair / Treatment Spray",
    categories: ["new", "hair"],
    status: "1 Available",
    image: "images/products/Hair/ROYALE HAIR RESCUE — Perfect Rescue Revitalizing Hair Spray.png",
  });

  upsert({
    brand: "ROYALE",
    product: "Platinum Genius Heating Element Flat Iron",
    size: "1.25 in Ceramic Plates",
    retail: "$350",
    price: "$125",
    categoryLabel: "Hair / Styling Tools",
    categories: ["new", "hair"],
    status: "1 Available",
    image: "images/products/Hair/ROYALE — Platinum Genius Heating Element Flat Iron.png",
  });
})();
