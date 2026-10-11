/* ==========================================================================
   mockups.js — deterministic SVG "product shot" generator
   Each project renders as a stylised application window (dashboard, chat,
   table, map, grid, graph or console) tinted with the project's hue.
   Replace any of them with a real screenshot by setting `image` on the
   project entry in assets/js/data.*.js.
   ========================================================================== */
(function (global) {
  'use strict';

  var LINE = 'rgba(255,255,255,.09)', LINE2 = 'rgba(255,255,255,.18)', TXT = 'rgba(255,255,255,.26)', PANEL = 'rgba(255,255,255,.03)';

  function rng(seed) {
    var a = 2166136261;
    for (var i = 0; i < seed.length; i++) { a ^= seed.charCodeAt(i); a = Math.imul(a, 16777619); }
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function rect(x, y, w, h, fill, rx, extra) {
    return '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="' + (rx || 0) + '" fill="' + fill + '"' + (extra || '') + '/>';
  }
  function circle(cx, cy, r, fill, extra) { return '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r + '" fill="' + fill + '"' + (extra || '') + '/>'; }
  function panel(x, y, w, h, rx) { return rect(x, y, w, h, PANEL, rx || 10, ' stroke="' + LINE + '"'); }

  function sidebar(A, acc, r) {
    var s = rect(0, 35, 120, 365, '#0a0c13') + rect(120, 35, 1, 365, LINE);
    s += rect(16, 52, 56, 10, LINE2, 5);
    for (var i = 0; i < 7; i++) {
      var y = 84 + i * 28, active = i === 1;
      if (active) s += rect(8, y - 7, 104, 24, A(.14), 7);
      s += circle(20, y + 5, 3, active ? acc : LINE2) + rect(30, y + 1, 40 + r() * 36, 8, active ? 'rgba(255,255,255,.7)' : LINE2, 4);
    }
    s += rect(8, 330, 104, 44, PANEL, 8, ' stroke="' + LINE + '"') + circle(22, 352, 9, A(.35)) + rect(38, 346, 50, 6, LINE2, 3) + rect(38, 356, 34, 5, TXT, 3);
    return s;
  }

  var TYPES = {
    dashboard: function (A, acc, r) {
      var s = '', i, x, y;
      for (i = 0; i < 3; i++) {
        x = 136 + i * 140; y = 50;
        s += panel(x, y, 128, 68) + rect(x + 14, y + 14, 46, 6, TXT, 3) + rect(x + 14, y + 30, 52 + r() * 36, 13, i === 0 ? acc : 'rgba(255,255,255,.55)', 4);
        var pts = '';
        for (var k = 0; k < 8; k++) pts += (x + 72 + k * 6) + ',' + (y + 56 - r() * 16) + ' ';
        s += '<polyline points="' + pts + '" fill="none" stroke="' + A(.7) + '" stroke-width="1.5"/>';
      }
      s += panel(136, 132, 408, 150) + rect(150, 146, 70, 7, LINE2, 3);
      for (i = 0; i < 16; i++) {
        var hgt = 18 + r() * 92; x = 152 + i * 24.5;
        s += rect(x, 264 - hgt, 14, hgt, i === 12 ? acc : A(.32), 3);
      }
      var lp = '';
      for (i = 0; i < 15; i++) lp += (152 + i * 27) + ',' + (250 - r() * 80) + ' ';
      s += '<polyline points="' + lp + '" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>';
      for (i = 0; i < 3; i++) {
        y = 296 + i * 24;
        s += rect(136, y, 408, 16, PANEL, 4) + circle(150, y + 8, 4, i === 0 ? acc : LINE2) + rect(164, y + 5, 90 + r() * 60, 6, LINE2, 3) + rect(470, y + 5, 60, 6, TXT, 3);
      }
      return s;
    },

    chat: function (A, acc, r) {
      var s = '', y = 54;
      for (var i = 0; i < 6; i++) {
        var right = i % 2 === 1, w = 150 + r() * 150, two = r() < .5, h = two ? 44 : 30, x = right ? 544 - w : 136;
        s += rect(x, y, w, h, right ? A(.22) : 'rgba(255,255,255,.05)', 12, right ? ' stroke="' + A(.5) + '"' : ' stroke="' + LINE + '"');
        s += rect(x + 12, y + 11, w - 24 - r() * 30, 7, right ? 'rgba(255,255,255,.75)' : LINE2, 3);
        if (two) s += rect(x + 12, y + 25, (w - 24) * .6, 7, right ? 'rgba(255,255,255,.55)' : TXT, 3);
        y += h + 12;
      }
      s += rect(136, 330, 408, 34, 'rgba(255,255,255,.04)', 17, ' stroke="' + LINE2 + '"') + rect(152, 344, 120, 6, TXT, 3) + circle(527, 347, 12, acc)
        + '<path d="M522 347h9m-3-4 4 4-4 4" fill="none" stroke="#04101a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
      return s;
    },

    table: function (A, acc, r) {
      var s = panel(136, 50, 408, 316), cols = [150, 258, 356, 452];
      s += rect(136, 50, 408, 28, 'rgba(255,255,255,.05)', 10);
      cols.forEach(function (x) { s += rect(x, 61, 44, 6, TXT, 3); });
      for (var i = 0; i < 9; i++) {
        var y = 88 + i * 30, k = r();
        s += rect(136, y + 28, 408, 1, LINE);
        s += rect(150, y + 8, 60 + r() * 40, 8, 'rgba(255,255,255,.45)', 4) + rect(258, y + 8, 56, 8, TXT, 4) + rect(356, y + 8, 44, 8, TXT, 4);
        var pill = k < .6 ? ['rgba(52,211,153,.18)', '#34d399'] : (k < .85 ? [A(.25), acc] : ['rgba(255,99,99,.18)', '#ff6363']);
        s += rect(452, y + 5, 58, 16, pill[0], 8) + circle(462, y + 13, 3, pill[1]) + rect(470, y + 10, 30, 5, pill[1], 2);
      }
      return s;
    },

    map: function (A, acc, r) {
      var s = '', i;
      s += '<clipPath id="mapclip"><rect x="121" y="35" width="439" height="365"/></clipPath><g clip-path="url(#mapclip)">';
      for (i = 0; i < 14; i++) s += rect(136 + i * 34, 35, 1, 365, LINE);
      for (i = 0; i < 11; i++) s += rect(121, 50 + i * 34, 439, 1, LINE);
      var pts = [], pstr = '';
      for (i = 0; i < 6; i++) { var px = 150 + i * 76 + r() * 20, py = 80 + r() * 250; pts.push([px, py]); pstr += px + ',' + py + ' '; }
      var p2 = '';
      for (i = 0; i < 6; i++) p2 += (160 + i * 74) + ',' + (120 + r() * 200) + ' ';
      s += '<polyline points="' + p2 + '" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="2" stroke-dasharray="4 6"/>';
      s += '<polyline points="' + pstr + '" fill="none" stroke="' + acc + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
      pts.forEach(function (p, idx) {
        var dur = (2.6 + idx * .4).toFixed(1) + 's';
        s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="9" fill="' + A(.18) + '" stroke="' + A(.6) + '">'
          + '<animate attributeName="r" values="8;15;8" dur="' + dur + '" repeatCount="indefinite"/>'
          + '<animate attributeName="opacity" values="1;.2;1" dur="' + dur + '" repeatCount="indefinite"/></circle>';
      });
      pts.forEach(function (p) { s += circle(p[0], p[1], 4, acc); });
      s += '</g>';
      s += rect(404, 58, 128, 118, '#0b0d15', 10, ' stroke="' + LINE2 + '"') + rect(418, 72, 70, 7, 'rgba(255,255,255,.6)', 3) + rect(418, 88, 96, 5, TXT, 3) + rect(418, 100, 80, 5, TXT, 3)
        + rect(418, 118, 100, 8, LINE, 4) + rect(418, 118, 64, 8, acc, 4) + rect(418, 136, 54, 5, TXT, 3) + rect(418, 150, 100, 14, A(.25), 7);
      return s;
    },

    grid: function (A, acc, r) {
      var s = '';
      for (var row = 0; row < 3; row++) for (var c = 0; c < 3; c++) {
        var x = 136 + c * 140, y = 50 + row * 106, idx = row * 3 + c, hot = idx === 4;
        s += rect(x, y, 128, 94, PANEL, 10, ' stroke="' + (hot ? A(.6) : LINE) + '"');
        s += rect(x + 14, y + 14, 28, 28, hot ? A(.35) : 'rgba(255,255,255,.06)', 8);
        var g = r();
        if (g < .33) s += circle(x + 28, y + 28, 7, hot ? acc : LINE2);
        else if (g < .66) s += rect(x + 21, y + 21, 14, 14, hot ? acc : LINE2, 3);
        else s += '<path d="M' + (x + 21) + ' ' + (y + 35) + 'l7-14 7 14z" fill="' + (hot ? acc : LINE2) + '"/>';
        s += rect(x + 14, y + 54, 60 + r() * 30, 7, 'rgba(255,255,255,.5)', 3) + rect(x + 14, y + 68, 40 + r() * 30, 6, TXT, 3);
        if (r() < .4) s += rect(x + 96, y + 14, 18, 8, A(.3), 4);
      }
      return s;
    },

    graph: function (A, acc, r) {
      var cx = 340, cy = 206, s = '', nodes = [], i;
      for (i = 0; i < 11; i++) {
        var ring = i < 5 ? 86 : 150, ang = (i < 5 ? i / 5 : (i - 5) / 6) * Math.PI * 2 + r() * .5;
        nodes.push([cx + Math.cos(ang) * ring * 1.25, cy + Math.sin(ang) * ring * .78]);
      }
      nodes.forEach(function (n, idx) { s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + n[0].toFixed(1) + '" y2="' + n[1].toFixed(1) + '" stroke="' + (idx < 5 ? A(.45) : LINE2) + '" stroke-width="1.2"/>'; });
      for (i = 0; i < 6; i++) { var a = nodes[Math.floor(r() * nodes.length)], b = nodes[Math.floor(r() * nodes.length)]; s += '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="' + LINE + '" stroke-width="1"/>'; }
      s += circle(cx, cy, 48, A(.08)) + '<circle cx="' + cx + '" cy="' + cy + '" r="30" fill="none" stroke="' + A(.5) + '"><animate attributeName="r" values="28;40;28" dur="3.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;.8" dur="3.2s" repeatCount="indefinite"/></circle>';
      s += circle(cx, cy, 24, A(.3), ' stroke="' + acc + '" stroke-width="1.5"') + circle(cx, cy, 8, acc);
      nodes.forEach(function (n, idx) {
        s += circle(n[0], n[1], idx < 5 ? 11 : 8, '#0b0d15', ' stroke="' + (idx < 5 ? A(.7) : LINE2) + '" stroke-width="1.5"');
        if (idx < 5) s += circle(n[0], n[1], 3.5, acc);
        s += rect(n[0] + 14, n[1] - 4, 26 + r() * 24, 6, TXT, 3);
      });
      return s;
    },

    console: function (A, acc, r) {
      var s = rect(136, 50, 408, 316, '#07080e', 10, ' stroke="' + LINE + '"') + rect(136, 50, 408, 24, 'rgba(255,255,255,.04)', 10) + rect(150, 59, 60, 6, TXT, 3);
      for (var i = 0; i < 13; i++) {
        var y = 90 + i * 20, x = 152, prompt = r() < .55;
        if (prompt) { s += rect(x, y, 7, 8, acc, 2); x += 14; }
        var segs = 2 + Math.floor(r() * 3);
        for (var k = 0; k < segs; k++) {
          var w = 24 + r() * 70, f = r();
          s += rect(x, y, w, 8, f < .18 ? A(.75) : (f < .3 ? 'rgba(52,211,153,.6)' : (prompt ? 'rgba(255,255,255,.45)' : TXT)), 3);
          x += w + 8;
        }
      }
      s += '<rect x="152" y="350" width="8" height="9" rx="1" fill="' + acc + '"><animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/></rect>';
      return s;
    }
  };

  function svg(project, suffix) {
    var hue = typeof project.hue === 'number' ? project.hue : 215;
    var r = rng(project.id || 'p');
    var acc = 'hsl(' + hue + ' 90% 66%)';
    var A = function (al) { return 'hsl(' + hue + ' 90% 66% / ' + al + ')'; };
    var gid = 'g-' + String(project.id || 'p').replace(/[^a-z0-9]/gi, '') + '-' + (suffix || 'x');
    var gen = TYPES[project.mockup] || TYPES.dashboard;
    var inner = sidebar(A, acc, r) + gen(A, acc, r);
    if (project.mockup === 'map') inner = inner.replace(/mapclip/g, gid + '-clip');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(project.name) + '">'
      + '<defs><radialGradient id="' + gid + '" cx="50%" cy="0%" r="80%"><stop offset="0" stop-color="' + acc + '" stop-opacity=".3"/><stop offset="1" stop-color="' + acc + '" stop-opacity="0"/></radialGradient></defs>'
      + rect(0, 0, 640, 400, '#07080d') + rect(0, 0, 640, 400, 'url(#' + gid + ')')
      + '<g transform="translate(40 34)">'
      + rect(0, 0, 560, 400, '#0c0e16', 14, ' stroke="rgba(255,255,255,.1)"')
      + rect(0, 0, 560, 35, '#10131c', 14) + rect(0, 20, 560, 15, '#10131c') + rect(0, 34, 560, 1, LINE)
      + circle(18, 17, 4.5, '#ff5f57') + circle(32, 17, 4.5, '#febc2e') + circle(46, 17, 4.5, '#28c840')
      + rect(150, 10, 260, 14, 'rgba(255,255,255,.06)', 7) + circle(165, 17, 2.5, A(.9)) + rect(175, 14, 90, 6, 'rgba(255,255,255,.18)', 3)
      + inner + '</g></svg>';
  }

  global.Mockups = { svg: svg };
})(window);
