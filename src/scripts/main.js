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
    const supportsStableScrollbarGutter =
        typeof window.CSS !== 'undefined' &&
        typeof window.CSS.supports === 'function' &&
        window.CSS.supports('scrollbar-gutter: stable');
    const usePaddingCompensation = !supportsStableScrollbarGutter;

    function openMenu() {
        isMenuOpen = true;

        // Calculate scrollbar width
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Apply padding to body AND header
        if (usePaddingCompensation && scrollbarWidth > 0) {
            document.body.style.paddingRight = scrollbarWidth + 'px';
            header.style.paddingRight = scrollbarWidth + 'px';
        }

        const headerMenuItems = document.querySelectorAll(
            '.header-nav .btn-book-tour, .header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );

        gsap.set(headerMenuItems, { opacity: 0, y: -20, force3D: true });

        header.classList.add('menu-open');
        header.classList.remove('header-hidden');
        isHeaderHidden = false;
        megaMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuOverlay.style.pointerEvents = 'none';
        hamburger.classList.add('active');
        menuText.textContent = 'CLOSE';
        document.body.style.overflow = 'hidden';

        if (!isMobile()) {
            btnEnquire.style.display = 'inline-flex';
            dropdownWrappers.forEach(wrapper => {
                wrapper.style.display = 'flex';
            });
        } else {
            btnEnquire.style.display = 'none';
            dropdownWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });
        }

        // Create menu animation timeline
        const menuTimeline = gsap.timeline();

        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');

        // Clear any existing properties
        gsap.set([menuMainItems, menuSubItems, menuImage], { clearProps: 'all' });

        const isMobileView = isMobile();

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
            // Header menu items (slide in from top)
            .to(headerMenuItems, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out',
                stagger: 0.08,
                force3D: true,
                immediateRender: false
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
            // Menu footer (earlier on mobile since image is hidden)
            .fromTo(menuFooter,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
                isMobileView ? 1.25 : 2.1
            )
            .call(() => {
                menuOverlay.style.pointerEvents = 'auto';
            }, null, 0.35);

    }

    function closeMenu() {
        isMenuOpen = false;

        // Reset menu items AFTER fade to avoid flicker
        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');
        const headerMenuItems = document.querySelectorAll(
            '.header-nav .btn-book-tour, .header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );
        const headerMenuItemsHidden = document.querySelectorAll(
            '.header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );
        const bookTourBtn = document.querySelector('.header-nav .btn-book-tour');
        const rightBlock = header ? header.querySelector('.right-block') : null;
        gsap.killTweensOf([menuMainItems, menuSubItems, menuImage, menuFooter, megaMenu, menuOverlay]);

        function getRightBlockMaxWidth() {
            const width = window.innerWidth;
            if (width <= 767) return '40%';
            if (width <= 991) return '57.875%';
            return '33.33333333%';
        }

        const closeTimeline = gsap.timeline({
            onComplete: () => {
                gsap.set(menuImage, { opacity: 0, scale: 1.15 });
                gsap.set(menuMainItems, { opacity: 0, x: -60 });
                gsap.set(menuSubItems, { opacity: 0, x: -20 });
                gsap.set(menuFooter, { opacity: 0, y: 20 });
                gsap.set(headerMenuItems, { clearProps: 'opacity,transform' });
                if (rightBlock) {
                    gsap.set(rightBlock, { clearProps: 'max-width' });
                }
                // Remove padding from body AND header
                if (usePaddingCompensation) {
                    document.body.style.paddingRight = '';
                    header.style.paddingRight = '';
                }

                header.classList.remove('menu-open');
                hamburger.classList.remove('active');
                menuText.textContent = 'MENU';

                megaMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                menuOverlay.style.pointerEvents = '';
                document.body.style.overflow = '';

                if (bookTourBtn) {
                    gsap.fromTo(bookTourBtn,
                        { opacity: 0, y: -12, force3D: true },
                        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', force3D: true }
                    );
                }
            }
        });

        // Fade everything away, then reset state
        closeTimeline.to([megaMenu, menuOverlay], {
            opacity: 0,
            duration: 0.25,
            ease: 'power1.inOut'
        }, 0);

        // Hide header menu items (except Book a Tour) smoothly
        closeTimeline.to(headerMenuItemsHidden, {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: 'power1.in',
            force3D: true
        }, 0);

        // Fade Book a Tour out so width shift isn't visible
        if (bookTourBtn) {
            closeTimeline.to(bookTourBtn, {
                opacity: 0,
                duration: 0.15,
                ease: 'power1.in'
            }, 0);
        }

        // Instantly return header width to closed state while items are faded out
        if (rightBlock) {
            closeTimeline.set(rightBlock, {
                maxWidth: getRightBlockMaxWidth()
            }, 0.18);
        }

        // Reset mobile menu overlay
        if (isMobile()) {
            const menuSubItemsContainer = document.querySelector('.menu-sub-items');
            if (menuSubItemsContainer) {
                menuSubItemsContainer.classList.remove('active');
                const items = menuSubItemsContainer.querySelectorAll('.menu-sub-item');
                gsap.set(items, { opacity: 0, x: -20 });
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
            item.addEventListener('click', function (e) {
                if (!isMobile()) return;
                e.preventDefault();

                // Add back button if it doesn't exist
                let backBtn = menuSubItemsContainer.querySelector('.menu-sub-back');
                if (!backBtn) {
                    backBtn = document.createElement('div');
                    backBtn.className = 'menu-sub-back';
                    backBtn.textContent = 'Back';
                    backBtn.addEventListener('click', function () {
                        const items = menuSubItemsContainer.querySelectorAll('.menu-sub-item');
                        menuSubItemsContainer.classList.remove('active');
                        gsap.set(items, { opacity: 0, x: -20 });
                    });
                    menuSubItemsContainer.insertBefore(backBtn, menuSubItemsContainer.firstChild);
                }

                // Show overlay
                menuSubItemsContainer.classList.add('active');

                // Animate submenu items (stagger like desktop)
                const items = menuSubItemsContainer.querySelectorAll('.menu-sub-item');
                gsap.killTweensOf(items);
                gsap.set(items, { opacity: 0, x: -20, force3D: true });
                gsap.to(items, {
                    opacity: 1,
                    x: 0,
                    duration: 0.35,
                    ease: 'power2.out',
                    stagger: 0.05,
                    force3D: true
                });
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

        // Skip gradient animation on mobile (gradient is hidden via CSS)
        const isMobile = window.innerWidth <= 991;
        if (heroGradient && !isMobile) {
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

        // Skip gradient animation on mobile (gradient is hidden via CSS)
        if (heroGradient && !isMobile) {
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

        // Animate hero media wrapper with clip-reveal from left to right
        const heroMedia = document.querySelector('.hero-media-wrapper');
        if (heroMedia) {
            const hidden = 'inset(0 100% 0 0)'; // Hidden from left
            const shown = 'inset(0 0% 0 0)';    // Fully revealed

            gsap.set(heroMedia, {
                clipPath: hidden,
                webkitClipPath: hidden,
                opacity: 1,
                visibility: 'visible',
                willChange: 'clip-path',
                force3D: true
            });

            heroTimeline.to(heroMedia, {
                clipPath: shown,
                webkitClipPath: shown,
                duration: 1.2,
                ease: 'power2.inOut',
                force3D: true,
                autoRound: false,
                onComplete: () => {
                    gsap.set(heroMedia, { clearProps: 'will-change' });
                }
            }, 0.2);
        }
    }

    // Initialize hero animations - wait a tiny bit to ensure DOM is fully ready
    setTimeout(function () {
        initHeroAnimations();
    }, 50);

    // Dropdown animation: clip-path curtain + stagger items
    function initDropdownAnimations() {
        const dropdowns = document.querySelectorAll('.dropdown');
        if (!dropdowns.length) return;

        dropdowns.forEach((dropdown) => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!toggle || !menu) return;

            dropdown.addEventListener('show.bs.dropdown', () => {
                gsap.killTweensOf(menu);
                const items = menu.querySelectorAll('.dropdown-item');

                menu.style.display = 'block';
                menu.style.overflow = 'hidden';

                gsap.set(menu, {
                    clipPath: 'inset(0 0 100% 0)',
                    opacity: 1,
                    willChange: 'clip-path,opacity'
                });

                gsap.set(items, { opacity: 0, x: -12, force3D: true });

                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.set(menu, { clearProps: 'will-change,overflow,clipPath' });
                    }
                });

                tl.to(menu, {
                    clipPath: 'inset(0 0 0% 0)',
                    duration: 0.35,
                    ease: 'power2.out'
                }, 0)
                    .to(items, {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        stagger: 0.04
                    }, 0.08);
            });

            dropdown.addEventListener('hide.bs.dropdown', (e) => {
                e.preventDefault();
                gsap.killTweensOf(menu);
                const items = menu.querySelectorAll('.dropdown-item');

                const tl = gsap.timeline({
                    onComplete: () => {
                        menu.classList.remove('show');
                        dropdown.classList.remove('show');
                        menu.style.display = 'none';
                        menu.style.overflow = '';
                        toggle.setAttribute('aria-expanded', 'false');
                        gsap.set(menu, { clearProps: 'clipPath' });
                        gsap.set(items, { clearProps: 'opacity,transform' });
                    }
                });

                tl.to(items, {
                    opacity: 0,
                    x: -12,
                    duration: 0.2,
                    ease: 'power2.in',
                    stagger: 0.03
                }, 0)
                    .to(menu, {
                        clipPath: 'inset(0 0 100% 0)',
                        duration: 0.25,
                        ease: 'power2.in'
                    }, 0.05);
            });
        });
    }

    initDropdownAnimations();

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
            { selector: '.about-section .gradient-circle', trigger: '.about-section', start: 'top 85%' },
            { selector: '.academics-gradient', trigger: '.academics-section', start: 'top 85%' },
            { selector: '.testimonials-gradient', trigger: '.testimonials-section', start: 'top 60%' }
        ];

        items.forEach(({ selector, trigger, start }) => {
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
                    start: start,
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
        const aboutHeading = document.querySelector('.about-section h2');
        if (!aboutHeading) {
            return;
        }

        // Use text wrapping animations for all breakpoints
        wrapWords(aboutHeading);

        const aboutParagraphs = document.querySelectorAll('.about-text p');
        aboutParagraphs.forEach(p => wrapSentences(p));

        gsap.set('.about-section h2 .word, .about-section h2 .underline', { opacity: 0 });
        gsap.set('.about-text .sentence', { opacity: 0 });

        const headingPieces = gsap.utils.toArray('.about-section h2 .word, .about-section h2 .underline');

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
            tab.addEventListener('click', function () {
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
                        onUpdate: function () {
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
    // TESTIMONIALS SLIDER
    // ==========================================================================

    // Simplified Custom Testimonials Slider with GSAP Animations
    (function initTestimonialsSlider() {
        // =====================
        // GET ELEMENTS
        // =====================
        const imageWrapper = document.getElementById('testimonialsImageWrapper');
        const contentWrapper = document.getElementById('testimonialsContentWrapper');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');

        if (!imageWrapper || !contentWrapper || !prevBtn || !nextBtn) {
            console.warn('Testimonials slider elements not found');
            return;
        }

        const imageSlides = imageWrapper.querySelectorAll('.testimonials-image');
        const contentSlides = contentWrapper.querySelectorAll('.testimonials-slide-content');

        if (!imageSlides.length || !contentSlides.length) {
            console.warn('No testimonial slides found in HTML');
            return;
        }

        // =====================
        // STATE
        // =====================
        let currentIndex = 0;
        let isAnimating = false;
        const totalSlides = imageSlides.length;

        // =====================
        // INITIALIZE
        // =====================
        function initSlides() {
            // Set initial state for images
            imageSlides.forEach((slide, index) => {
                if (index === 0) {
                    gsap.set(slide, { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 });
                    gsap.set(slide.querySelector('.testimonials-img'), { scale: 1, x: 0 });
                } else {
                    gsap.set(slide, { clipPath: 'inset(0% 100% 0% 0%)', zIndex: 0 });
                }
            });

            // Animate first content slide in
            contentSlides.forEach((slide, index) => {
                const quote = slide.querySelector('.testimonials-quote');
                const attr = slide.querySelector('.testimonials-attribution');

                if (index === 0) {
                    slide.classList.add('active');
                    const tl = gsap.timeline({ delay: 0.3 });
                    tl.fromTo(quote,
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
                    ).fromTo(attr,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                        '-=0.4'
                    );
                } else {
                    slide.classList.remove('active');
                    gsap.set([quote, attr], { opacity: 0 });
                }
            });
        }

        // =====================
        // GO TO SLIDE
        // =====================
        function goToSlide(newIndex, direction) {
            if (isAnimating || newIndex === currentIndex) return;
            isAnimating = true;

            const oldIndex = currentIndex;
            currentIndex = newIndex;

            // ── IMAGE PARALLAX TRANSITION ──
            const newImageSlide = imageSlides[currentIndex];
            const oldImageSlide = imageSlides[oldIndex];
            const newImg = newImageSlide.querySelector('.testimonials-img');
            const oldImg = oldImageSlide.querySelector('.testimonials-img');

            const clipFrom = direction === 1 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
            const oldClipTo = direction === 1 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';
            const parallaxFrom = direction === 1 ? -100 : 100;
            const oldParallaxTo = direction === 1 ? 100 : -100;

            // Set up new image
            gsap.set(newImageSlide, { clipPath: clipFrom, zIndex: 2 });
            gsap.set(newImg, { scale: 1.3, x: parallaxFrom });

            // Animate old image out
            gsap.set(oldImageSlide, { zIndex: 1 });
            gsap.to(oldImg, {
                x: oldParallaxTo,
                scale: 1.1,
                duration: 1.2,
                ease: 'power3.inOut'
            });
            gsap.to(oldImageSlide, {
                clipPath: oldClipTo,
                duration: 1.2,
                ease: 'power3.inOut',
                delay: 0.05
            });

            // Animate new image in
            gsap.to(newImageSlide, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power3.inOut'
            });
            gsap.to(newImg, {
                scale: 1,
                x: 0,
                duration: 1.4,
                ease: 'power3.out'
            });

            // ── CONTENT TRANSITION ──
            const oldContent = contentSlides[oldIndex];
            const newContent = contentSlides[currentIndex];
            const exitY = direction === 1 ? -50 : 50;
            const enterFromY = direction === 1 ? 60 : -60;

            // Animate old content out
            const oldQuote = oldContent.querySelector('.testimonials-quote');
            const oldAttr = oldContent.querySelector('.testimonials-attribution');

            gsap.timeline({
                onComplete: () => {
                    oldContent.classList.remove('active');
                }
            })
                .to(oldAttr, {
                    opacity: 0,
                    y: exitY * 0.5,
                    duration: 0.35,
                    ease: 'power3.in'
                }, 0)
                .to(oldQuote, {
                    opacity: 0,
                    y: exitY,
                    duration: 0.4,
                    ease: 'power3.in'
                }, 0.05);

            // Animate new content in
            newContent.classList.add('active');
            const newQuote = newContent.querySelector('.testimonials-quote');
            const newAttr = newContent.querySelector('.testimonials-attribution');

            gsap.set(newQuote, { opacity: 0, y: enterFromY });
            gsap.set(newAttr, { opacity: 0, y: enterFromY * 0.5 });

            gsap.timeline({
                delay: 0.5,
                onComplete: () => {
                    setTimeout(() => {
                        isAnimating = false;
                    }, 100);
                }
            })
                .to(newQuote, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, 0)
                .to(newAttr, {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    ease: 'power3.out'
                }, 0.15);
        }

        // =====================
        // NAVIGATION
        // =====================
        function nextSlide() {
            goToSlide((currentIndex + 1) % totalSlides, 1);
        }

        function prevSlide() {
            goToSlide((currentIndex - 1 + totalSlides) % totalSlides, -1);
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Touch navigation
        let touchStartX = 0;
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            testimonialsSection.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) nextSlide();
                    else prevSlide();
                }
            });
        }

        // =====================
        // INIT
        // =====================
        initSlides();
    })();

    // Hero video lazy loading with smooth poster-to-video transition
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Ensure video has muted attribute for autoplay to work
        heroVideo.muted = true;

        // Handle smooth transition from poster to video
        function startVideoPlayback() {
            heroVideo.play().catch(function (error) {
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
        window.addEventListener('load', function () {
            heroVideo.load();
        });
    }

    if (footerArrowUp) {
        footerArrowUp.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Footer marquee - JS driven, seamless infinite loop
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
        track.style.display = 'inline-flex';
        track.style.willChange = 'transform';
        track.style.whiteSpace = 'nowrap';

        const item = original;
        item.classList.add('footer-marquee-item');
        item.style.display = 'inline-block';
        item.style.whiteSpace = 'nowrap';

        track.appendChild(item);
        const clone = item.cloneNode(true);
        clone.style.display = 'inline-block';
        clone.style.whiteSpace = 'nowrap';
        track.appendChild(clone);

        marquee.innerHTML = '';
        marquee.appendChild(track);

        let itemWidth = 1;
        let position = 0;

        const measure = () => {
            itemWidth = item.getBoundingClientRect().width;
            if (itemWidth === 0) itemWidth = 1;
        };

        measure();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const isMobileNow = window.innerWidth <= 991;
                const durationAttrNow = (isMobileNow && marquee.getAttribute('data-marquee-duration-mobile'))
                    || marquee.getAttribute('data-marquee-duration');
                const parsed = parseFloat(durationAttrNow);
                if (!Number.isNaN(parsed) && parsed > 0) {
                    duration = parsed;
                }
                measure();
                position = position % itemWidth;
            }, 100);
        });

        const speed = () => itemWidth / duration;
        let lastTime = performance.now();

        const tick = (now) => {
            const delta = (now - lastTime) / 1000;
            lastTime = now;

            position -= speed() * delta;

            while (position <= -itemWidth) {
                position += itemWidth;
            }

            track.style.transform = `translate3d(${position}px, 0, 0)`;
            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }

    initFooterMarquee();

    // Cursor-following gradient effect - gradient follows cursor around hero title only
    function initGradientCursorEffect() {
        if (window.innerWidth <= 991) return;

        const heroGradient = document.querySelector('.hero-gradient');
        const heroSection = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero-title');

        if (!heroGradient || !heroSection || !heroTitle) return;

        const CONFIG = {
            maxRight: 300,
            maxUp: 300,
            activeRadius: 400,
            followEase: 0.08,
            returnEase: 0.03,
        };

        const originalLeft = -212;
        const originalBottom = -536;

        let mouseX = null;
        let mouseY = null;
        let currentX = originalLeft;
        let currentY = originalBottom;
        let hasMouseMoved = false;
        let isInActiveArea = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!hasMouseMoved) {
                hasMouseMoved = true;
                console.log('Gradient will now follow cursor (right & up only)');
            }
        });

        function animate() {
            if (!hasMouseMoved || mouseX === null || mouseY === null) {
                requestAnimationFrame(animate);
                return;
            }

            const heroRect = heroSection.getBoundingClientRect();
            const titleRect = heroTitle.getBoundingClientRect();

            const titleCenterX = titleRect.left + (titleRect.width / 2);
            const titleCenterY = titleRect.top + (titleRect.height / 2);

            const distanceFromTitle = Math.sqrt(
                Math.pow(mouseX - titleCenterX, 2) +
                Math.pow(mouseY - titleCenterY, 2)
            );

            isInActiveArea = distanceFromTitle <= CONFIG.activeRadius;

            let targetLeft = originalLeft;
            let targetBottom = originalBottom;

            if (isInActiveArea) {
                const deltaX = mouseX - titleCenterX;
                const deltaY = titleCenterY - mouseY;

                const moveRight = Math.max(0, deltaX);
                const moveUp = Math.max(0, deltaY);

                const rightPercent = Math.min(1, moveRight / CONFIG.activeRadius);
                const upPercent = Math.min(1, moveUp / CONFIG.activeRadius);

                const offsetX = rightPercent * CONFIG.maxRight;
                const offsetY = upPercent * CONFIG.maxUp;

                targetLeft = originalLeft + offsetX;
                targetBottom = originalBottom + offsetY;
            }

            const currentEase = isInActiveArea ? CONFIG.followEase : CONFIG.returnEase;
            currentX += (targetLeft - currentX) * currentEase;
            currentY += (targetBottom - currentY) * currentEase;

            heroGradient.style.left = `${currentX}px`;
            heroGradient.style.bottom = `${currentY}px`;

            requestAnimationFrame(animate);
        }

        console.log('Hero gradient cursor effect initialized - restricted to title area');
        animate();
    }

    setTimeout(() => {
        initGradientCursorEffect();
    }, 2000);

    // Cursor-following effect for FOOTER gradient - entire footer area
    function initFooterGradientCursorEffect() {
        if (window.innerWidth <= 991) {
            console.log('Footer gradient: Skipped (mobile)');
            return;
        }

        const footerGradient = document.querySelector('.footer-gradient');
        const footerSection = document.querySelector('footer.footer');

        if (!footerGradient || !footerSection) {
            console.warn('Footer gradient elements not found');
            return;
        }

        console.log('Footer gradient element found:', footerGradient);

        const CONFIG = {
            maxLeft: 300,
            maxRight: 300,
            maxUp: 300,
            followEase: 0.08,
            returnEase: 0.03,
        };

        let mouseX = null;
        let mouseY = null;
        let currentX = 0;
        let currentY = 0;
        let hasMouseMoved = false;
        let isInFooter = false;
        let frameCount = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!hasMouseMoved) {
                hasMouseMoved = true;
                console.log('Footer gradient: Mouse movement detected');
            }
        });

        function animate() {
            if (!hasMouseMoved || mouseX === null || mouseY === null) {
                requestAnimationFrame(animate);
                return;
            }

            const footerRect = footerSection.getBoundingClientRect();

            const isFooterVisible = (
                footerRect.top < window.innerHeight &&
                footerRect.bottom > 0
            );

            if (!isFooterVisible) {
                requestAnimationFrame(animate);
                return;
            }

            const activeHeightStart = footerRect.top + (footerRect.height * 0.4);
            isInFooter = (
                mouseX >= footerRect.left &&
                mouseX <= footerRect.right &&
                mouseY >= activeHeightStart &&
                mouseY <= footerRect.bottom
            );

            let targetX = 0;
            let targetY = 0;

            if (isInFooter) {
                const footerCenterX = footerRect.left + (footerRect.width / 2);
                const footerCenterY = footerRect.top + (footerRect.height / 2);

                const deltaX = mouseX - footerCenterX;
                const deltaY = footerCenterY - mouseY;

                const moveUp = Math.max(0, deltaY);

                const scale = 1.2;

                targetX = Math.max(-CONFIG.maxLeft, Math.min(CONFIG.maxRight, deltaX * scale));
                targetY = Math.max(0, Math.min(CONFIG.maxUp, moveUp * scale));

                if (frameCount % 60 === 0) {
                    const computedTransform = window.getComputedStyle(footerGradient).transform;
                    console.log('Footer gradient:', {
                        isInFooter,
                        targetX: targetX.toFixed(2),
                        targetY: targetY.toFixed(2),
                        currentX: currentX.toFixed(2),
                        currentY: currentY.toFixed(2),
                        transform: computedTransform
                    });
                }

                if (frameCount % 30 === 0) {
                    footerGradient.style.opacity = isInFooter ? '1' : '0.8';
                }
            }

            const currentEase = isInFooter ? CONFIG.followEase : CONFIG.returnEase;
            currentX += (targetX - currentX) * currentEase;
            currentY += (targetY - currentY) * currentEase;

            footerGradient.style.transform = `translate(calc(-50% + ${currentX}px), ${-currentY}px)`;

            frameCount++;
            requestAnimationFrame(animate);
        }

        console.log('Footer gradient cursor effect initialized - entire footer area');
        animate();
    }

    setTimeout(() => {
        initFooterGradientCursorEffect();
    }, 2000);

    // Cursor-following effect for TESTIMONIALS gradient - left and up movement
    function initTestimonialsGradientCursorEffect() {
        if (window.innerWidth <= 991) {
            console.log('Testimonials gradient: Skipped (mobile)');
            return;
        }

        const testimonialsGradient = document.querySelector('.testimonials-gradient');
        const testimonialsSection = document.querySelector('.testimonials-section');
        const testimonialsContent = document.querySelector('.testimonials-quote-wrapper');

        if (!testimonialsGradient || !testimonialsSection || !testimonialsContent) {
            console.warn('Testimonials gradient elements not found');
            return;
        }

        const CONFIG = {
            maxLeft: 400,
            maxUp: 400,
            activeRadius: 400,
            followEase: 0.08,
            returnEase: 0.03,
        };

        let mouseX = null;
        let mouseY = null;
        let currentX = 0;
        let currentY = 0;
        let hasMouseMoved = false;
        let isInActiveArea = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!hasMouseMoved) {
                hasMouseMoved = true;
                console.log('Testimonials gradient will now follow cursor (left & up only)');
            }
        });

        function animate() {
            if (!hasMouseMoved || mouseX === null || mouseY === null) {
                requestAnimationFrame(animate);
                return;
            }

            const testimonialsRect = testimonialsSection.getBoundingClientRect();
            const contentRect = testimonialsContent.getBoundingClientRect();

            const contentCenterX = contentRect.left + (contentRect.width / 2);
            const contentCenterY = contentRect.top + (contentRect.height / 2);

            const distanceFromContent = Math.sqrt(
                Math.pow(mouseX - contentCenterX, 2) +
                Math.pow(mouseY - contentCenterY, 2)
            );

            isInActiveArea = distanceFromContent <= CONFIG.activeRadius;

            let targetX = 0;
            let targetY = 0;

            if (isInActiveArea) {
                const deltaX = mouseX - contentCenterX;
                const deltaY = contentCenterY - mouseY;

                const moveLeft = Math.max(0, -deltaX);
                const moveUp = Math.max(0, deltaY);

                const leftPercent = Math.min(1, moveLeft / CONFIG.activeRadius);
                const upPercent = Math.min(1, moveUp / CONFIG.activeRadius);

                const offsetX = leftPercent * CONFIG.maxLeft;
                const offsetY = upPercent * CONFIG.maxUp;

                targetX = -offsetX;
                targetY = offsetY;
            }

            const currentEase = isInActiveArea ? CONFIG.followEase : CONFIG.returnEase;
            currentX += (targetX - currentX) * currentEase;
            currentY += (targetY - currentY) * currentEase;

            testimonialsGradient.style.transform = `translate(${currentX}px, ${-currentY}px)`;

            requestAnimationFrame(animate);
        }

        console.log('Testimonials gradient cursor effect initialized - restricted to content area');
        animate();
    }

    setTimeout(() => {
        initTestimonialsGradientCursorEffect();
    }, 2000);

});
