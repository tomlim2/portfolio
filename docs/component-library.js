// Internal documentation navigation; keep this out of public site scripts.
(function () {
  var disclosure = document.getElementById('cl-toc-disclosure');
  var links = Array.from(document.querySelectorAll('.cl-toc-list a'));
  var targets = links.map(function (link) {
    return document.getElementById(link.hash.slice(1));
  });
  var currentLabel = document.querySelector('.cl-toc-current');
  var desktop = window.matchMedia('(min-width: 768px)');
  var activeIndex = -1;
  var scheduled = false;

  function updateCurrent() {
    scheduled = false;
    var index = 0;
    var threshold = desktop.matches ? 96 : 112;
    targets.forEach(function (target, i) {
      if (target.getBoundingClientRect().top <= threshold) index = i;
    });
    // The final section may be too short to reach the top of the viewport.
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      index = links.length - 1;
    }
    if (index === activeIndex) return;
    activeIndex = index;
    links.forEach(function (link, i) {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    currentLabel.textContent = links[index].textContent;
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateCurrent);
  }

  function syncLayout() {
    disclosure.open = desktop.matches;
    scheduleUpdate();
  }

  disclosure.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!desktop.matches) disclosure.open = false;
    // Native anchors retain deep links, keyboard focus, and browser history.
  });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  desktop.addEventListener('change', syncLayout);
  if ('ResizeObserver' in window) {
    new ResizeObserver(scheduleUpdate).observe(document.querySelector('.cl-main'));
  }
  syncLayout();
})();

// Read displayed values from the actual specimens, rather than a second token map.
(function () {
  var pending = false;

  function refreshSpecs() {
    pending = false;
    document.querySelectorAll('[data-color-token]').forEach(function (label) {
      var channels = getComputedStyle(label).getPropertyValue(label.dataset.colorToken).trim().split(/\s+/).map(Number);
      if (channels.length === 3 && channels.every(Number.isFinite)) {
        label.textContent = '#' + channels.map(function (channel) {
          return Math.round(channel).toString(16).padStart(2, '0');
        }).join('').toUpperCase();
      }
    });
    document.querySelectorAll('[data-current-theme]').forEach(function (label) {
      label.textContent = document.documentElement.dataset.theme === 'dark' ? '다크 · 내부 점검' : '라이트';
    });
    document.querySelectorAll('[data-type-for]').forEach(function (label) {
      var sample = document.getElementById(label.dataset.typeFor);
      var style = getComputedStyle(sample);
      var font = style.fontFamily.split(',')[0].replace(/["']/g, '');
      var size = Math.round(parseFloat(style.fontSize) * 100) / 100;
      var line = Math.round(parseFloat(style.lineHeight) * 100) / 100;
      label.textContent = font + ' · ' + size + 'px · ' + style.fontWeight + ' · 줄높이 ' + (Number.isFinite(line) ? line + 'px' : style.lineHeight);
    });
    document.querySelectorAll('[data-preview-language]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === document.documentElement.lang));
    });
  }

  function scheduleSpecs() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(refreshSpecs);
  }

  new MutationObserver(scheduleSpecs).observe(document.documentElement, {
    attributes: true, attributeFilter: ['lang', 'data-theme']
  });
  window.addEventListener('resize', scheduleSpecs);
  window.addEventListener('load', scheduleSpecs);
  document.addEventListener('DOMContentLoaded', scheduleSpecs);
  if (document.fonts) document.fonts.ready.then(scheduleSpecs);
  scheduleSpecs();

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.hidden = false;
    button.addEventListener('click', async function () {
      var code = document.getElementById(button.dataset.copy);
      var status = button.parentElement.querySelector('[role="status"]');
      status.textContent = '';
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = '복사했습니다. 경로와 [REPLACE]를 교체하세요.';
      } catch (_) {
        // Clipboard permissions vary. Leave the original code visible and selectable.
        code.parentElement.focus({ preventScroll: true });
        var range = document.createRange();
        range.selectNodeContents(code);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = '자동 복사가 제한되어 코드를 선택했습니다. Ctrl+C / ⌘C로 복사하세요.';
      }
    });
  });
})();
