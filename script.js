/**
 * Technical Design System - JavaScript
 * Handles interactions and micro-animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initSmoothScroll();
    initFormHandling();
    initNavScrollEffect();
    initImageHover();
    initFAQAccordion();
});

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form submission handling
 */
function initFormHandling() {
    const form = document.getElementById('signup-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;

            // Visual feedback
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Success!';
                submitBtn.style.backgroundColor = '#1A8C4B';

                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1000);
        });
    }
}

/**
 * Navigation scroll effect
 * Adds subtle shadow on scroll
 */
function initNavScrollEffect() {
    const nav = document.querySelector('.nav');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 10) {
            nav.style.backgroundColor = 'rgba(247, 247, 245, 0.95)';
            nav.style.backdropFilter = 'blur(8px)';
        } else {
            nav.style.backgroundColor = 'var(--paper)';
            nav.style.backdropFilter = 'none';
        }

        lastScrollY = scrollY;
    }, { passive: true });
}

/**
 * Image hover effect
 * Transitions from luminosity blend to normal
 */
function initImageHover() {
    const images = document.querySelectorAll('.hero-image');

    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transition = 'all 0.3s ease-out';
        });
    });
}

/**
 * FAQ Accordion
 * Toggle FAQ items open/closed
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Optional: Intersection Observer for scroll animations
 * Uncomment to enable fade-in animations
 */
/*
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.bento-card, .testimonial-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}
*/
