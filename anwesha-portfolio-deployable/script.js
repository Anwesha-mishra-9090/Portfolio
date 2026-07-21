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
    selectedService = service;
  });
});

let selectedService = null;

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  // honeypot check
  const honeypot = form.querySelector('input[name="website"]')?.value || '';
  if(honeypot.trim() !== ''){
    // silently ignore spam submissions
    return;
  }
  const name = form.querySelector('input[name="name"]')?.value.trim() || '';
  const email = form.querySelector('input[name="email"]')?.value.trim() || '';
  const message = form.querySelector('textarea[name="message"]')?.value.trim() || '';
  // basic validation
  if(name.length < 2){ alert('Please enter your name'); return; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ alert('Please enter a valid email'); return; }
  if(message.length < 10){ alert('Please provide a few details about your project (at least 10 characters)'); return; }
  const subjectField = form.querySelector('input[name="subject"]')?.value.trim();
  const subject = subjectField || (selectedService ? `Quote request: ${selectedService}` : 'New client inquiry from website');

  // Build a clean body and encode once
  const bodyText = `Hello Anwesha,\n\nName: ${name}\nEmail: ${email}\n\n${message}\n\nThanks!`;
  const mailto = `mailto:mishraanwesha.anwesha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  // Try to open the mail client reliably by creating and clicking an anchor
  try {
    const a = document.createElement('a');
    a.href = mailto;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    // Fallback to location change
    window.location.href = mailto;
  }

  const status = document.getElementById('formStatus');
  if (status) {
    status.textContent = 'Your default mail app should open with a ready message. If it does not, please email me at mishraanwesha.anwesha@gmail.com.';
  }
});

// Back to top visibility and click
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  if(!backToTop) return;
  if(window.scrollY > 320) backToTop.classList.add('show'); else backToTop.classList.remove('show');
});
backToTop?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// FAQ accordion behavior
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    if (!item) return;
    item.classList.toggle('active');
    button.setAttribute('aria-expanded', item.classList.contains('active').toString());
  });
});

// Modal handlers for work preview (simple): open when .work-card clicked and show its inner HTML
const modal = document.getElementById('modal');
const modalContent = modal?.querySelector('.modal-content');
const modalClose = modal?.querySelector('.modal-close');
document.querySelectorAll('.work-card').forEach(card=>{
  card.addEventListener('click',(e)=>{
    if (e.target.closest('a')) return;
    if(!modal || !modalContent) return;
    modalContent.innerHTML = card.innerHTML;
    modal.setAttribute('aria-hidden','false');
  });
});
modalClose?.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
modal?.addEventListener('click', (e)=>{ if(e.target === modal) modal.setAttribute('aria-hidden','true'); });

// DOM ready tasks
document.addEventListener('DOMContentLoaded', ()=>{
  // ensure avatar has alt and lazy-loading for performance
  const avatar = document.querySelector('.hero-avatar img');
  if(avatar){ avatar.setAttribute('loading','lazy'); if(!avatar.getAttribute('alt')) avatar.setAttribute('alt','Anwesha Mishra avatar'); }

  // Testimonials auto-rotate
  const tCards = Array.from(document.querySelectorAll('.testimonial-card'));
  if(tCards.length > 1){
    let tIndex = 0;
    tCards.forEach((c,i)=> c.classList.toggle('active', i===0));
    setInterval(()=>{
      tCards[tIndex].classList.remove('active');
      tIndex = (tIndex+1) % tCards.length;
      tCards[tIndex].classList.add('active');
    }, 4200);
  }
});
