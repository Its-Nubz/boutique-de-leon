(() => {
  if (!Array.isArray(window.BDL_PRODUCTS)) return;
  const descriptions = [
    ["VALENTINO","Born in Roma Donna Green Stravaganza Eau de Parfum","A floral, ambery and woody fragrance inspired by the cool gardens of Rome. It opens with the smoky character of Lapsang Souchong tea accord, followed by luminous jasmine absolute at the heart and sweet, alluring vanilla extract at the base."],
    ["BURBERRY","London Eau de Parfum for Women","A floral-fresh fragrance opening with gentle rose and honeysuckle. The heart combines tiare flower, jasmine and peony with fresh clementine zest, while sandalwood, musk and patchouli bring warmth and depth to the finish."],
    ["LÁTOÜA MILLE","Serene English Pear & Freesia Body & Hair Fragrance","A refined fragrance mist for hair and body with the natural freshness of English pear and airy freesia. The clean, balanced scent is light rather than overpowering, while hyaluronic acid and multi-peptide complement the lightweight formula for comfortable everyday wear."],
    ["LÁTOÜA MILLE","Still Rose Body & Hair Fragrance Mist","A clean, understated fragrance mist for hair and body with a soft, composed rose note that avoids excessive sweetness or powdery heaviness. The lightweight mist leaves a subtle floral scent and is formulated with hyaluronic acid and multi-peptide for a comfortable everyday application."],
    ["M. MICALLEF","Royal Vintage Eau de Parfum","A woody, spicy fragrance built around fresh bergamot and pink pepper, followed by cypress and leather and a base of musk and patchouli. The composition combines aromatic freshness with a polished, vintage-inspired character."],
    ["M. MICALLEF","Mon Parfum Cristal Eau de Parfum","A feminine gourmand fragrance with a crystalline floral character centered on Bulgarian rose. Warm cinnamon and pink pepper lead into Madagascar vanilla and rose, with toffee, amber and musk creating a sensual, softly sweet finish."],
    ["M. MICALLEF","Ylang in Gold Eau de Parfum","A radiant floral fragrance inspired by tropical islands, pairing ylang-ylang with sandalwood, coconut and vanilla. Bright citrus and floral notes open the composition before giving way to a warm, sunny and sensual base."]
  ];
  for (const [brand, product, description] of descriptions) {
    const item = window.BDL_PRODUCTS.find(p => p.brand === brand && p.product === product);
    if (item) item.description = description;
  }
})();