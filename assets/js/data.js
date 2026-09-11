/* ==========================================================================
   PHARAOH'S BITES — Content data
   Single source of truth for the menu, gallery and reviews.

   MENU ITEM FIELDS
     id       unique slug, used by the basket and favourites
     cat      must match a CATEGORIES id below: mains | desserts | sides
     name     English name shown on the card
     ar       Arabic name, shown beside it
     price    plain number, formatted by money() using NB_CONFIG.currency
     special  true  -> the pharaoh mark is shown beside the item
     desc     one or two sentences
     tags     rendered as pills; vegan/vegetarian turn green, special turns gold
     img      PLACEHOLDER photography. Swap these for the real photos.
   ========================================================================== */
(function (global) {
  "use strict";

  var U = "https://images.unsplash.com/photo-";
  var Q = "?auto=format&fit=crop&w=900&q=80";
  var QL = "?auto=format&fit=crop&w=1600&q=82";

  /* Categories -------------------------------------------------------- */
  var CATEGORIES = [
    { id: "mains",    name: "The Main Table", blurb: "Feteer stretched by hand, and the baked trays an Egyptian table is built around. Everything here is made to order." },
    { id: "soups",    name: "Soups",          blurb: "Simmered slowly and sent out hot in a sealed container." },
    { id: "desserts", name: "Sweet",          blurb: "Syrup, nuts, cream and chocolate. Cut to order and boxed while still warm." },
    { id: "sides",    name: "On the Side",    blurb: "What Egyptians actually put next to feteer — cheese, honey and tahini, nothing more complicated than that." },
    { id: "drinks",   name: "Drinks",         blurb: "Made to order and sealed for the journey." }
  ];

  /* Menu -------------------------------------------------------------- */
  var MENU = [

    /* ---------------- THE MAIN TABLE ---------------- */
    { id: "feteer-meshaltet", cat: "mains", name: "Feteer Meshaltet", ar: "فطير مشلتت",
      price: 14, special: true, featured: true,
      desc: "The original. Paper-thin dough stretched by hand, folded again and again with ghee between every layer, then baked until the top shatters.",
      tags: ["House Special", "Vegetarian"], img: U + "1590137876181-2a5a7e340308" + Q },

    { id: "feteer-beef", cat: "mains", name: "Feteer with Plant-Based Beef & Mozzarella", ar: "فطير محشي لحمة",
      price: 18, special: true, featured: true,
      desc: "The same hand-stretched layers, stuffed with seasoned plant-based ground beef and melted mozzarella, sealed and returned to the oven.",
      tags: ["House Special", "Plant-Based"], img: U + "1513104890138-7c749659a591" + Q },

    { id: "macarona-bechamel", cat: "mains", name: "Macarona Béchamel Tray", ar: "صينية مكرونة بشاميل",
      price: 16, featured: true,
      desc: "Penne baked under a thick blanket of béchamel with plant-based ground beef through the middle, browned on top and cut into squares.",
      tags: ["Plant-Based", "Tray"], img: U + "1551183053-bf91a1d81141" + Q },

    { id: "goulash-beef", cat: "mains", name: "Goulash Tray with Plant-Based Beef", ar: "صينية جلاش باللحمة",
      price: 16,
      desc: "Sheet after sheet of thin pastry layered with spiced plant-based ground beef and onion, brushed with ghee and baked golden.",
      tags: ["Plant-Based", "Tray"], img: U + "1565299507177-b0ac66763828" + Q },

    { id: "crepe-beef", cat: "mains", name: "Crepe with Ground Beef & Mozzarella", ar: "كريب باللحمة والموتزاريلا",
      price: 13,
      desc: "A soft crepe rolled around seasoned ground beef and mozzarella, griddled until the cheese pulls.",
      tags: [], img: U + "1626700051175-6818013e1d4f" + Q },

    { id: "kofta-tray", cat: "mains", name: "Plant-Based Kofta Tray with Salsa & Rice", ar: "صينية كفتة بالصلصة والأرز",
      price: 35,
      desc: "Hand-shaped plant-based kofta baked in a rich tomato salsa with onion and garlic, served over a bed of Egyptian rice. Feeds a table.",
      tags: ["Plant-Based", "Tray"], img: U + "1529042410759-befb1204b468" + Q },

    { id: "meatballs-spaghetti", cat: "mains", name: "Plant-Based Meatballs & Spaghetti", ar: "كرات لحم نباتية بالمكرونة",
      price: 25,
      desc: "Plant-based meatballs simmered in tomato sauce and tossed through spaghetti, finished with a little parmesan.",
      tags: ["Plant-Based"], img: U + "1622973536968-3ead9e780960" + Q },

    /* ---------------- SOUPS ---------------- */
    { id: "lentil-soup", cat: "soups", name: "Lentil Soup", ar: "شوربة عدس",
      price: 7,
      desc: "Red lentils cooked down with onion, carrot and cumin until smooth, finished with lemon. Comes with bread on the side.",
      tags: ["Vegan"], img: U + "1547592166-23ac45744acd" + Q },

    /* ---------------- SWEET ---------------- */
    { id: "goulash-nuts", cat: "desserts", name: "Goulash Tray with Nuts", ar: "صينية جلاش بالمكسرات",
      price: 15, special: true, featured: true,
      desc: "Layered pastry packed with walnut, almond and pistachio, baked crisp and soaked in syrup the moment it leaves the oven.",
      tags: ["House Special", "Contains Nuts"], img: U + "1519915028121-7d3463d20b13" + Q },

    { id: "mini-feteer-sweet", cat: "desserts", name: "Mini Feteer, Nutella or Pistachio", ar: "فطير صغير حلو",
      price: 11, featured: true,
      desc: "A palm-sized feteer with all its layers intact, finished with Nutella or pistachio sauce. Choose when you order.",
      tags: ["Vegetarian"], img: U + "1509365465985-25d11c17e812" + Q },

    { id: "crepe-nutella", cat: "desserts", name: "Crepe with Nutella", ar: "كريب بالنوتيلا",
      price: 9,
      desc: "Warm crepe folded over Nutella until it melts through.",
      tags: ["Vegetarian"], img: U + "1587314168485-3236d6710814" + Q },

    { id: "crepe-pistachio", cat: "desserts", name: "Crepe with Pistachio Sauce", ar: "كريب بالفستق",
      price: 10,
      desc: "The same warm crepe with a thick pistachio cream, dusted with crushed pistachio.",
      tags: ["Vegetarian", "Contains Nuts"], img: U + "1567620905732-2d1ec7ab7445" + Q },

    { id: "round-cake", cat: "desserts", name: "Small Round Cake", ar: "كيكة صغيرة",
      price: 12,
      desc: "A small home-style cake, baked fresh and iced simply. Ask what today's is.",
      tags: ["Vegetarian"], img: U + "1578985545062-69928b1d9587" + Q },

    { id: "chocolate-pudding", cat: "desserts", name: "Chocolate Pudding", ar: "بودينج شوكولاتة",
      price: 7,
      desc: "Set dark chocolate pudding, chilled, with cream folded through the top.",
      tags: ["Vegetarian"], img: U + "1541783245831-57d6fb0926d3" + Q },

    { id: "banana-pudding", cat: "desserts", name: "Banana Pudding", ar: "بودينج موز",
      price: 7,
      desc: "Layers of vanilla cream, banana and biscuit, left to soften overnight.",
      tags: ["Vegetarian"], img: U + "1563805042-7684c019e1cb" + Q },

    { id: "creme-caramel", cat: "desserts", name: "Crème Caramel Flan", ar: "كريم كراميل",
      price: 8,
      desc: "Baked custard turned out under its own caramel. Cold, wobbling, and gone in a minute.",
      tags: ["Vegetarian"], img: U + "1488477181946-6428a0291777" + Q },

    /* ---------------- ON THE SIDE ---------------- */
    { id: "white-cheese", cat: "sides", name: "Egyptian White Cheese", ar: "جبنة بيضاء",
      price: 6, special: true, featured: true,
      desc: "Salty, crumbling domiati — the thing every Egyptian reaches for the moment the feteer is torn open.",
      tags: ["House Special", "Vegetarian"], img: U + "1452195100486-9cc805987862" + Q },

    { id: "black-honey", cat: "sides", name: "Black Honey", ar: "عسل أسود",
      price: 5,
      desc: "Sugarcane molasses, dark and mineral. The oldest sweet in the country, and the right partner for plain feteer.",
      tags: ["Vegan"], img: U + "1471943311424-646960669fbc" + Q },

    { id: "white-honey", cat: "sides", name: "White Honey", ar: "عسل أبيض",
      price: 5,
      desc: "Clear wildflower honey, poured cold over hot layers so it runs straight through.",
      tags: ["Vegetarian"], img: U + "1558642452-9d2a7deb7f62" + Q },

    { id: "tahini", cat: "sides", name: "Tahini", ar: "طحينة",
      price: 5,
      desc: "Stone-ground sesame, loosened with lemon. Best stirred into the black honey until the two go pale.",
      tags: ["Vegan"], img: U + "1590301157890-4810ed352733" + Q },

    /* ---------------- DRINKS ---------------- */
    { id: "protein-shake", cat: "drinks", name: "House Special Protein Shake", ar: "مشروب البروتين",
      price: 9, special: true, featured: true,
      desc: "Twenty-five grams of protein, blended thick and cold. Our own recipe — nothing about it tastes like a supplement.",
      tags: ["House Special", "25g Protein"], img: U + "1615478503562-ec2d8aa0e24e" + Q }
  ];

  /* Gallery ----------------------------------------------------------- */
  var GALLERY = [
    { cat: "Feteer",  title: "Layers, pulled apart hot",        img: U + "1590137876181-2a5a7e340308" + QL },
    { cat: "Kitchen", title: "Stretching the dough",            img: U + "1556909212-d5b604d0c90d" + QL },
    { cat: "Sweet",   title: "Goulash with nuts",               img: U + "1519915028121-7d3463d20b13" + QL },
    { cat: "Sweet",   title: "Crepes, folded warm",             img: U + "1587314168485-3236d6710814" + QL },
    { cat: "Trays",   title: "Macarona béchamel",               img: U + "1551183053-bf91a1d81141" + QL },
    { cat: "Kitchen", title: "Hands that know the dough",       img: U + "1577219491135-ce391730fb2c" + QL },
    { cat: "Kitchen", title: "Out of the oven",                 img: U + "1517433670267-08bbd4be890f" + QL },
    { cat: "Sides",   title: "White cheese and honey",          img: U + "1452195100486-9cc805987862" + QL },
    { cat: "Sweet",   title: "Something cold to finish",        img: U + "1488477181946-6428a0291777" + QL },
    { cat: "Feteer",  title: "Golden, straight from the stone", img: U + "1509440159596-0249088772ff" + QL },
    { cat: "Sides",   title: "Honey, poured cold",              img: U + "1558642452-9d2a7deb7f62" + QL },
    { cat: "Trays",   title: "Cut into squares",                img: U + "1565299507177-b0ac66763828" + QL }
  ];

  /* PLACEHOLDER reviews - invented, not real customers. Replace before launch. */
  var REVIEWS = [
    { name: "Yasmine F.", role: "Plano", stars: 5,
      text: "I have eaten feteer my whole life and I was not expecting this in Texas. It arrived still hot enough that the ghee ran when we pulled it apart. My mother asked who made it." },
    { name: "Mark Whitfield", role: "Uptown", stars: 5,
      text: "Ordered the béchamel tray for a Sunday lunch and there was nothing left twenty minutes later. It travels well and reheats even better." },
    { name: "Nour El-Deeb", role: "Ordered for a church event", stars: 5,
      text: "Forty people, half sweet and half savoury, and they walked me through the whole spread beforehand. Everything turned up on time and warm. I have already ordered again." },
    { name: "Dina M.", role: "Frisco", stars: 5,
      text: "The goulash with nuts is dangerous. I ordered one tray to try and put in a second order before we had finished the first." },
    { name: "Omar Sabry", role: "Deep Ellum", stars: 5,
      text: "Proper ghee, proper layers, none of the shortcuts. First time since I moved here that feteer has tasted like home rather than an imitation of it." },
    { name: "Claire Bennett", role: "Irving", stars: 5,
      text: "Easy to order, they confirmed everything on WhatsApp, and it arrived exactly when they said. The reheating notes in the box were a nice touch." }
  ];

  global.NB_DATA = { CATEGORIES: CATEGORIES, MENU: MENU, GALLERY: GALLERY, REVIEWS: REVIEWS };
})(window);
