// Reading Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Typing Animation Effect
const words = ["Full-Stack Engineer", "UI/UX Developer", "Problem Solver"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingText = document.querySelector('.typing-text');

function typeEffect() {
  const currentWord = words[wordIndex];
  typingText.textContent = isDeleting 
    ? currentWord.substring(0, charIndex - 1) 
    : currentWord.substring(0, charIndex + 1);

  charIndex += isDeleting ? -1 : 1;
  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(typeEffect, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeEffect);

// Scroll-Reveal & Animated Progress Bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate skills if section is visible
      if (entry.target.id === 'skills') {
        document.querySelectorAll('.progress-line span').forEach(span => {
          span.style.width = span.getAttribute('data-progress');
        });
      }
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Dark / Light Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
let isDark = true;

themeToggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeToggleBtn.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '☀️';
  }
});

// Filter Projects
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) 
        ? 'block' 
        : 'none';
    });
  });
});

// Project Modal Preview
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('modal-title').textContent = card.getAttribute('data-title');
    document.getElementById('modal-desc').textContent = card.getAttribute('data-desc');
    document.getElementById('modal-tech').textContent = "Technologies: " + card.getAttribute('data-tech');
    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

// Notification Toast System
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Download CV Handler
document.getElementById('download-cv').addEventListener('click', () => {
  showToast('CV download initiated.');
});

// Contact Form Handler
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Message sent successfully!');
  e.target.reset();
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});