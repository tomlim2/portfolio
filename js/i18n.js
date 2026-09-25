// Language selection — Korean by default, English on request.
(function () {
  function applyLang(l) {
    document.documentElement.setAttribute('lang', l === 'ko' ? 'ko' : 'en');

    document.querySelectorAll('[data-ko]').forEach(function (el) {
      if (l === 'ko') {
        if (!el.getAttribute('data-en')) {
          el.setAttribute('data-en', el.innerHTML);
        }
        el.innerHTML = el.getAttribute('data-ko');
      } else {
        if (el.getAttribute('data-en')) {
          el.innerHTML = el.getAttribute('data-en');
        }
      }
    });

    // Switch fonts for Korean/English — Noto Rashi Hebrew → Noto Sans KR
    var rashiEls = document.querySelectorAll('.hero-tagline, .page-title, .card-title, .about-role, .nav-links a');
    rashiEls.forEach(function (el) {
      el.style.fontFamily = l === 'ko' ? "'Noto Sans KR', sans-serif" : "";
    });
    // Hero tagline letter-spacing
    document.querySelectorAll('.hero-tagline').forEach(function (el) {
      el.style.letterSpacing = l === 'ko' ? '-0.02rem' : '';
    });

    // Keep every language control in sync without replacing focused buttons.
    document.querySelectorAll('button[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === l));
    });
  }

  // Apply on load — always Korean
  document.addEventListener('DOMContentLoaded', function () {
    applyLang('ko');
  });

  // Native buttons support pointer, Enter, and Space activation independently.
  document.addEventListener('click', function (e) {
    var button = e.target.closest('button[data-lang]');
    if (!button || button.disabled) return;
    var language = button.dataset.lang;
    if (language === 'ko' || language === 'en') applyLang(language);
  });
})();
