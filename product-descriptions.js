(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const descriptions = [
    ["ILIA","Fullest Volumizing Mascara - Classic Black","A clean volumizing mascara that wraps each lash in weightless, buildable volume without flaking or smudging. It thickens and defines lashes from root to tip while nourishing ingredients condition with every coat. Ophthalmologist-tested and safe for sensitive eyes and contact lens wearers."],
    ["LA PRÉDIRÉ PRESTIGE PARIS","La Belle Flawless Matte Liquid Foundation","A lightweight, full-coverage foundation that provides a smooth matte finish designed to last throughout the day. The breathable formula blends easily, helps minimize the appearance of pores and imperfections, controls shine, and leaves the complexion with an even, natural-looking velvety finish."],
    ["PRÉDIRÉ PARIS","Vitamin C & E Booster Facial Toner","A gentle, non-drying toner formulated to balance, restore and cleanse the skin. Its lightweight formula prepares skin for the next step in a routine focused on hydrated, younger and healthier-looking skin."],
    ["PRÉDIRÉ PARIS","Collagen Cell Renewal Cream","Enriched with collagen and a blend of ingredients, this daily cream is designed to support skin hydration and flexibility while providing a gentle, nurturing approach to the skin's natural renewal process."],
    ["PRÉDIRÉ PARIS","Oil Control Cooling Serum (Enriched with Vitamin E & A)","Formulated with concentrated witch hazel extract to help reduce the appearance of excess facial oil and redness. Niacinamide, oat bran extract and hyaluronic acid support moisture and the appearance of damaged skin, while mint and eucalyptus provide a refreshing cooling feel."],
    ["PRÉDIRÉ PARIS","Red Wine Intensive Serum Face, Neck and Chest","A facial serum formulated with argan oil, retinol and resveratrol to support the skin's natural rejuvenation process. It is designed to improve the appearance of skin texture, provide hydration, even the look of skin tone and help protect against environmental free-radical damage."],
    ["PRÉDIRÉ PARIS","Argan Oil Essential Care Ritual Set","A curated four-step skincare set centered around argan oil and designed to complement daily facial care. The cleanser, toner, serum and cream are formulated to work together as a complete routine focused on comfort, nourishment-inspired textures and a smooth, polished skin feel."],
    ["PRÉDIRÉ PARIS","Daily Defence Vitamin C Brightening Dropper","Enriched with vitamin C, this silky dropper is designed to bring a refined sense of radiance and clarity to the skincare ritual and integrates easily into morning or evening care."],
    ["PRÉDIRÉ PARIS","Age Defying 4 Step Intensive Cell Renewal Thermal Collection","A four-step age-defying skincare collection featuring a thermal mask, activator serum, cell-renewal finishing cream and ionic skincare infuser. The regimen is designed to address the appearance of fine lines, uneven tone, elasticity and firmness while cleansing and refining the skin."],
    ["ELIYA SKIN","Volcanic Instant Detox Mask - Purification Formula for Deep Pore Cleansing","A volcanic detox mask with a specialized purification formula designed to target buildup within pores. Volcanic minerals and deep-cleansing clays help lift impurities, pollutants and excess grease from the skin's surface for a clean, refined feel."],
    ["ELIYA SKIN","Skin Nourish Mask - Infused with Coral Grass & Green Algae Extracts","A rich, comforting mask infused with coral grass and green algae extracts, known for moisture-retaining and skin-softening properties. Its creamy texture wraps the skin in lightweight nourishment to restore a sense of suppleness and comfort."],
    ["SECRET COLLAGEN","Timeless Age-Defying Ritual Collection","A six-piece age-defying skincare ritual featuring a Silken Milk Cleanser, Balancing Facial Toner, Finishing Cream, Refining Serum, Heat-Infused Mask and Day & Night Veil Moisturizer, designed to work together through cleansing, conditioning, treatment and moisturizing steps."],
    ["SECRET COLLAGEN","24K Gold Luxury Skincare Collection","A six-piece age-defying skincare ritual featuring a Silken Milk Cleanser, Balancing Facial Toner, Finishing Cream, Refining Serum, Heat-Infused Mask and Day & Night Veil Moisturizer, designed to work together through cleansing, conditioning, treatment and moisturizing steps."],
    ["ROYALE","24K Gold Silk Radiance Keratin Hair Serum","A lightweight hair essence formulated with 24K gold elements, keratin and vitamin C to complement daily hair care. Its smooth, fluid texture spreads evenly through the hair without weighing it down and leaves a polished, silky feel."],
    ["ROYALE","Flawless Magic Oil Hair Serum",""],
    ["ROYALE","5 IN 1 Hair Mask",""],
    ["ROYALE","Royale Rescue Revitalizing Shampoo",""],
    ["ROYALE","Brilliant Gloss & Humidity Shield Mist",""],
    ["ROYALE","Hair Rescue Repair Essence Mist",""],
    ["BELOW ZERO","Frozen Gold Multi-Vitamin Magnetic Mud Mask",""],
    ["BELOW ZERO","Frozen Gold Firming & Tightening Peeling Mask with Multi-Peptide & Caffeine",""]
  ];
  for (const [brand, product, description] of descriptions) {
    const item = window.BDL_PRODUCTS.find(p => p.brand === brand && p.product === product);
    if (item) item.description = description;
  }
  for (const item of window.BDL_PRODUCTS) {
    if (typeof item.description !== "string") item.description = "";
  }
})();
