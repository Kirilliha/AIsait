/* AIVERSE — main.js */

// ---- ФИЛЬТРАЦИЯ МОДЕЛЕЙ ----
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#modelsGrid .card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Активная кнопка
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach((card, i) => {
      const categories = card.dataset.category || '';
      const matches = filter === 'all' || categories.includes(filter);

      if (matches) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${i * 50}ms`;
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ---- АНИМАЦИЯ ПРИ СКРОЛЛЕ ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .tool-card, .infra-card, .builder-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${i % 6 * 80}ms, transform 0.5s ease ${i % 6 * 80}ms`;
  observer.observe(el);
});

// ---- МОБИЛЬНОЕ МЕНЮ ----
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(10,10,15,0.98)';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    navLinks.style.padding = '12px 20px';
    navLinks.style.backdropFilter = 'blur(20px)';
    menuBtn.textContent = open ? '☰' : '✕';
  });
}

// Закрыть меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.style.display = 'none';
    menuBtn.textContent = '☰';
  });
});
