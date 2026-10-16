/* ==========================================================================
   main.js — page behaviour shared by index.html (EN) and ar.html (AR)
   Reads everything language-specific from window.SITE (assets/js/data.*.js).
   ========================================================================== */
(function (global) {
  'use strict';

  var S = global.SITE;
  if (!S) return;
  var doc = global.document;
  var $ = function (s, el) { return (el || doc).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); };
  var reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in global;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ICON_EXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>';
  var ICON_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';

  /* ---------- 1. Contact links -------------------------------------------- */
  function waLink(text) { return 'https://wa.me/' + S.contact.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); }
  $$('[data-contact]').forEach(function (a) {
    var k = a.getAttribute('data-contact');
    if (k === 'whatsapp') a.href = waLink(a.getAttribute('data-wa-text') || S.contact.whatsappText);
    else if (k === 'email') a.href = 'mailto:' + S.contact.email;
    else if (S.contact[k]) a.href = S.contact[k];
  });
  $$('[data-email-text]').forEach(function (el) { el.textContent = S.contact.email; });

  /* ---------- 2. Navigation ----------------------------------------------- */
  var header = $('.site-header'), nav = $('.nav'), toggle = $('.nav__toggle'), links = $$('.nav__links a');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', (global.scrollY || 0) > 24); }
  global.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toggle && nav) {
    var setOpen = function (open) { nav.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    links.forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    doc.addEventListener('click', function (e) { if (nav.classList.contains('is-open') && !nav.contains(e.target)) setOpen(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false); });
  }
  var sections = links.map(function (a) { var id = (a.getAttribute('href') || '').replace('#', ''); return id && doc.getElementById(id); }).filter(Boolean);
  if (hasIO && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 3. Scroll reveal -------------------------------------------- */
  function setupReveal() {
    var els = $$('[data-reveal]');
    if (reduced || !hasIO) { els.forEach(function (el) { el.classList.add('is-visible'); }); return; }
    $$('[data-stagger]').forEach(function (group) {
      $$('[data-reveal]', group).forEach(function (el, i) { el.style.setProperty('--d', Math.min(i, 8) * 70 + 'ms'); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. Animated counters ---------------------------------------- */
  $$('[data-count]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count')), dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '', suffix = el.getAttribute('data-suffix') || '';
    var fmt = function (v) { return prefix + v.toFixed(dec) + suffix; };
    if (reduced || !hasIO) { el.textContent = fmt(target); return; }
    el.textContent = fmt(0);
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      var t0 = global.performance.now(), d = 1400;
      (function step(now) {
        var k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(target * e);
        if (k < 1) global.requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ---------- 5. Tech-stack marquee --------------------------------------- */
  $$('[data-marquee]').forEach(function (m) {
    var items = (S.stack && S.stack[m.getAttribute('data-marquee')]) || [];
    var row = function (hidden) { return items.map(function (t) { return '<span class="marquee__item"' + (hidden ? ' aria-hidden="true"' : '') + '><i></i>' + esc(t) + '</span>'; }).join(''); };
    m.innerHTML = '<div class="marquee__track">' + row(false) + (reduced ? '' : row(true)) + '</div>';
  });

  /* ---------- 6. Cursor-following glow on cards --------------------------- */
  doc.addEventListener('pointermove', function (e) {
    var card = e.target && e.target.closest ? e.target.closest('.card, .project') : null;
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
  }, { passive: true });

  /* ---------- 7. Projects grid + filters ---------------------------------- */
  var grid = $('#projects-grid'), filtersEl = $('#filters');

  function mediaFor(p, suffix) {
    if (p.image) return '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || p.name) + '" loading="lazy" decoding="async">';
    return global.Mockups ? global.Mockups.svg(p, suffix) : '';
  }

  /* Optional `status` (e.g. "In development") shows as a pill on the card and on the case-study page. */
  function statusBadge(p) { return p.status ? '<em class="status-pill">' + esc(p.status) + '</em>' : ''; }

  function renderProjects() {
    if (!grid) return;
    grid.innerHTML = S.projects.map(function (p) {
      return '<a class="project" href="' + esc(projectUrl(p.id)) + '" data-cat="' + esc((p.cats || []).join(' ')) + '" data-reveal>'
        + '<div class="project__media">' + mediaFor(p, 'card') + statusBadge(p) + '</div>'
        + '<div class="project__body">'
        + '<div class="project__meta"><span>' + esc(p.label) + '</span><span>' + esc(p.role) + '</span></div>'
        + '<h3 class="project__title">' + esc(p.name) + '</h3>'
        + '<p class="project__desc">' + esc(p.tagline) + '</p>'
        + '<div class="project__foot"><div class="project__chips">' + (p.stack || []).slice(0, 3).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>'
        + '<span class="project__link">' + esc(S.ui.open) + ICON_ARROW + '</span></div>'
        + '</div></a>';
    }).join('');
  }

  function applyFilter(id) {
    $$('.filters__btn', filtersEl).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-cat') === id ? 'true' : 'false'); });
    $$('.project', grid).forEach(function (c) {
      var cats = (c.getAttribute('data-cat') || '').split(' ');
      var show = id === 'all' || cats.indexOf(id) > -1;
      c.classList.toggle('is-hidden', !show);
      if (show) c.classList.add('is-visible');
    });
  }

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = (S.filters || []).map(function (f, i) {
      return '<button type="button" class="filters__btn" data-cat="' + esc(f.id) + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + esc(f.label) + '</button>';
    }).join('');
    filtersEl.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.filters__btn') : null;
      if (b) applyFilter(b.getAttribute('data-cat'));
    });
  }

  /* ---------- 8. Case-study page (project.html?p=<id>) -------------------- */
  var casePage = $('#case');

  /* Full 6-part case study (projects with a `cs` block):
     problem & user → architecture → decisions → security → outcomes → links. */
  var ICON_FLOW = '<svg viewBox="0 0 40 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 8h34M30 3l6 5-6 5"/></svg>';
  var ICON_LOOP = '<svg viewBox="0 0 40 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 6h34M31 2l5 4-5 4M38 16H4M9 12l-5 4 5 4"/></svg>';

  function list(items, cls) {
    return '<ul class="' + cls + '">' + (items || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
  }

  /* `arch.stages` draws one flow; `arch.flows: [{ label, stages }]` draws several lanes over one shared store. */
  function archHtml(a) {
    var lanes = (a.flows || [{ stages: a.stages }]).map(function (f) {
      return (f.label ? '<div class="arch__lane">' + esc(f.label) + '</div>' : '') + '<div class="arch__flow">' + flowHtml(a, f.stages) + '</div>';
    }).join('');
    return '<figure class="arch">' + lanes
      + (a.store ? '<div class="arch__bus" aria-hidden="true"><span>' + esc(a.bus || '') + '</span></div>'
        + '<div class="arch__store"><b class="arch__t">' + esc(a.store.t) + '</b>' + list(a.store.items, 'arch__store-items') + '</div>' : '')
      + (a.caption ? '<figcaption class="arch__caption">' + esc(a.caption) + '</figcaption>' : '')
      + '</figure>';
  }

  function flowHtml(a, stages) {
    var flow = '';
    stages.forEach(function (st, i) {
      if (i) {
        var loop = a.loop && st.hot;
        flow += '<div class="arch__arrow' + (loop ? ' arch__arrow--loop' : '') + '" aria-hidden="true">' + (loop ? ICON_LOOP + '<span>' + esc(a.loop) + '</span>' : ICON_FLOW) + '</div>';
      }
      flow += '<div class="arch__stage' + (st.hot ? ' arch__stage--hot' : '') + '">'
        + '<div class="arch__node"><span class="arch__k">' + String(i + 1).padStart(2, '0') + ' · ' + esc(st.k) + '</span>'
        + '<b class="arch__t">' + esc(st.t) + '</b>' + list(st.items, 'arch__items') + '</div>'
        + (st.aside ? '<div class="arch__aside"><b>' + esc(st.aside.t) + '</b><span>' + esc(st.aside.d) + '</span></div>' : '')
        + '</div>';
    });
    return flow;
  }

  function caseStudyHtml(p) {
    var c = p.cs, L = S.ui.cs, h = '';
    var sec = function (i, body) {
      return '<section class="cs-sec" id="cs-' + (i + 1) + '" aria-labelledby="cs-h' + (i + 1) + '">'
        + '<header class="cs-sec__head"><span class="cs-sec__n">' + String(i + 1).padStart(2, '0') + '</span>'
        + '<h2 class="cs-sec__title" id="cs-h' + (i + 1) + '">' + esc(L.heads[i]) + '</h2></header>' + body + '</section>';
    };

    h += '<nav class="cs-nav" aria-label="' + esc(L.nav) + '">' + L.tabs.map(function (t, i) {
      return '<button type="button" data-cs-jump="cs-' + (i + 1) + '"><i>' + String(i + 1).padStart(2, '0') + '</i>' + esc(t) + '</button>';
    }).join('') + '</nav>';

    h += '<div class="cs-intro">'
      + (c.role ? '<div class="cs-role"><h2 class="case__h3">' + esc(L.role) + '</h2><p>' + esc(c.role) + '</p></div>' : '')
      + '<dl class="cs-glance">' + (c.glance || []).map(function (g) { return '<div><dt>' + esc(g[0]) + '</dt><dd>' + esc(g[1]) + '</dd></div>'; }).join('') + '</dl>'
      + '<div class="case__chips">' + (p.stack || []).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>'
      + '</div>';

    // 01 Problem & target user
    h += sec(0, '<p class="cs-p">' + esc(c.problem) + '</p>'
      + (c.blockers ? '<h3 class="cs-sub">' + esc(L.blockers) + '</h3><div class="cs-cards cs-cards--3">' + c.blockers.map(function (b) {
        return '<div class="cs-card"><b>' + esc(b.t) + '</b><p>' + esc(b.d) + '</p></div>';
      }).join('') + '</div>' : '')
      + (c.user ? '<div class="cs-callout"><h3 class="case__h3">' + esc(L.user) + '</h3><p>' + esc(c.user) + '</p></div>' : ''));

    // 02 Architecture
    h += sec(1, c.arch ? archHtml(c.arch) : '');

    // 03 Decisions & trade-offs
    h += sec(2, '<div class="cs-cards cs-cards--2">' + (c.decisions || []).map(function (d) {
      return '<article class="cs-dec"><h3 class="cs-dec__t">' + esc(d.t) + '</h3><dl>'
        + '<div><dt>' + esc(L.chose) + '</dt><dd>' + esc(d.c) + '</dd></div>'
        + '<div><dt>' + esc(L.over) + '</dt><dd>' + esc(d.o) + '</dd></div>'
        + '<div><dt>' + esc(L.why) + '</dt><dd>' + esc(d.w) + '</dd></div>'
        + '<div class="cs-dec__cost"><dt>' + esc(L.cost) + '</dt><dd>' + esc(d.x) + '</dd></div>'
        + '</dl></article>';
    }).join('') + '</div>');

    // 04 Resilience & security (+ named limits)
    h += sec(3, (c.securityNote ? '<p class="cs-p cs-p--lead">' + esc(c.securityNote) + '</p>' : '') + '<div class="cs-cards cs-cards--3">' + (c.security || []).map(function (s) {
      return '<div class="cs-card cs-card--sec"><b>' + esc(s.t) + '</b>' + list(s.items, 'bullets bullets--sm') + '</div>';
    }).join('') + '</div>'
      + (c.audit ? '<div class="cs-callout cs-callout--audit"><h3 class="case__h3">' + esc(c.audit.t) + '</h3><p>' + esc(c.audit.d) + '</p>' + list(c.audit.items, 'bullets bullets--sm') + '</div>' : '')
      + (c.limits && c.limits.length ? '<h3 class="cs-sub">' + esc(L.limits) + '</h3><div class="cs-limits" role="table">'
        + '<div class="cs-limit cs-limit--head" role="row"><span role="columnheader">' + esc(L.today) + '</span><i aria-hidden="true"></i><span role="columnheader">' + esc(L.next) + '</span></div>'
        + c.limits.map(function (l) {
          return '<div class="cs-limit" role="row"><span role="cell">' + esc(l.l) + '</span><i aria-hidden="true">' + ICON_FLOW + '</i><span role="cell">' + esc(l.n) + '</span></div>';
        }).join('') + '</div>' : ''));

    // 05 Measurable outcomes (+ regional readiness)
    h += sec(4, '<div class="outcomes outcomes--cs">' + (c.outcomes || []).map(function (o) {
      return '<div class="outcome"><b>' + esc(o.v) + '</b><span>' + esc(o.l) + '</span>'
        + (o.e ? '<small><em>' + esc(L.evidence) + '</em> ' + esc(o.e) + '</small>' : '') + '</div>';
    }).join('') + '</div>'
      + (c.outcomesNote ? '<p class="cs-note">' + esc(c.outcomesNote) + '</p>' : '')
      + (c.region ? '<div class="cs-callout cs-callout--region"><h3 class="case__h3">' + esc(c.region.t) + '</h3>' + list(c.region.items, 'bullets bullets--sm') + '</div>' : ''));

    // 06 Live links & verification
    h += sec(5, (c.linksNote ? '<p class="cs-p cs-p--lead">' + esc(c.linksNote) + '</p>' : '')
      + (c.links && c.links.length ? '<div class="cs-links">' + c.links.map(function (l) {
        return '<a class="cs-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer"><b>' + esc(l.label) + '</b><span>' + esc(l.d || '') + '</span>' + ICON_EXT + '</a>';
      }).join('') + '</div>' : '')
      + (c.verify ? '<h3 class="cs-sub">' + esc(L.verify) + '</h3>' + list(c.verify, 'bullets bullets--sm') : ''));

    return h;
  }

  if (casePage) casePage.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-cs-jump]') : null;
    var t = b && doc.getElementById(b.getAttribute('data-cs-jump'));
    if (t) t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });

  function projectUrl(id) { return S.pages.project + '?p=' + encodeURIComponent(id); }

  function fillCase(p) {
    $('#case-media').innerHTML = mediaFor(p, 'page');
    $('#case-meta').innerHTML = '<span>' + esc(p.label) + '</span><span>' + esc(p.role) + '</span>' + statusBadge(p);
    $('#case-title').textContent = p.name;
    $('#case-lead').textContent = p.tagline;
    var full = !!(p.cs && S.ui.cs);
    $('#case-legacy').hidden = full;
    $('#case-cs').hidden = !full;
    $('#case-cs').innerHTML = full ? caseStudyHtml(p) : '';
    if (full) {
      $('#case-actions').innerHTML = (p.links && p.links[0] ? '<a class="btn btn--sm btn--primary" href="' + esc(p.links[0].url) + '" target="_blank" rel="noopener noreferrer">' + esc(S.ui.cs.visit.replace('{name}', p.links[0].label)) + ICON_EXT + '</a>' : '')
        + '<a class="btn btn--sm btn--ghost" href="' + esc(waLink(S.ui.discussText.replace('{name}', p.name))) + '" target="_blank" rel="noopener noreferrer">' + ICON_WA + esc(S.ui.discuss) + '</a>';
      return;
    }
    $('#case-problem').textContent = p.problem;
    $('#case-solution').textContent = p.solution;
    $('#case-highlights').innerHTML = (p.highlights || []).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('');
    var outs = $('#case-outcomes');
    outs.innerHTML = (p.outcomes || []).map(function (o) { return '<div class="outcome"><b>' + esc(o.v) + '</b><span>' + esc(o.l) + '</span></div>'; }).join('');
    outs.parentElement.hidden = !(p.outcomes && p.outcomes.length);
    $('#case-stack').innerHTML = (p.stack || []).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
    var html = '';
    (p.links || []).forEach(function (l, i) {
      html += '<a class="btn btn--sm ' + (i === 0 ? 'btn--primary' : 'btn--ghost') + '" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + ICON_EXT + '</a>';
    });
    if (!(p.links && p.links.length)) html += '<span class="case__note">' + esc(S.ui.private) + '</span>';
    html += '<a class="btn btn--sm btn--ghost" href="' + esc(waLink(S.ui.discussText.replace('{name}', p.name))) + '" target="_blank" rel="noopener noreferrer">' + ICON_WA + esc(S.ui.discuss) + '</a>';
    $('#case-actions').innerHTML = html;
  }

  /* Prev / next case study, wrapping around the project list. */
  function fillPager(i) {
    var el = $('#case-pager'), n = S.projects.length;
    if (!el || n < 2) return;
    var link = function (p, label, cls) {
      return '<a class="' + cls + '" href="' + esc(projectUrl(p.id)) + '"><span>' + esc(label) + '</span><b>' + esc(p.name) + '</b></a>';
    };
    el.innerHTML = link(S.projects[(i - 1 + n) % n], S.ui.prev, 'is-prev') + link(S.projects[(i + 1) % n], S.ui.next, 'is-next');
  }

  function renderCasePage() {
    var id = new global.URLSearchParams(global.location.search).get('p'), idx = -1;
    S.projects.forEach(function (x, i) { if (x.id === id) idx = i; });
    if (idx < 0) { global.location.replace(S.pages.home + '#work'); return; }
    var p = S.projects[idx];
    fillCase(p);
    fillPager(idx);
    doc.title = S.ui.pageTitle.replace('{name}', p.name);
    var desc = $('meta[name="description"]'); if (desc) desc.setAttribute('content', p.tagline);
    var canon = $('link[rel="canonical"]'); if (canon) canon.href = global.location.origin + global.location.pathname + '?p=' + encodeURIComponent(p.id);
    // The language switch opens the same case study in the other edition.
    $$('[data-lang-switch]').forEach(function (a) { a.href = a.getAttribute('data-lang-switch') + '?p=' + encodeURIComponent(p.id); });
  }

  /* Old #project-<id> links (from when case studies opened in a modal) redirect to the page. */
  var legacy = (global.location.hash || '').match(/^#project-([\w-]+)$/);
  if (legacy && grid) { global.location.replace(projectUrl(legacy[1])); return; }

  /* ---------- 9. Hero avatar (WebGL) + formation toggle ------------------- */
  var avatarWrap = $('#avatar'), avatarCanvas = $('#avatar-canvas'), avatar = null;
  if (avatarCanvas && global.Avatar) {
    avatar = global.Avatar.create(avatarCanvas, {
      count: global.innerWidth < 640 ? 2600 : 4200,
      deep: S.avatar.deep, mid: S.avatar.mid, ice: S.avatar.ice,
      onReady: function () { if (avatarWrap) avatarWrap.classList.add('is-ready'); }
    });
  }
  if (!avatar && avatarWrap) avatarWrap.classList.add('avatar--fallback', 'is-ready');
  global.PortfolioAvatar = avatar; /* exposed for debugging / custom integrations */

  var formBtns = $$('.forms__btn'), manual = false, cycleTimer = null;
  function currentForm() { for (var i = 0; i < formBtns.length; i++) if (formBtns[i].getAttribute('aria-pressed') === 'true') return i; return 0; }
  function scheduleCycle() {
    clearTimeout(cycleTimer);
    if (reduced || !avatar || !formBtns.length) return;
    cycleTimer = setTimeout(function () { setForm((currentForm() + 1) % formBtns.length, false); }, manual ? 14000 : 7000);
  }
  function setForm(i, isManual) {
    formBtns.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    if (avatar) avatar.morphTo(i);
    if (isManual) manual = true;
    scheduleCycle();
  }
  formBtns.forEach(function (b, i) { b.addEventListener('click', function () { setForm(i, true); }); });
  if (avatar && !reduced && formBtns.length) cycleTimer = setTimeout(function () { setForm(1, false); }, 4500);

  var hero = $('#hero');
  if (hero && avatar) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      avatar.setPointer((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1);
    }, { passive: true });
    hero.addEventListener('pointerleave', function () { avatar.setPointer(0, 0); });
  }
  if (avatarWrap && avatar) {
    avatarWrap.addEventListener('pointerenter', function () { avatar.setEnergy(1); });
    avatarWrap.addEventListener('pointerleave', function () { avatar.setEnergy(0); });
  }

  /* ---------- 10. Starfield ----------------------------------------------- */
  var sf = $('#starfield');
  if (sf && global.Starfield) global.Starfield.create(sf, { color: S.starColor || '255,255,255' });

  /* ---------- 11. Boot ---------------------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  renderFilters();
  renderProjects();
  if (casePage) renderCasePage();
  setupReveal();
})(window);
