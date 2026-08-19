const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

document.querySelectorAll('main > section, footer').forEach((section) => {
  section.classList.add('reveal');
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach((section) => section.classList.add('is-visible'));
}

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu';
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const contactForm = document.querySelector('#contact-form');
const messageField = document.querySelector('#message');
const characterCount = document.querySelector('#character-count');

messageField?.addEventListener('input', () => {
  characterCount.textContent = `${messageField.value.length} / 1000 characters`;
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = `Website message from ${formData.get('firstName')} ${formData.get('surname')}`;
  const body = `Name: ${formData.get('firstName')} ${formData.get('surname')}\nPhone: ${formData.get('phone')}\n\nMessage:\n${formData.get('message')}`;
  window.location.href = `mailto:kuthala@izikomissions.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
