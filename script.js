const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.setAttribute('aria-label', 'Open navigation menu');

function setMenuOpen(open) {
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}

menuButton.addEventListener('click', () => {
  setMenuOpen(!navigation.classList.contains('is-open'));
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  setMenuOpen(false);
}));

// Dismiss the mobile menu when a user taps or clicks outside it.
document.addEventListener('pointerdown', (event) => {
  if (navigation.classList.contains('is-open') &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)) {
    setMenuOpen(false);
  }
});

// Clear mobile menu state when switching to the desktop layout.
window.matchMedia('(min-width: 801px)').addEventListener('change', (event) => {
  if (event.matches) setMenuOpen(false);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
const revealTargets = document.querySelectorAll('.section-heading, .project, .about-grid, .capabilities, .timeline-item');

if ('IntersectionObserver' in window) {
  revealTargets.forEach((element) => element.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
}
