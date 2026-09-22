// Boutique De Leon electronics inventory.
(() => {
  const products = window.BDL_PRODUCTS || (window.BDL_PRODUCTS = []);
  const key = value => String(value || "").trim().toLowerCase();
  const inventory = [
    {
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
    },
    {
      brand: "HIFI WALKER",
      product: "T10 Air Open-Ear Bone Conduction Headphones",
      size: "Bluetooth 5.3 / 32GB Storage / IPX8",
      retail: "$49.99",
      price: "$35",
      categoryLabel: "Electronics / Headphones",
      categories: ["new", "electronics"],
      status: "Available",
      image: "",
      description: "Open-ear bone conduction headphones with Bluetooth 5.3, 32GB built-in storage, IPX8 water resistance, magnetic charging, and up to 8 hours of playback."
    },
    {
      brand: "Magtame",
      product: "O-MagCable 240W Magnetic Charging Data Cable - USB-C to USB-C",
      size: "1.5 m / 4.9 ft / 240W / Black",
      retail: "$39.99",
      price: "$30",
      categoryLabel: "Electronics / Charging Cable",
      categories: ["new", "electronics"],
      status: "Available",
      image: "",
      description: "240W USB-C to USB-C magnetic charging and data cable with a braided nylon exterior and magnetic self-winding design for compact, tidy storage."
    }
  ];
  inventory.forEach(item => {
    const existing = products.find(p => key(p.brand) === key(item.brand) && key(p.product) === key(item.product));
    if (existing) Object.assign(existing, item); else products.unshift(item);
  });
})();