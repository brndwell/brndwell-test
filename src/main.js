import './style.css'

document.querySelector('#assessment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Simulation of submission
  const btn = e.target.querySelector('button');
  const originalText = btn.innerText;

  btn.innerText = 'Processing...';
  btn.disabled = true;

  setTimeout(() => {
    console.log('Form Submitted (Mock):', data);
    btn.innerText = 'Assessment Received';
    btn.style.backgroundColor = '#10b981'; // Green success state

    // Reset after some time
    setTimeout(() => {
      btn.innerText = originalText;
      btn.disabled = false;
      btn.style.backgroundColor = '';
      e.target.reset();
    }, 3000);
  }, 1500);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track.children);
  const dotsWrap = document.querySelector('[data-carousel-dots]');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  let index = 0;
  let autoTimer = null;

  const createDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot${i === 0 ? ' is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => updateSlide(i));
      dotsWrap.appendChild(dot);
    });
  };

  const updateSlide = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });
    }
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(() => updateSlide(index + 1), 5000);
  };

  const stopAuto = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  prevBtn?.addEventListener('click', () => updateSlide(index - 1));
  nextBtn?.addEventListener('click', () => updateSlide(index + 1));

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  createDots();
  startAuto();
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('is-active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('is-active');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle current item
    if (!isActive) {
      faqItem.classList.add('is-active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
