// Boutique De Leon electronics inventory.
(() => {
  const products = window.BDL_PRODUCTS || (window.BDL_PRODUCTS = []);
  const key = value => String(value || "").trim().toLowerCase();
  const item = {
    brand: "WinBridge",
    product: "S99 100W Voice Amplifier with Dual Wireless Microphones",
    size: "100W / 4000mAh",
    retail: "$239",
    price: "$150",
    categoryLabel: "Electronics / Portable PA System",
    categories: ["new", "electronics"],
    status: "Available",
    image: "",
    description: "Portable 100W voice amplifier and PA system with two wireless handheld microphones, 4000mAh rechargeable battery, multiple voice effects, 50Hz–20KHz frequency range, 4–6 hour speaker runtime, and 10+ hour microphone runtime."
  };
  const existing = products.find(p => key(p.brand) === key(item.brand) && key(p.product) === key(item.product));
  if (existing) Object.assign(existing, item); else products.unshift(item);
})();