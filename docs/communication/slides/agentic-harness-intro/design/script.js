// ── Initialize Lucide icons (no-op if library not loaded) ───
if (typeof lucide !== 'undefined') lucide.createIcons();

// ── Fullscreen presentation mode ────────────────────────────
// Keyboard controls:
//   F          → enter fullscreen presentation
//   Esc        → exit
//   → / ↓ / Space  → next slide
//   ← / ↑          → previous slide
(function () {
  var slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  var current   = 0;
  var presenting = false;

  // Read canvas dimensions from the first slide element so this
  // script works regardless of the canvas size set in config.yaml.
  var W = slides[0].offsetWidth;
  var H = slides[0].offsetHeight;

  function scaleSlides() {
    var margin = 40;
    var scale  = Math.min(
      (window.innerWidth  - margin * 2) / W,
      (window.innerHeight - margin * 2) / H
    );
    slides.forEach(function (s) {
      s.style.transform = presenting
        ? 'translate(-50%, -50%) scale(' + scale + ')'
        : '';
    });
  }

  function showSlide(n) {
    current = Math.max(0, Math.min(n, slides.length - 1));
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === current);
    });
  }

  function enter() {
    presenting = true;
    document.body.classList.add('presenting');
    showSlide(current);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setTimeout(scaleSlides, 100);
  }

  function exit() {
    presenting = false;
    document.body.classList.remove('presenting');
    slides.forEach(function (s) {
      s.classList.remove('active');
      s.style.transform = '';
    });
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  window.addEventListener('resize', function () {
    if (presenting) scaleSlides();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'f' || e.key === 'F') {
      if (!presenting) enter();
    } else if (e.key === 'Escape') {
      if (presenting) exit();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      if (presenting) { e.preventDefault(); showSlide(current + 1); }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (presenting) showSlide(current - 1);
    }
  });

  // Catch browser-native Esc (exits fullscreen before keydown fires)
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && presenting) exit();
  });
})();
