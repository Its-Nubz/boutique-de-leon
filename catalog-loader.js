// Loads the Boutique De Leon catalog in a fixed order and always requests the current files.
// Add future inventory files to this list; no manual ?v= version bumps are needed.
(() => {
  const catalogFiles = [
    "products.js",
    "photo-products-20260918.js",
    "inventory-update-20260918b.js",
    "inventory-update-20260918c.js",
    "inventory-update-20260918d.js",
    "inventory-update-20260918e.js",
    "inventory-update-20260918f.js",
    "inventory-update-20260918g.js",
    "cosmetics-fix-20260918.js",
    "image-policy.js",
    "product-descriptions.js",
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