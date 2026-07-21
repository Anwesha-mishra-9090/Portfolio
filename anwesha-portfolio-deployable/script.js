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

// Request Quote buttons prefill contact form message and scroll to contact
document.querySelectorAll('.request-quote').forEach(btn => {
  btn.addEventListener('click', (e)=>{
    const service = e.currentTarget.dataset.service || e.currentTarget.textContent;
    // Scroll to contact
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({behavior:'smooth', block:'start'});
    // Prefill message and subject if form fields exist
    const messageEl = document.querySelector('#contactForm textarea[name="message"]');
    if (messageEl) messageEl.value = `Hi Anwesha,\n\nI would like a quote for: ${service}.\nPlease let me know what information you need and the expected turnaround time.\n\nThanks.`;
    const subjectInput = document.querySelector('#contactForm input[name="subject"]');
    if (subjectInput) subjectInput.value = `Quote request: ${service}`;
  });
});

let selectedService = null;

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();
  const subjectField = form.querySelector('input[name="subject"]')?.value.trim();
  const subject = subjectField || (selectedService ? `Quote request: ${selectedService}` : 'New client inquiry from website');
  const body = `Hello Anwesha,%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AThanks!`;
  window.location.href = `mailto:mishraanwesha.anwesha@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  const status = document.getElementById('formStatus');
  if (status) {
    status.textContent = 'Your email app should open with a ready message. If not, email me directly at mishraanwesha.anwesha@gmail.com.';
  }
});
