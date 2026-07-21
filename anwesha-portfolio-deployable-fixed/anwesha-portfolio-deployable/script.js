const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('.reveal');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.15 });
revealItems.forEach(item => observer.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    if (!id) return;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(item => item.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(section => sectionObserver.observe(section));

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();
  const body = `Hello Anwesha,%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AThanks!`;
  window.location.href = `mailto:mishraanwesha.anwesha@gmail.com?subject=${encodeURIComponent('New client inquiry from website')}&body=${body}`;
  const status = document.getElementById('formStatus');
  if (status) {
    status.textContent = 'Your email app should open with a ready message. If not, email me directly at mishraanwesha.anwesha@gmail.com.';
  }
});
