const mobileMenus = document.querySelectorAll('[data-mobile-menu]');

mobileMenus.forEach((menu) => {
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.removeAttribute('open'));
  });

  menu.addEventListener('toggle', () => {
    const summary = menu.querySelector('summary');
    if (summary) summary.setAttribute('aria-expanded', menu.open ? 'true' : 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  mobileMenus.forEach((menu) => {
    if (!menu.open) return;
    menu.removeAttribute('open');
    menu.querySelector('summary')?.focus();
  });
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
