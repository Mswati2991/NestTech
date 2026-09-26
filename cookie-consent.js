(function () {
  var GA_ID = 'G-ECBN1ZZJ3J';
  var CONSENT_KEY = 'nesttech_cookie_consent';

  function loadGoogleAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p>We use essential cookies to run this site and, only with your consent, Google Analytics to understand how it is used. ' +
      'See our <a href="cookie-policy.html">Cookie Policy</a> and <a href="privacy-policy.html">Privacy Policy</a> for details.</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="cookie-btn-accept" id="cookie-accept">Accept analytics</button>' +
      '<button type="button" class="cookie-btn-reject" id="cookie-reject">Reject non-essential</button>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch (e) {}
      loadGoogleAnalytics();
      hideBanner();
    });
    document.getElementById('cookie-reject').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'rejected'); } catch (e) {}
      hideBanner();
    });
    return banner;
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner') || buildBanner();
    banner.classList.add('visible');
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('visible');
  }

  function init() {
    var consent = null;
    try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

    if (consent === 'accepted') {
      loadGoogleAnalytics();
    } else if (consent !== 'rejected') {
      showBanner();
    }

    var manageBtn = document.getElementById('manage-cookies-btn');
    if (manageBtn) {
      manageBtn.addEventListener('click', function () { showBanner(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
