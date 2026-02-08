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

        const headerMenuItems = document.querySelectorAll(
            '.header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );

        gsap.set(headerMenuItems, { opacity: 0, force3D: true });

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

        // Create menu animation timeline
        const menuTimeline = gsap.timeline();

        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');

        // Clear any existing properties
        gsap.set([menuMainItems, menuSubItems, menuImage], { clearProps: 'all' });

        menuTimeline
            // Mega menu + overlay quick fade in
            .fromTo(megaMenu,
                { opacity: 0 },
                { opacity: 1, duration: 0.2, ease: 'power1.out' },
                0
            )
            .fromTo(menuOverlay,
                { opacity: 0 },
                { opacity: 1, duration: 0.2, ease: 'power1.out' },
                0
            )
            // Header menu items (fade only)
            .to(headerMenuItems, {
                opacity: 1,
                duration: 0.3,
                ease: 'power1.out',
                stagger: 0.08,
                force3D: true
            }, 0.2)
            // Main menu items (after header items)
            .fromTo(menuMainItems,
                { opacity: 0, x: -60, force3D: true },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power1.out', force3D: true },
                0.55
            )
            // Sub menu items (after main menu)
            .fromTo(menuSubItems,
                { opacity: 0, x: -20, force3D: true },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.04, ease: 'power1.out', force3D: true },
                0.95
            )
            // Menu image - fade in with zoom out (after sub menu)
            .fromTo(menuImage,
                { opacity: 0, scale: 1.15, force3D: true },
                { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', force3D: true },
                1.45
            )
            // Menu footer (after image)
            .fromTo(menuFooter,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
                2.1
            );

    }

    function closeMenu() {
        isMenuOpen = false;

        // Reset menu items AFTER fade to avoid flicker
        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');
        const headerMenuItems = document.querySelectorAll(
            '.header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );
        gsap.killTweensOf([menuMainItems, menuSubItems, menuImage, menuFooter, megaMenu, menuOverlay]);

        // Fade everything away, then reset state
        gsap.to([megaMenu, menuOverlay], {
            opacity: 0,
            duration: 0.2,
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.set(menuImage, { opacity: 0, scale: 1.15 });
                gsap.set(menuMainItems, { opacity: 0, x: -60 });
                gsap.set(menuSubItems, { opacity: 0, x: -20 });
                gsap.set(menuFooter, { opacity: 0, y: 20 });
                gsap.set(headerMenuItems, { clearProps: 'opacity' });
                // Remove padding from body AND header
                document.body.style.paddingRight = '';
                header.style.paddingRight = '';

                header.classList.remove('menu-open');
                hamburger.classList.remove('active');
                menuText.textContent = 'MENU';

                megaMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Reset mobile menu overlay
        if (isMobile()) {
            const menuSubItemsContainer = document.querySelector('.menu-sub-items');
            if (menuSubItemsContainer) {
                menuSubItemsContainer.classList.remove('active');
            }
        }

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

    // Mobile menu navigation
    function isMobile() {
        return window.innerWidth <= 767;
    }

    function initMobileMenu() {
        if (!isMobile()) return;

        const menuSubItemsContainer = document.querySelector('.menu-sub-items');

        // Add click handlers to main menu items
        menuMainItems.forEach((item) => {
            item.addEventListener('click', function(e) {
                if (!isMobile()) return;
                e.preventDefault();

                // Add back button if it doesn't exist
                let backBtn = menuSubItemsContainer.querySelector('.menu-sub-back');
                if (!backBtn) {
                    backBtn = document.createElement('div');
                    backBtn.className = 'menu-sub-back';
                    backBtn.textContent = 'Back';
                    backBtn.addEventListener('click', function() {
                        menuSubItemsContainer.classList.remove('active');
                    });
                    menuSubItemsContainer.insertBefore(backBtn, menuSubItemsContainer.firstChild);
                }

                // Show overlay
                menuSubItemsContainer.classList.add('active');
            });
        });
    }

    // Initialize mobile menu
    initMobileMenu();

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

    // Hero animations - smooth entrance animation
    function initHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroTitleSpans = document.querySelectorAll('.hero-title span');
        const heroText = document.querySelector('.hero-text p');
        const heroButton = document.querySelector('.hero-text button');
        const heroGradient = document.querySelector('.hero-gradient');
        
        if (!heroTitle || !heroText) {
            console.warn('Hero elements not found');
            return;
        }

        // Create master timeline
        const heroTimeline = gsap.timeline({
            delay: 0.3 // Small delay for page to settle
        });

        // Set initial states - override CSS visibility immediately
        // Use autoAlpha which handles both opacity and visibility
        gsap.set(heroTitle, { 
            autoAlpha: 0, // This sets opacity: 0 and visibility: visible
            y: 80,
            force3D: true
        });
        
        if (heroTitleSpans.length > 0) {
            gsap.set(heroTitleSpans, { 
                display: 'inline-block',
                autoAlpha: 0,
                y: 80,
                force3D: true
            });
        }
        
        gsap.set(heroText, { 
            autoAlpha: 0,
            y: 20,
            force3D: true
        });

        if (heroGradient) {
            gsap.set(heroGradient, {
                autoAlpha: 0,
               
                force3D: true
            });
        }
        
        if (heroButton) {
            gsap.set(heroButton, { 
                autoAlpha: 0,
                scale: 0.9,
                force3D: true
            });
        }

        // Animate hero title - animate parent and spans together
        if (heroTitleSpans.length > 0) {
            // First, make parent visible (just visibility, keep opacity at 0)
            gsap.set(heroTitle, { visibility: 'visible' });
            
            // Then animate hero title spans (staggered) - this will make them visible
            heroTimeline.to(heroTitleSpans, {
                autoAlpha: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.4,
                force3D: true
            }, 0);
            
            // Also animate parent title's opacity to 1 (in sync with spans)
            heroTimeline.to(heroTitle, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                force3D: true
            }, 0);
        } else {
            // If no spans, animate the title directly
            heroTimeline.to(heroTitle, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                force3D: true
            }, 0);
        }
        
        // Animate hero text
        heroTimeline.to(heroText, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: 'power2.out',
            force3D: true
        }, 1);

        if (heroGradient) {
            heroTimeline.to(heroGradient, {
                autoAlpha: 1,
               
                duration: 3,
                ease: 'power2.out',
                force3D: true
            }, 0.4);
        }
        
        // Animate hero button
        if (heroButton) {
            heroTimeline.to(heroButton, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.2)',
                force3D: true
            }, 1.1);
        }
        
        // Animate hero media with clip-reveal from left to right (after button)
        // Using same pattern as imageClipLeft in animations.js
        const heroMedia = document.querySelector('.hero-media-wrapper');
        if (!heroMedia) {
            console.warn('Hero media wrapper not found');
        } else {
            // Set initial state - clip from left (same as imageClipLeft)
            const hidden = 'inset(0 100% 0 0)'; // Hidden from left
            const shown = 'inset(0 0% 0 0)';    // Fully revealed
            
            gsap.set(heroMedia, {
                clipPath: hidden,
                webkitClipPath: hidden,
                willChange: 'clip-path',
                force3D: true
            });
            
            // Animate clip reveal from left to right
            heroTimeline.to(heroMedia, {
                clipPath: shown,
                webkitClipPath: shown,
                duration: 1.2,
                ease: 'power2.inOut', // Same ease as imageClipLeft
                force3D: true,
                autoRound: false,
                onComplete: () => {
                    // Clean up after animation
                    gsap.set(heroMedia, { clearProps: 'will-change' });
                }
            }, 0.2 ); // Start earlier - 0.4s after button starts (instead of after it completes)
        }
    }

    // Initialize hero animations - wait a tiny bit to ensure DOM is fully ready
    setTimeout(function() {
        initHeroAnimations();
    }, 50);

    // Header animations - smooth slide in from top together
    function initHeaderAnimations() {
        // Get all header items with a single selector
        const headerItems = document.querySelectorAll(
            '.header-logo, ' +
            '.header-nav .btn-header, ' +
            '.header-nav .menu-dropdown-btn, ' +
            '.header-icons-wrapper .header-icon-btn, ' +
            '.menu-toggle'
        );
        
        if (headerItems.length === 0) {
            console.warn('No header items found');
            return;
        }
        
        // Filter out items that are display: none (but keep visibility: hidden items since we'll animate them)
        const visibleItems = Array.from(headerItems).filter(item => {
            if (!item) return false;
            const style = window.getComputedStyle(item);
            // Only filter out if display is none, not visibility hidden (we'll animate those)
            return style.display !== 'none';
        });

        if (visibleItems.length === 0) {
            console.warn('No visible header items found');
            return;
        }

        // Create master timeline
        const headerTimeline = gsap.timeline({
            delay: 0.1 // Start slightly before hero animation
        });

        // Set initial states - slide from top for all items at once
        // Override CSS visibility: hidden by setting visibility: visible in GSAP
        // Clear ALL CSS that might interfere (transitions, animations, delays)
        visibleItems.forEach(item => {
            // Kill any existing animations first
            gsap.killTweensOf(item);
            
            // Clear CSS properties that might interfere
            if (item.style) {
                item.style.transition = 'none';
                item.style.animation = 'none';
                item.style.animationDelay = '0s';
                item.style.transitionDelay = '0s';
            }
            
            // Set our initial animation state
            gsap.set(item, { 
                visibility: 'visible', // Override CSS visibility: hidden
                opacity: 0,
                y: -60,
                force3D: true
            });
        });

        // Animate all header items together at exactly the same time (position 0)
        // Kill any existing tweens first to prevent conflicts
        visibleItems.forEach(item => {
            gsap.killTweensOf(item);
        });
        
        headerTimeline.to(visibleItems, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            force3D: true,
            immediateRender: false,
            overwrite: 'auto' // Auto-overwrite any existing animations
        }, 0); // All at position 0 = same time
    }

    // Initialize header animations
    initHeaderAnimations();

    // Section gradient circles - fade in on section reveal
    function initGradientCircleFades() {
        const circles = gsap.utils.toArray('.section .gradient-circle');
        if (!circles.length) return;

        circles.forEach(circle => {
            const section = circle.closest('section') || circle.parentElement;
            gsap.set(circle, { autoAlpha: 0 });
            gsap.to(circle, {
                autoAlpha: 1,
                duration: 1.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true
                }
            });
        });
    }

    initGradientCircleFades();

    // Footer gradient - fade in when footer enters
    function initFooterGradientFade() {
        const footerGradient = document.querySelector('.footer-gradient');
        const footer = document.querySelector('footer.footer');
        if (!footerGradient || !footer) return;

        gsap.set(footerGradient, { autoAlpha: 0 });
        gsap.to(footerGradient, {
            autoAlpha: 1,
            duration: 4.5,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: footer,
                start: 'top 65%',
                once: true
            }
        });
    }

    initFooterGradientFade();

    // Section-specific gradients (slow fade on entry)
    function initSectionGradientFades() {
        const items = [
            { selector: '.about-section .gradient-circle', trigger: '.about-section' },
            { selector: '.academics-gradient', trigger: '.academics-section' },
            { selector: '.testimonials-gradient', trigger: '.testimonials-section' }
        ];

        items.forEach(({ selector, trigger }) => {
            const el = document.querySelector(selector);
            const section = document.querySelector(trigger);
            if (!el || !section) return;

            gsap.set(el, { autoAlpha: 0 });
            gsap.to(el, {
                autoAlpha: 1,
                duration: 3.6,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    once: true
                }
            });
        });
    }

    initSectionGradientFades();

    // About section reveal animation (word and sentence)
    function wrapWords(el) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        const textNodes = [];
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.nodeValue && node.nodeValue.trim()) {
                textNodes.push(node);
            }
        }
        textNodes.forEach(node => {
            if (node.parentNode && node.parentNode.closest && node.parentNode.closest('.underline')) {
                return;
            }
            const words = node.nodeValue.split(/(\s+)/);
            const frag = document.createDocumentFragment();
            words.forEach(part => {
                if (part.trim() === '') {
                    frag.appendChild(document.createTextNode(part));
                } else {
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.textContent = part;
                    frag.appendChild(span);
                }
            });
            node.parentNode.replaceChild(frag, node);
        });
    }

    function wrapSentences(el) {
        const text = el.textContent || '';
        const parts = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
        el.textContent = '';
        parts.forEach(part => {
            const span = document.createElement('span');
            span.className = 'sentence';
            span.textContent = part.trim() + ' ';
            el.appendChild(span);
        });
    }

    function initAboutReveal() {
        const aboutHeading = document.querySelector('.about-heading');
        if (!aboutHeading) {
            return;
        }

        // Use text wrapping animations for all breakpoints
        wrapWords(aboutHeading);

        const aboutParagraphs = document.querySelectorAll('.about-text p');
        aboutParagraphs.forEach(p => wrapSentences(p));

        gsap.set('.about-heading .word, .about-heading .underline', { opacity: 0 });
        gsap.set('.about-text .sentence', { opacity: 0 });

        const headingPieces = gsap.utils.toArray('.about-heading .word, .about-heading .underline');

        const isMobile = window.innerWidth <= 991;
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-section',
                start: isMobile ? 'top 90%' : 'top 85%',
                end: isMobile ? 'top 60%' : 'top 20%',
                scrub: 1,
                once: true
            }
        });

        aboutTl
            .to(headingPieces, {
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12
            }, 0)
            .to('.about-text .sentence', {
                opacity: 1,
                duration: 2,
                ease: 'power3.out',
                stagger: 0.5
            }, 0.2);
    }

    initAboutReveal();

    //==================== Latest news slider (custom)===============================================================


    function initLatestNewsSlider() {
        const track = document.getElementById('latestNewsTrack');
        const slides = document.querySelectorAll('.latest-news-slide');
        const prevBtn = document.getElementById('latestNewsPrev');
        const nextBtn = document.getElementById('latestNewsNext');

        if (!track || !slides.length || !prevBtn || !nextBtn) {
            return;
        }

        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        const activeWidth = 42.5 * 16;
        const inactiveWidth = 20.8125 * 16;
        const gap = 1.25 * 16;

        function isMobile() {
            return window.innerWidth <= 768;
        }

        function getDimensions() {
            if (isMobile()) {
                const activeW = Math.min(window.innerWidth * 0.9, 25 * 16);
                const inactiveW = Math.min(window.innerWidth * 0.85, 20 * 16);
                return { activeWidth: activeW, inactiveWidth: inactiveW, gap: gap };
            }
            return { activeWidth, inactiveWidth, gap };
        }

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        }

        function getSlidePosition(index) {
            const dims = getDimensions();
            let position = 0;
            for (let i = 0; i < index; i++) {
                if (i === currentIndex) {
                    position += dims.activeWidth + dims.gap;
                } else {
                    position += dims.inactiveWidth + dims.gap;
                }
            }
            if (isMobile()) {
                const containerWidth = window.innerWidth;
                const activeSlideCenter = position + dims.activeWidth / 2;
                const screenCenter = containerWidth / 2;
                return -(activeSlideCenter - screenCenter);
            }
            return -position;
        }

        function moveToSlide(newIndex) {
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            } else if (newIndex >= slides.length) {
                newIndex = 0;
            }

            if (newIndex === currentIndex) {
                return;
            }

            currentIndex = newIndex;
            updateSlides();

            requestAnimationFrame(() => {
                const position = getSlidePosition(currentIndex);
                track.style.transform = `translateX(${position}px)`;
                currentTranslate = position;
                prevTranslate = position;
            });
        }

        function touchStart(event) {
            isDragging = true;
            track.classList.add('dragging');
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
        }

        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }

        function touchEnd() {
            isDragging = false;
            track.classList.remove('dragging');
            cancelAnimationFrame(animationID);

            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -100) {
                moveToSlide(currentIndex + 1);
            } else if (movedBy > 100) {
                moveToSlide(currentIndex - 1);
            } else {
                const position = getSlidePosition(currentIndex);
                track.style.transform = `translateX(${position}px)`;
                currentTranslate = position;
            }
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        function animation() {
            if (isDragging) {
                track.style.transform = `translateX(${currentTranslate}px)`;
                requestAnimationFrame(animation);
            }
        }

        prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));

        track.addEventListener('mousedown', touchStart, { passive: true });
        track.addEventListener('mousemove', touchMove, { passive: true });
        track.addEventListener('mouseup', touchEnd, { passive: true });
        track.addEventListener('mouseleave', () => {
            if (isDragging) touchEnd();
        }, { passive: true });
        track.addEventListener('touchstart', touchStart, { passive: true });
        track.addEventListener('touchmove', touchMove, { passive: true });
        track.addEventListener('touchend', touchEnd, { passive: true });
        track.addEventListener('contextmenu', (e) => e.preventDefault()); // Active listener needed for preventDefault

        const filterTabs = document.querySelectorAll('.latest-news-filter-btn');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                filterTabs.forEach(t => t.classList.remove('latest-news-filter-btn-active'));
                this.classList.add('latest-news-filter-btn-active');
            });
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const position = getSlidePosition(currentIndex);
                track.style.transition = 'none';
                track.style.transform = `translateX(${position}px)`;
                currentTranslate = position;
                prevTranslate = position;
                setTimeout(() => {
                    track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 50);
            }, 100);
        });

        updateSlides();
        const initialPosition = getSlidePosition(0);
        track.style.transform = `translateX(${initialPosition}px)`;
        currentTranslate = initialPosition;
        prevTranslate = initialPosition;
    }

    initLatestNewsSlider();

    // ==========================================================================
    // STATISTICS SECTION ANIMATION - START
    // ==========================================================================
    // Animates stats cards with:
    // 1. Line growth from top to bottom
    // 2. Label fade-up animation
    // 3. Counter animation from start value to target value
    // ==========================================================================

    function initStatsAnimation() {
        const statsContainer = document.querySelector('.statistics-cards');
        if (!statsContainer) return;

        const cards = statsContainer.querySelectorAll('.statistics-card');
        if (!cards.length) return;

        // Animation timing configuration
        const TIMING = {
            lineDuration: 2.5,        // Line growth duration
            lineEase: 'power2.out',
            lineStagger: 0.2,          // Delay between each card
            labelDuration: 1.2,        // Label fade-up duration
            labelEase: 'back.out(1.1)',
            labelDelay: 0.5,           // When label starts after line
            counterDuration: 2.5,      // Counter animation duration
            counterEase: 'power2.out',
            counterDelay: 0.6          // When counter starts after line
        };

        // Set initial states for all cards
        cards.forEach(card => {
            const divider = card.querySelector('.statistics-card-divider');
            const label = card.querySelector('.statistics-card-label');
            const number = card.querySelector('.statistics-card-number');

            // Line starts fully clipped (will reveal top to bottom)
            if (divider) {
                gsap.set(divider, {
                    clipPath: 'inset(0 0 100% 0)',
                    webkitClipPath: 'inset(0 0 100% 0)',
                    willChange: 'clip-path'
                });
            }

            // Label starts hidden and below
            if (label) {
                gsap.set(label, {
                    y: 30,
                    autoAlpha: 0
                });
            }

            // Number starts hidden
            if (number) {
                gsap.set(number, {
                    autoAlpha: 0
                });
            }
        });

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: statsContainer,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Animate each card
        cards.forEach((card, index) => {
            const divider = card.querySelector('.statistics-card-divider');
            const label = card.querySelector('.statistics-card-label');
            const number = card.querySelector('.statistics-card-number');

            const cardStart = index * TIMING.lineStagger;

            // 1. Line reveals from top to bottom
            if (divider) {
                tl.to(divider, {
                    clipPath: 'inset(0 0 0% 0)',
                    webkitClipPath: 'inset(0 0 0% 0)',
                    duration: TIMING.lineDuration,
                    ease: TIMING.lineEase
                }, cardStart);
            }

            // 2. Label fades up
            if (label) {
                tl.to(label, {
                    y: 0,
                    autoAlpha: 1,
                    duration: TIMING.labelDuration,
                    ease: TIMING.labelEase
                }, cardStart + TIMING.labelDelay);
            }

            // 3. Number counter animation
            if (number) {
                const text = number.textContent.trim();
                const numMatch = text.match(/[\d,]+/);

                if (numMatch) {
                    const targetValue = parseInt(numMatch[0].replace(/,/g, ''));
                    const prefix = text.substring(0, numMatch.index);
                    const suffix = text.substring(numMatch.index + numMatch[0].length);

                    // Determine start value based on target number
                    let startValue = 0;
                    if (targetValue > 1800 && targetValue < 2100) {
                        // Years (like 1928) start from 1800
                        startValue = 1800;
                    } else if (targetValue >= 700 && targetValue <= 900) {
                        // Student count (800+) starts from 700
                        startValue = 700;
                    }

                    // Create counter object
                    const counter = { value: startValue };

                    // Show the number element
                    tl.set(number, { autoAlpha: 1 }, cardStart + TIMING.counterDelay);

                    // Animate the counter
                    let lastDisplayedValue = startValue;
                    tl.to(counter, {
                        value: targetValue,
                        duration: TIMING.counterDuration,
                        ease: TIMING.counterEase,
                        onUpdate: function() {
                            const currentValue = Math.round(counter.value);
                            // Only update DOM if value actually changed (reduces updates from 60fps to ~10-15fps)
                            if (currentValue !== lastDisplayedValue) {
                                lastDisplayedValue = currentValue;
                                const formattedValue = currentValue.toLocaleString();
                                number.textContent = prefix + formattedValue + suffix;
                            }
                        }
                    }, cardStart + TIMING.counterDelay);
                } else {
                    // If no number found, just fade in the text
                    tl.to(number, {
                        autoAlpha: 1,
                        duration: TIMING.labelDuration,
                        ease: TIMING.labelEase
                    }, cardStart + TIMING.counterDelay);
                }
            }
        });

        // Clean up willChange after animation
        tl.eventCallback('onComplete', () => {
            cards.forEach(card => {
                const divider = card.querySelector('.statistics-card-divider');
                if (divider) {
                    gsap.set(divider, { clearProps: 'will-change' });
                }
            });
        });
    }

    initStatsAnimation();

    // ==========================================================================
    // STATISTICS SECTION ANIMATION - END
    // ==========================================================================

    // ==========================================================================
    // TESTIMONIALS SLIDER
    // ==========================================================================

    function initTestimonialsSlider() {
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        const picWrapper = document.querySelector('.testimonials-pic-slider .swiper-wrapper');
        const textWrapper = document.querySelector('.testimonials-text-slider .swiper-wrapper');

        if (!prevBtn || !nextBtn || !picWrapper || !textWrapper) return;

        const totalSlides = picWrapper.querySelectorAll('.swiper-slide').length;
        const isMobile = window.matchMedia('(max-width: 991px)').matches;
        const sliderDirection = isMobile ? 'horizontal' : 'vertical';

        // Picture slider
        const picSlider = new Swiper('.testimonials-pic-slider', {
            direction: sliderDirection,
            slidesPerView: 1,
            speed: 1000,
            allowTouchMove: isMobile, // Enable touch on mobile
            effect: 'slide'
        });

        // Text slider - fade effect
        const textSlider = new Swiper('.testimonials-text-slider', {
            direction: sliderDirection,
            slidesPerView: 1,
            speed: 0,
            effect: 'fade',
            fadeEffect: {
                crossFade: false
            },
            allowTouchMove: isMobile,
            touchStartPreventDefault: false,
            touchMoveStopPropagation: false,
            on: {
                init: function() {
                    const activeSlide = this.slides[this.activeIndex];
                    if (!activeSlide) return;
                    const items = activeSlide.querySelectorAll('.testimonials-quote, .testimonials-attribution');
                    gsap.set(items, { opacity: 1, y: 0 });
                },
                slideChangeTransitionStart: function() {
                    const prevSlide = this.slides[this.previousIndex];
                    const nextSlide = this.slides[this.activeIndex];

                    if (prevSlide) {
                        const prevItems = prevSlide.querySelectorAll('.testimonials-quote, .testimonials-attribution');
                        gsap.killTweensOf(prevItems);
                        gsap.to(prevItems, {
                            y: -16,
                            opacity: 0,
                            duration: 0.45,
                            ease: 'power2.out',
                            stagger: 0.06,
                            force3D: true
                        });
                    }

                    if (nextSlide) {
                        const nextItems = nextSlide.querySelectorAll('.testimonials-quote, .testimonials-attribution');
                        gsap.killTweensOf(nextItems);
                        gsap.fromTo(
                            nextItems,
                            { y: 18, opacity: 0, force3D: true },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.6,
                                ease: 'power2.out',
                                delay: 0.08,
                                stagger: 0.08,
                                force3D: true
                            }
                        );
                    }
                },
                slideChange: function() {
                    picSlider.slideTo(this.activeIndex);
                    updateButtons(this.activeIndex);
                }
            }
        });

        // Sync picture slider to text slider
        picSlider.on('slideChange', function() {
            if (this.activeIndex !== textSlider.activeIndex) {
                textSlider.slideTo(this.activeIndex);
            }
        });

        function updateButtons(index) {
            const prevDisabled = index === 0;
            const nextDisabled = index === totalSlides - 1;
            prevBtn.disabled = prevDisabled;
            nextBtn.disabled = nextDisabled;
            prevBtn.classList.toggle('is-disabled', prevDisabled);
            nextBtn.classList.toggle('is-disabled', nextDisabled);
        }

        // Initialize button states
        updateButtons(0);

        // Button click handlers
        prevBtn.addEventListener('click', () => textSlider.slidePrev());
        nextBtn.addEventListener('click', () => textSlider.slideNext());

        // Initialize GSAP animations
        if (window.gsapInitFor) {
            window.gsapInitFor(textWrapper);
            window.gsapInitFor(picWrapper);
        }

        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    initTestimonialsSlider();

    // Hero video lazy loading with smooth poster-to-video transition
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Ensure video has muted attribute for autoplay to work
        heroVideo.muted = true;

        // Handle smooth transition from poster to video
        function startVideoPlayback() {
            heroVideo.play().catch(function(error) {
                // Silently handle autoplay prevention - this is expected browser behavior
                // Video will remain paused until user interacts with the page
            });
        }

        // Wait for video to be ready before showing it
        heroVideo.addEventListener('canplay', function onCanPlay() {
            // Add loaded class to fade in video smoothly over poster
            heroVideo.classList.add('loaded');

            // Start playing once video is ready
            startVideoPlayback();

            // Remove listener as we only need it once
            heroVideo.removeEventListener('canplay', onCanPlay);
        }, { once: true });

        // Start loading video after page load to not delay initial render
        window.addEventListener('load', function() {
            heroVideo.load();
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

    // Footer marquee - JS driven, same direction (no scroll-based reversal)
    function initFooterMarquee() {
        const marquee = document.querySelector('.footer-large-text');
        if (!marquee) return;

        const original = marquee.querySelector('h1');
        if (!original) return;

        const isMobile = window.innerWidth <= 991;
        const durationAttr = (isMobile && marquee.getAttribute('data-marquee-duration-mobile'))
            || marquee.getAttribute('data-marquee-duration');
        let duration = parseFloat(durationAttr) || 10;

        const track = document.createElement('div');
        track.className = 'footer-marquee-track';

        const item = original;
        item.classList.add('footer-marquee-item');

        track.appendChild(item);
        const clone = item.cloneNode(true);
        track.appendChild(clone);

        marquee.innerHTML = '';
        marquee.appendChild(track);

        let itemWidth = 1;
        let offset = 0;

        const measure = () => {
            itemWidth = item.offsetWidth || 1;
            track.style.transform = 'translate3d(0,0,0)';
            offset = 0;
        };

        measure();
        window.addEventListener('resize', () => {
            const isMobileNow = window.innerWidth <= 991;
            const durationAttrNow = (isMobileNow && marquee.getAttribute('data-marquee-duration-mobile'))
                || marquee.getAttribute('data-marquee-duration');
            const parsed = parseFloat(durationAttrNow);
            if (!Number.isNaN(parsed) && parsed > 0) {
                duration = parsed;
            }
            measure();
        });

        const speed = () => (itemWidth / duration) || 50; // px/sec
        let lastTime = performance.now();

        const tick = (now) => {
            const delta = (now - lastTime) / 1000;
            lastTime = now;
            offset -= speed() * delta;
            if (-offset >= itemWidth) {
                offset += itemWidth;
            }
            track.style.transform = `translate3d(${offset}px, 0, 0)`;
            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }

    initFooterMarquee();

});
