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
