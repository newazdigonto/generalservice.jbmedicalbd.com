document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  document.querySelectorAll('.footer-newsletter').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      window.location.href = `mailto:info@jbmedicalbd.com?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent('Please subscribe: ' + email)}`;
      form.reset();
    });
  });

  document.querySelectorAll('.contact-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name, #m-name').value.trim();
      const phone = form.querySelector('#phone, #m-phone').value.trim();
      const message = form.querySelector('#message, #m-message').value.trim();
      const subject = encodeURIComponent('Appointment request — ' + name);
      const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\n${message}`);
      window.location.href = `mailto:info@jbmedicalbd.com?subject=${subject}&body=${body}`;
    });
  });

  // Book Appointment modal
  const modal = document.getElementById('appointmentModal');
  if (modal) {
    const openModal = () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    document.querySelectorAll('[data-open-appointment]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  // Hero image slider
  const heroSlider = document.querySelector('.hero-photo');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dotsWrap = heroSlider.querySelector('.hero-dots');
    let current = 0;
    let timer;

    const show = (index) => {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === index));
      }
      current = index;
    };
    const next = () => show((current + 1) % slides.length);
    const prev = () => show((current - 1 + slides.length) % slides.length);
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(next, 5000);
    };

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show slide ${i + 1}`);
        dot.addEventListener('click', () => { show(i); restart(); });
        dotsWrap.appendChild(dot);
      });
    }
    const prevBtn = heroSlider.querySelector('.hero-arrow.prev');
    const nextBtn = heroSlider.querySelector('.hero-arrow.next');
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });

    show(0);
    restart();
  }
});
