/* ==========================================================================
   NILE BITES — Interactions
   No dependencies. Every module is a no-op when its markup is absent, so the
   same bundle serves every page.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.NB_DATA || { CATEGORIES: [], MENU: [], GALLERY: [], REVIEWS: [] };
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var money = function (n) { return n.toLocaleString("en-US") + " EGP"; };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* --- Persistent store (favourites + basket) ------------------------- */
  var Store = {
    read: function (key, fallback) {
      try { return JSON.parse(localStorage.getItem("nb:" + key)) || fallback; }
      catch (e) { return fallback; }
    },
    write: function (key, value) {
      try { localStorage.setItem("nb:" + key, JSON.stringify(value)); } catch (e) {}
    }
  };
  var favourites = Store.read("favourites", []);
  var basket = Store.read("basket", {});

  /* --- Toasts --------------------------------------------------------- */
  var toastStack;
  function toast(message) {
    if (!toastStack) {
      toastStack = document.createElement("div");
      toastStack.className = "toast-stack";
      toastStack.setAttribute("role", "status");
      toastStack.setAttribute("aria-live", "polite");
      document.body.appendChild(toastStack);
    }
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = '<span class="toast__dot"></span><span>' + esc(message) + "</span>";
    toastStack.appendChild(el);
    setTimeout(function () {
      el.classList.add("is-out");
      setTimeout(function () { el.remove(); }, 380);
    }, 2800);
  }

  /* --- Header --------------------------------------------------------- */
  function initHeader() {
    var header = $(".site-header");
    var toggle = $(".nav-toggle");
    var nav = $("#primary-nav");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("is-open", !open);
        document.body.classList.toggle("nav-open", !open);
      });
      $$("a", nav).forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
          document.body.classList.remove("nav-open");
        });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) toggle.click();
      });
    }
  }

  /* --- Scroll progress + back to top ---------------------------------- */
  function initScrollChrome() {
    var bar = $(".scroll-progress");
    var top = $(".to-top");
    if (!bar && !top) return;

    var tick = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
      if (top) top.classList.toggle("is-visible", window.scrollY > 700);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    if (top) {
      top.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  /* --- Reveal on scroll ------------------------------------------------ */
  var revealObserver = null;
  function observeReveals(root) {
    var nodes = $$("[data-reveal]", root || document).filter(function (n) { return !n.__nbSeen; });
    if (!nodes.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.__nbSeen = true; n.classList.add("is-in"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    nodes.forEach(function (n) { n.__nbSeen = true; revealObserver.observe(n); });
  }

  /* Stagger children of [data-stagger] */
  function applyStagger(root) {
    $$("[data-stagger]", root || document).forEach(function (group) {
      if (group.__nbStaggered) return;
      group.__nbStaggered = true;
      var step = parseInt(group.getAttribute("data-stagger"), 10) || 90;
      $$("[data-reveal]", group).forEach(function (child, i) {
        child.style.setProperty("--reveal-delay", Math.min(i, 8) * step + "ms");
      });
    });
  }

  /* --- Images: lazy swap, fade-in, graceful fallback ------------------- */
  function hydrateImages(root) {
    $$("img", root || document).forEach(function (img) {
      if (img.__nbBound) return;
      /* Skip placeholders that have no source yet (e.g. the lightbox canvas) */
      if (!img.getAttribute("data-src") && !img.getAttribute("src")) return;
      img.__nbBound = true;

      var fail = function () {
        var media = img.closest(".media") || img.parentElement;
        if (media) media.classList.add("img-failed");
      };
      var done = function () { img.classList.add("is-loaded"); };

      img.addEventListener("error", fail);
      img.addEventListener("load", done);

      var src = img.getAttribute("data-src");
      if (src) { img.src = src; img.removeAttribute("data-src"); }
      if (img.complete) { img.naturalWidth ? done() : fail(); }
    });
  }

  /* --- Parallax -------------------------------------------------------- */
  function initParallax() {
    var layers = $$("[data-parallax]");
    if (!layers.length || reduceMotion) return;

    var ticking = false;
    var frame = function () {
      ticking = false;
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = "translate3d(0," + offset.toFixed(2) + "px,0)";
      });
    };
    var request = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    };
    frame();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  /* --- Counters -------------------------------------------------------- */
  function initCounters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(function (n) { n.textContent = n.getAttribute("data-count") + (n.getAttribute("data-suffix") || ""); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var start = performance.now();
        var run = function (now) {
          var p = Math.min((now - start) / 1600, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* --- Favourites ------------------------------------------------------ */
  function isFav(id) { return favourites.indexOf(id) > -1; }
  function toggleFav(id, name) {
    var i = favourites.indexOf(id);
    if (i > -1) { favourites.splice(i, 1); toast("Removed from favourites"); }
    else { favourites.push(id); toast(name + " saved to favourites"); }
    Store.write("favourites", favourites);
    syncFavButtons();
  }
  function syncFavButtons() {
    $$("[data-fav]").forEach(function (btn) {
      var on = isFav(btn.getAttribute("data-fav"));
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", (on ? "Remove " : "Save ") + btn.getAttribute("data-name") + (on ? " from" : " to") + " favourites");
    });
    var badge = $("[data-fav-count]");
    if (badge) badge.textContent = favourites.length ? String(favourites.length) : "";
  }

  /* --- Basket ---------------------------------------------------------- */
  function basketCount() {
    return Object.keys(basket).reduce(function (sum, id) { return sum + basket[id]; }, 0);
  }
  function addToBasket(id, name) {
    basket[id] = (basket[id] || 0) + 1;
    Store.write("basket", basket);
    toast(name + " added to your order");
    renderBasket();
    syncBasketBadge();
  }
  function setQty(id, qty) {
    if (qty <= 0) delete basket[id]; else basket[id] = qty;
    Store.write("basket", basket);
    renderBasket();
    syncBasketBadge();
  }
  function syncBasketBadge() {
    var n = basketCount();
    $$("[data-basket-count]").forEach(function (el) { el.textContent = n ? String(n) : "0"; });
  }

  var SVG_HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6S3.8 15.3 3.8 9.6a4.6 4.6 0 0 1 8.2-2.8 4.6 4.6 0 0 1 8.2 2.8c0 5.7-8.2 11-8.2 11z"/></svg>';
  var SVG_STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';

  /* --- Card + row templates -------------------------------------------- */
  function dishCard(item, opts) {
    opts = opts || {};
    var tag = item.tags && item.tags.length ? '<span class="tag">' + esc(item.tags[0]) + "</span>" : "";
    return '' +
      '<article class="card dish" data-reveal="scale">' +
        '<div class="media media--4x3">' + tag +
          '<img data-src="' + esc(item.img) + '" alt="' + esc(item.name) + ' — ' + esc(item.desc.slice(0, 70)) + '" loading="lazy" decoding="async" width="900" height="675">' +
        "</div>" +
        '<div class="dish__body">' +
          '<div class="dish__top">' +
            '<h3 class="dish__name">' + esc(item.name) + ' <span class="dish__ar" lang="ar" dir="rtl">' + esc(item.ar) + "</span></h3>" +
            '<span class="dish__price">' + money(item.price) + "</span>" +
          "</div>" +
          '<p class="dish__desc">' + esc(item.desc) + "</p>" +
          (opts.noActions ? "" :
          '<div class="dish__actions">' +
            '<button class="btn btn--sm" type="button" data-add="' + esc(item.id) + '" data-name="' + esc(item.name) + '">Order</button>' +
            '<button class="fav" type="button" data-fav="' + esc(item.id) + '" data-name="' + esc(item.name) + '" aria-pressed="false">' + SVG_HEART + "</button>" +
          "</div>") +
        "</div>" +
      "</article>";
  }

  function menuRow(item) {
    var pills = (item.tags || []).map(function (t) {
      var cls = /vegan|vegetarian/i.test(t) ? "pill pill--veg" : (/signature|chef|tasting/i.test(t) ? "pill pill--gold" : "pill");
      return '<span class="' + cls + '">' + esc(t) + "</span>";
    }).join("");
    return '' +
      '<div class="menu-row" data-reveal>' +
        '<div class="menu-row__top">' +
          '<span class="menu-row__name">' + esc(item.name) + "</span>" +
          '<span class="menu-row__dots" aria-hidden="true"></span>' +
          '<span class="menu-row__price">' + item.price + "</span>" +
        "</div>" +
        '<p class="menu-row__desc"><span lang="ar" dir="rtl" style="color:var(--gold);opacity:.7">' + esc(item.ar) + "</span> — " + esc(item.desc) + "</p>" +
        (pills ? '<div class="menu-row__meta">' + pills + "</div>" : "") +
      "</div>";
  }

  /* --- Featured dishes (home) ------------------------------------------ */
  function renderFeatured() {
    var host = $("[data-featured]");
    if (!host) return;
    var limit = parseInt(host.getAttribute("data-featured"), 10) || 6;
    host.innerHTML = D.MENU.filter(function (i) { return i.featured; }).slice(0, limit).map(function (i) { return dishCard(i); }).join("");
  }

  /* --- Full menu ------------------------------------------------------- */
  function renderMenu() {
    var host = $("[data-menu-groups]");
    if (!host) return;

    var filters = $("[data-menu-filters]");
    var search = $("#menu-search");
    var empty = $(".empty-state");

    host.innerHTML = D.CATEGORIES.map(function (cat) {
      var items = D.MENU.filter(function (i) { return i.cat === cat.id; });
      return '' +
        '<section class="menu-group" id="' + cat.id + '" data-group="' + cat.id + '">' +
          '<div class="menu-group__head" data-reveal>' +
            "<div><h2>" + esc(cat.name) + "</h2><p>" + esc(cat.blurb) + "</p></div>" +
            '<span class="menu-group__count"><span data-group-count>' + items.length + "</span> dishes</span>" +
          "</div>" +
          '<div class="menu-rows" data-stagger="60">' + items.map(menuRow).join("") + "</div>" +
        "</section>";
    }).join("");

    if (filters) {
      filters.innerHTML =
        '<button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>' +
        D.CATEGORIES.map(function (c) {
          return '<button class="chip" type="button" data-filter="' + c.id + '" aria-pressed="false">' + esc(c.name) + "</button>";
        }).join("");
    }

    var state = { cat: "all", q: "" };

    function apply() {
      var visibleTotal = 0;
      $$(".menu-group", host).forEach(function (group) {
        var catMatch = state.cat === "all" || group.getAttribute("data-group") === state.cat;
        var shown = 0;
        $$(".menu-row", group).forEach(function (row) {
          var text = row.textContent.toLowerCase();
          var hit = catMatch && (!state.q || text.indexOf(state.q) > -1);
          row.hidden = !hit;
          if (hit) shown++;
        });
        group.hidden = shown === 0;
        var counter = $("[data-group-count]", group);
        if (counter) counter.textContent = String(shown);
        visibleTotal += shown;
      });
      if (empty) empty.classList.toggle("is-visible", visibleTotal === 0);
    }

    if (filters) {
      filters.addEventListener("click", function (e) {
        var chip = e.target.closest("[data-filter]");
        if (!chip) return;
        state.cat = chip.getAttribute("data-filter");
        $$("[data-filter]", filters).forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        apply();
        if (state.cat !== "all") {
          var target = $("#" + state.cat);
          if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 130, behavior: reduceMotion ? "auto" : "smooth" });
        }
      });
    }
    if (search) {
      var t;
      search.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () { state.q = search.value.trim().toLowerCase(); apply(); }, 140);
      });
    }
    apply();
  }

  /* --- Order page ------------------------------------------------------ */
  function renderOrderList() {
    var host = $("[data-order-list]");
    if (!host) return;
    var filters = $("[data-order-filters]");

    host.innerHTML = D.MENU.map(function (item) {
      return '' +
        '<article class="order-item" data-cat="' + esc(item.cat) + '" data-reveal>' +
          '<div class="media media--1x1"><img data-src="' + esc(item.img) + '" alt="' + esc(item.name) + '" loading="lazy" decoding="async" width="200" height="200"></div>' +
          "<div><h3>" + esc(item.name) + ' <span class="dish__ar" lang="ar" dir="rtl">' + esc(item.ar) + "</span></h3><p>" + esc(item.desc.slice(0, 96)) + "…</p></div>" +
          '<div class="order-item__side">' +
            '<span class="order-item__price">' + money(item.price) + "</span>" +
            '<div class="flex gap-2 items-center">' +
              '<button class="fav" type="button" data-fav="' + esc(item.id) + '" data-name="' + esc(item.name) + '" aria-pressed="false">' + SVG_HEART + "</button>" +
              '<button class="btn btn--sm btn--gold" type="button" data-add="' + esc(item.id) + '" data-name="' + esc(item.name) + '">Add</button>' +
            "</div>" +
          "</div>" +
        "</article>";
    }).join("");

    if (filters) {
      filters.innerHTML =
        '<button class="chip" type="button" data-order-filter="all" aria-pressed="true">Everything</button>' +
        D.CATEGORIES.map(function (c) {
          return '<button class="chip" type="button" data-order-filter="' + c.id + '" aria-pressed="false">' + esc(c.name) + "</button>";
        }).join("");

      filters.addEventListener("click", function (e) {
        var chip = e.target.closest("[data-order-filter]");
        if (!chip) return;
        var cat = chip.getAttribute("data-order-filter");
        $$("[data-order-filter]", filters).forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        $$(".order-item", host).forEach(function (row) {
          row.hidden = cat !== "all" && row.getAttribute("data-cat") !== cat;
        });
      });
    }
  }

  function renderBasket() {
    var list = $("[data-basket-list]");
    if (!list) return;

    var ids = Object.keys(basket);
    var subtotal = 0;

    if (!ids.length) {
      list.innerHTML = '<p class="basket__empty">Your order is empty.<br>Add something warm.</p>';
    } else {
      list.innerHTML = ids.map(function (id) {
        var item = D.MENU.filter(function (m) { return m.id === id; })[0];
        if (!item) return "";
        var qty = basket[id];
        subtotal += item.price * qty;
        return '' +
          '<div class="basket-item">' +
            '<span class="basket-item__name">' + esc(item.name) + "</span>" +
            '<span class="basket-item__price">' + money(item.price * qty) + "</span>" +
            '<div class="qty">' +
              '<button type="button" data-qty="-1" data-id="' + esc(id) + '" aria-label="Reduce quantity of ' + esc(item.name) + '">&minus;</button>' +
              "<output>" + qty + "</output>" +
              '<button type="button" data-qty="1" data-id="' + esc(id) + '" aria-label="Increase quantity of ' + esc(item.name) + '">+</button>' +
              '<button type="button" class="remove" data-remove="' + esc(id) + '">Remove</button>' +
            "</div>" +
          "</div>";
      }).join("");
    }

    var mode = $("[data-mode][aria-pressed='true']");
    var delivery = mode && mode.getAttribute("data-mode") === "delivery" ? (subtotal > 0 ? 45 : 0) : 0;
    var service = Math.round(subtotal * 0.12);

    var set = function (sel, val) { var el = $(sel); if (el) el.textContent = money(val); };
    set("[data-subtotal]", subtotal);
    set("[data-service]", service);
    set("[data-delivery]", delivery);
    set("[data-total]", subtotal + service + delivery);

    var checkout = $("[data-checkout]");
    if (checkout) checkout.disabled = subtotal === 0;
  }

  function initOrderInteractions() {
    document.addEventListener("click", function (e) {
      var add = e.target.closest("[data-add]");
      if (add) { addToBasket(add.getAttribute("data-add"), add.getAttribute("data-name")); return; }

      var fav = e.target.closest("[data-fav]");
      if (fav) { toggleFav(fav.getAttribute("data-fav"), fav.getAttribute("data-name")); return; }

      var qty = e.target.closest("[data-qty]");
      if (qty) {
        var id = qty.getAttribute("data-id");
        setQty(id, (basket[id] || 0) + parseInt(qty.getAttribute("data-qty"), 10));
        return;
      }

      var rm = e.target.closest("[data-remove]");
      if (rm) { setQty(rm.getAttribute("data-remove"), 0); toast("Item removed"); return; }

      var mode = e.target.closest("[data-mode]");
      if (mode) {
        $$("[data-mode]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === mode)); });
        renderBasket();
        return;
      }

      var checkout = e.target.closest("[data-checkout]");
      if (checkout) {
        toast("Order sent to the kitchen — we will call to confirm.");
        basket = {};
        Store.write("basket", basket);
        renderBasket();
        syncBasketBadge();
      }
    });
  }

  /* --- Gallery + lightbox ---------------------------------------------- */
  function renderGallery() {
    var host = $("[data-gallery]");
    if (!host) return;
    var limit = parseInt(host.getAttribute("data-gallery"), 10) || D.GALLERY.length;
    var items = D.GALLERY.slice(0, limit);

    host.innerHTML = items.map(function (g, i) {
      return '' +
        '<button class="masonry__item" type="button" data-lb="' + i + '" data-cat="' + esc(g.cat) + '" data-reveal="scale">' +
          '<span class="media" style="display:block">' +
            '<img data-src="' + esc(g.img) + '" alt="' + esc(g.title) + " — " + esc(g.cat) + '" loading="lazy" decoding="async">' +
          "</span>" +
          '<span class="masonry__cap"><small>' + esc(g.cat) + "</small><b>" + esc(g.title) + "</b></span>" +
        "</button>";
    }).join("");

    var filters = $("[data-gallery-filters]");
    if (filters) {
      var cats = [];
      items.forEach(function (g) { if (cats.indexOf(g.cat) === -1) cats.push(g.cat); });
      filters.innerHTML =
        '<button class="chip" type="button" data-gal-filter="all" aria-pressed="true">All</button>' +
        cats.map(function (c) { return '<button class="chip" type="button" data-gal-filter="' + esc(c) + '">' + esc(c) + "</button>"; }).join("");
      filters.addEventListener("click", function (e) {
        var chip = e.target.closest("[data-gal-filter]");
        if (!chip) return;
        var cat = chip.getAttribute("data-gal-filter");
        $$("[data-gal-filter]", filters).forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        $$(".masonry__item", host).forEach(function (fig) {
          fig.hidden = cat !== "all" && fig.getAttribute("data-cat") !== cat;
        });
      });
    }

    initLightbox(items, host);
  }

  function initLightbox(items, host) {
    var box = $(".lightbox");
    if (!box) return;
    var img = $("[data-lb-img]", box);
    var cap = $("[data-lb-title]", box);
    var sub = $("[data-lb-cat]", box);
    var index = 0;
    var lastFocus = null;

    function show(i) {
      var visible = $$(".masonry__item", host).filter(function (n) { return !n.hidden; });
      var order = visible.map(function (n) { return parseInt(n.getAttribute("data-lb"), 10); });
      if (!order.length) return;
      var pos = order.indexOf(i);
      if (pos === -1) { i = order[0]; }
      index = i;
      var g = items[index];
      img.src = g.img;
      img.alt = g.title;
      cap.textContent = g.title;
      sub.textContent = g.cat;
    }
    function step(dir) {
      var visible = $$(".masonry__item", host).filter(function (n) { return !n.hidden; });
      var order = visible.map(function (n) { return parseInt(n.getAttribute("data-lb"), 10); });
      var pos = order.indexOf(index);
      show(order[(pos + dir + order.length) % order.length]);
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-open");
      $(".lb-close", box).focus();
    }
    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.classList.remove("nav-open");
      if (lastFocus) lastFocus.focus();
    }

    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lb]");
      if (btn) open(parseInt(btn.getAttribute("data-lb"), 10));
    });
    $(".lb-close", box).addEventListener("click", close);
    $(".lb-prev", box).addEventListener("click", function () { step(-1); });
    $(".lb-next", box).addEventListener("click", function () { step(1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* --- Reviews --------------------------------------------------------- */
  function renderReviews() {
    var host = $("[data-reviews]");
    if (!host) return;
    var limit = parseInt(host.getAttribute("data-reviews"), 10) || D.REVIEWS.length;
    host.innerHTML = D.REVIEWS.slice(0, limit).map(function (r) {
      return '' +
        '<article class="card quote" data-reveal>' +
          '<div class="stars" role="img" aria-label="' + r.stars + ' out of 5 stars">' + new Array(r.stars + 1).join(SVG_STAR) + "</div>" +
          "<p>" + esc(r.text) + "</p>" +
          '<footer><span class="avatar" aria-hidden="true">' + esc(r.name.charAt(0)) + "</span><span><cite>" + esc(r.name) + "</cite><small>" + esc(r.role) + "</small></span></footer>" +
        "</article>";
    }).join("");
  }

  /* --- Opening hours: highlight today ---------------------------------- */
  function initHours() {
    var list = $("[data-hours]");
    if (!list) return;
    var today = new Date().getDay();
    $$("li", list).forEach(function (li) {
      var days = (li.getAttribute("data-day") || "").split(",").map(Number);
      if (days.indexOf(today) > -1) {
        li.classList.add("is-today");
        var b = $("b", li);
        if (b && !$(".today-flag", li)) {
          var flag = document.createElement("span");
          flag.className = "today-flag";
          flag.style.cssText = "font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;margin-left:.5rem;opacity:.75";
          flag.textContent = "Today";
          b.appendChild(flag);
        }
      }
    });
  }

  /* --- Forms ----------------------------------------------------------- */
  function initForms() {
    $$("form[data-validate]").forEach(function (form) {
      var status = $(".form-status", form);

      var setError = function (field, message) {
        var slot = $(".error-text", field.closest(".field") || form);
        field.setAttribute("aria-invalid", message ? "true" : "false");
        if (slot) slot.textContent = message || "";
        return !message;
      };

      var validate = function (field) {
        var value = (field.value || "").trim();
        var label = field.getAttribute("data-label") || field.name || "This field";

        if (field.required && !value) return setError(field, label + " is required.");
        if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) return setError(field, "Enter a valid email address.");
        if (field.type === "tel" && value && !/^[+\d][\d\s()-]{6,}$/.test(value)) return setError(field, "Enter a valid phone number.");
        if (field.type === "date" && value) {
          var picked = new Date(value + "T00:00:00");
          var today = new Date(); today.setHours(0, 0, 0, 0);
          if (picked < today) return setError(field, "Please choose a date from today onwards.");
        }
        return setError(field, "");
      };

      $$("input, select, textarea", form).forEach(function (field) {
        field.addEventListener("blur", function () { validate(field); });
        field.addEventListener("input", function () {
          if (field.getAttribute("aria-invalid") === "true") validate(field);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fields = $$("input, select, textarea", form).filter(function (f) { return f.type !== "hidden" && f.type !== "radio"; });
        var ok = fields.map(validate).every(Boolean);

        if (!ok) {
          var firstBad = fields.filter(function (f) { return f.getAttribute("aria-invalid") === "true"; })[0];
          if (firstBad) firstBad.focus();
          if (status) {
            status.textContent = "Please review the highlighted fields.";
            status.classList.add("is-visible");
          }
          return;
        }

        if (status) {
          status.textContent = form.getAttribute("data-success") || "Thank you — we have received your message.";
          status.classList.add("is-visible");
        }
        toast(form.getAttribute("data-toast") || "Sent successfully");
        form.reset();
        $$("[aria-invalid]", form).forEach(function (f) { f.setAttribute("aria-invalid", "false"); });
        $$(".error-text", form).forEach(function (s) { s.textContent = ""; });
      });
    });

    /* Reservation date floor = today */
    $$("input[type='date'][data-min-today]").forEach(function (input) {
      input.min = new Date().toISOString().split("T")[0];
    });
  }

  /* --- Boot ------------------------------------------------------------ */
  function boot() {
    initHeader();
    initScrollChrome();

    renderFeatured();
    renderMenu();
    renderOrderList();
    renderGallery();
    renderReviews();
    renderBasket();

    initOrderInteractions();
    initHours();
    initForms();
    initParallax();
    initCounters();

    syncFavButtons();
    syncBasketBadge();

    applyStagger();
    hydrateImages();
    observeReveals();

    /* Newsletter (footer, every page) */
    $$("[data-newsletter]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = $("input", form);
        if (!input.value.trim() || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(input.value.trim())) {
          input.focus();
          toast("Please enter a valid email address");
          return;
        }
        toast("Welcome to the table — check your inbox.");
        form.reset();
      });
    });

    /* Year stamp */
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
