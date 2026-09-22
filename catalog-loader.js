// Loads the Boutique De Leon catalog in a fixed order and always requests the current files.
// Product data loads first, then inventory/price overrides, category descriptions, and the storefront renderer.
(() => {
  const catalogFiles = [
    "products.js",
    "data/inventory/current-inventory.js",
    "data/inventory/electronics.js",
    "data/inventory/price-overrides.js",
    "image-policy.js",
    "data/descriptions/cosmetics.js",
    "data/descriptions/skincare.js",
    "data/descriptions/fragrance.js",
    "data/descriptions/hair.js",
    "data/descriptions/sets.js",
    "script.js"
  ];

  const cacheKey = Date.now();
  const loadNext = index => {
    if (index >= catalogFiles.length) return;
    const script = document.createElement("script");
    script.src = `${catalogFiles[index]}?v=${cacheKey}`;
    script.onload = () => loadNext(index + 1);
    script.onerror = () => {
      console.error(`Boutique De Leon: failed to load ${catalogFiles[index]}`);
      loadNext(index + 1);
    };
    document.body.appendChild(script);
  };

  loadNext(0);
})();