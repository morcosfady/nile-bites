/* ==========================================================================
   NILE BITES — Content data
   Single source of truth for menu, gallery and testimonials. Swap the `img`
   values for your own photography (see README) — nothing else changes.
   ========================================================================== */
(function (global) {
  "use strict";

  var U = "https://images.unsplash.com/photo-";
  var Q = "?auto=format&fit=crop&w=900&q=80";
  var QL = "?auto=format&fit=crop&w=1600&q=82";

  /* Categories -------------------------------------------------------- */
  var CATEGORIES = [
    { id: "breakfast", name: "Egyptian Breakfast", blurb: "The table Egypt wakes up to — slow-simmered foul, hand-fried taameya and bread pulled from the oven minutes before it reaches you." },
    { id: "bakery",    name: "Fresh Bakery",       blurb: "Laminated, proofed and baked in-house from four in the morning. Butter, patience and nothing else." },
    { id: "feteer",    name: "Feteer Meshaltet",   blurb: "Egypt's layered pastry, stretched paper-thin by hand and folded thirty times before it meets the stone." },
    { id: "bread",     name: "Fresh Bread",        blurb: "Baladi, shamsi and semit — wheat, water, salt and a wood fire kept at 400°C all day." },
    { id: "desserts",  name: "Oriental Desserts",  blurb: "Syrup-glossed, pistachio-strewn and cut to order. Sweetness with restraint." },
    { id: "cuisine",   name: "Middle Eastern Cuisine", blurb: "Charcoal, herbs and the long braise — the dishes we serve when the table is full and the night is long." },
    { id: "drinks",    name: "Traditional Drinks", blurb: "Karkadeh over crushed ice, mint tea in gilt glasses, and coffee ground to order on the rakwa." },
    { id: "chef",      name: "Chef Specials",      blurb: "A short list, changed with the season and the market. Chef Hossam's own hand." },
    { id: "kids",      name: "Kids Menu",          blurb: "Smaller plates, gentler spice — the same kitchen, the same standards." }
  ];

  /* Menu -------------------------------------------------------------- */
  var MENU = [
    /* --- Egyptian Breakfast --- */
    { id: "foul-royal", cat: "breakfast", name: "Foul Medames Royale", ar: "فول مدمس", price: 145, featured: true,
      desc: "Fava beans simmered overnight in a copper qidra, finished with cold-pressed olive oil, cumin, lemon and a spoon of tahini cream.",
      tags: ["Signature", "Vegetarian"], img: U + "1585937421612-70a008356fbe" + Q },
    { id: "taameya", cat: "breakfast", name: "Taameya of Green Herbs", ar: "طعمية", price: 120, featured: true,
      desc: "Split fava and a fistful of dill, parsley and coriander, fried to order in a crust of sesame. Served with pickled turnip.",
      tags: ["Vegan"], img: U + "1601050690597-df0568f70950" + Q },
    { id: "shakshuka", cat: "breakfast", name: "Shakshuka Nile Bites", ar: "شكشوكة", price: 185, featured: true,
      desc: "Slow-cooked tomato, roasted red pepper and smoked paprika, two farm eggs baked in the cast iron, aged white cheese folded through.",
      tags: ["Chef's Pick", "Vegetarian"], img: U + "1590412200988-a436970781fa" + Q },
    { id: "eggs-basterma", cat: "breakfast", name: "Eggs & Basterma", ar: "بيض بالبسطرمة", price: 195,
      desc: "Air-cured beef under a blanket of fenugreek, crisped in ghee and set with two eggs. Plated in the pan it was cooked in.",
      tags: [], img: U + "1482049016688-2d3e1b311543" + Q },
    { id: "cheese-board", cat: "breakfast", name: "Old Cheese & Honey Board", ar: "جبنة قديمة وعسل", price: 210,
      desc: "Aged gebna qadima, mish, fresh domiati and clotted eshta with black honey, wild thyme honey and warm baladi bread.",
      tags: ["To Share", "Vegetarian"], img: U + "1452195100486-9cc805987862" + Q },
    { id: "black-honey", cat: "breakfast", name: "Black Honey & Tahini", ar: "عسل أسود بالطحينة", price: 95,
      desc: "Sugarcane molasses whipped tableside into stone-ground sesame tahini — the oldest sweet in the country.",
      tags: ["Vegan"], img: U + "1471943311424-646960669fbc" + Q },
    { id: "fresh-veg", cat: "breakfast", name: "Garden Mezze Plate", ar: "خضار طازة", price: 110,
      desc: "Vine tomato, cucumber, rocket, spring onion, radish and green chilli, dressed with lemon and Siwa salt.",
      tags: ["Vegan"], img: U + "1540420773420-3366772f4999" + Q },
    { id: "hawawshi", cat: "breakfast", name: "Hawawshi of Spiced Beef", ar: "حواوشي", price: 165,
      desc: "Baladi bread packed with minced beef, onion and hot pepper, then pressed against the oven wall until it blisters.",
      tags: [], img: U + "1565299507177-b0ac66763828" + Q },

    /* --- Fresh Bakery --- */
    { id: "croissant", cat: "bakery", name: "Butter Croissant", ar: "كرواسون", price: 75, featured: true,
      desc: "Seventy-two hours of cold fermentation and three folds of French butter. Baked hourly until we run out.",
      tags: ["Baked Hourly"], img: U + "1555507036-ab1f4038808a" + Q },
    { id: "pistachio-danish", cat: "bakery", name: "Pistachio & Orange Blossom Danish", ar: "دانش فستق", price: 95,
      desc: "Laminated dough, Aleppo pistachio frangipane and a whisper of orange blossom from the Delta.",
      tags: [], img: U + "1509440159596-0249088772ff" + Q },
    { id: "date-maamoul", cat: "bakery", name: "Date Maamoul", ar: "معمول بالتمر", price: 65,
      desc: "Semolina shortbread pressed in olive-wood moulds, filled with Siwa dates and dusted in icing sugar.",
      tags: ["Vegetarian"], img: U + "1558961363-fa8fdf82db35" + Q },
    { id: "petit-fours", cat: "bakery", name: "Petit Fours Assortment", ar: "بيتي فور", price: 320,
      desc: "A gold box of twelve — apricot, coconut, cocoa and pistachio. The Cairo bakery classic, made properly.",
      tags: ["Gift Box"], img: U + "1486427944299-d1955d23e34d" + Q },
    { id: "kahk", cat: "bakery", name: "Kahk el-Eid", ar: "كحك العيد", price: 240,
      desc: "Ghee-rich festival biscuits filled with agameya, walnut or malban. Made to my grandmother's ratio, never a gram off.",
      tags: ["Seasonal"], img: U + "1499636136210-6f4ee915583e" + Q },

    /* --- Feteer Meshaltet --- */
    { id: "feteer-plain", cat: "feteer", name: "Feteer Meshaltet", ar: "فطير مشلتت", price: 180, featured: true,
      desc: "Thirty hand-pulled layers, brushed with clarified butter and baked on stone until the top shatters. Honey and cream alongside.",
      tags: ["Signature", "Vegetarian"], img: U + "1590137876181-2a5a7e340308" + Q },
    { id: "feteer-cheese", cat: "feteer", name: "Feteer with Cheese & Basterma", ar: "فطير بالجبنة والبسطرمة", price: 260,
      desc: "The same layers, stuffed with rumi cheese, mozzarella and cured basterma, sealed and returned to the fire.",
      tags: [], img: U + "1513104890138-7c749659a591" + Q },
    { id: "feteer-sweet", cat: "feteer", name: "Sweet Feteer, Cream & Nuts", ar: "فطير حلو بالقشطة", price: 235,
      desc: "Finished with eshta, toasted almond, pistachio and a thread of wild honey. Cut at the table.",
      tags: ["To Share", "Vegetarian"], img: U + "1464349095431-e9a21285b5f3" + Q },
    { id: "feteer-mixed", cat: "feteer", name: "Feteer of the House, Mixed", ar: "فطير مشكل", price: 295,
      desc: "Half savoury, half sweet — for the table that cannot decide. Serves three.",
      tags: ["To Share"], img: U + "1509365465985-25d11c17e812" + Q },

    /* --- Fresh Bread --- */
    { id: "baladi", cat: "bread", name: "Baladi Bread", ar: "عيش بلدي", price: 25, featured: true,
      desc: "Wholemeal, bran-dusted and puffed in a 400°C wood oven. Baked every twenty minutes, all day.",
      tags: ["Vegan", "Baked Hourly"], img: U + "1509440159596-0249088772ff" + Q },
    { id: "shamsi", cat: "bread", name: "Aish Shamsi", ar: "عيش شمسي", price: 40,
      desc: "Upper Egyptian sun bread, proofed on wooden boards under daylight before it ever sees the fire.",
      tags: ["Vegan"], img: U + "1549931319-a545dcf3bc73" + Q },
    { id: "semit", cat: "bread", name: "Semit Ring", ar: "سميط", price: 35,
      desc: "Sesame-crusted ring, boiled then baked, crisp outside and soft within. Best with white cheese.",
      tags: ["Vegan"], img: U + "1608198093002-ad4e005484ec" + Q },
    { id: "bread-basket", cat: "bread", name: "The Baker's Basket", ar: "سلة الخبز", price: 90,
      desc: "Baladi, shamsi, semit and a warm feteer wedge, with olive oil, dukkah and salted butter.",
      tags: ["To Share"], img: U + "1586444248902-2f64eddc13df" + Q },

    /* --- Oriental Desserts --- */
    { id: "konafa", cat: "desserts", name: "Konafa with Cream & Mango", ar: "كنافة بالقشطة", price: 185, featured: true,
      desc: "Shredded pastry crisped in ghee over clotted eshta, finished with Ismailia mango and pistachio dust.",
      tags: ["Chef's Pick", "Vegetarian"], img: U + "1519676867240-f03562e64548" + Q },
    { id: "basbousa", cat: "desserts", name: "Basbousa, Coconut & Cream", ar: "بسبوسة", price: 130,
      desc: "Semolina cake soaked in lemon syrup the moment it leaves the oven, coconut and almond on top.",
      tags: ["Vegetarian"], img: U + "1464195244916-405fa0a82545" + Q },
    { id: "omali", cat: "desserts", name: "Om Ali", ar: "أم علي", price: 155,
      desc: "Torn feteer baked in cardamom milk with pistachio, raisin and hazelnut, gratinated under cream. Served bubbling.",
      tags: ["Signature", "Vegetarian"], img: U + "1551024506-0bccd828d307" + Q },
    { id: "baklava", cat: "desserts", name: "Pistachio Baklava", ar: "بقلاوة", price: 145,
      desc: "Forty sheets of filo, Aleppo pistachio and a light orange-blossom syrup poured cold onto hot pastry.",
      tags: ["Vegetarian"], img: U + "1519915028121-7d3463d20b13" + Q },
    { id: "rice-pudding", cat: "desserts", name: "Roz bel Laban", ar: "رز بلبن", price: 110,
      desc: "Short-grain rice cooked slowly in buffalo milk with mastic, chilled and torched to a caramel lid.",
      tags: ["Vegetarian"], img: U + "1488477181946-6428a0291777" + Q },
    { id: "balah", cat: "desserts", name: "Balah el-Sham", ar: "بلح الشام", price: 105,
      desc: "Ridged choux fried to order, drowned for exactly nine seconds in cold syrup. Eaten immediately.",
      tags: ["Vegetarian"], img: U + "1587314168485-3236d6710814" + Q },

    /* --- Middle Eastern Cuisine --- */
    { id: "mixed-grill", cat: "cuisine", name: "Charcoal Mixed Grill", ar: "مشاوي مشكلة", price: 480, featured: true,
      desc: "Kofta, lamb kebab and shish taouk over white charcoal, with grilled tomato, onion and tahini salad.",
      tags: ["To Share"], img: U + "1555939594-58d7cb561ad1" + Q },
    { id: "molokhia", cat: "cuisine", name: "Molokhia with Rabbit", ar: "ملوخية بالأرانب", price: 395,
      desc: "Hand-chopped jute leaf, garlic and coriander seared in ghee, poured at the table over rice and braised rabbit.",
      tags: ["Signature"], img: U + "1547592166-23ac45744acd" + Q },
    { id: "koshari", cat: "cuisine", name: "Koshari of the House", ar: "كشري", price: 165,
      desc: "Rice, lentils, macaroni and chickpeas, spiced tomato, cumin vinegar and a crown of onions fried twice.",
      tags: ["Vegan"], img: U + "1631515243349-e0cb75fb8d3a" + Q },
    { id: "stuffed-vine", cat: "cuisine", name: "Mahshi Warak Enab", ar: "محشي ورق عنب", price: 210,
      desc: "Vine leaves rolled thin as a pen, rice, herbs and lemon, pressed under a plate and cooked two hours.",
      tags: ["Vegan"], img: U + "1540189549336-e6e99c3679fe" + Q },
    { id: "fattah", cat: "cuisine", name: "Lamb Fattah", ar: "فتة لحم", price: 445,
      desc: "Toasted bread, garlic-vinegar tomato and rice under slow-braised lamb shank from the shoulder.",
      tags: ["Chef's Pick"], img: U + "1544025162-d76694265947" + Q },
    { id: "sayadeya", cat: "cuisine", name: "Alexandrian Sayadeya", ar: "صيادية", price: 420,
      desc: "Sea bass baked over caramelised onion rice with cumin, bay and a tahini-lemon sauce from the Corniche.",
      tags: [], img: U + "1519708227418-c8fd9a32b7a2" + Q },
    { id: "mezze", cat: "cuisine", name: "Grand Mezze Selection", ar: "مقبلات مشكلة", price: 320,
      desc: "Baba ghanoush, hummus beiruti, muhammara, tabbouleh, labneh and warm bread. Eight plates, one table.",
      tags: ["To Share", "Vegetarian"], img: U + "1512058564366-18510be2db19" + Q },

    /* --- Traditional Drinks --- */
    { id: "turkish-coffee", cat: "drinks", name: "Turkish Coffee", ar: "قهوة تركي", price: 65, featured: true,
      desc: "Ground to order and brought to the boil three times on hot sand. Sada, mazbout or ziyada.",
      tags: ["Vegan"], img: U + "1514432324607-a09d9b4aefdd" + Q },
    { id: "mint-tea", cat: "drinks", name: "Gilded Mint Tea", ar: "شاي بالنعناع", price: 45,
      desc: "Assam leaf and Nile-valley mint, poured from height into gilt-rimmed glasses.",
      tags: ["Vegan"], img: U + "1544787219-7f47ccb76574" + Q },
    { id: "karkadeh", cat: "drinks", name: "Karkadeh over Ice", ar: "كركديه", price: 55,
      desc: "Aswan hibiscus steeped cold for twelve hours — deep garnet, tart, barely sweetened.",
      tags: ["Vegan"], img: U + "1499638673689-79a0b5115d87" + Q },
    { id: "sahlab", cat: "drinks", name: "Sahlab with Pistachio", ar: "سحلب", price: 85,
      desc: "Warm orchid-root milk, cinnamon, coconut and crushed pistachio. Winter in a cup.",
      tags: ["Vegetarian"], img: U + "1517578239113-b03992dcdd25" + Q },
    { id: "sugarcane", cat: "drinks", name: "Fresh Sugarcane", ar: "عصير قصب", price: 50,
      desc: "Pressed to order on the brass mill by the window. Nothing added, nothing needed.",
      tags: ["Vegan"], img: U + "1600271886742-f049cd451bba" + Q },
    { id: "doum", cat: "drinks", name: "Doum & Lemon Cooler", ar: "دوم بالليمون", price: 60,
      desc: "Gingerbread-palm fruit infused overnight, lengthened with lemon and served over crushed ice.",
      tags: ["Vegan"], img: U + "1621263764928-df1444c5e859" + Q },

    /* --- Chef Specials --- */
    { id: "chef-tasting", cat: "chef", name: "The Pharaoh's Table", ar: "مائدة الفراعنة", price: 890, featured: true,
      desc: "Seven courses across the Egyptian day — breakfast to sweet — paired with house infusions. Minimum two guests.",
      tags: ["Tasting Menu", "Signature"], img: U + "1414235077428-338989a2e8c0" + Q },
    { id: "duck-fattah", cat: "chef", name: "Duck Fattah, Pomegranate", ar: "فتة بط", price: 520,
      desc: "Confit Delta duck, pomegranate molasses and toasted bread — Chef Hossam's answer to the Sunday table.",
      tags: ["Chef's Pick"], img: U + "1432139555190-58524dae6a55" + Q },
    { id: "quail", cat: "chef", name: "Charcoal Quail, Dukkah", ar: "سمان مشوي", price: 460,
      desc: "Two quail marinated in garlic and lime, grilled hard and fast, finished with hazelnut dukkah.",
      tags: [], img: U + "1467003909585-2f8a72700288" + Q },

    /* --- Kids Menu --- */
    { id: "kids-feteer", cat: "kids", name: "Little Feteer, Honey", ar: "فطير صغير", price: 95,
      desc: "A palm-sized feteer with honey and cream — the way every Egyptian child first meets it.",
      tags: ["Vegetarian"], img: U + "1509365465985-25d11c17e812" + Q },
    { id: "kids-kofta", cat: "kids", name: "Mini Kofta & Rice", ar: "كفتة صغيرة", price: 145,
      desc: "Two gently spiced beef skewers, buttered rice and cucumber salad.",
      tags: [], img: U + "1529042410759-befb1204b468" + Q },
    { id: "kids-pancake", cat: "kids", name: "Semolina Pancakes", ar: "بان كيك", price: 110,
      desc: "Three small pancakes with black honey, banana and a pot of cream to dip.",
      tags: ["Vegetarian"], img: U + "1567620905732-2d1ec7ab7445" + Q }
  ];

  /* Gallery ----------------------------------------------------------- */
  var GALLERY = [
    { cat: "Breakfast",  title: "The morning table",        img: U + "1533089860892-a7c6f0a88666" + QL },
    { cat: "Fresh Bread", title: "Baladi, straight off the stone", img: U + "1549931319-a545dcf3bc73" + QL },
    { cat: "Bakery",     title: "Croissants at 06:00",      img: U + "1555507036-ab1f4038808a" + QL },
    { cat: "Desserts",   title: "Konafa, cut to order",     img: U + "1519676867240-f03562e64548" + QL },
    { cat: "Kitchen",    title: "Service, second seating",  img: U + "1556910103-1c02745aae4d" + QL },
    { cat: "Interior",   title: "The gold room",            img: U + "1414235077428-338989a2e8c0" + QL },
    { cat: "Chef",       title: "Hands that know the dough", img: U + "1577219491135-ce391730fb2c" + QL },
    { cat: "Egyptian Meals", title: "Molokhia, poured at the table", img: U + "1547592166-23ac45744acd" + QL },
    { cat: "Bakery",     title: "The wood oven",            img: U + "1517433670267-08bbd4be890f" + QL },
    { cat: "Breakfast",  title: "Foul, olive oil, cumin",   img: U + "1585937421612-70a008356fbe" + QL },
    { cat: "Interior",   title: "Evening, room two",        img: U + "1552566626-52f8b828add9" + QL },
    { cat: "Desserts",   title: "Baklava, forty sheets",    img: U + "1519915028121-7d3463d20b13" + QL },
    { cat: "Fresh Bread", title: "Semit rings, sesame",     img: U + "1608198093002-ad4e005484ec" + QL },
    { cat: "Chef",       title: "Stretching the feteer",    img: U + "1556909212-d5b604d0c90d" + QL },
    { cat: "Kitchen",    title: "Charcoal, white heat",     img: U + "1555939594-58d7cb561ad1" + QL },
    { cat: "Egyptian Meals", title: "Koshari, the full build", img: U + "1631515243349-e0cb75fb8d3a" + QL },
    { cat: "Breakfast",  title: "Shakshuka in cast iron",   img: U + "1590412200988-a436970781fa" + QL },
    { cat: "Interior",   title: "Coffee and the courtyard", img: U + "1495474472287-4d71bcdd2085" + QL }
  ];

  /* Testimonials ------------------------------------------------------ */
  var REVIEWS = [
    { name: "Yasmine Farouk", role: "Cairo", stars: 5,
      text: "I have eaten foul my whole life and I have never had it like this. The bread arrives so hot you have to pass it between your hands. It tastes like my grandmother's kitchen, plated like a Paris dining room." },
    { name: "James Whitfield", role: "Food & Travel Quarterly", stars: 5,
      text: "The feteer alone justifies the journey. Thirty layers, pulled by hand in front of you, and a room that understands that luxury is warmth — not distance." },
    { name: "Nour El-Deeb", role: "Regular since opening", stars: 5,
      text: "We booked for six and stayed four hours. The Pharaoh's Table is the most complete account of Egyptian cooking I have been served anywhere, and the staff never once made us feel rushed." },
    { name: "Dina Mahfouz", role: "Alexandria", stars: 5,
      text: "The bakery counter is dangerous. I came for one croissant and left with a gold box of petit fours and a kilo of kahk. Everything still warm when I got home." },
    { name: "Omar Sabry", role: "Zamalek", stars: 5,
      text: "Om Ali served bubbling, konafa cut at the pass, karkadeh cold enough to hurt. The details are relentless. This is what an Egyptian fine-dining room should have looked like all along." },
    { name: "Claire Bennett", role: "London", stars: 5,
      text: "We were three tourists who wandered in for breakfast and returned twice in five days. Warm, generous, unhurried — and the coffee is genuinely the best I have had." }
  ];

  global.NB_DATA = { CATEGORIES: CATEGORIES, MENU: MENU, GALLERY: GALLERY, REVIEWS: REVIEWS };
})(window);
