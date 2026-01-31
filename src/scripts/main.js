// Menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const megaMenu = document.getElementById('megaMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const hamburger = document.getElementById('hamburger');
    const menuText = menuToggle.querySelector('.menu-text');
    const menuMainItems = document.querySelectorAll('.menu-main-item');
    const menuSubItems = document.querySelectorAll('.menu-sub-item');
    const footerArrowUp = document.getElementById('footerArrowUp');

    const btnEnquire = document.querySelector('.btn-enquire');
    const dropdownWrappers = document.querySelectorAll('.dropdown-wrapper');

    let isMenuOpen = false;
    let isHeaderHidden = false;
    let lastScrollY = window.scrollY;
    let scrollTicking = false;

    function openMenu() {
        isMenuOpen = true;

        // Calculate scrollbar width
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Apply padding to body AND header
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = scrollbarWidth + 'px';
            header.style.paddingRight = scrollbarWidth + 'px';
        }

        header.classList.add('menu-open');
        header.classList.remove('header-hidden');
        isHeaderHidden = false;
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

        // Remove padding from body AND header
        document.body.style.paddingRight = '';
        header.style.paddingRight = '';

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

        updateHeaderOnScroll();
    }

    menuToggle.addEventListener('click', function () {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuOverlay.addEventListener('click', closeMenu);

    function updateHeaderOnScroll() {
        const currentScrollY = window.scrollY;
        const headerHeight = header.offsetHeight || 0;
        const delta = currentScrollY - lastScrollY;

        if (!isMenuOpen) {
            if (currentScrollY > 0) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            if (currentScrollY > headerHeight && delta > 0) {
                if (!isHeaderHidden) {
                    header.classList.add('header-hidden');
                    isHeaderHidden = true;
                }
            } else if (delta < -5 || currentScrollY <= headerHeight) {
                if (isHeaderHidden) {
                    header.classList.remove('header-hidden');
                    isHeaderHidden = false;
                }
            }
        }

        lastScrollY = currentScrollY;
        scrollTicking = false;
    }

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateHeaderOnScroll);
            scrollTicking = true;
        }
    });
    updateHeaderOnScroll();

    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    function initHeroAnimations() {
        // Create master timeline
        const heroTimeline = gsap.timeline();

        // Set initial states for title spans
        const heroTitleSpans = document.querySelectorAll('.hero-title span');
        gsap.set(heroTitleSpans, {
            display: 'inline-block',
            opacity: 0,
            y: 150
        });

        // Build timeline sequence
        heroTimeline
            // Header logo
            .fromTo('.header-logo',
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'Power1.easeOut' },
                0.2
            )
            // Header navigation
            .fromTo('.header-nav',
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'Power1.easeOut' },
                0.2
            )
            // Hero title words (staggered)
            .to(heroTitleSpans, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.4,
                ease: 'Power1.easeOut'
            }, 0.5)
            // Hero description text
            .fromTo('.hero-text p',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: 'Power1.easeOut' },
                1.5
            )
            // Hero CTA button
            .fromTo('.hero-text button',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'Power1.easeOut' },
                1.7
            );

        // Hero gradient - subtle fade in from background
        const heroGradient = document.querySelector('.hero-gradient');
        if (heroGradient) {
            gsap.set(heroGradient, {
                opacity: 0
            });

            heroTimeline.to(heroGradient, {
                opacity: 0.6,
                duration: 2.5,
                ease: 'power1.inOut'
            }, 0.3);
        }
    }

    initHeroAnimations();

    // Hero video lazy loading
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Load video after page load to not delay initial render
        window.addEventListener('load', function() {
            heroVideo.load();
            // Ensure video plays (some browsers require user interaction)
            heroVideo.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
            });
        });
    }

    if (footerArrowUp) {
        footerArrowUp.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


});
