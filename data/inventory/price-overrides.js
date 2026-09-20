// Boutique De Leon authoritative boutique price overrides.
// Loaded after inventory so these prices take precedence over base and inventory records.
(() => {
  const products = window.BDL_PRODUCTS || [];
  const key = value => String(value || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const setPrice = (brand, product, price) => {
    products.forEach(p => {
      if (key(p.brand) === key(brand) && key(p.product) === key(product)) p.price = price;
    });
  };

  setPrice("PRÉDIRÉ PARIS", "24K Gold Intensive Care Ritual Set", "$50");
  setPrice("PRÉDIRÉ PARIS", "50X Premium Vitamin C Whitening Serum", "$50");
  setPrice("PRÉDIRÉ PARIS", "Age Defying 4 Step Intensive Cell Renewal Thermal Collection", "$100");
  setPrice("PRÉDIRÉ PARIS", "Argan Oil Essential Care Ritual Set", "$120");
  setPrice("PRÉDIRÉ PARIS", "Collagen Cell Renewal Cream", "$40");
  setPrice("PRÉDIRÉ PARIS", "Daily Defence Multi-Peptide Renewal Dropper", "$25");
  setPrice("PRÉDIRÉ PARIS", "Daily Defence Vitamin C Brightening Dropper", "$35");
  setPrice("PRÉDIRÉ PARIS", "Dead Sea Mud Purifying Ritual Set", "$50");
  setPrice("PRÉDIRÉ PARIS", "Double-Acting Facial Moisturizer Vitamin C Based Hydrating & Whitening", "$45");
  setPrice("PRÉDIRÉ PARIS", "Multi-Purpose Anti-Aging Skin Care Device", "$750");
  setPrice("PRÉDIRÉ PARIS", "Oil Control Cooling Serum (Enriched with Vitamin E & A)", "$75");
  setPrice("PRÉDIRÉ PARIS", "Prestige Element Multi-Purpose Face Mask", "$200");
  setPrice("PRÉDIRÉ PARIS", "Red Wine Intensive Serum Face, Neck and Chest", "$50");
  setPrice("PRÉDIRÉ PARIS", "V-Sculpt EMS & Light Therapy Device", "$150");
  setPrice("PRÉDIRÉ PARIS", "Vitamin C & E Booster Facial Toner", "$75");
  setPrice("SECRET COLLAGEN", "Timeless Age-Defying Ritual Collection", "$100");
  setPrice("SECRET COLLAGEN", "24K Gold Luxury Skincare Collection", "$100");
  setPrice("LÁTOÜA MILLE", "Serene English Pear & Freesia Body & Hair Fragrance", "$35");
  setPrice("LÁTOÜA MILLE", "Still Rose Body & Hair Fragrance Mist", "$30");
  setPrice("M. MICALLEF", "Mon Parfum Cristal Eau de Parfum", "$50");
  setPrice("M. MICALLEF", "Royal Vintage Eau de Parfum", "$50");
  setPrice("M. MICALLEF", "Ylang in Gold Eau de Parfum", "$50");
  setPrice("ROYALE", "24K Gold Silk Radiance Keratin Hair Mask", "$35");
  setPrice("ROYALE", "24K Gold Silk Radiance Keratin Hair Serum", "$45");
  setPrice("ROYALE", "Brilliant Gloss & Humidity Shield Mist", "$30");
  setPrice("ROYALE", "Flawless Magic Oil Hair Serum", "$30");
  setPrice("ROYALE", "Hair Rescue Repair Essence Mist", "$30");
  setPrice("ROYALE", "Multi-Purpose Ceramic Hair Brush - Rose Gold", "$75");
  setPrice("ROYALE", "Rescue Softening Conditioner - Vanilla", "$25");
  setPrice("ROYALE", "Rescue Softening Shampoo - Vanilla", "$25");
  setPrice("ROYALE", "Royale Rescue Revitalizing Shampoo", "$25");
  setPrice("ROYALE", "5 IN 1 Hair Mask", "$35");
})();