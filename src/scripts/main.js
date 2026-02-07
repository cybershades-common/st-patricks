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

        // Create menu animation timeline
        const menuTimeline = gsap.timeline();

        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');

        // Clear any existing properties
        gsap.set([menuMainItems, menuSubItems, menuImage], { clearProps: 'all' });

        menuTimeline
            // Mega menu fade in
            .to(megaMenu, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            }, '0')
            // Main menu items (starts immediately with mega menu)
            .fromTo(menuMainItems,
                { opacity: 0, x: -60, force3D: true },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power1.out', force3D: true },
                '+=0.3'
            )
            // Sub menu items (after main menu)
            .fromTo(menuSubItems,
                { opacity: 0, x: -20, force3D: true },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.04, ease: 'power1.out', force3D: true },
                '-=0.2'
            )
            // Menu image - fade in with zoom out (after sub menu)
            .fromTo(menuImage,
                { opacity: 0, scale: 1.15, force3D: true },
                { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', force3D: true },
                '-=0.2'
            )
            // Menu footer (after image)
            .fromTo(menuFooter,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
                '-=0.2'
            );

    }

    function closeMenu() {
        isMenuOpen = false;

        // Reset menu items FIRST (before removing active class)
        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');

        // Hide image immediately to prevent peeking
        gsap.set(menuImage, { opacity: 0, scale: 1.15 });
        gsap.set(menuMainItems, { opacity: 0, x: -60 });
        gsap.set(menuSubItems, { opacity: 0, x: -20 });
        gsap.set(menuFooter, { opacity: 0, y: 20 });

        // Remove padding from body AND header
        document.body.style.paddingRight = '';
        header.style.paddingRight = '';

        header.classList.remove('menu-open');
        hamburger.classList.remove('active');
        menuText.textContent = 'MENU';

        megaMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';

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

    // Hero animations
    // function initHeroAnimations() {
    //     // Create master timeline
    //     const heroTimeline = gsap.timeline();

    //     // Set initial states before timeline runs — prevents flash of visible content
    //     const heroTitleSpans = document.querySelectorAll('.hero-title span');
    //     gsap.set(heroTitleSpans, { display: 'inline-block', opacity: 0, y: 150 });
    //     // gsap.set('.header-logo', { y: -50, opacity: 0 });
    //     // gsap.set('.header-nav', { y: -50, opacity: 0 });
    //     gsap.set('.hero-text p', { y: 50, opacity: 0 });
    //     gsap.set('.hero-media-wrapper', { opacity: 0 });

    //     // Build timeline sequence
    //     heroTimeline
    //         // Header logo
    //         // .to('.header-logo',
    //         //     { y: 0, opacity: 1, duration: 0.7, ease: 'Power1.easeOut' },
    //         //     0.2
    //         // )
    //         // Header navigation
    //         // .to('.header-nav',
    //         //     { y: 0, opacity: 1, duration: 0.7, ease: 'Power1.easeOut' },
    //         //     0.2
    //         // )
    //         // Hero title words (staggered)
    //         .to(heroTitleSpans, {
    //             y: 0,
    //             opacity: 1,
    //             duration: 1.2,
    //             stagger: 0.4,
    //             ease: 'Power1.easeOut'
    //         }, 0.5)
    //         // Hero description text
    //         .to('.hero-text p',
    //             { y: 0, opacity: 1, duration: 1.2, ease: 'Power1.easeOut' },
    //             1.5
    //         );

    //     // Hero CTA button - btn-clip-reveal animation
    //     const heroCTA = document.querySelector('.hero-text button');
    //     if (heroCTA) {
    //         // Set initial state for button fill (hidden from right)
    //         gsap.set(heroCTA, {
    //             autoAlpha: 1,
    //             clipPath: 'inset(0 100% 0 0)',
    //             webkitClipPath: 'inset(0 100% 0 0)',
    //             willChange: 'clip-path'
    //         });

    //         // Wrap text in span if it doesn't exist for clip reveal animation
    //         let ctaText = heroCTA.querySelector('span');
    //         if (!ctaText && heroCTA.textContent) {
    //             const text = heroCTA.textContent.trim();
    //             heroCTA.innerHTML = `<span>${text}</span>`;
    //             ctaText = heroCTA.querySelector('span');
    //         }

    //         // Set initial clip reveal state for text (hidden from right)
    //         if (ctaText) {
    //             gsap.set(ctaText, {
    //                 clipPath: 'inset(0 100% 0 0)',
    //                 webkitClipPath: 'inset(0 100% 0 0)',
    //                 display: 'inline-block',
    //                 lineHeight: 'normal',
    //                 willChange: 'clip-path'
    //             });
    //         }

    //         // Add button fill animation to timeline
    //         heroTimeline
    //             // Step 1: Fill color from right to left
    //             .to(heroCTA, {
    //                 clipPath: 'inset(0 0% 0 0)',
    //                 webkitClipPath: 'inset(0 0% 0 0)',
    //                 duration: 0.6,
    //                 ease: 'none',
    //                 force3D: true,
    //                 autoRound: false
    //             }, 1.7);

    //         // Step 2: Reveal text (left to right)
    //         if (ctaText) {
    //             heroTimeline.to(ctaText, {
    //                 clipPath: 'inset(0 0% 0 0)',
    //                 webkitClipPath: 'inset(0 0% 0 0)',
    //                 duration: 0.7,
    //                 ease: 'none',
    //                 force3D: true,
    //                 autoRound: false
    //             }, 2.35); // Start text reveal 0.65s after fill begins
    //         }
    //     }

    //     // Hero gradient - subtle fade in from background
    //     const heroGradient = document.querySelector('.hero-gradient');
    //     if (heroGradient) {
    //         gsap.set(heroGradient, {
    //             autoAlpha: 0
    //         });

    //         heroTimeline.to(heroGradient, {
    //             autoAlpha: 0.6,
    //             duration: 2.5,
    //             ease: 'power1.inOut'
    //         }, 0.3);
    //     }

    //     // Hero video - fade in after title
    //     heroTimeline.to('.hero-media-wrapper', {
    //         opacity: 1,
    //         duration: 1,
    //         ease: 'power2.inOut'
    //     }, 1.1);
    // }

    // initHeroAnimations();

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

        // Picture slider - vertical slides
        const picSlider = new Swiper('.testimonials-pic-slider', {
            direction: 'vertical',
            slidesPerView: 1,
            speed: 1000,
            allowTouchMove: isMobile, // Enable touch on mobile
            effect: 'slide'
        });

        // Text slider - fade effect
        const textSlider = new Swiper('.testimonials-text-slider', {
            slidesPerView: 1,
            speed: 1000,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            allowTouchMove: isMobile,
            touchStartPreventDefault: false,
            touchMoveStopPropagation: false,
            on: {
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

    // Footer marquee - Using CSS animation (defined in _footer.css)
    // No JavaScript needed - CSS handles the infinite scroll

});
