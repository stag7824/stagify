// Enhanced scroll animations utility

/**
 * Initialize scroll animations for elements with animation classes
 * This adds the 'appear' class to elements when they enter the viewport
 */
export const initScrollAnimations = () => {
  // Get all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in, .rotate-in, .flip-in, .blur-in, .slide-in'
  );

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Add the 'appear' class when element is in viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          
          // For elements with data-animate-once="false", don't unobserve
          if (entry.target.dataset.animateOnce !== 'false') {
            // Once animation is done, stop observing
            observer.unobserve(entry.target);
          }
        } else {
          // For elements that should animate every time they enter viewport
          if (entry.target.dataset.animateOnce === 'false') {
            entry.target.classList.remove('appear');
          }
        }
      });
    },
    {
      threshold: 0.15, // Trigger when at least 15% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust the trigger point (negative value means element needs to scroll further up)
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Add scroll-triggered parallax effect to background elements
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.1;
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  return observer; // Return observer in case we need to disconnect it later
};

/**
 * Add animation classes to elements based on their position
 * This is useful for adding animations to elements dynamically
 */
export const addAnimationClasses = () => {
  // Add animation classes to section headings
  document.querySelectorAll('section h2').forEach((heading, index) => {
    heading.classList.add('fade-in-up');
    heading.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add animations to section paragraphs
  document.querySelectorAll('section > div > p').forEach((paragraph, index) => {
    paragraph.classList.add('fade-in-up');
    paragraph.style.transitionDelay = `${0.2 + index * 0.05}s`;
  });

  // Add animations to cards and list items with alternating directions
  document.querySelectorAll('.package-card, .service-card').forEach((card, index) => {
    // Alternate between left and right animations for a more dynamic feel
    if (index % 2 === 0) {
      card.classList.add('fade-in-left');
    } else {
      card.classList.add('fade-in-right');
    }
    card.style.transitionDelay = `${0.1 + index * 0.1}s`;
  });

  // Add animations to testimonials with staggered timing
  document.querySelectorAll('.testimonial-card, [class*="testimonial"]').forEach((card, index) => {
    card.classList.add('fade-in-up');
    card.style.transitionDelay = `${0.2 + index * 0.15}s`;
  });

  // Add animations to stats with scale effect
  document.querySelectorAll('.stat-item, [class*="stat"]').forEach((item, index) => {
    item.classList.add('scale-in');
    item.style.transitionDelay = `${0.1 + index * 0.1}s`;
  });

  // Add animations to buttons and CTAs
  document.querySelectorAll('a.btn-primary, button.btn-primary, .cta-button').forEach((button, index) => {
    button.classList.add('scale-in');
    button.style.transitionDelay = `${0.3 + index * 0.05}s`;
  });

  // Add animations to images
  document.querySelectorAll('img:not([class*="logo"])').forEach((img, index) => {
    img.classList.add('blur-in');
    img.style.transitionDelay = `${0.2 + index * 0.1}s`;
  });

  // Add animations to tech stack items
  document.querySelectorAll('[class*="tech-"]').forEach((tech, index) => {
    tech.classList.add('scale-in');
    tech.style.transitionDelay = `${0.1 + index * 0.05}s`;
  });

  // Add continuous animations to background elements
  document.querySelectorAll('.bg-animation').forEach((element) => {
    element.classList.add('parallax');
    element.dataset.speed = (Math.random() * 0.2).toFixed(2);
  });
};

/**
 * Initialize counter animations for statistics
 * This animates number counters from 0 to their target value
 */
export const initCounterAnimations = () => {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target) || 0;
          const duration = parseInt(entry.target.dataset.duration) || 2000;
          let startTime = null;
          let currentNumber = 0;
          
          function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Use easeOutExpo for smooth counting effect
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            currentNumber = Math.floor(easeProgress * target);
            
            // Format number with commas if needed
            entry.target.textContent = currentNumber.toLocaleString();
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }
          
          requestAnimationFrame(updateCounter);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach((counter) => {
    observer.observe(counter);
  });
};