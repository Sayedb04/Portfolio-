// Smooth scroll for navigation
document.querySelectorAll('.navbar ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Section reveal animation on scroll
function revealSections() {
  document.querySelectorAll('.section').forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight - 100) {
      section.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// --- Skill bar animation using Intersection Observer ---
let skillsAnimated = false;
const bars = document.querySelectorAll('.bar-fill');
const skillsSection = document.querySelector('#skills');

function fillSkillBars() {
  bars.forEach(bar => {
    bar.style.width = bar.getAttribute('data-width');
  });
  skillsAnimated = true;
}

function resetSkillBars() {
  bars.forEach(bar => {
    bar.style.width = '0';
  });
  skillsAnimated = false;
}

let observer = null;
function setupSkillsObserver() {
  if (!skillsSection) return;
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fillSkillBars();
      } else {
        resetSkillBars();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(skillsSection);
}

// --- Intro overlay morph animation and trigger skill bars after overlay ---
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const introImg = document.getElementById("introProfileImg");
    const aboutImg = document.getElementById("aboutProfileImg");
    const overlay = document.getElementById('intro-overlay');

    if (introImg && aboutImg) {
      // Get the position of the about section profile image
      const aboutRect = aboutImg.getBoundingClientRect();

      // Calculate the translation needed
      const deltaX = aboutRect.left + aboutRect.width / 2 - (window.innerWidth / 2);
      const deltaY = aboutRect.top + aboutRect.height / 2 - (window.innerHeight * 0.4);

      // Animate the intro image to the about image position and size
      introImg.style.transform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) scale(1)`;
      introImg.style.width = `${aboutRect.width}px`;
      introImg.style.height = `${aboutRect.height}px`;
      introImg.style.boxShadow = "0 0 24px 0 var(--accent), 0 2px 16px rgba(0,0,0,0.2)";
      introImg.style.opacity = "0.2";
    }

    // Fade out overlay after morph
    setTimeout(() => {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }, 1000);

    // Remove overlay from DOM and setup observer for skills
    setTimeout(() => {
      overlay.remove();
      setupSkillsObserver();
      // If skills section is already in view, fill bars immediately
      if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight && skillsSection.getBoundingClientRect().bottom > 0) {
        fillSkillBars();
      }
    }, 1800);
  }, 1200); // Start morph after 1.2s
});