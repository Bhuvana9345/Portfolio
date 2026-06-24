document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // INITIALIZE LUCIDE ICONS
    // ==========================================================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon representation if active
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon && typeof lucide !== 'undefined') {
                if (navLinks.classList.contains('active')) {
                    menuIcon.setAttribute('data-lucide', 'x');
                } else {
                    menuIcon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close menu when clicking on a link
        navLinkItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const menuIcon = mobileMenuBtn.querySelector('i');
                if (menuIcon && typeof lucide !== 'undefined') {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // ==========================================================================
    // TYPEWRITER EFFECT
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter');
    const phrases = ["Java Full-Stack Developer", "BCA Graduate", "Software Developer", "Spring Boot & React Developer"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typewriterElement) return;

        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle word completions
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1500; // Pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing the next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start Typewriter
    setTimeout(type, 500);

    // ==========================================================================
    // PROJECT FILTERING LOGIC
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Remove existing fade effects
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85) translateY(20px)';
                
                setTimeout(() => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Add fade-in transition
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Make sure project cards display transitions initially
    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
    });

    // ==========================================================================
    // SCROLL REVEAL ANIMATION
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Trigger when element is 150px in view
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Run once on load and attach to scroll event
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // ==========================================================================
    // CONTACT FORM INTERACTIVE SIMULATION
    // ==========================================================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const feedbackOverlay = document.getElementById('form-feedback-overlay');
    const closeFeedbackBtn = document.getElementById('feedback-close-btn');

    if (contactForm && feedbackOverlay && closeFeedbackBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload

            // Extract values
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Log details in browser console
            console.log('--- Portfolio Contact Form Submission ---');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Subject:', subject);
            console.log('Message:', message);

            // Display beautiful feedback overlay
            feedbackOverlay.classList.add('show');
        });

        // Close the success feedback overlay and reset the form
        closeFeedbackBtn.addEventListener('click', () => {
            feedbackOverlay.classList.remove('show');
            contactForm.reset();
        });
    }
});
