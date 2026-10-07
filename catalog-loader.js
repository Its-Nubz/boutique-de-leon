// Loads the Boutique De Leon catalog in a fixed order and always requests the current files.
// Product data loads first, then inventory/price overrides, category descriptions, and the storefront renderer.
(() => {
  const catalogFiles = [
    "products.js",
    "data/inventory/current-inventory.js",
    "data/inventory/electronics.js",
    "data/inventory/price-overrides.js",
    "data/inventory/2026-09-27-additions.js",
    "data/inventory/royale-latest.js",
    "data/inventory/mamba-out-slides.js",
    "image-policy.js",
    "data/descriptions/cosmetics.js",
    "data/descriptions/skincare.js",
    "data/descriptions/fragrance.js",
    "data/descriptions/hair.js",
    "data/descriptions/sets.js",
    "data/reviews/approved-reviews.js",
    "script.js"
  ];

  const cacheKey = Date.now();

  const featureBabyJesus = () => {
    const tiles = document.querySelector('.category-tiles');
    if (!tiles || document.getElementById('babyJesusFeature')) return;

    const feature = document.createElement('section');
    feature.id = 'babyJesusFeature';
    feature.setAttribute('aria-label', 'Featured product: Baby Jesus');
    feature.style.cssText = 'margin:2.5rem 0 3rem;border:1px solid #cba35c;background:linear-gradient(145deg,#111,#19160f);padding:clamp(1.25rem,3vw,2.5rem);display:grid;grid-template-columns:minmax(220px,420px) 1fr;gap:clamp(1.5rem,4vw,4rem);align-items:center;box-shadow:0 18px 55px rgba(0,0,0,.28)';
    feature.innerHTML = `
      <div style="background:#fff;display:grid;place-items:center;overflow:hidden;min-height:320px">
        <img src="images/products/Baby%20Jesus.png?v=${cacheKey}" alt="Baby Jesus" style="width:100%;height:100%;max-height:460px;object-fit:contain;display:block">
      </div>
      <div>
        <p class="eyebrow" style="margin-top:0">DIVINE FEATURE OF THE MOMENT</p>
        <p style="font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,2.2vw,2rem);line-height:1.25;color:#cda65f;margin:.4rem 0 .7rem">The Benevolent, All-Knowing Master of the Universe</p>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,6vw,5.5rem);font-weight:500;line-height:.95;margin:.2rem 0 1.4rem">Baby Jesus</h3>
        <p style="line-height:1.8;color:#c9c4bb;max-width:700px">Our Lord and Savior, now making a limited and completely unauthorized appearance at Boutique De Leon. Perfect for anyone seeking salvation, forgiveness, divine intervention, or simply the most aggressively priceless item in the collection. Results may vary. Miracles not guaranteed. Forgiveness subject to heavenly approval.</p>
        <div style="margin-top:1.5rem;font-size:.85rem;line-height:1.9"><div><span style="color:#8f8980">Retail:</span> <strong>Priceless</strong></div><div><span style="color:#8f8980">Boutique De Leon Price:</span> <strong style="color:#cda65f">$100,000,000,000</strong></div></div>
      </div>`;

    tiles.insertAdjacentElement('afterend', feature);

    const mobile = window.matchMedia('(max-width: 760px)');
    const adjust = () => { feature.style.gridTemplateColumns = mobile.matches ? '1fr' : 'minmax(220px,420px) 1fr'; };
    adjust();
    if (mobile.addEventListener) mobile.addEventListener('change', adjust);
  };

  const loadNext = index => {
    if (index >= catalogFiles.length) {
      featureBabyJesus();
      return;
    }
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