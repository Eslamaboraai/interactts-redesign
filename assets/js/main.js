/* Interact TS — interactions (vanilla, no dependencies) */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Sticky header shadow + scroll progress ---- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".scroll-progress");
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open && window.innerWidth <= 1100 ? "hidden" : "";
    });
    // Mobile dropdown accordions
    menu.querySelectorAll(".has-dropdown > .nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 1100) {
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });
    // Close menu on link click (mobile)
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (a.parentElement.classList.contains("has-dropdown")) return;
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* ---- Scroll reveal ---- */
  var reveal = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    reveal.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveal.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animated counters ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var dur = 1600, start = null;
    if (reduce) { el.textContent = target.toLocaleString(); return; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---- Form validation (progressive enhancement) ---- */
  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    var success = form.querySelector(".form-success");
    function validateField(field) {
      var input = field.querySelector("input, textarea, select");
      if (!input) return true;
      var ok = input.checkValidity() && input.value.trim() !== "" || !input.required;
      if (input.type === "email" && input.value) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
      field.classList.toggle("invalid", !ok);
      return ok;
    }
    form.querySelectorAll(".field").forEach(function (field) {
      var input = field.querySelector("input, textarea, select");
      if (input) input.addEventListener("blur", function () { validateField(field); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allOk = true, firstBad = null;
      form.querySelectorAll(".field").forEach(function (field) {
        if (!validateField(field)) { allOk = false; if (!firstBad) firstBad = field; }
      });
      if (!allOk) { if (firstBad) firstBad.querySelector("input, textarea, select").focus(); return; }
      if (success) { success.style.display = "block"; success.setAttribute("role", "status"); }
      form.reset();
      form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("invalid"); });
      if (success) success.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    });
  });

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
