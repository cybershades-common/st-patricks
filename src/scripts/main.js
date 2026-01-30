// Menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const megaMenu = document.getElementById('megaMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const hamburger = document.getElementById('hamburger');
    const menuText = menuToggle.querySelector('.menu-text');
    const menuMainItems = document.querySelectorAll('.menu-main-item');
    const menuSubItems = document.querySelectorAll('.menu-sub-item');

    const btnEnquire = document.querySelector('.btn-enquire');
    const dropdownWrappers = document.querySelectorAll('.dropdown-wrapper');

    let isMenuOpen = false;

    function openMenu() {
        isMenuOpen = true;
        header.classList.add('menu-open');
        megaMenu.classList.add('active');
        menuOverlay.classList.add('active');
        hamburger.classList.add('active');
        menuText.textContent = 'CLOSE';
        document.body.style.overflow = 'hidden';

        btnEnquire.style.display = 'inline-flex';
        dropdownWrappers.forEach(wrapper => {
            wrapper.style.display = 'flex';
        });

        gsap.to(megaMenu, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });

    }

    function closeMenu() {
        isMenuOpen = false;
        header.classList.remove('menu-open');
        hamburger.classList.remove('active');
        menuText.textContent = 'MENU';

        megaMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';

        btnEnquire.style.display = 'none';
        dropdownWrappers.forEach(wrapper => {
            wrapper.style.display = 'none';
        });
    }

    menuToggle.addEventListener('click', function() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuOverlay.addEventListener('click', closeMenu);

    // Hero animations
    function initHeroAnimations() {
        const heroGradient = document.querySelector('.hero-gradient');
        if (heroGradient) {
            const viewportHeight = window.innerHeight;
            const startY = viewportHeight + 200; // 100vh + 20rem (approximately)
            
            // Set initial state
            gsap.set(heroGradient, {
                y: startY,
                x: '-10%',
                opacity: 0,
                visibility: 'visible'
            });
            
            // Animate to final position
            gsap.to(heroGradient, {
                y: 0,
                x: 0,
                opacity: 1, // Darker gradient
                duration: 1.5,
                delay: 0.2,
                ease: 'power2.out'
            });
        }

        gsap.fromTo('.header-logo',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
        );

        gsap.fromTo('.header-nav',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out' }
        );

        const heroTitleText = document.querySelector('.hero-title');
        if (heroTitleText) {
            gsap.fromTo(heroTitleText,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
            );
        }

        gsap.fromTo('.hero-text p',
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' }
        );

        gsap.fromTo('.hero-text button',
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, delay: 1, ease: 'power2.out' }
        );
    }

    initHeroAnimations();

    // Smooth scroll animations for elements
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        const elements = section.querySelectorAll('h1, h2, h3, h4, p, .btn-rounded-large-outline, img');

        gsap.fromTo(elements,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
});
