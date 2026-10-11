/* ==========================================================================
   starfield.js — fixed full-page starfield (Canvas 2D)
   Twinkling stars on three depth layers with a very slow drift and a light
   scroll parallax. Pauses when the tab is hidden; renders a single static
   frame when the visitor prefers reduced motion.
   ========================================================================== */
(function (global) {
  'use strict';

  function create(canvas, opts) {
    var o = Object.assign({ density: 0.00022, color: '255,255,255', maxDpr: 2 }, opts || {});
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stars = [], w = 0, h = 0, raf = null, scroll = 0;

    function seed() {
      var n = Math.round(w * h * o.density);
      stars = [];
      for (var i = 0; i < n; i++) {
        var layer = Math.random();
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + Math.random() * (layer > 0.92 ? 1.3 : 0.7),
          a: 0.15 + Math.random() * 0.6,
          ph: Math.random() * Math.PI * 2,
          sp: 0.4 + Math.random() * 1.6,
          layer: layer,
          vy: (0.4 + layer) * 0.9
        });
      }
    }

    function resize() {
      var dpr = Math.min(global.devicePixelRatio || 1, o.maxDpr);
      w = global.innerWidth; h = global.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(global.performance.now());
    }

    function draw(now) {
      var t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgb(' + o.color + ')';
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var tw = reduced ? 1 : 0.65 + 0.35 * Math.sin(t * s.sp + s.ph);
        var y = s.y + (reduced ? 0 : t * s.vy) - scroll * s.layer * 0.08;
        y = ((y % h) + h) % h;
        ctx.globalAlpha = s.a * tw;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick(now) { raf = null; draw(now); if (!global.document.hidden && !reduced) raf = global.requestAnimationFrame(tick); }
    function start() { if (raf === null && !reduced) raf = global.requestAnimationFrame(tick); }
    function stop() { if (raf !== null) { global.cancelAnimationFrame(raf); raf = null; } }

    var resizeTimer = null;
    global.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 120); });
    global.addEventListener('scroll', function () { scroll = global.scrollY || 0; }, { passive: true });
    global.document.addEventListener('visibilitychange', function () { if (global.document.hidden) stop(); else start(); });

    resize();
    start();
    return { destroy: stop };
  }

  global.Starfield = { create: create };
})(window);
