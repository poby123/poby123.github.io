(function () {
  var root = document.documentElement;
  var KEY = 'wonju.lang';
  var titleKo = document.title;
  var titleEn = root.getAttribute('data-title-en');

  function apply(lang) {
    root.dataset.lang = lang;
    root.setAttribute('lang', lang === 'en' ? 'en' : 'ko');
    if (titleEn) document.title = lang === 'en' ? titleEn : titleKo;
    document.querySelectorAll('.langswitch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var param = new URLSearchParams(location.search).get('lang');
  apply(param === 'en' || param === 'ko' ? param : (saved || 'ko'));

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.langswitch button');
    if (btn) apply(btn.dataset.setLang);
  });

  // 히어로 콜 트레이스: 페이지 진입 시 한 번만 재생한다.
  var trace = document.querySelector('.trace');
  if (trace) requestAnimationFrame(function () { trace.classList.add('play'); });
})();
