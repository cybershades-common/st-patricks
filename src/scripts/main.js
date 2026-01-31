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
        gsap.set([menuMainItems, menuSubItems], { clearProps: 'all' });

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
            // Menu image - curtain drop reveal (after sub menu)
            .fromTo(menuImage,
                { clipPath: 'inset(0 0 100% 0)' },
                { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power2.inOut' },
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

        // Remove padding from body AND header
        document.body.style.paddingRight = '';
        header.style.paddingRight = '';

        header.classList.remove('menu-open');
        hamburger.classList.remove('active');
        menuText.textContent = 'MENU';

        megaMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Reset menu items for next open
        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');

        gsap.set(menuMainItems, { opacity: 0, x: -60 });
        gsap.set(menuSubItems, { opacity: 0, x: -20 });
        gsap.set(menuImage, { clipPath: 'inset(0 0 100% 0)' });
        gsap.set(menuFooter, { opacity: 0, y: 20 });

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
            );

        // Hero CTA button - btn-clip-reveal animation
        const heroCTA = document.querySelector('.hero-text button');
        if (heroCTA) {
            // Set initial state for button fill (hidden from right)
            gsap.set(heroCTA, {
                autoAlpha: 1,
                clipPath: 'inset(0 100% 0 0)',
                webkitClipPath: 'inset(0 100% 0 0)',
                willChange: 'clip-path'
            });

            // Wrap text in span if it doesn't exist for clip reveal animation
            let ctaText = heroCTA.querySelector('span');
            if (!ctaText && heroCTA.textContent) {
                const text = heroCTA.textContent.trim();
                heroCTA.innerHTML = `<span>${text}</span>`;
                ctaText = heroCTA.querySelector('span');
            }

            // Set initial clip reveal state for text (hidden from right)
            if (ctaText) {
                gsap.set(ctaText, {
                    clipPath: 'inset(0 100% 0 0)',
                    webkitClipPath: 'inset(0 100% 0 0)',
                    display: 'inline-block',
                    willChange: 'clip-path'
                });
            }

            // Add button fill animation to timeline
            heroTimeline
                // Step 1: Fill color from right to left
                .to(heroCTA, {
                    clipPath: 'inset(0 0% 0 0)',
                    webkitClipPath: 'inset(0 0% 0 0)',
                    duration: 0.6,
                    ease: 'none',
                    force3D: true,
                    autoRound: false
                }, 1.7);

            // Step 2: Reveal text (left to right)
            if (ctaText) {
                heroTimeline.to(ctaText, {
                    clipPath: 'inset(0 0% 0 0)',
                    webkitClipPath: 'inset(0 0% 0 0)',
                    duration: 0.9,
                    ease: 'none',
                    force3D: true,
                    autoRound: false
                }, 2.35); // Start text reveal 0.65s after fill begins
            }
        }

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

        wrapWords(aboutHeading);

        const aboutParagraphs = document.querySelectorAll('.about-text p');
        aboutParagraphs.forEach(p => wrapSentences(p));

        gsap.set('.about-heading .word, .about-heading .underline', { opacity: 0, y: 32 });
        gsap.set('.about-text .sentence', { opacity: 0, y: 22 });

        const headingPieces = gsap.utils.toArray('.about-heading .word, .about-heading .underline');
        gsap.to(headingPieces, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.06,
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1
            }
        });

        gsap.to('.about-text .sentence', {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: 'power3.out',
            stagger: 0.42,
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 78%',
                end: 'top 38%',
                scrub: 1
            }
        });
    }

    initAboutReveal();

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
            labelEase: 'power2.out',
            labelDelay: 0.5,           // When label starts after line
            counterDuration: 4.5,      // Counter animation duration
            counterEase: 'power2.out',
            counterDelay: 0.6          // When counter starts after line
        };

        // Set initial states for all cards
        cards.forEach(card => {
            const divider = card.querySelector('.statistics-card-divider');
            const label = card.querySelector('.statistics-card-label');
            const number = card.querySelector('.statistics-card-number');

            // Line starts at 0 height (will grow from top)
            if (divider) {
                gsap.set(divider, {
                    scaleY: 0,
                    transformOrigin: 'top center',
                    willChange: 'transform'
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
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });

        // Animate each card
        cards.forEach((card, index) => {
            const divider = card.querySelector('.statistics-card-divider');
            const label = card.querySelector('.statistics-card-label');
            const number = card.querySelector('.statistics-card-number');

            const cardStart = index * TIMING.lineStagger;

            // 1. Line grows from top to bottom
            if (divider) {
                tl.to(divider, {
                    scaleY: 1,
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
                    tl.to(counter, {
                        value: targetValue,
                        duration: TIMING.counterDuration,
                        ease: TIMING.counterEase,
                        onUpdate: function() {
                            const currentValue = Math.round(counter.value);
                            // Format number with commas if needed
                            const formattedValue = currentValue.toLocaleString();
                            number.textContent = prefix + formattedValue + suffix;
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
