// Added 2026-10-06: Mamba Out tribute slides
(() => {
  const products = window.BDL_PRODUCTS || (window.BDL_PRODUCTS = []);
  const product = {
    brand: "MAMBA OUT",
    product: "Kobe Bryant Tribute Slides — Blue/Gold",
    size: "Size shown on packaging / inquire",
    retail: "$36.24",
    price: "$30",
    categoryLabel: "Randoms / Slides",
    categories: ["new","randoms"],
    status: "1 Available",
    image: "",
    description: "Blue and gold Mamba Out tribute slides featuring the 8, 24 and 2 memorial design. New in sealed packaging."
  };
  if (!products.some(p => p.brand === product.brand && p.product === product.product)) products.unshift(product);
})();
