// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukázka formuláře: nic se neodesílá. Po spuštění webu bude zpráva doručena na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odesílám…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Děkujeme, zpráva byla odeslána.'; })
        .catch(function () { stav.textContent = 'Odeslání se nepodařilo. Napište nám prosím e-mailem.'; });
    });
  });
})();

// Světelný kužel v hero sleduje kurzor / prst.
(function () {
  var h = document.querySelector('.hero'); if (!h) return;
  function pohyb(e) {
    var r = h.getBoundingClientRect(), p = e.touches ? e.touches[0] : e;
    h.style.setProperty('--x', (p.clientX - r.left) + 'px');
    h.style.setProperty('--y', (p.clientY - r.top) + 'px');
  }
  h.addEventListener('pointermove', pohyb); h.addEventListener('touchmove', pohyb, { passive: true });
})();

// Videa: klik otevře YouTube přehrávač v okně (youtube-nocookie), Esc nebo klik mimo zavře.
(function () {
  var okno;
  function zavri() { if (okno) { okno.remove(); okno = null; document.removeEventListener('keydown', klav); } }
  function klav(e) { if (e.key === 'Escape') zavri(); }
  document.querySelectorAll('[data-yt]').forEach(function (b) {
    b.addEventListener('click', function () {
      okno = document.createElement('div'); okno.className = 'prehravac'; okno.setAttribute('role', 'dialog'); okno.setAttribute('aria-label', 'Přehrávač videa');
      okno.innerHTML = '<div><button type="button" aria-label="Zavřít">×</button><iframe src="https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Svatební video"></iframe></div>';
      okno.addEventListener('click', function (e) { if (e.target === okno || e.target.tagName === 'BUTTON') zavri(); });
      document.body.appendChild(okno); document.addEventListener('keydown', klav);
      okno.querySelector('button').focus();
    });
  });
})();

// Hlavička dostane po odscrollování plné pozadí.
(function () {
  var h = document.querySelector('.hlavicka'); if (!h) return;
  function f() { h.classList.toggle('plna', window.scrollY > 40); }
  f(); window.addEventListener('scroll', f, { passive: true });
})();

// Mobilní menu.
(function () {
  var h = document.querySelector('.hlavicka'), b = document.querySelector('.menu-btn'); if (!b) return;
  b.addEventListener('click', function () { var o = h.classList.toggle('otevrene'); b.setAttribute('aria-expanded', o); });
  h.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', function () { h.classList.remove('otevrene'); b.setAttribute('aria-expanded', false); }); });
})();
