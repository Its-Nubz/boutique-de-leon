// Boutique De Leon image policy: only display product images stored locally in this repository.
// Products without a user-provided/local image render as "IMAGE COMING SOON" in script.js.
(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  window.BDL_PRODUCTS.forEach(product => {
    const image = String(product.image || "").trim();
    if (/^https?:\/\//i.test(image)) {
      product.image = "";
      return;
    }
    // Legacy product images once stored at the repository root now live in images/products/.
    if (image && !image.includes("/")) product.image = `images/products/${image}`;
  });
})();
