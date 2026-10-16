/* ==========================================================================
   mockups.js — per-project SVG cover art
   Each project with a scene below (keyed by project id) gets a cover showing
   what the product actually does, tinted with the project's hue. Projects
   without a scene get a typographic title card. Replace any of them with a
   real screenshot by setting `image` on the project entry in data.*.js.
   ========================================================================== */
(function (global) {
  'use strict';

  var SANS = "'DM Sans', 'IBM Plex Sans Arabic', system-ui, 'Segoe UI', sans-serif";
  var MONO = "'JetBrains Mono', ui-monospace, Consolas, monospace";
  var ARAB = "'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif";
  var OK = '#34d399', WARN = '#fbbf24', BAD = '#ff6b6b', PANEL = '#0f1219';

  /* 24×24 stroke icons */
  var ICONS = {
    home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
    search: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4',
    bell: 'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
    heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
    star: 'M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z',
    user: 'M12 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8zM4 21a8 8 0 0 1 16 0',
    mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
    lock: 'M6 11h12v10H6zM8 11V8a4 4 0 0 1 8 0v3',
    cloud: 'M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1 0 9z',
    calendar: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4',
    chat: 'M4 5h16v11H9l-5 4z',
    bolt: 'M13 2L5 14h6l-1 8 8-12h-6z',
    download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
    upload: 'M12 20V9M7 14l5-5 5 5M5 4h14',
    pin: 'M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5',
    folder: 'M3 6h6l2 2h10v11H3z',
    play: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM10 8.5v7l6-3.5z',
    camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7a3.5 3.5 0 1 0 0 7',
    sun: 'M12 15a3 3 0 1 0 0-6a3 3 0 1 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
    link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
    doc: 'M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6',
    mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
    rss: 'M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8M6 18.5h.01',
    globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
    server: 'M4 4h16v7H4zM4 13h16v7H4zM8 7.5h.01M8 16.5h.01',
    car: 'M5 16v-5l2-5h10l2 5v5zM5 16v2M19 16v2M8.5 13h.01M15.5 13h.01',
    check: 'M5 12.5l4.5 4.5L19 7',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function n(v) { return +(+v).toFixed(1); }
  function W(a) { return 'rgba(255,255,255,' + a + ')'; }
  function rect(x, y, w, h, fill, rx, extra) {
    return '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + n(w) + '" height="' + n(h) + '" rx="' + (rx || 0) + '" fill="' + fill + '"' + (extra || '') + '/>';
  }
  function circle(cx, cy, r, fill, extra) { return '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + r + '" fill="' + fill + '"' + (extra || '') + '/>'; }
  function stroke(c, w, dash) { return ' stroke="' + c + '"' + (w ? ' stroke-width="' + w + '"' : '') + (dash ? ' stroke-dasharray="' + dash + '"' : ''); }
  function T(x, y, str, size, fill, o) {
    o = o || {};
    return '<text x="' + n(x) + '" y="' + n(y) + '" font-size="' + size + '" fill="' + fill + '"'
      + (o.w ? ' font-weight="' + o.w + '"' : '')
      + (o.a ? ' text-anchor="' + o.a + '"' : '')
      + (o.mono ? ' font-family="' + MONO + '"' : (o.ar ? ' font-family="' + ARAB + '"' : ''))
      + (o.ls ? ' letter-spacing="' + o.ls + '"' : '')
      + '>' + esc(str) + '</text>';
  }
  function I(name, x, y, size, color, sw) {
    return '<path d="' + ICONS[name] + '" transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + (size / 24).toFixed(3) + ')" fill="none" stroke="' + color
      + '" stroke-width="' + ((sw || 2) * 24 / size).toFixed(2) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function card(c, x, y, w, h, o) {
    o = o || {};
    return rect(x, y, w, h, o.fill || PANEL, o.r || 14, stroke(o.stroke || W(.1)) + ' filter="url(#' + c.id + '-sh)"');
  }
  function win(c, x, y, w, h, title, fill) {
    return card(c, x, y, w, h, { fill: fill || '#0c0f16', r: 14 })
      + rect(x, y + 28, w, 1, W(.07))
      + circle(x + 16, y + 14, 3.5, '#ff5f57', ' opacity=".8"') + circle(x + 28, y + 14, 3.5, '#febc2e', ' opacity=".8"') + circle(x + 40, y + 14, 3.5, '#28c840', ' opacity=".8"')
      + T(x + w / 2, y + 18, title, 9, W(.4), { a: 'middle', mono: 1 });
  }
  function pill(x, y, label, active, c, h) {
    h = h || 20;
    var w = label.length * 5.6 + 22;
    return { w: w, s: rect(x, y, w, h, active ? c.A(.2) : W(.04), h / 2, stroke(active ? c.A(.55) : W(.1)))
      + T(x + w / 2, y + h / 2 + 3.5, label, 9.5, active ? c.acc : W(.6), { a: 'middle', w: active ? 600 : 500 }) };
  }
  function anim(c, s) { return c.still ? '' : s; }

  var SCENES = {
    /* Governed assistants: connectors, a chat that ends in a human approval, and a hash-chained audit trail */
    agentmagic: function (c) {
      var s = card(c, 30, 82, 142, 232);
      s += T(44, 104, 'CONNECTORS', 8.5, W(.45), { mono: 1, ls: 1.2 });
      [['Gmail', '#ea4335', 'M'], ['HubSpot', '#ff7a59', 'H'], ['Slack', '#ecb22e', 'S'], ['Jira', '#2684ff', 'J']].forEach(function (t, i) {
        var y = 118 + i * 38;
        s += rect(44, y, 22, 22, t[1], 6) + T(55, y + 15.5, t[2], 11, '#fff', { w: 700, a: 'middle' })
          + T(74, y + 15, t[0], 11.5, W(.85))
          + rect(132, y + 5, 24, 13, c.A(.85), 6.5) + circle(149.5, y + 11.5, 4.5, '#fff');
      });
      s += rect(44, 274, 114, 1, W(.08)) + I('shield', 44, 284, 15, c.acc, 1.8) + T(64, 296, 'Permission gateway', 9.5, W(.6));

      s += win(c, 190, 46, 290, 302, 'AgentMagic · Sales assistant');
      s += rect(268, 88, 198, 32, c.A(.2), 12, stroke(c.A(.45))) + T(281, 108, 'Follow up with Acme on renewal', 10.5, W(.92));
      s += circle(214, 146, 10, c.A(.18), stroke(c.A(.6))) + I('sparkle', 207, 139, 14, c.acc, 1.6);
      s += rect(232, 132, 234, 46, W(.05), 12, stroke(W(.09))) + T(246, 151, 'Drafted the email and moved the', 10.5, W(.75)) + T(246, 166, 'HubSpot deal to “Renewal”.', 10.5, W(.75));
      s += rect(232, 190, 234, 108, '#111522', 12, stroke(c.A(.55)));
      s += circle(247, 208, 3.5, WARN) + T(256, 211, 'APPROVAL REQUIRED', 8.5, WARN, { mono: 1, ls: 1, w: 600 });
      s += rect(246, 222, 24, 24, '#ea4335', 6) + T(258, 238.5, 'M', 12, '#fff', { a: 'middle', w: 700 });
      s += T(278, 232, 'gmail.send_email', 10.5, W(.92), { mono: 1 }) + T(278, 245, 'to jane@acme.com · 1 attachment', 9.5, W(.5));
      s += rect(246, 260, 100, 26, W(.06), 8, stroke(W(.14))) + T(296, 277, 'Reject', 10.5, W(.75), { a: 'middle' });
      s += rect(354, 260, 98, 26, c.acc, 8) + T(403, 277, 'Approve', 10.5, '#06101f', { a: 'middle', w: 700 });
      s += rect(206, 312, 258, 24, W(.04), 12, stroke(W(.1))) + T(220, 328, 'Ask your assistant…', 10, W(.35)) + circle(450, 324, 8, c.A(.9)) + I('arrow', 444, 318, 12, '#06101f', 2.2);

      s += card(c, 474, 128, 140, 190);
      s += T(488, 150, 'AUDIT TRAIL', 8.5, W(.45), { mono: 1, ls: 1.2 }) + I('lock', 590, 139, 13, c.acc, 1.8);
      s += rect(491.5, 172, 1, 108, W(.12));
      [['deal.update', '#7c21e4 · 10:42', OK], ['email.draft', '#a3f90b · 10:42', OK], ['email.send', 'awaiting approval', WARN], ['slack.notify', 'queued', W(.3)]].forEach(function (t, i) {
        var y = 168 + i * 36;
        s += circle(492, y + 4, 4.5, t[2], stroke(PANEL, 2)) + T(504, y + 8, t[0], 10, W(.88), { mono: 1 }) + T(504, y + 21, t[1], 9, W(.42));
      });
      return s;
    },

    /* Search-first directory: task search, category pills, results where ratings only appear with a source */
    yourailist: function (c) {
      var s = win(c, 36, 30, 568, 346, 'yourailist.com'), dark = '#120a24';
      s += rect(56, 74, 22, 22, c.acc, 6) + I('sparkle', 59, 77, 16, dark, 2.2) + T(86, 90, 'YourAIList', 13, W(.95), { w: 700 });
      s += T(450, 89, 'Agents', 10, W(.5), { a: 'end' }) + T(522, 89, 'Automations', 10, W(.5), { a: 'end' }) + T(584, 89, 'Workflows', 10, W(.5), { a: 'end' });
      s += T(320, 138, 'Find AI for the task in front of you', 20, W(.95), { a: 'middle', w: 600 });
      s += rect(112, 150, 416, 50, 'none', 25, stroke(c.A(.14), 4));
      s += rect(116, 154, 408, 42, '#0d0f19', 21, stroke(c.A(.65), 1.5)) + I('search', 134, 166, 18, W(.6));
      s += T(160, 180, 'qualify inbound leads', 13, W(.92));
      s += '<rect x="302" y="167" width="1.5" height="17" fill="' + c.acc + '">' + anim(c, '<animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>') + '</rect>';
      s += rect(442, 161, 74, 28, c.acc, 14) + T(479, 179.5, 'Search', 11, dark, { a: 'middle', w: 700 });

      var cats = ['Sales', 'Support', 'Marketing', 'Finance', 'Operations'], ps = cats.map(function (t, i) { return pill(0, 0, t, i === 0, c); });
      var total = ps.reduce(function (a, p) { return a + p.w; }, 0) + (ps.length - 1) * 8, x = 320 - total / 2;
      cats.forEach(function (t, i) { s += pill(x, 210, t, i === 0, c).s; x += ps[i].w + 8; });

      [
        { n: 'LeadScout Agent', k: 'AI agent · Sales', d: ['Scores inbound leads and', 'books qualified calls.'], r: '4.6', i: 'user' },
        { n: 'Inbox Triage Flow', k: 'Automation · Support', d: ['Routes and tags tickets', 'before an agent replies.'], r: '4.4', i: 'chat' },
        { n: 'CRM Enrichment', k: 'Workflow · Sales ops', d: ['Fills company data from', 'public sources nightly.'], r: null, i: 'bolt' }
      ].forEach(function (p, i) {
        var x = 58 + i * 177, y = 248;
        s += rect(x, y, 170, 112, W(.035), 12, stroke(i === 0 ? c.A(.55) : W(.08)));
        s += rect(x + 14, y + 14, 30, 30, c.A(.2), 8) + I(p.i, x + 21, y + 21, 16, c.acc, 1.8);
        s += T(x + 52, y + 27, p.n, 11.5, W(.92), { w: 600 }) + T(x + 52, y + 41, p.k, 9, W(.45));
        s += T(x + 14, y + 64, p.d[0], 9.5, W(.6)) + T(x + 14, y + 77, p.d[1], 9.5, W(.6));
        if (p.r) {
          s += I('star', x + 14, y + 88, 12, WARN, 1.8) + T(x + 30, y + 98, p.r, 10, W(.9), { w: 600 })
            + rect(x + 52, y + 87, 64, 16, c.A(.18), 8) + I('link', x + 57, y + 90, 10, c.acc, 1.8) + T(x + 70, y + 98.5, 'Sourced', 8.5, c.acc, { w: 600 });
        } else {
          s += T(x + 14, y + 98, 'No rating without a source', 8.5, W(.38));
        }
      });
      return s;
    },

    /* Newsroom: mixed sources in, bilingual article (with RTL Arabic), publish only after editor review */
    contextapro: function (c) {
      var s = '';
      [['link', 'Link', 'site.com/story'], ['doc', 'Document', 'brief.pdf · 12p'], ['mic', 'Audio', 'mp3 · 04:32'], ['rss', 'Wire', '3 stories']].forEach(function (t, i) {
        var y = 92 + i * 56;
        s += '<path d="M156 ' + (y + 22) + 'C174 ' + (y + 22) + ' 168 200 190 200" fill="none"' + stroke(c.A(.4), 1.2, '3 3') + '/>';
        s += card(c, 26, y, 130, 44, { r: 10 }) + rect(38, y + 11, 22, 22, c.A(.16), 6) + I(t[0], 41, y + 14, 16, c.acc, 1.8)
          + T(68, y + 20, t[1], 10.5, W(.9), { w: 600 }) + T(68, y + 33, t[2], 8.5, W(.45), { mono: 1 });
      });

      s += win(c, 186, 52, 280, 296, 'Article · draft 3');
      s += rect(202, 92, 30, 18, c.A(.2), 5) + T(217, 104.5, 'EN', 9, c.acc, { a: 'middle', mono: 1, w: 600 });
      s += T(253, 104.5, 'AR', 9, W(.45), { a: 'middle', mono: 1 }) + T(285, 104.5, 'FR', 9, W(.45), { a: 'middle', mono: 1 });
      s += I('sparkle', 398, 94, 12, c.acc, 1.6) + T(450, 104, 'AI draft', 9, W(.5), { a: 'end' });
      s += T(202, 136, 'Port traffic rebounds as new', 15, W(.95), { w: 600 }) + T(202, 155, 'shipping lanes open', 15, W(.95), { w: 600 });
      s += rect(202, 168, 230, 5, W(.12), 2.5) + rect(202, 179, 214, 5, W(.12), 2.5) + rect(202, 190, 176, 5, W(.12), 2.5);
      s += rect(202, 208, 230, 1, W(.08));
      s += T(432, 234, 'انتعاش حركة الموانئ مع افتتاح', 15, W(.95), { a: 'end', ar: 1, w: 600 }) + T(432, 255, 'خطوط شحن جديدة', 15, W(.95), { a: 'end', ar: 1, w: 600 });
      s += rect(202, 268, 230, 5, W(.12), 2.5) + rect(222, 279, 210, 5, W(.12), 2.5) + rect(282, 290, 150, 5, W(.12), 2.5);
      s += rect(186, 306, 280, 1, W(.07)) + I('link', 202, 318, 12, W(.5), 1.8) + T(219, 328, 'Sources linked · 4', 9.5, W(.5));
      s += rect(368, 315, 82, 20, 'rgba(251,191,36,.14)', 10) + T(409, 328.5, 'Awaiting editor', 8.5, WARN, { a: 'middle', w: 600 });

      s += card(c, 446, 116, 168, 184);
      s += T(460, 138, 'EDITOR REVIEW', 8.5, W(.45), { mono: 1, ls: 1.2 });
      [[1, 'Facts linked to sources'], [1, 'RTL layout checked'], [0, 'Headline approved']].forEach(function (t, i) {
        var y = 160 + i * 24;
        s += t[0] ? circle(466, y, 7, c.A(.2)) + I('check', 460, y - 6, 12, c.acc, 2.2) : circle(466, y, 6.5, 'none', stroke(W(.3)));
        s += T(480, y + 3.5, t[1], 9.5, t[0] ? W(.8) : W(.55));
      });
      s += rect(460, 230, 140, 28, c.acc, 8) + T(530, 248, 'Publish to WordPress', 10, '#1a0605', { a: 'middle', w: 700 });
      s += rect(460, 264, 140, 26, 'none', 8, stroke(W(.16))) + T(530, 281, 'Send to webhook', 10, W(.75), { a: 'middle' });
      return s;
    },

    /* eSIM comparison: country plans ranked, an AI answer grounded in the catalog, coverage stats */
    esim: function (c) {
      var s = win(c, 30, 32, 418, 330, 'esimzee.com/japan');
      s += rect(50, 74, 34, 23, '#fff', 3) + circle(67, 85.5, 7, '#bc002d');
      s += T(94, 87, 'Japan eSIM plans', 15, W(.95), { w: 600 }) + T(94, 101, 'Compared across 130+ providers', 9.5, W(.45));
      var x = 50;
      ['10 GB+', '2 weeks+', '5G'].forEach(function (t, i) { var p = pill(x, 114, t, i < 2, c); s += p.s; x += p.w + 8; });
      [['10 GB', '30 days · 5G', '$1.35/GB', '$13.50', '#0ea5e9', 'N'], ['20 GB', '30 days · 5G', '$1.20/GB', '$24.00', '#8b5cf6', 'A'],
        ['Unlimited', '15 days · 4G', 'fair use', '$29.90', '#f97316', 'H'], ['5 GB', '15 days · 5G', '$1.78/GB', '$8.90', '#10b981', 'U']].forEach(function (r, i) {
        var y = 146 + i * 50;
        s += rect(46, y, 386, 42, i === 0 ? c.A(.08) : W(.03), 10, stroke(i === 0 ? c.A(.55) : W(.08)));
        s += circle(68, y + 21, 12, r[4]) + T(68, y + 25, r[5], 9.5, '#fff', { a: 'middle', w: 700 });
        s += T(88, y + 18, r[0], 12, W(.92), { w: 600 }) + T(88, y + 32, r[1], 9, W(.45));
        if (i === 0) s += rect(134, y + 7, 60, 16, c.A(.2), 8) + T(164, y + 18.5, 'Top match', 8.5, c.acc, { a: 'middle', w: 600 });
        s += T(320, y + 25, r[2], 9.5, W(.5), { a: 'end', mono: 1 }) + T(416, y + 26, r[3], 14, W(.95), { a: 'end', w: 700 });
      });

      s += card(c, 418, 62, 196, 176);
      s += I('sparkle', 432, 76, 14, c.acc, 1.8) + T(452, 88, 'Ask eSIMzee', 11, W(.92), { w: 600 });
      s += rect(468, 100, 132, 40, c.A(.2), 10, stroke(c.A(.4))) + T(590, 116, '10 GB+ in Japan for', 9.5, W(.92), { a: 'end' }) + T(590, 130, 'two weeks, under $20?', 9.5, W(.92), { a: 'end' });
      s += rect(432, 150, 168, 46, W(.05), 10, stroke(W(.08))) + T(442, 167, 'Best match for 14 days:', 9.5, W(.7)) + T(442, 183, '10 GB · 30 days · $13.50', 9.5, W(.95), { w: 600 });
      s += I('check', 432, 208, 11, OK, 2) + T(447, 217, 'From the live catalog only', 8.5, W(.45));

      s += card(c, 458, 254, 156, 78);
      s += T(472, 286, '237', 22, W(.95), { w: 700 }) + T(518, 280, 'countries', 9.5, W(.6)) + T(518, 293, '130+ providers', 9.5, W(.6));
      var fy = 306;
      s += rect(472, fy, 20, 13, '#fff') + circle(482, fy + 6.5, 3.6, '#bc002d');
      s += rect(498, fy, 20, 13, '#fff') + rect(498, fy, 20, 4.3, '#00732f') + rect(498, fy + 8.7, 20, 4.3, '#000') + rect(498, fy, 5, 13, '#ef3340');
      s += rect(524, fy, 20, 13, '#8a1538') + rect(524, fy, 7, 13, '#fff');
      s += rect(550, fy, 20, 13, '#006c35') + rect(555, fy + 5.5, 10, 1.6, '#fff');
      s += rect(576, fy, 20, 13, '#e30a17') + circle(584, fy + 6.5, 3.6, '#fff') + circle(585.2, fy + 6.5, 2.9, '#e30a17');
      return s;
    },

    /* ReAct loop: thought → action → observation → verify, with the matching trace */
    slopsense: function (c) {
      var cx = 168, cy = 208, R = 104, s = '';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none"' + stroke(c.A(.4), 1.5, '4 7') + '>'
        + anim(c, '<animate attributeName="stroke-dashoffset" values="0;-44" dur="2.4s" repeatCount="indefinite"/>') + '</circle>';
      [-45, 45, 135, 225].forEach(function (d) {
        var a = d * Math.PI / 180;
        s += '<path d="M-4 -4.5L4 0L-4 4.5z" fill="' + c.acc + '" transform="translate(' + n(cx + R * Math.cos(a)) + ' ' + n(cy + R * Math.sin(a)) + ') rotate(' + (d + 90) + ')"/>';
      });
      s += circle(cx, cy, 50, c.A(.06)) + circle(cx, cy, 32, c.A(.16), stroke(c.acc, 1.5));
      s += anim(c, '<circle cx="' + cx + '" cy="' + cy + '" r="32" fill="none"' + stroke(c.A(.5)) + '><animate attributeName="r" values="32;48;32" dur="3.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;.8" dur="3.2s" repeatCount="indefinite"/></circle>');
      s += I('sparkle', cx - 12, cy - 12, 24, c.acc, 1.8);
      s += T(cx, 154, 'AGENT', 8.5, W(.45), { a: 'middle', mono: 1, ls: 1.5 }) + T(cx, 272, 'step 3 of 8', 9, W(.45), { a: 'middle', mono: 1 });
      [['Thought', -90], ['Action', 0], ['Observation', 90], ['Verify', 180]].forEach(function (t) {
        var a = t[1] * Math.PI / 180, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a), w = t[0].length * 6.2 + 30, on = t[0] === 'Action';
        s += rect(x - w / 2, y - 13, w, 26, on ? '#1a0f18' : PANEL, 13, stroke(on ? c.acc : W(.18), on ? 1.5 : 1))
          + circle(x - w / 2 + 12, y, 3, on ? c.acc : W(.35)) + T(x + 5, y + 4, t[0], 10.5, on ? W(.95) : W(.75), { a: 'middle', w: on ? 600 : 500 });
      });

      s += win(c, 318, 52, 296, 300, 'agent.trace · run 7f3a', '#090b11');
      [['THOUGHT', c.acc, 'Need Q3 revenue by region'], ['ACTION', '#60a5fa', 'sql.query(sales, q=3)'], ['OBSERVATION', W(.45), '4 rows · EMEA missing'],
        ['THOUGHT', c.acc, 'Retry without region filter'], ['ACTION', '#60a5fa', 'sql.query(sales, q=3, all)'], ['OBSERVATION', W(.45), '5 rows returned'],
        ['VERIFIED', OK, 'Totals match the ledger']].forEach(function (t, i) {
        var y = 98 + i * 33;
        s += T(334, y, t[0], 8.5, t[1], { mono: 1, w: 600, ls: .8 }) + T(334, y + 14, t[2], 10.5, W(.8), { mono: 1 });
      });
      s += T(334, 338, '›', 11, c.acc, { mono: 1 }) + '<rect x="344" y="329" width="7" height="11" fill="' + c.acc + '">' + anim(c, '<animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>') + '</rect>';
      return s;
    },

    /* Hotel PMS: bed-level reservation timeline with a blocked overlap, WhatsApp confirmation */
    riwaq: function (c) {
      var s = win(c, 26, 30, 588, 304, 'Riwaq PMS · Reservations'), dark = '#04140d', x0 = 130, cw = 68;
      s += T(42, 80, 'Reservations', 13, W(.95), { w: 600 }) + T(136, 80, '12–18 Oct', 10, W(.45));
      s += rect(522, 66, 76, 22, c.acc, 7) + T(560, 81, '+ Booking', 9.5, dark, { a: 'middle', w: 700 });
      s += rect(x0 + 2 * cw, 96, cw, 224, c.A(.06));
      ['SUN 12', 'MON 13', 'TUE 14', 'WED 15', 'THU 16', 'FRI 17', 'SAT 18'].forEach(function (d, i) {
        s += T(x0 + i * cw + cw / 2, 110, d, 8.5, i === 2 ? c.acc : W(.45), { a: 'middle', mono: 1, w: i === 2 ? 600 : 400 });
        s += rect(x0 + i * cw, 96, 1, 224, W(.05));
      });
      var rooms = ['101 · Bed A', '101 · Bed B', 'Room 102', '203 · Bed A', '203 · Bed B', 'Room 305'];
      rooms.forEach(function (r, i) { var y = 120 + i * 32; s += rect(42, y, 564, 1, W(.06)) + T(42, y + 20, r, 10, W(.75)); });
      [[0, 0, 3, 'A. Rahman', 'in'], [0, 4, 3, 'M. Saleh', 'ok'], [1, 1, 4, 'K. Haddad', 'ok'], [2, 0, 2, 'N. Otaibi', 'in'], [2, 3, 3, 'J. Park', 'pend'],
        [3, 1, 5, 'S. Nair', 'ok'], [4, 1, 2, 'L. Costa', 'in'], [4, 4, 2, 'F. Omar', 'ok'], [5, 5, 2, 'R. Aziz', 'pend']].forEach(function (b) {
        var x = x0 + b[1] * cw + 3, y = 120 + b[0] * 32 + 5, w = b[2] * cw - 6;
        if (b[4] === 'in') s += rect(x, y, w, 22, c.acc, 6) + T(x + 10, y + 15, b[3], 9.5, dark, { w: 600 });
        else if (b[4] === 'ok') s += rect(x, y, w, 22, c.A(.18), 6, stroke(c.A(.55))) + T(x + 10, y + 15, b[3], 9.5, W(.9));
        else s += rect(x, y, w, 22, 'rgba(251,191,36,.1)', 6, stroke('rgba(251,191,36,.6)', 1, '3 3')) + T(x + 10, y + 15, b[3], 9.5, WARN);
      });
      var gx = x0 + 4 * cw + 3, gy = 120 + 3 * 32 + 5;
      s += rect(gx, gy, 2 * cw - 6, 22, '#2a1114', 6, stroke(BAD, 1.2, '4 3')) + I('lock', gx + 8, gy + 5, 12, BAD, 2) + T(gx + 24, gy + 15, 'Overlap blocked', 9, BAD, { w: 600 });
      s += circle(46, 350, 4, c.acc) + T(56, 353.5, 'Checked in', 9, W(.55)) + circle(130, 350, 4, c.A(.3), stroke(c.A(.6))) + T(140, 353.5, 'Confirmed', 9, W(.55))
        + circle(212, 350, 4, 'none', stroke(WARN, 1, '2 2')) + T(222, 353.5, 'Pending', 9, W(.55));

      s += card(c, 404, 254, 210, 140);
      s += circle(424, 276, 10, '#25d366') + I('chat', 418, 270, 12, '#fff', 2.2) + T(442, 280, 'WhatsApp · Send to guest', 10, W(.9), { w: 600 });
      s += rect(418, 294, 182, 62, '#13352a', 10) + T(430, 312, 'Booking confirmed', 10, W(.95), { w: 600 })
        + T(430, 327, 'Room 102 · 14–17 Oct · 3 nights', 9, W(.7)) + T(430, 341, '1,350 SAR incl. 15% VAT', 9, W(.7));
      s += rect(418, 364, 182, 22, '#25d366', 7) + T(509, 379, 'Send in one click', 9.5, '#052e16', { a: 'middle', w: 700 });
      return s;
    },

    /* Fleet ops: live map with vehicles, an exception-first Attention Center, telematics for one vehicle */
    rentora: function (c) {
      var s = win(c, 26, 30, 588, 340, 'Rentora · Fleet live'), clip = c.id + '-map', i;
      s += '<clipPath id="' + clip + '"><rect x="27" y="59" width="586" height="310" rx="13"/></clipPath><g clip-path="url(#' + clip + ')">';
      s += rect(27, 59, 586, 310, '#0a0d14');
      for (i = 0; i < 16; i++) s += rect(27 + i * 40, 59, 1, 310, W(.03));
      for (i = 0; i < 9; i++) s += rect(27, 70 + i * 40, 586, 1, W(.03));
      s += '<path d="M260 330C330 300 380 340 440 330S560 300 613 320V369H260z" fill="hsl(205 70% 45% / .12)"/>';
      s += '<path d="M27 238C200 218 320 296 613 246" fill="none"' + stroke(W(.07), 10) + '/>';
      s += '<path d="M392 59C372 160 432 262 412 369" fill="none"' + stroke(W(.06), 8) + '/>';
      s += '<path d="M280 59C300 140 520 160 613 120" fill="none"' + stroke(W(.04), 5) + '/>';
      s += '<polyline points="520,110 470,150 432,212 360,248 330,298" fill="none"' + stroke(c.acc, 2.5, '6 5') + ' stroke-linecap="round" stroke-linejoin="round">'
        + anim(c, '<animate attributeName="stroke-dashoffset" values="0;-22" dur="1.2s" repeatCount="indefinite"/>') + '</polyline>';
      [[330, 298, OK], [446, 182, OK], [566, 300, OK], [520, 110, WARN], [300, 142, BAD]].forEach(function (v) {
        if (v[2] === BAD) s += anim(c, '<circle cx="' + v[0] + '" cy="' + v[1] + '" r="14" fill="none"' + stroke(BAD, 1.5) + '><animate attributeName="r" values="14;26;14" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite"/></circle>');
        s += circle(v[0], v[1], 13, '#0f1219', stroke(v[2], 2)) + I('car', v[0] - 7, v[1] - 7, 14, v[2], 1.8);
      });
      s += '</g>';
      s += '<path d="M252 160L286 146" fill="none"' + stroke(BAD, 1.2, '3 3') + '/>';

      s += card(c, 42, 72, 220, 282, { fill: 'rgba(15,18,25,.94)' });
      s += T(58, 98, 'Attention Center', 13, W(.95), { w: 600 }) + rect(180, 86, 26, 17, 'rgba(255,107,107,.18)', 8.5) + T(193, 98.5, '3', 10, BAD, { a: 'middle', w: 700 });
      s += T(58, 114, 'Needs action before dispatch', 9, W(.45));
      [['DTC P0301', 'Cylinder 1 misfire', 'KSA 4821 · Toyota Hilux', BAD], ['INSPECTION', 'Overdue by 3 days', 'KSA 2207 · Hyundai H-1', WARN], ['BILLING', 'Contract #1182 invoiced', 'SAR 4,600 · auto-billed', OK]].forEach(function (t, i) {
        var y = 128 + i * 72;
        s += rect(52, y, 200, 64, W(.035), 10, stroke(W(.08))) + rect(52, y + 10, 3, 44, t[3], 1.5)
          + T(66, y + 19, t[0], 8.5, t[3], { mono: 1, w: 600, ls: .6 }) + T(66, y + 35, t[1], 11, W(.92), { w: 600 }) + T(66, y + 51, t[2], 9, W(.45));
      });

      s += card(c, 446, 252, 154, 104);
      s += T(460, 274, 'KSA 7310', 11, W(.92), { w: 600, mono: 1 }) + circle(544, 270.5, 3, OK) + T(586, 274, 'On trip', 9, OK, { a: 'end' });
      s += T(460, 302, '64', 22, W(.95), { w: 700 }) + T(488, 302, 'km/h', 9, W(.45));
      s += T(460, 324, 'Fuel', 9, W(.45)) + rect(490, 318, 96, 6, W(.1), 3) + rect(490, 318, 69, 6, c.acc, 3);
      s += T(460, 344, 'Return due 18:30', 9, W(.55));
      return s;
    },

    /* Conversational CRM: the chat on the left fills the lead record on the right */
    openclaw: function (c) {
      var s = '', dark = '#1a1404';
      s += rect(56, 30, 200, 400, '#0b0d14', 30, stroke(W(.16), 1.5) + ' filter="url(#' + c.id + '-sh)"') + rect(64, 38, 184, 384, '#0e1118', 24) + rect(126, 44, 60, 14, '#05060a', 7);
      s += circle(86, 84, 13, c.acc) + T(86, 88.5, 'A', 12, dark, { a: 'middle', w: 700 }) + T(106, 81, 'Acme Assistant', 11, W(.92), { w: 600 }) + T(106, 94, 'WhatsApp · online', 8.5, OK);
      s += rect(64, 106, 184, 1, W(.07));
      var y = 118;
      [[0, ['Hi! We need a quote', 'for 20 seats.']], [1, ['Happy to help. Which', 'company is it for?']], [0, ['Northwind Trading']], [1, ['Thanks! When would', 'you like to start?']], [0, ['Next quarter']]].forEach(function (m) {
        var lines = m[1], h = lines.length * 14 + 12, w = Math.max.apply(null, lines.map(function (l) { return l.length; })) * 5.4 + 20, x = m[0] ? 238 - w : 74;
        s += rect(x, y, w, h, m[0] ? c.A(.2) : W(.07), 10, m[0] ? stroke(c.A(.45)) : '');
        lines.forEach(function (l, k) { s += T(x + 10, y + 19 + k * 14, l, 10, m[0] ? W(.92) : W(.85)); });
        y += h + 8;
      });
      s += rect(198, y, 40, 20, c.A(.2), 10);
      [0, 1, 2].forEach(function (k) {
        s += '<circle cx="' + (209 + k * 9) + '" cy="' + (y + 10) + '" r="2.4" fill="' + c.acc + '">' + anim(c, '<animate attributeName="opacity" values=".25;1;.25" dur="1.2s" begin="' + (k * .2) + 's" repeatCount="indefinite"/>') + '</circle>';
      });
      s += rect(74, 372, 164, 26, W(.05), 13) + T(88, 389, 'Message', 9.5, W(.35));

      [0, 1, 2].forEach(function (k) {
        s += '<circle cx="262" cy="206" r="2.5" fill="' + c.acc + '">' + anim(c, '<animate attributeName="cx" values="262;292" dur="1.4s" begin="' + (k * .45) + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="' + (k * .45) + 's" repeatCount="indefinite"/>') + '</circle>';
      });

      s += card(c, 296, 52, 318, 296);
      s += T(316, 80, 'LEAD', 8.5, W(.45), { mono: 1, ls: 1.5 }) + T(316, 102, 'Northwind Trading', 16, W(.95), { w: 600 });
      s += rect(520, 88, 78, 20, c.A(.2), 10) + T(559, 101.5, 'Qualifying', 9.5, c.acc, { a: 'middle', w: 600 });
      var steps = ['New', 'Qualifying', 'Proposal', 'Won'], sx = [330, 420, 510, 590];
      s += rect(330, 129, 260, 2, W(.1)) + rect(330, 129, 90, 2, c.acc);
      steps.forEach(function (t, i) {
        s += i === 0 ? circle(sx[i], 130, 5, c.acc) : i === 1 ? circle(sx[i], 130, 9, c.A(.2)) + circle(sx[i], 130, 5, c.acc) : circle(sx[i], 130, 5, '#1a1d26', stroke(W(.25)));
        s += T(sx[i], 152, t, 9, i < 2 ? W(.85) : W(.4), { a: 'middle' });
      });
      [['Company', 'Northwind Trading', 1], ['Seats', '20', 1], ['Channel', 'WhatsApp', 0], ['Timeline', 'Next quarter', 1], ['Intent', 'quote_request', 0]].forEach(function (f, i) {
        var y = 182 + i * 28;
        s += T(316, y, f[0], 9.5, W(.45)) + T(400, y, f[1], f[0] === 'Intent' ? 10 : 11, W(.9), { mono: f[0] === 'Intent' ? 1 : 0 });
        if (f[2]) s += circle(548, y - 3.5, 2.5, c.acc) + T(598, y, 'from chat', 8, c.acc, { a: 'end', mono: 1 });
        s += rect(316, y + 10, 282, 1, W(.06));
      });
      s += I('shield', 316, 322, 13, W(.45), 1.8) + T(334, 332, 'Self-hosted · scoped credentials · vetted skills', 9, W(.45));
      return s;
    },

    /* Design tooling: Figma plugin pushes a selection straight to the published icon set */
    iconking: function (c) {
      var s = '', set = ['home', 'search', 'bell', 'heart', 'star', 'user', 'mail', 'lock', 'cloud', 'calendar', 'chat', 'bolt',
        'download', 'pin', 'folder', 'play', 'camera', 'sun', 'shield', 'link', 'doc', 'mic', 'globe', 'server'];
      s += card(c, 34, 62, 204, 280, { fill: '#1b1d24', r: 12 });
      [['#f24e1e', 0, 0], ['#ff7262', 6, 0], ['#a259ff', 0, 6], ['#1abcfe', 6, 6], ['#0acf83', 0, 12]].forEach(function (f) { s += rect(46 + f[1], 73 + f[2], 6, 6, f[0], 3); });
      s += T(66, 85, 'IconKing · Publish', 10.5, W(.92), { w: 600 }) + rect(34, 100, 204, 1, W(.08));
      s += T(48, 120, '24 icons selected', 10, W(.75)) + T(224, 120, 'Line set', 9, W(.45), { a: 'end' });
      set.slice(0, 8).forEach(function (k, i) {
        var x = 48 + (i % 4) * 46, y = 132 + Math.floor(i / 4) * 46;
        s += rect(x, y, 38, 38, W(.05), 8) + I(k, x + 10, y + 10, 18, W(.75), 1.6);
      });
      s += T(48, 244, 'Format', 9.5, W(.55)) + T(224, 244, 'SVG', 9.5, W(.85), { a: 'end', mono: 1 });
      s += T(48, 268, 'Optimize paths', 9.5, W(.55)) + rect(202, 259, 22, 12, c.A(.9), 6) + circle(218, 265, 4, '#fff');
      s += rect(48, 290, 176, 30, c.acc, 8) + I('upload', 68, 298, 14, '#1a0520', 2.2) + T(140, 309.5, 'Publish to IconKing', 10.5, '#1a0520', { a: 'middle', w: 700 });

      [0, 1, 2].forEach(function (k) {
        s += '<circle cx="240" cy="200" r="2.5" fill="' + c.acc + '">' + anim(c, '<animate attributeName="cx" values="240;262" dur="1.2s" begin="' + (k * .4) + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="' + (k * .4) + 's" repeatCount="indefinite"/>') + '</circle>';
      });

      s += win(c, 262, 34, 352, 332, 'iconking.com/sets/line');
      s += T(280, 86, 'Line Icons', 15, W(.95), { w: 600 }) + T(280, 102, '24 icons · SVG · updated just now', 9.5, W(.45));
      s += rect(510, 74, 88, 22, c.A(.18), 11) + I('check', 520, 79, 12, c.acc, 2.2) + T(536, 89, 'Published', 9.5, c.acc, { w: 600 });
      set.forEach(function (k, i) {
        var x = 280 + (i % 6) * 54, y = 118 + Math.floor(i / 6) * 54, hot = i === 8;
        s += rect(x, y, 46, 46, hot ? c.A(.18) : W(.035), 10, stroke(hot ? c.A(.6) : W(.07))) + I(k, x + 12, y + 12, 22, hot ? c.acc : W(.8), 1.7);
        if (i < 3) s += circle(x + 40, y + 6, 2.5, c.acc);
      });
      return s;
    },

    /* VPS web platform: the deploy run on the left, the request path it serves on the right */
    spectrumgenius: function (c) {
      var s = win(c, 28, 46, 304, 308, 'deploy@vps: ~/spectrum', '#090b11');
      [['$', 'git pull origin main'], ['', 'Fast-forward · 6 files changed'], ['$', 'composer install --no-dev -o'], ['$', 'php artisan migrate --force'],
        ['$', 'php artisan optimize'], ['ok', 'config, routes, views cached'], ['$', 'sudo nginx -t'], ['ok', 'syntax ok · test successful'],
        ['$', 'sudo systemctl reload nginx'], ['$', 'sudo certbot renew'], ['ok', 'certificates up to date']].forEach(function (l, i) {
        var y = 92 + i * 21;
        if (l[0] === '$') s += T(44, y, '$', 10, c.acc, { mono: 1, w: 600 }) + T(58, y, l[1], 10, W(.85), { mono: 1 });
        else if (l[0] === 'ok') s += I('check', 43, y - 9, 11, OK, 2.2) + T(58, y, l[1], 10, OK, { mono: 1 });
        else s += T(58, y, l[1], 10, W(.45), { mono: 1 });
      });
      s += T(44, 332, '$', 10, c.acc, { mono: 1, w: 600 }) + '<rect x="58" y="323" width="7" height="11" fill="' + c.acc + '">' + anim(c, '<animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>') + '</rect>';

      s += T(368, 72, 'REQUEST PATH', 8.5, W(.45), { mono: 1, ls: 1.5 });
      s += rect(351.5, 113, 1, 192, W(.14));
      s += '<circle cx="352" cy="113" r="3" fill="' + c.acc + '">' + anim(c, '<animate attributeName="cy" values="113;305" dur="2.6s" repeatCount="indefinite"/>') + '</circle>';
      [['globe', 'Browser', 'Tailwind UI · responsive'], ['lock', 'HTTPS', 'Auto-renewing certificates'], ['server', 'Nginx', 'Tuned workers · gzip · static cache'], ['bolt', 'Laravel on VPS', 'Route, config & view caching']].forEach(function (t, i) {
        var y = 88 + i * 64;
        s += circle(352, y + 25, 4, '#0c0f16', stroke(c.acc, 1.5));
        s += card(c, 364, y, 248, 50, { r: 12 }) + rect(378, y + 12, 26, 26, c.A(.16), 7) + I(t[0], 383, y + 17, 16, c.acc, 1.8)
          + T(416, y + 22, t[1], 11.5, W(.92), { w: 600 }) + T(416, y + 37, t[2], 9, W(.5));
      });
      return s;
    }
  };

  /* Fallback for projects without a scene: a typographic title card */
  function titleCard(c, p) {
    return card(c, 70, 70, 500, 260, { r: 18 })
      + T(100, 120, String(p.label || '').toUpperCase(), 10, c.acc, { mono: 1, ls: 2 })
      + T(100, 182, p.name, 34, W(.95), { w: 700 })
      + rect(100, 210, 80, 3, c.acc, 1.5)
      + T(100, 262, (p.stack || []).slice(0, 4).join('  ·  '), 11, W(.55), { mono: 1 });
  }

  function svg(project, suffix) {
    var hue = typeof project.hue === 'number' ? project.hue : 215;
    var id = 'mk-' + String(project.id || 'p').replace(/[^a-z0-9]/gi, '') + '-' + (suffix || 'x');
    var still = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var c = { id: id, acc: 'hsl(' + hue + ' 90% 66%)', A: function (al) { return 'hsl(' + hue + ' 90% 66% / ' + al + ')'; }, still: still };
    var scene = SCENES[project.id];
    var inner = scene ? scene(c) : titleCard(c, project);
    /* The case-study banner is 21:9; widen the canvas so nothing gets cropped */
    var vb = suffix === 'page' ? '-140 0 920 400' : '0 0 640 400';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(project.name) + '" font-family="' + SANS + '">'
      + '<defs>'
      + '<radialGradient id="' + id + '-g1" cx="50%" cy="0%" r="75%"><stop offset="0" stop-color="' + c.acc + '" stop-opacity=".32"/><stop offset="1" stop-color="' + c.acc + '" stop-opacity="0"/></radialGradient>'
      + '<radialGradient id="' + id + '-g2" cx="95%" cy="100%" r="55%"><stop offset="0" stop-color="' + c.acc + '" stop-opacity=".14"/><stop offset="1" stop-color="' + c.acc + '" stop-opacity="0"/></radialGradient>'
      + '<pattern id="' + id + '-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".9" fill="rgba(255,255,255,.07)"/></pattern>'
      + '<filter id="' + id + '-sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".55"/></filter>'
      + '</defs>'
      + rect(-200, 0, 1040, 400, '#07080d') + rect(-200, 0, 1040, 400, 'url(#' + id + '-dots)')
      + rect(-200, 0, 1040, 400, 'url(#' + id + '-g1)') + rect(-200, 0, 1040, 400, 'url(#' + id + '-g2)')
      + inner + '</svg>';
  }

  global.Mockups = { svg: svg };
})(window);
