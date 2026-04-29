const revealItems = document.querySelectorAll('.reveal');
const geyser = document.querySelector('.geyser');
const river = document.querySelector('.river-layer');
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: '0px 0px -40px 0px',
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const moveHeroElements = () => {
  if (!geyser || !river) {
    return;
  }

  const scrollOffset = Math.min(window.scrollY, window.innerHeight);
  geyser.style.translate = `0 ${scrollOffset * -0.08}px`;
  river.style.translate = `0 ${scrollOffset * 0.04}px`;
};

window.addEventListener('scroll', moveHeroElements, { passive: true });
moveHeroElements();

if (siteHeader && menuToggle) {
  const setMenuOpen = (isOpen) => {
    siteHeader.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menue schliessen' : 'Menue oeffnen');
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(!siteHeader.classList.contains('menu-open'));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  });
}
