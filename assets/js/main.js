/* Waldorfski dječji vrtić Duga: ponašanje stranice (bez ovisnosti, GSAP/Lenis su opcionalni) */
(function () {
  'use strict';

  // ---- Postavke forme -------------------------------------------------------
  // Ako je FORM_ENDPOINT prazan, "Zakažite posjet" otvara e-mail s pripremljenom porukom (mailto).
  // Za pravo slanje bez servera upiši adresu iz Formspree / Web3Forms / sl., npr.
  // var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
  var FORM_ENDPOINT = '';
  var FORM_TO = 'info@waldorfskivrticduga.hr';

  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lenis = null;

  // ---- Zaglavlje: meni na telefonu, skriva se pri skrolu dolje --------------
  var hd = $('.vr-hd');
  var toggle = $('.vr-hd__toggle');
  if (hd && toggle) {
    var icoMenu = toggle.querySelector('svg') ? toggle.querySelector('svg').outerHTML : '';
    var icoClose = '<svg class="vr-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
    var setMenu = function (open) {
      hd.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.innerHTML = (open ? icoClose : icoMenu) + '<span>' + (open ? 'Zatvori' : 'Meni') + '</span>';
    };
    toggle.addEventListener('click', function () { setMenu(!hd.classList.contains('is-open')); });
    $$('.vr-hd__nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && hd.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });

    var lastY = window.pageYOffset, ticking = false;
    var onScroll = function () {
      var y = window.pageYOffset, d = y - lastY;
      if (Math.abs(d) > 6) {
        var hide = d > 0 && y > 160 && !hd.classList.contains('is-open') && !document.documentElement.classList.contains('is-modal');
        hd.classList.toggle('is-hidden', hide);
        lastY = y;
      }
      if (y <= 160) hd.classList.remove('is-hidden');
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); } }, { passive: true });
    hd.addEventListener('focusin', function () { hd.classList.remove('is-hidden'); });
  }

  // ---- Prozor s formom ------------------------------------------------------
  var ov = $('#posjeta');
  var dlg = $('.vz-dlg');
  var form = $('#vz-form');
  var okBox = $('#vz-ok');
  var opener = null;
  var LONG = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'];
  var ACC = ['nedjelju', 'ponedjeljak', 'utorak', 'srijedu', 'četvrtak', 'petak', 'subotu'];
  var SHORT = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
  var TIMES = ['09:00', '11:00', '15:00'];
  var AGES = [3, 4, 5, 6, 7];
  var st = { dob: '', dan: '', vrijeme: '', tried: false };
  var days = [];

  function buildDays() {
    days = [];
    var d0 = new Date();
    d0.setHours(12, 0, 0, 0);
    while (days.length < 5) {
      d0.setDate(d0.getDate() + 1);
      var w = d0.getDay();
      if (w > 0 && w < 6) {
        var date = d0.getDate() + '.' + (d0.getMonth() + 1) + '.';
        days.push({ key: d0.getFullYear() + '-' + (d0.getMonth() + 1) + '-' + d0.getDate(), short: SHORT[w], date: date, long: LONG[w] + ', ' + date, acc: ACC[w] + ', ' + date });
      }
    }
  }
  function chip(html, label, pressed, onclick) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    if (label) b.setAttribute('aria-label', label);
    b.innerHTML = html;
    b.addEventListener('click', onclick);
    return b;
  }
  function renderChips() {
    var a = $('.chips--a', form), d = $('.chips--d', form), t = $('.chips--t', form);
    a.innerHTML = ''; d.innerHTML = ''; t.innerHTML = '';
    AGES.forEach(function (n) {
      a.appendChild(chip(String(n), n + (n < 5 ? ' godine' : ' godina'), String(n) === st.dob, function () { st.dob = String(n); renderChips(); validate(); }));
    });
    days.forEach(function (x) {
      d.appendChild(chip('<span class="chip-d">' + x.short + '</span><span>' + x.date + '</span>', x.long, x.key === st.dan, function () { st.dan = x.key; renderChips(); validate(); }));
    });
    TIMES.forEach(function (x) {
      t.appendChild(chip(x, '', x === st.vrijeme, function () { st.vrijeme = x; renderChips(); validate(); }));
    });
  }
  var val = function (id) { return (document.getElementById(id).value || '').trim(); };
  var okName = function (v) { return v.length >= 2; };
  var okPhone = function (v) { return v.replace(/\D/g, '').length >= 8; };
  var okMail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };

  function mark(id, bad, wrapSel) {
    var el = document.getElementById(id);
    var wrap = wrapSel ? el.closest(wrapSel) : el.parentNode;
    var err = wrap.querySelector('.vr-field__err');
    if (wrap.classList.contains('vr-field')) wrap.classList.toggle('has-error', bad);
    if (el.tagName === 'INPUT') el.setAttribute('aria-invalid', bad ? 'true' : 'false');
    if (err) err.hidden = !bad;
  }
  function showErr(sel, bad) { var e = $(sel, form); if (e) e.hidden = !bad; }

  function validate() {
    var r = {
      ime: okName(val('vz-ime')), tel: okPhone(val('vz-tel')), mail: okMail(val('vz-mail')), dijete: okName(val('vz-dijete')),
      dob: !!st.dob, dan: !!st.dan, vrijeme: !!st.vrijeme, cb: document.getElementById('vz-cb').checked
    };
    var all = r.ime && r.tel && r.mail && r.dijete && r.dob && r.dan && r.vrijeme && r.cb;
    if (st.tried) {
      mark('vz-ime', !r.ime); mark('vz-tel', !r.tel); mark('vz-mail', !r.mail); mark('vz-dijete', !r.dijete);
      showErr('.err-dob', !r.dob); showErr('.err-dan', !r.dan); showErr('.err-vrijeme', !r.vrijeme);
      var cbw = document.getElementById('vz-cb').closest('.vr-field');
      cbw.classList.toggle('has-error', !r.cb);
      document.getElementById('vz-cb').setAttribute('aria-invalid', r.cb ? 'false' : 'true');
      showErr('.err-cb', !r.cb);
      var sum = $('.vz-sum', form); sum.hidden = all; sum.textContent = 'Neka polja nisu dobro popunjena. Provjerite ona označena crvenom bojom.';
    }
    return all;
  }

  function openDialog(opener_) {
    if (!ov) return;
    opener = opener_ || document.activeElement;
    buildDays();
    renderChips();
    ov.classList.add('is-open');
    ov.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('is-modal');
    if (lenis) lenis.stop();
    if (hd) hd.classList.remove('is-hidden');
    ov.scrollTop = 0;
    if (window.gsap && !reduce) {
      var g = window.gsap;
      g.fromTo(dlg, { y: 32, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' });
      g.fromTo('.vz-sc', { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power1.out', clearProps: 'opacity' });
      var f = $$('.vz-dlg .fm > *');
      if (f.length && okBox.hidden) g.fromTo(f, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.035, delay: 0.12, clearProps: 'transform,opacity' });
    }
    setTimeout(function () { var el = document.getElementById(okBox.hidden ? 'vz-ime' : 'vz-ok-btn'); if (el && el.focus) el.focus({ preventScroll: true }); }, 80);
  }
  function closeDialog() {
    if (!ov || !ov.classList.contains('is-open')) return;
    ov.classList.remove('is-open');
    ov.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('is-modal');
    if (lenis) lenis.start();
    if (opener && opener.focus) opener.focus({ preventScroll: true });
    if (!okBox.hidden) resetForm();
  }
  function resetForm() {
    form.reset();
    st = { dob: '', dan: '', vrijeme: '', tried: false };
    $$('.vr-field__err', form).forEach(function (e) { e.hidden = true; });
    $$('.has-error', form).forEach(function (e) { e.classList.remove('has-error'); });
    $('.vz-sum', form).hidden = true;
    okBox.hidden = true; form.hidden = false; dlg.classList.remove('is-sent');
  }
  function firstName(v) { return v.split(/\s+/)[0]; }

  function showThanks(mode) {
    var chosen = days.filter(function (x) { return x.key === st.dan; })[0];
    var name = firstName(val('vz-ime'));
    var when = (chosen ? chosen.acc : '') + ' u ' + st.vrijeme;
    if (mode === 'mailto') {
      $('#vz-th').textContent = 'Skoro gotovo, ' + name + '!';
      $('#vz-when').textContent = 'Otvorio se vaš e-mail program s pripremljenom porukom. Pošaljite je da zaprimimo termin: ' + when + '.';
      $('#vz-sub').textContent = 'Ako se ništa nije otvorilo, pišite nam na ' + FORM_TO + ' ili nazovite 021 207 081.';
    } else {
      $('#vz-th').textContent = 'Hvala, ' + name + '!';
      $('#vz-when').textContent = 'Čekamo vas u ' + when + '.';
      $('#vz-sub').textContent = 'Nazvat ćemo vas na ' + val('vz-tel') + ' da potvrdimo termin. Dolazite s djetetom: ' + val('vz-dijete') + ' (' + st.dob + ' g.).';
    }
    form.hidden = true; okBox.hidden = false; dlg.classList.add('is-sent');
    if (window.gsap && !reduce) {
      window.gsap.fromTo('.ok-ic', { scale: 0, rotate: -25 }, { scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2)', clearProps: 'transform' });
      window.gsap.fromTo('.vz-dlg .ok > *:not(.ok-ic)', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08, delay: 0.2, clearProps: 'transform,opacity' });
    }
    var b = document.getElementById('vz-ok-btn'); if (b) b.focus({ preventScroll: true });
  }

  function submitForm(e) {
    e.preventDefault();
    st.tried = true;
    if (!validate()) {
      var bad = $('.has-error input, .has-error textarea', form);
      if (bad) bad.focus();
      return;
    }
    var chosen = days.filter(function (x) { return x.key === st.dan; })[0];
    var data = {
      ime: val('vz-ime'), telefon: val('vz-tel'), email: val('vz-mail'), dijete: val('vz-dijete'), dob: st.dob,
      dan: chosen ? chosen.long : '', vrijeme: st.vrijeme, napomena: val('vz-nap')
    };
    if (FORM_ENDPOINT) {
      var btn = $('button[type=submit]', form); btn.disabled = true;
      var fd = new FormData();
      Object.keys(data).forEach(function (k) { fd.append(k, data[k]); });
      fetch(FORM_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) { btn.disabled = false; if (r.ok) showThanks('sent'); else throw new Error('x'); })
        .catch(function () {
          btn.disabled = false;
          var sum = $('.vz-sum', form); sum.hidden = false;
          sum.textContent = 'Slanje nije uspjelo. Pokušajte ponovo ili nas nazovite na 021 207 081.';
        });
      return;
    }
    var body = 'Dogovor posjete vrtiću Duga\r\n\r\n' +
      'Roditelj: ' + data.ime + '\r\nTelefon: ' + data.telefon + '\r\nE-mail: ' + data.email + '\r\n' +
      'Dijete: ' + data.dijete + ' (' + data.dob + ' g.)\r\nTermin: ' + data.dan + ' u ' + data.vrijeme + '\r\n' +
      (data.napomena ? 'Napomena: ' + data.napomena + '\r\n' : '') +
      '\r\nSlažem se da me vrtić nazove radi potvrde termina.';
    window.location.href = 'mailto:' + FORM_TO + '?subject=' + encodeURIComponent('Dogovor posjete: ' + data.dijete) + '&body=' + encodeURIComponent(body);
    showThanks('mailto');
  }

  if (ov && form) {
    form.addEventListener('submit', submitForm);
    form.addEventListener('input', function () { if (st.tried) validate(); });
    form.addEventListener('change', function () { if (st.tried) validate(); });
    $('.vz-sc').addEventListener('click', closeDialog);
    $('.vz-x').addEventListener('click', closeDialog);
    $('#vz-ok-btn').addEventListener('click', function () { resetForm(); buildDays(); renderChips(); document.getElementById('vz-ime').focus(); });
    document.addEventListener('keydown', function (e) {
      if (!ov.classList.contains('is-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeDialog(); return; }
      if (e.key === 'Tab') {
        var f = $$('button:not([disabled]), input, textarea, a[href]', dlg).filter(function (x) { return x.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // Svaki link na #posjeta otvara prozor; ostali interni linkovi glatko klize
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#posjeta') { e.preventDefault(); openDialog(a); return; }
    if (id.length > 1) {
      var el = document.getElementById(id.slice(1));
      if (el && lenis) { e.preventDefault(); lenis.scrollTo(el, { offset: -16, duration: 1.2 }); }
    } else if (id === '#' && lenis) { e.preventDefault(); lenis.scrollTo(0, { duration: 1.2 }); }
  });
  if (location.hash === '#posjeta') setTimeout(function () { openDialog(null); }, 300);

  // ---- Animacije (GSAP + ScrollTrigger + Lenis, ako su učitani) -------------
  function motion() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST || reduce) return;
    gsap.registerPlugin(ST);
    var done = function (els) { return function () { els.forEach(function (e) { e.style.transition = ''; e.style.transform = ''; e.style.opacity = ''; }); }; };
    var lift = function (els, o) {
      els.forEach(function (e) { e.style.transition = 'none'; });
      return gsap.fromTo(els, { y: o.y, opacity: 0, scale: o.scale || 1 }, { y: 0, opacity: 1, scale: 1, duration: o.d || 0.8, ease: 'power3.out', stagger: o.s || 0, delay: o.delay || 0, overwrite: true, onComplete: done(els) });
    };

    // pri učitavanju: samo hero
    var hero = [].concat($$('.hro-eb'), $$('.hro-copy .h1'), $$('.hro-copy .lead'), $$('.hro-copy .btns > *'));
    if (hero.length) lift(hero, { y: 28, s: 0.09, delay: 0.1 });
    var media = $$('.hro-media img');
    var mediaIn = media.length && media[0].offsetParent ? gsap.fromTo(media, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: 'power2.out', clearProps: 'transform' }) : null;
    var bar = $$('.vr-hd__bar');
    if (bar.length) gsap.fromTo(bar, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1, clearProps: 'transform,opacity' });

    // sve ostalo tek kad korisnik krene skrolati
    var EV = ['wheel', 'touchmove', 'scroll', 'keydown'];
    var armed = false;
    var below = function (e) { return e.getBoundingClientRect().top > window.innerHeight * 0.92; };
    function arm() {
      if (armed) return;
      armed = true;
      EV.forEach(function (n) { window.removeEventListener(n, arm); });

      if (window.Lenis) {
        lenis = new window.Lenis({ duration: 1.1, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
        lenis.on('scroll', ST.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
        if (document.documentElement.classList.contains('is-modal')) lenis.stop();
      }

      var groups = [
        ['.head, .aj-head, .bd-head, .tt-copy, .bd-year, .contact, .f3-in', { y: 32 }],
        ['.bd-chips li', { y: 16, scale: 0.85, s: 0.05 }],
        ['.ug-c, .aj-c, .bd-c, .z3-i', { y: 36, s: 0.09 }],
        ['.tt-ph, .bd-ph, .z3-ph, .contact-media, .aj-phs, .ug-cta, .aj-cta, .bd-cta, .z3-cta', { y: 32, scale: 0.97 }]
      ];
      groups.forEach(function (g) {
        var els = $$(g[0]).filter(below);
        if (!els.length) return;
        els.forEach(function (e) { e.style.transition = 'none'; });
        gsap.set(els, { opacity: 0, y: g[1].y, scale: g[1].scale || 1 });
        ST.batch(els, { start: 'top 92%', once: true, onEnter: function (b) { lift(b, g[1]); } });
      });
      $$('.bd-bar').filter(below).forEach(function (b) {
        gsap.fromTo(b, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.9, ease: 'power3.out', delay: 0.25, scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
      });

      var himg = $$('.hro-media img');
      var heroPar = function () { gsap.fromTo(himg, { scale: 1, yPercent: 0 }, { scale: 1.12, yPercent: 5, ease: 'none', scrollTrigger: { trigger: '.hro', start: 'top top', end: 'bottom top', scrub: true } }); };
      if (himg.length && himg[0].offsetParent) { if (mediaIn && mediaIn.isActive()) mediaIn.eventCallback('onComplete', heroPar); else heroPar(); }
      var hcopy = $$('.hro-copy');
      if (hcopy.length) gsap.to(hcopy, { y: -56, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hro', start: '30% top', end: 'bottom top', scrub: true } });

      $$('.frame img, .bd-ph img, .ug-ph img, .z3-big img, .z3-sm img').forEach(function (im) {
        var p = im.parentElement;
        if (!p || getComputedStyle(p).overflow !== 'hidden' || !below(p)) return;
        gsap.fromTo(im, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      $$('.aj-sun, .aj-plane').forEach(function (e) {
        if (!e.offsetParent) return;
        gsap.fromTo(e, { y: 48 }, { y: -48, ease: 'none', scrollTrigger: { trigger: '.aj', start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      var bar2 = document.createElement('div');
      bar2.setAttribute('aria-hidden', 'true');
      bar2.className = 'progress';
      document.body.appendChild(bar2);
      gsap.to(bar2, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
      ST.refresh();
    }
    EV.forEach(function (n) { window.addEventListener(n, arm, { passive: true }); });
  }
  motion();
})();
