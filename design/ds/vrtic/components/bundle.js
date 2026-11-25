/* @ds-bundle: {"format":4,"namespace":"Vrtic","components":[{"name":"Button"},{"name":"AgeBadge"},{"name":"Highlight"},{"name":"SectionHeading"},{"name":"Icon"},{"name":"Photo"},{"name":"FeatureCard"},{"name":"ProgramCard"},{"name":"Checklist"},{"name":"Schedule"},{"name":"MenuCard"},{"name":"ContactCard"},{"name":"StickerBadge"},{"name":"SiteHeader"},{"name":"Field"},{"name":"Reveal"}]} */
(function () {
  var R = window.React;
  var h = R.createElement;

  function cx() {
    return Array.prototype.slice.call(arguments).filter(Boolean).join(' ');
  }
  function rest(props, skip) {
    var out = {};
    for (var k in props) if (skip.indexOf(k) === -1) out[k] = props[k];
    return out;
  }

  /* ---------- Icon ---------- */
  var C = function (cx_, cy, r) { return { t: 'circle', a: { cx: cx_, cy: cy, r: r } }; };
  var RC = function (x, y, w, hh, rx) { return { t: 'rect', a: { x: x, y: y, width: w, height: hh, rx: rx } }; };
  var ICONS = {
    sun: [C(12, 12, 4.8), 'M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.9 4.9l1.9 1.9M17.2 17.2l1.9 1.9M4.9 19.1l1.9-1.9M17.2 6.8l1.9-1.9'],
    heart: ['M12 19.8a1 1 0 0 1-.6-.2C8.3 17.5 4.5 14 4.5 9.9A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.8c0 4.1-3.8 7.6-6.9 9.7a1 1 0 0 1-.6.2z'],
    chat: ['M6.2 5.2h11.6A2.7 2.7 0 0 1 20.5 7.9v5.9a2.7 2.7 0 0 1-2.7 2.7h-7.1l-3.4 2.9a.8.8 0 0 1-1.3-.6v-2.3h-.2A2.7 2.7 0 0 1 3.1 13.8V7.9a2.7 2.7 0 0 1 2.7-2.7z', 'M8.4 10.8h.01M12 10.8h.01M15.6 10.8h.01'],
    pencil: ['M4.6 19.9a.9.9 0 0 1-1-1.1l.9-3.6L16.2 4.6a1.7 1.7 0 0 1 2.4 0l.9.9a1.7 1.7 0 0 1 0 2.4L8.3 19.1z', 'M14.6 6.4l3.1 3.1'],
    blocks: [RC(3.2, 12.6, 7.8, 7.8, 3), RC(13, 12.6, 7.8, 7.8, 3), RC(8.1, 3.6, 7.8, 7.8, 3)],
    book: ['M4.8 5.4h5.4A1.9 1.9 0 0 1 12 6.6a1.9 1.9 0 0 1 1.8-1.2h5.4a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-5.4A1.9 1.9 0 0 0 12 19.6a1.9 1.9 0 0 0-1.8-1.2H4.8a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z', 'M12 6.6v13'],
    music: ['M9 18V6.5l10-2V16', C(6.5, 18, 2.5), C(16.5, 16, 2.5)],
    plate: ['M4 11.4h16a.9.9 0 0 1 .9 1 9 9 0 0 1-17.8 0 .9.9 0 0 1 .9-1z', 'M9.2 7.4c0-1.4 1.1-1.7 1.1-3.1', 'M13.6 7.4c0-1.4 1.1-1.7 1.1-3.1', 'M3.4 20.6h17.2'],
    clock: [C(12, 12, 9), 'M12 7v5.2l3.2 2'],
    phone: ['M6.5 3.5h3.3l1.4 3.8-2 1.5a10.5 10.5 0 0 0 4.9 4.9l1.5-2 3.8 1.4v3.3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z'],
    pin: ['M12 21s7-5.8 7-11.2a7 7 0 0 0-14 0C5 15.2 12 21 12 21z', C(12, 9.8, 2.5)],
    mail: [RC(3, 5.5, 18, 13, 4), 'M4.2 8L12 13.2 19.8 8'],
    check: ['M5 12.8l4.4 4.4L19 7.6'],
    star: ['M12 3.6a.9.9 0 0 1 .8.5l2.1 4.3 4.7.7a.9.9 0 0 1 .5 1.5l-3.4 3.3.8 4.7a.9.9 0 0 1-1.3.9L12 17.3l-4.2 2.2a.9.9 0 0 1-1.3-.9l.8-4.7-3.4-3.3a.9.9 0 0 1 .5-1.5l4.7-.7 2.1-4.3a.9.9 0 0 1 .8-.5z'],
    arrow: ['M5 12h14M13 6l6 6-6 6'],
    shield: ['M12 3l7.5 2.8v6c0 4.9-3.2 7.9-7.5 9.2-4.3-1.3-7.5-4.3-7.5-9.2v-6z', 'M8.6 12.2l2.5 2.5 4.4-4.6'],
    users: [C(9, 8, 3), 'M3.2 19.5a5.8 5.8 0 0 1 11.6 0', C(17, 9, 2.4), 'M16.2 14.2a4.6 4.6 0 0 1 5.3 5.1'],
    menu: ['M4 7h16M4 12h16M4 17h16'],
    close: ['M6 6l12 12M18 6L6 18'],
    alert: [C(12, 12, 9), 'M12 7.5v5.5M12 16.5h.01']
  };
  function Icon(props) {
    var parts = ICONS[props.name] || [];
    var size = props.size || 24;
    return h('svg', {
      className: cx('vr-icon', props.className),
      width: size, height: size, viewBox: '0 0 24 24',
      fill: 'none', stroke: 'currentColor',
      strokeWidth: props.strokeWidth || 2.6, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 2,
      'aria-hidden': props.title ? undefined : 'true',
      role: props.title ? 'img' : undefined,
      'aria-label': props.title
    }, parts.map(function (d, i) {
      return typeof d === 'string' ? h('path', { key: i, d: d }) : h(d.t, Object.assign({ key: i }, d.a));
    }));
  }

  /* ---------- Brush (internal): ragged marker stroke and torn panel ---------- */
  var STROKE_D = 'M6 20C10 10 30 12 60 9C100 6 150 10 190 8C196 14 199 20 196 26C199 32 197 40 192 46C170 52 120 50 80 53C50 55 25 52 8 50C3 44 6 38 4 32C7 28 3 24 6 20Z';
  var PANEL_D = 'M0 0H100V91L97 93L99.4 95.6L95 97.5L89 95.4L83 98.2L76 96L69 98.8L62 96.2L55 98.6L47 96.2L40 98.8L33 96L26 98.4L19 96.2L12 98.2L6 95.8L1.6 97L3.4 93.4L0 91Z';
  function Brush(props) {
    var isPanel = props.kind === 'panel';
    return h('svg', Object.assign({
      className: cx('vr-brush', 'vr-brush--' + (props.kind || 'stroke'), 'vr-tone-' + (props.tone || 'sun')),
      viewBox: isPanel ? '0 0 100 100' : '0 0 200 60',
      preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false'
    }, props.attrs || {}), h('path', { d: isPanel ? PANEL_D : STROKE_D }));
  }

  /* ---------- Button ---------- */
  function Button(props) {
    var variant = props.variant || 'primary';
    var size = props.size || 'md';
    var cls = cx('vr-btn', 'vr-btn--' + variant, 'vr-btn--' + size, props.className);
    var inner = [props.children, props.icon ? h(Icon, { key: 'i', name: props.icon, size: 20 }) : null];
    var other = rest(props, ['variant', 'size', 'className', 'children', 'icon', 'href']);
    if (props.href) return h('a', Object.assign({ className: cls, href: props.href }, other), inner);
    return h('button', Object.assign({ className: cls, type: props.type || 'button' }, other), inner);
  }

  /* ---------- AgeBadge ---------- */
  function AgeBadge(props) {
    return h('span', {
      className: cx('vr-age', 'vr-tone-' + (props.tone || 'berry'), props.className),
      style: { transform: 'rotate(' + (props.tilt == null ? -4 : props.tilt) + 'deg)' }
    }, props.children);
  }

  /* ---------- Highlight ---------- */
  function Highlight(props) {
    return h('span', { className: cx('vr-hl', props.className) },
      h(Brush, { kind: 'stroke', tone: props.tone || 'sun', attrs: { 'data-vr-brush': '' } }),
      h('span', { className: 'vr-hl__text' }, props.children));
  }

  /* ---------- SectionHeading ---------- */
  function SectionHeading(props) {
    var Tag = props.as || 'h2';
    return h('header', { className: cx('vr-sh', 'vr-sh--' + (props.align || 'center'), props.className) },
      props.eyebrow ? h('p', { className: 'vr-sh__eyebrow' }, props.eyebrow) : null,
      h(Tag, { className: cx('vr-sh__title', props.level === 'display' && 'vr-sh__title--display') }, props.title),
      props.children ? h('p', { className: 'vr-sh__sub' }, props.children) : null);
  }

  /* ---------- Photo ---------- */
  function Scene(props) {
    return h('svg', { className: 'vr-photo__scene', viewBox: '0 0 400 300', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' },
      h('rect', { width: 400, height: 300, className: 'vr-sc-sky' }),
      h('circle', { cx: 300, cy: 84, r: 44, className: 'vr-sc-sun' }),
      h('path', { d: 'M300 24v14M300 130v14M240 84h14M346 84h14M258 42l10 10M332 116l10 10M258 126l10-10M332 52l10-10', className: 'vr-sc-ray' }),
      h('path', { d: 'M0 214C60 170 120 168 190 204C250 234 330 196 400 176V300H0Z', className: 'vr-sc-hill2' }),
      h('path', { d: 'M0 250C70 214 150 222 230 252C290 272 350 250 400 232V300H0Z', className: 'vr-sc-hill1' }),
      h('rect', { x: 62, y: 190, width: 34, height: 34, rx: 6, className: 'vr-sc-b1', transform: 'rotate(-8 79 207)' }),
      h('rect', { x: 100, y: 200, width: 34, height: 34, rx: 6, className: 'vr-sc-b2', transform: 'rotate(6 117 217)' }),
      h('rect', { x: 82, y: 160, width: 34, height: 34, rx: 6, className: 'vr-sc-b3', transform: 'rotate(-3 99 177)' }));
  }
  function Photo(props) {
    return h('figure', {
      className: cx('vr-photo', 'vr-tone-' + (props.tone || 'sun'), props.className),
      style: { aspectRatio: props.ratio || '4 / 3' }
    },
      props.src ? h('img', { src: props.src, alt: props.alt || '', loading: 'lazy' }) : h(Scene),
      props.caption ? h('figcaption', { className: 'vr-photo__cap' }, props.caption) : null);
  }

  /* ---------- FeatureCard ---------- */
  function FeatureCard(props) {
    return h('article', {
      className: cx('vr-fc', 'vr-tone-' + (props.tone || 'berry'), props.className),
      style: props.tilt ? { transform: 'rotate(' + props.tilt + 'deg)' } : undefined
    },
      props.icon ? h('span', { className: 'vr-fc__icon' }, h(Icon, { name: props.icon, size: 28 })) : null,
      h('h3', { className: 'vr-fc__title' }, props.title),
      props.children ? h('p', { className: 'vr-fc__text' }, props.children) : null,
      props.items ? h('ul', { className: 'vr-fc__list' }, props.items.map(function (t, i) { return h('li', { key: i }, t); })) : null);
  }

  /* ---------- ProgramCard ---------- */
  function ProgramCard(props) {
    var tone = props.tone || 'berry';
    return h('article', { className: cx('vr-pc', 'vr-tone-' + tone, props.className) },
      h('div', { className: 'vr-pc__head' },
        h('h3', { className: 'vr-pc__title' }, props.title),
        h(AgeBadge, { tone: tone, tilt: props.tilt == null ? -4 : props.tilt }, props.age)),
      h(Photo, { src: props.photo, alt: props.alt, tone: tone, ratio: props.ratio || '4 / 3', className: 'vr-pc__photo' }),
      h('div', { className: 'vr-pc__body' },
        h(Brush, { kind: 'panel', tone: tone }),
        h('p', { className: 'vr-pc__text' }, props.children),
        h(Button, { variant: 'outline', size: 'md', href: props.href || '#', icon: 'arrow' }, props.ctaLabel || 'Saznajte više')));
  }

  /* ---------- Checklist ---------- */
  function Checklist(props) {
    return h('ul', { className: cx('vr-cl', 'vr-tone-' + (props.tone || 'berry'), props.className) },
      props.items.map(function (t, i) {
        return h('li', { key: i }, h('span', { className: 'vr-cl__mark' }, h(Icon, { name: 'check', size: 16, strokeWidth: 3.5 })), h('span', null, t));
      }));
  }

  /* ---------- Schedule ---------- */
  function Schedule(props) {
    return h('ol', { className: cx('vr-sch', 'vr-tone-' + (props.tone || 'sun'), props.className) },
      props.rows.map(function (r, i) {
        return h('li', { key: i },
          h('span', { className: 'vr-sch__time' }, r.time),
          h('span', { className: 'vr-sch__what' }, r.label));
      }));
  }

  /* ---------- MenuCard ---------- */
  function MenuCard(props) {
    return h('article', { className: cx('vr-mc', 'vr-tone-' + (props.tone || 'sun'), props.className) },
      h('header', { className: 'vr-mc__head' }, h(Icon, { name: 'plate', size: 24 }), h('h3', { className: 'vr-mc__day' }, props.day)),
      h('dl', { className: 'vr-mc__meals' },
        props.meals.map(function (m, i) {
          return h(R.Fragment, { key: i }, h('dt', null, m.kind), h('dd', null, m.text));
        })));
  }

  /* ---------- ContactCard ---------- */
  function ContactCard(props) {
    function row(icon, content) {
      return h('li', { key: icon }, h('span', { className: 'vr-cc__ic' }, h(Icon, { name: icon, size: 22 })), h('span', { className: 'vr-cc__val' }, content));
    }
    var rows = [];
    if (props.hours) rows.push(row('clock', props.hours));
    if (props.phone) rows.push(row('phone', h('a', { href: 'tel:' + String(props.phone).replace(/[^+\d]/g, '') }, props.phone)));
    if (props.email) rows.push(row('mail', h('a', { href: 'mailto:' + props.email }, props.email)));
    if (props.address) rows.push(row('pin', props.address));
    return h('article', { className: cx('vr-cc', 'vr-tone-' + (props.tone || 'sky'), props.className) },
      h('h3', { className: 'vr-cc__title' }, props.title || 'Kontakt'),
      h('ul', { className: 'vr-cc__list' }, rows),
      props.ctaLabel ? h(Button, { variant: 'primary', href: props.href || '#' }, props.ctaLabel) : null);
  }

  /* ---------- StickerBadge ---------- */
  function StickerBadge(props) {
    var id = 'vr-sb-' + R.useId().replace(/[^a-zA-Z0-9]/g, '');
    var size = props.size || 168;
    var text = (props.text || 'Dođite da se upoznamo').toUpperCase() + ' · ';
    return h('span', { className: cx('vr-sb', props.className), style: { width: size, height: size } },
      h('svg', { viewBox: '0 0 200 200', width: size, height: size, role: 'img', 'aria-label': props.text || 'Dođite da se upoznamo' },
        h('defs', null, h('path', { id: id, d: 'M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0' })),
        h('circle', { cx: 100, cy: 100, r: 96, className: 'vr-sb__bg' }),
        h('circle', { cx: 100, cy: 100, r: 50, className: 'vr-sb__face' }),
        h('path', { d: 'M82 92v8M118 92v8', className: 'vr-sb__eyes' }),
        h('path', { d: 'M78 112c6 14 38 14 44 0', className: 'vr-sb__smile' }),
        h('text', { className: 'vr-sb__text' }, h('textPath', { href: '#' + id, startOffset: 0, textLength: 480 }, text))));
  }

  /* ---------- SiteHeader ---------- */
  function SiteHeader(props) {
    var st = R.useState(!!props.defaultOpen), open = st[0], setOpen = st[1];
    var links = props.links || [];
    return h('header', { className: cx('vr-hd', open && 'is-open', props.className) },
      (props.address || props.hours || props.phone) ? h('div', { className: 'vr-hd__top' },
        props.address ? h('span', null, props.address) : null,
        props.hours ? h('span', null, props.hours) : null,
        props.phone ? h('a', { href: 'tel:' + String(props.phone).replace(/[^+\d]/g, '') }, props.phone) : null) : null,
      h('div', { className: 'vr-hd__bar' },
        h('a', { className: 'vr-hd__name', href: props.homeHref || '#' }, props.name),
        h('button', {
          className: 'vr-hd__toggle', type: 'button', 'aria-expanded': open, 'aria-controls': 'vr-hd-nav',
          onClick: function () { setOpen(!open); }
        }, h(Icon, { name: open ? 'close' : 'menu', size: 22 }), h('span', null, open ? 'Zatvori' : 'Meni')),
        h('nav', { className: 'vr-hd__nav', id: 'vr-hd-nav', 'aria-label': 'Glavni meni' },
          h('ul', null, links.map(function (l, i) {
            return h('li', { key: i }, h('a', { href: l.href || '#', 'aria-current': l.label === props.current ? 'page' : undefined }, l.label));
          })),
          props.ctaLabel ? h(Button, { variant: 'primary', size: 'sm', href: props.ctaHref || '#' }, props.ctaLabel) : null)));
  }

  /* ---------- Field ---------- */
  function Field(props) {
    var autoId = R.useId();
    var id = props.id || ('vr-f-' + autoId.replace(/[^a-zA-Z0-9]/g, ''));
    var as = props.as || 'input';
    var other = rest(props, ['label', 'hint', 'error', 'as', 'id', 'className', 'children']);
    var describedBy = [props.hint ? id + '-h' : null, props.error ? id + '-e' : null].filter(Boolean).join(' ') || undefined;
    var control = h(as, Object.assign({ id: id, className: 'vr-field__ctl', 'aria-invalid': props.error ? 'true' : undefined, 'aria-describedby': describedBy }, other), props.children);
    return h('div', { className: cx('vr-field', props.error && 'has-error', props.className) },
      h('label', { htmlFor: id, className: 'vr-field__label' }, props.label),
      props.hint ? h('p', { id: id + '-h', className: 'vr-field__hint' }, props.hint) : null,
      as === 'select' ? h('span', { className: 'vr-field__sel' }, control, h(Icon, { name: 'arrow', size: 18, className: 'vr-field__caret' })) : control,
      props.error ? h('p', { id: id + '-e', className: 'vr-field__err' }, h(Icon, { name: 'alert', size: 18 }), h('span', null, props.error)) : null);
  }


  /* ---------- Pokret: GSAP + Lenis (učitavaju se na stranici; bez njih sve ostaje vidljivo) ---------- */
  var MOTION = {
    duration: { fast: 0.15, base: 0.3, slow: 0.7 },
    ease: { out: 'power3.out', pop: 'back.out(1.6)', soft: 'power2.inOut' },
    distance: 32,
    stagger: 0.08,
    start: 'top 88%',
    lenis: { duration: 1.1, smoothWheel: true, syncTouch: false }
  };
  function prefersReduced() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function fromVars(kind) {
    var d = MOTION.distance, slow = MOTION.duration.slow, ease = MOTION.ease.out;
    if (kind === 'pop') return { opacity: 0, scale: 0.8, duration: 0.6, ease: MOTION.ease.pop };
    if (kind === 'left') return { opacity: 0, x: -d, duration: slow, ease: ease };
    if (kind === 'right') return { opacity: 0, x: d, duration: slow, ease: ease };
    return { opacity: 0, y: d, duration: slow, ease: ease };
  }
  function initMotion(opts) {
    opts = opts || {};
    var g = window.gsap;
    var noop = { lenis: null, destroy: function () {} };
    if (!g || prefersReduced()) return noop;
    var ST = window.ScrollTrigger;
    var useST = !!ST && !opts.immediate;
    if (useST) g.registerPlugin(ST);
    var root = opts.root || document;
    var lenis = null, tick = null, onClick = null;
    if (!opts.immediate && opts.smooth !== false && window.Lenis) {
      lenis = new window.Lenis({ duration: MOTION.lenis.duration, smoothWheel: MOTION.lenis.smoothWheel, syncTouch: MOTION.lenis.syncTouch });
      if (useST) lenis.on('scroll', ST.update);
      tick = function (t) { lenis.raf(t * 1000); };
      g.ticker.add(tick);
      g.ticker.lagSmoothing(0);
      onClick = function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
        var id = a && a.getAttribute('href');
        if (!id || id === '#') return;
        try {
          var t = document.querySelector(id);
          if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -16 }); }
        } catch (err) {}
      };
      document.addEventListener('click', onClick);
    }
    function trig(el, start) { return useST ? { trigger: el, start: start || MOTION.start, once: true } : undefined; }
    var ctx = g.context(function () {
      root.querySelectorAll('[data-vr-stagger]').forEach(function (grp) {
        var v = fromVars('up'); v.stagger = MOTION.stagger;
        if (useST) v.scrollTrigger = trig(grp);
        g.from(grp.children, v);
      });
      root.querySelectorAll('[data-vr-reveal]').forEach(function (el) {
        if (el.closest('[data-vr-stagger]')) return;
        var v = fromVars(el.getAttribute('data-vr-reveal') || 'up');
        var delay = parseFloat(el.getAttribute('data-vr-delay'));
        if (delay) v.delay = delay;
        if (useST) v.scrollTrigger = trig(el);
        g.from(el, v);
      });
      root.querySelectorAll('[data-vr-brush]').forEach(function (el) {
        var v = { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.6, ease: 'power2.out', delay: 0.15 };
        if (useST) v.scrollTrigger = trig(el.closest('.vr-hl') || el, 'top 90%');
        g.from(el, v);
      });
      root.querySelectorAll('[data-vr-float]').forEach(function (el) {
        g.to(el, { y: -8, rotation: '+=3', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
    }, root.nodeType === 1 ? root : undefined);
    return {
      lenis: lenis,
      destroy: function () {
        ctx.revert();
        if (tick) g.ticker.remove(tick);
        if (lenis) lenis.destroy();
        if (onClick) document.removeEventListener('click', onClick);
      }
    };
  }

  /* ---------- Reveal ---------- */
  function Reveal(props) {
    var Tag = props.as || 'div';
    var attrs = { className: props.className };
    if (props.stagger) attrs['data-vr-stagger'] = '';
    else if (props.float) attrs['data-vr-float'] = '';
    else attrs['data-vr-reveal'] = props.variant || 'up';
    if (props.delay) attrs['data-vr-delay'] = props.delay;
    return h(Tag, attrs, props.children);
  }

  var API = { Button: Button, AgeBadge: AgeBadge, Highlight: Highlight, SectionHeading: SectionHeading, Icon: Icon, Photo: Photo, FeatureCard: FeatureCard, ProgramCard: ProgramCard, Checklist: Checklist, Schedule: Schedule, MenuCard: MenuCard, ContactCard: ContactCard, StickerBadge: StickerBadge, SiteHeader: SiteHeader, Field: Field, Reveal: Reveal };
  window.Vrtic = window.Vrtic || {};
  Object.assign(window.Vrtic, API);
  window.Vrtic.motion = { init: initMotion, tokens: MOTION };
})();
