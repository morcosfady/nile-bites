/* ==========================================================================
   PHARAOH'S BITES — Business configuration
   ONE place for every real-world detail. Every page reads from this object,
   so changing a phone number here changes it everywhere.

   Anything marked TODO is a placeholder and MUST be confirmed before launch.
   ========================================================================== */
(function (global) {
  "use strict";

  global.NB_CONFIG = {
    /* --- Identity --- */
    businessName: "Pharaoh's Bites",
    tagline: "Authentic Egyptian Feteer",
    taglineAr: "فطير مصري أصلي",

    /* --- Where --- */
    city: "Dallas, TX",
    region: "TX",
    country: "US",
    // TODO: confirm your real pickup/delivery zones.
    deliveryAreas: "Uptown, Deep Ellum, Plano, Frisco and Irving",
    // Cloud kitchen — no public street address. Pickup point is arranged per order.
    hasPublicAddress: false,

    /* --- Contact --- */
    // TODO: replace with the real WhatsApp Business number.
    // Digits only, country code first, no symbols.
    whatsappNumber: "12145550100",
    // TODO: same number, formatted for display.
    phoneDisplay: "+1 (214) 555-0100",
    phoneHref: "tel:+12145550100",
    email: "hello@pharaohsbites.com",

    /* --- When --- */
    // TODO: confirm real hours.
    hours: "Thu – Sun, 12:00 PM – 8:00 PM (CT)",
    // TODO: confirm real lead time for large/catering orders.
    cateringNotice: "at least 48 hours",

    /* --- Money --- */
    currency: "USD",
    currencySymbol: "$",
    // Percentages applied in the basket. Set to 0 to hide the line.
    servicePercent: 0,
    deliveryFee: 5,
    freeDeliveryOver: 60,
    minimumOrder: 20,

    /* --- Social — leave blank to disable the icon --- */
    instagramUrl: "",
    facebookUrl: "",

    /* --- Ordering backend ---------------------------------------------
       The basket posts the order here as JSON. While this is empty the
       checkout button stays disabled with an explanatory note, so the site
       never pretends to take an order it cannot actually receive.

       Any endpoint accepting a JSON POST works — your own API, a Google
       Apps Script web app, a Formspree/Basin form endpoint, a Zapier or
       Make webhook. See README for the exact payload shape.
    ------------------------------------------------------------------- */
    orderEndpoint: "",              // TODO: paste your endpoint URL
    // Fallback while no endpoint exists: hand the order to WhatsApp so a
    // customer is never left with a dead button.
    orderFallbackWhatsApp: true
  };
})(window);
