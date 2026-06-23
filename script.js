/* ==========================================================================
   Modern Premium School Theme: Millennium High School Javascript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU NAVIGATION ---
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    function closeMenu() {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        menuBackdrop.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    hamburgerMenu.addEventListener('click', toggleMenu);
    menuBackdrop.addEventListener('click', closeMenu);
    
    // Close menu when navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // --- 2. HEADER SHADOW ON SCROLL ---
    const header = document.getElementById('header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initial call


    // --- 3. ACTIVE NAV LINK ON SCROLL & SCROLL REVEAL ---
    const sections = document.querySelectorAll('section');
    const navMenuLinks = document.querySelectorAll('.nav-menu .nav-link');
    
    // Intersection Observer for Active Link
    const activeLinkOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Target central viewport area
        threshold: 0
    };
    
    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, activeLinkOptions);
    
    sections.forEach(section => {
        activeLinkObserver.observe(section);
    });

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
        threshold: 0.15
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 4. BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('backToTop');
    
    function handleBackToTopVisibility() {
        if (window.scrollY > 450) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleBackToTopVisibility);
    handleBackToTopVisibility();
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 5. ANTI-GRAVITY MOUSE PARALLAX EFFECT ---
    const heroSection = document.getElementById('home');
    const floatItems = document.querySelectorAll('.float-item');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Check if user is on desktop and motion preferences are normal
    const isDesktop = window.innerWidth > 768;
    const isMotionAllowed = !prefersReducedMotion.matches;
    
    if (isDesktop && isMotionAllowed && heroSection) {
        
        // Listen to mouse movement over the hero section
        heroSection.addEventListener('mousemove', (e) => {
            // Get cursor relative coordinates (-0.5 to 0.5 range)
            const rect = heroSection.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        });
        
        // Listen to mouse leaves to center the float items
        heroSection.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
        });
        
        // Animation Loop using requestAnimationFrame for 60fps performance
        function animateParallax() {
            // Add ease/smooth interpolation
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            
            floatItems.forEach(item => {
                const speed = parseFloat(item.getAttribute('data-speed')) || 1;
                // Compute displacement based on item's factor
                const dx = currentX * speed * 60;
                const dy = currentY * speed * 60;
                
                // Use translate3d for GPU acceleration
                item.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
            });
            
            requestAnimationFrame(animateParallax);
        }
        
        // Start animation loop
        animateParallax();
    }
});
