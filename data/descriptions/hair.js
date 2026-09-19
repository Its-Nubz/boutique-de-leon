(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const descriptions = [
    ["ROYALE","24K Gold Silk Radiance Keratin Hair Serum","A lightweight hair essence formulated with 24K gold elements, keratin and vitamin C. Its smooth, fluid texture spreads evenly through the hair without weighing it down, leaving hair with a polished, silky feel."],
    ["ROYALE","24K Gold Silk Radiance Keratin Hair Mask","A conditioning treatment formulated with 24K gold elements, keratin and vitamin C. Its rich, creamy texture glides through the hair to complement a polished hair-care routine and provide an enveloping conditioning experience."],
    ["ROYALE","Rescue Softening Shampoo - Vanilla","A softening shampoo developed for coarse, rigid, dry or naturally thick hair. Its creamy vanilla-inspired lather gently cleanses while helping reduce rough texture and support a smoother, softer and more manageable feel from roots to ends."],
    ["ROYALE","Rescue Softening Conditioner - Vanilla","A creamy, vanilla-inspired conditioner designed to soften dry or coarse hair, improve glide and support detangling. It coats the hair with gentle nourishment to enhance manageability and leave a smooth, silky finish."],
    ["ROYALE","Flawless Magic Oil Hair Serum","A multi-purpose professional hair serum formulated with marula oil, rose petal oil, coconut oil and a keratin booster. It is designed to help restore shine and softness to damaged hair, reduce tangling, tame flyaways and condition split ends while supporting hair exposed to heat and coloring."],
    ["ROYALE","5 IN 1 Hair Mask","A mineral-rich hair mask formulated with avocado oils and macadamia nuts to lock in moisture and promote softness and shine. The nourishing treatment is designed to help repair hair from roots to ends, replenish dry strands, eliminate frizz and leave hair smoother and more manageable."],
    ["ROYALE","Royale Rescue Revitalizing Shampoo","A rich cleansing shampoo formulated with botanical extracts and nourishing oils. Its lather gently purifies the hair while supporting a refreshed, revitalized feel and leaving behind a floral-inspired fragrance."],
    ["ROYALE","Brilliant Gloss & Humidity Shield Mist","A lightweight finishing mist designed to give hair an instant polished appearance with a soft, luminous glow. Its humidity-resistant formula helps support smoothness and light reflection while preserving the hair's natural movement."],
    ["ROYALE","Hair Rescue Repair Essence Mist","A lightweight repair mist combining conditioning oils and keratin to help restore softness to dry or styled hair. It leaves a silky finish without weighing strands down, helping hair feel refreshed and easier to manage."],
    ["ROYALE","Multi-Purpose Ceramic Hair Brush - Rose Gold","A heated ceramic styling brush designed to straighten hair quickly while helping seal the cuticle and retain moisture. Far-infrared, negative-ion and nano technologies complement the 100% ceramic straightening surface, with adjustable professional heat from 250°F to 450°F, a heat-resistant guard and a 360° swivel cord for easier styling. Dual voltage 110V-240V and suitable for all hair types."]
  ];
  for (const [brand, product, description] of descriptions) {
    const item = window.BDL_PRODUCTS.find(p => p.brand === brand && p.product === product);
    if (item) item.description = description;
  }
})();