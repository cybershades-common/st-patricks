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
    const menuSubItemsContainer = document.querySelector('.menu-sub-items');
    const menuImageWrapper = document.querySelector('.menu-image-wrapper');

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

    const menuSubGroups = menuSubItemsContainer
        ? Array.from(menuSubItemsContainer.querySelectorAll('.menu-sub-items-group'))
        : [];
    const menuSubGroupMap = new Map(menuSubGroups.map(group => [group.dataset.menu, group]));

    const menuOrder = Array.from(menuMainItems).map(item => item.dataset.menu || '');
    let currentMenuKey = null;
    let isMenuImageAnimating = false;
    let pendingMenuImageSrc = null;
    let isSubMenuAnimating = false;
    let pendingMenuKey = null;

    function getMenuDirection(nextKey) {
        const currentIndex = menuOrder.indexOf(currentMenuKey);
        const nextIndex = menuOrder.indexOf(nextKey);
        if (currentIndex === -1 || nextIndex === -1) return 1;
        return nextIndex > currentIndex ? 1 : -1;
    }

    function ensureMenuImageSlide() {
        if (!menuImageWrapper) return null;

        let activeSlide = menuImageWrapper.querySelector('.menu-image-slide.is-active');
        if (activeSlide) return activeSlide;

        let img = menuImageWrapper.querySelector('img.menu-image:not(.menu-image-placeholder)');
        let placeholder = menuImageWrapper.querySelector('.menu-image-placeholder');
        if (!img) {
            img = document.createElement('img');
            img.className = 'menu-image w-100';
            img.alt = 'Menu image';
        }

        if (!placeholder) {
            placeholder = img.cloneNode(true);
            placeholder.classList.add('menu-image-placeholder');
            menuImageWrapper.insertBefore(placeholder, menuImageWrapper.firstChild);
        }

        const slide = document.createElement('div');
        slide.className = 'menu-image-slide is-active';
        slide.appendChild(img);
        menuImageWrapper.appendChild(slide);

        gsap.set(slide, { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 });
        gsap.set(img, { scale: 1, x: 0, opacity: 1 });

        return slide;
    }

    function setMenuImage(src, instant, directionOverride) {
        if (!menuImageWrapper || !src) return;
        const activeSlide = ensureMenuImageSlide();
        if (!activeSlide) return;

        const activeImg = activeSlide.querySelector('img.menu-image');
        const placeholder = menuImageWrapper.querySelector('.menu-image-placeholder');
        if (activeImg && activeImg.getAttribute('src') === src) return;

        if (instant) {
            if (activeImg) {
                activeImg.setAttribute('src', src);
            }
            return;
        }

        if (isMenuImageAnimating) {
            pendingMenuImageSrc = src;
            return;
        }
        isMenuImageAnimating = true;

        const direction = directionOverride || getMenuDirection(currentMenuKey || 'about');
        const clipFrom = direction === 1 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
        const oldClipTo = direction === 1 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';
        const parallaxFrom = direction === 1 ? -100 : 100;
        const oldParallaxTo = direction === 1 ? 100 : -100;

        const newSlide = document.createElement('div');
        newSlide.className = 'menu-image-slide';
        const newImg = document.createElement('img');
        newImg.className = 'menu-image w-100';
        newImg.src = src;
        newImg.alt = activeImg ? activeImg.alt : 'Menu image';
        newSlide.appendChild(newImg);
        menuImageWrapper.appendChild(newSlide);

        // Ensure current image is fully visible before new slide moves in
        gsap.set(activeSlide, { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 });
        gsap.set(activeImg, { opacity: 1 });

        gsap.set(newSlide, { clipPath: clipFrom, zIndex: 2 });
        gsap.set(newImg, { scale: 1.3, x: parallaxFrom, opacity: 1 });

        gsap.to(activeImg, {
            x: oldParallaxTo,
            scale: 1.1,
            duration: 1.2,
            ease: 'power3.inOut'
        });
        gsap.to(activeSlide, {
            clipPath: oldClipTo,
            duration: 1.2,
            ease: 'power3.inOut',
            delay: 0.05
        });

        gsap.to(newSlide, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power3.inOut'
        });
        gsap.to(newImg, {
            scale: 1,
            x: 0,
            duration: 1.4,
            ease: 'power3.out',
            onComplete: () => {
                activeSlide.remove();
                newSlide.classList.add('is-active');
                isMenuImageAnimating = false;
                if (pendingMenuImageSrc && pendingMenuImageSrc !== src) {
                    const nextSrc = pendingMenuImageSrc;
                    pendingMenuImageSrc = null;
                    setMenuImage(nextSrc, false, directionOverride);
                } else {
                    pendingMenuImageSrc = null;
                }
            }
        });
    }

    function setActiveSubGroup(nextKey, direction, instant) {
        if (!menuSubItemsContainer) return;
        const nextGroup = menuSubGroupMap.get(nextKey);
        if (!nextGroup) {
            menuSubGroups.forEach(group => group.classList.remove('is-active'));
            return;
        }

        const currentGroup = menuSubItemsContainer.querySelector('.menu-sub-items-group.is-active');
        if (currentGroup === nextGroup && !instant) return;

        const exitX = direction === 1 ? -20 : 20;
        const enterX = direction === 1 ? 20 : -20;

        if (instant) {
            menuSubGroups.forEach(group => group.classList.remove('is-active'));
            nextGroup.classList.add('is-active');
            const items = Array.from(nextGroup.querySelectorAll('.menu-sub-item'));
            gsap.set(items, { opacity: 1, x: 0, clearProps: 'transform' });
            return;
        }

        if (!currentGroup) {
            menuSubGroups.forEach(group => group.classList.remove('is-active'));
            nextGroup.classList.add('is-active');
            const items = Array.from(nextGroup.querySelectorAll('.menu-sub-item'));
            gsap.set(items, { opacity: 0, x: enterX, force3D: true });
            gsap.to(items, {
                opacity: 1,
                x: 0,
                duration: 0.35,
                ease: 'power2.out',
                stagger: 0.05,
                force3D: true
            });
            return;
        }

        const currentItems = Array.from(currentGroup.querySelectorAll('.menu-sub-item'));
        gsap.killTweensOf(currentItems);

        if (isSubMenuAnimating) {
            pendingMenuKey = nextKey;
            return;
        }
        isSubMenuAnimating = true;

        gsap.timeline({
            onComplete: () => {
                currentGroup.classList.remove('is-active');
                nextGroup.classList.add('is-active');
                const nextItems = Array.from(nextGroup.querySelectorAll('.menu-sub-item'));
                gsap.set(nextItems, { opacity: 0, x: enterX, force3D: true });
                gsap.to(nextItems, {
                    opacity: 1,
                    x: 0,
                    duration: 0.35,
                    ease: 'power2.out',
                    stagger: 0.05,
                    force3D: true,
                    onComplete: () => {
                        isSubMenuAnimating = false;
                        if (pendingMenuKey && pendingMenuKey !== nextKey) {
                            const nextPending = pendingMenuKey;
                            pendingMenuKey = null;
                            updateMenuForKey(nextPending, false);
                        } else {
                            pendingMenuKey = null;
                        }
                    }
                });
            }
        }).to(currentItems, {
            opacity: 0,
            x: exitX,
            duration: 0.25,
            ease: 'power2.in',
            stagger: -0.04,
            force3D: true
        });
    }

    function updateMenuForKey(nextKey, instant) {
        if (!nextKey) return;
        if (nextKey === currentMenuKey && !instant) return;

        const activeItem = Array.from(menuMainItems).find(item => item.dataset.menu === nextKey);
        const imageSrc = activeItem ? activeItem.dataset.image : null;
        const direction = currentMenuKey ? getMenuDirection(nextKey) : 1;

        if (!instant && isSubMenuAnimating) {
            pendingMenuKey = nextKey;
            if (imageSrc) {
                pendingMenuImageSrc = imageSrc;
            }
            return;
        }
        currentMenuKey = nextKey;

        if (instant) {
            setActiveSubGroup(nextKey, direction, true);
            if (imageSrc) {
                setMenuImage(imageSrc, true, direction);
            }
            return;
        }

        setActiveSubGroup(nextKey, direction, false);
        if (imageSrc) {
            setMenuImage(imageSrc, false, direction);
        }
    }

    const initialActiveItem = document.querySelector('.menu-main-item.active');
    const initialKey = initialActiveItem ? initialActiveItem.dataset.menu : 'about';
    updateMenuForKey(initialKey, true);

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

        let activeItem = document.querySelector('.menu-main-item.active');
        if (!activeItem || activeItem.dataset.menu === 'home') {
            activeItem = Array.from(menuMainItems).find(item => item.dataset.menu === 'about') || activeItem;
            if (activeItem) {
                setActiveMenuItem(activeItem);
            }
        }
        const activeKey = activeItem ? activeItem.dataset.menu : null;
        if (activeKey) {
            updateMenuForKey(activeKey, true);
        }

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
        const menuImageSlide = menuImageWrapper ? menuImageWrapper.querySelector('.menu-image-slide.is-active') : null;
        const menuImage = menuImageSlide ? menuImageSlide.querySelector('.menu-image') : document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');

        // Clear any existing properties
        gsap.set([menuMainItems, menuSubItems, menuImageSlide, menuImage], { clearProps: 'all' });

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
            // Menu image - same transition as testimonials (clip + parallax)
            .fromTo(menuImageSlide,
                { clipPath: 'inset(0% 100% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' },
                1.1
            )
            .fromTo(menuImage,
                { opacity: 1, scale: 1.3, x: -100, force3D: true },
                { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: 'power3.out', force3D: true },
                1.1
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
        const menuImageSlide = menuImageWrapper ? menuImageWrapper.querySelector('.menu-image-slide.is-active') : null;
        const menuImage = menuImageSlide ? menuImageSlide.querySelector('.menu-image') : document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');
        const headerMenuItems = document.querySelectorAll(
            '.header-nav .btn-book-tour, .header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );
        const headerMenuItemsHidden = document.querySelectorAll(
            '.header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );
        const bookTourBtn = document.querySelector('.header-nav .btn-book-tour');
        const rightBlock = header ? header.querySelector('.right-block') : null;
        gsap.killTweensOf([menuMainItems, menuSubItems, menuImageSlide, menuImage, menuFooter, megaMenu, menuOverlay]);

        function getRightBlockMaxWidth() {
            const width = window.innerWidth;
            if (width <= 767) return '40%';
            if (width <= 991) return '57.875%';
            return '33.33333333%';
        }

        const closeTimeline = gsap.timeline({
            onComplete: () => {
                if (menuImageSlide) {
                    gsap.set(menuImageSlide, { clipPath: 'inset(0% 100% 0% 0%)' });
                }
                if (menuImage) {
                    gsap.set(menuImage, { opacity: 0, scale: 1.15, x: 0 });
                }
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

        // Add click handlers to main menu items
        menuMainItems.forEach((item) => {
            item.addEventListener('click', function (e) {
                if (!isMobile()) return;

                const nextKey = item.dataset.menu;

                // If Home is clicked, redirect to home page instead of showing submenu
                if (nextKey === 'home') {
                    window.location.href = '/';
                    return;
                }

                e.preventDefault();

                // Hide ALL submenu items instantly first (clean slate)
                const allSubItems = menuSubItemsContainer.querySelectorAll('.menu-sub-item');
                gsap.killTweensOf(allSubItems);
                gsap.set(allSubItems, { opacity: 0, force3D: true });

                // Update to new submenu group (instant mode for mobile - no desktop animation)
                updateMenuForKey(nextKey, true);

                // Show overlay
                menuSubItemsContainer.classList.add('active');

                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    // Animate ONLY the new submenu items in (stagger)
                    const activeGroup = menuSubItemsContainer.querySelector('.menu-sub-items-group.is-active');
                    const items = activeGroup ? activeGroup.querySelectorAll('.menu-sub-item') : [];
                    gsap.killTweensOf(items);
                    gsap.set(items, { opacity: 0, x: -20, force3D: true });
                    gsap.to(items, {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,        // Slower: 0.35 → 0.5
                        ease: 'power2.out',
                        stagger: 0.08,        // Slower stagger: 0.05 → 0.08
                        delay: 0.4,           // Delay to let overlay slide in first
                        force3D: true
                    });
                }, 50);

                // Add back button if it doesn't exist
                let backBtn = menuSubItemsContainer.querySelector('.menu-sub-back');
                if (!backBtn) {
                    backBtn = document.createElement('div');
                    backBtn.className = 'menu-sub-back';
                    backBtn.textContent = 'Back';
                    backBtn.addEventListener('click', function () {
                        const activeGroup = menuSubItemsContainer.querySelector('.menu-sub-items-group.is-active');
                        const items = activeGroup ? activeGroup.querySelectorAll('.menu-sub-item') : [];
                        menuSubItemsContainer.classList.remove('active');
                        gsap.set(items, { opacity: 0, x: -20 });
                    });
                    menuSubItemsContainer.insertBefore(backBtn, menuSubItemsContainer.firstChild);
                }
            });
        });
    }

    // Initialize mobile menu
    initMobileMenu();

    function setActiveMenuItem(activeItem) {
        menuMainItems.forEach(item => item.classList.remove('active'));
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    // Desktop menu hover: update submenu + image
    menuMainItems.forEach((item) => {
        item.addEventListener('click', function (e) {
            if (isMobile()) return;
            const nextKey = item.dataset.menu;
            if (!nextKey) return;

            // If Home is clicked, redirect to home page instead of changing menu
            if (nextKey === 'home') {
                window.location.href = '/';
                return;
            }

            e.preventDefault();
            setActiveMenuItem(item);
            updateMenuForKey(nextKey, false);
        });
    });

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
        const heroContent = document.querySelector('.hero-content');
        const heroTextContainer = document.querySelector('.hero-text');

        // Skip hardcoded animations if hero uses data-gsap-children (variant-based animations)
        if (heroContent?.hasAttribute('data-gsap-children') ||
            heroTextContainer?.hasAttribute('data-gsap-children')) {
            // Still animate hero media and gradient if needed
            const heroMedia = document.querySelector('.hero-media-wrapper');
            const heroGradient = document.querySelector('.hero-gradient');
            const isMobile = window.innerWidth <= 991;

            if (heroMedia) {
                const hidden = 'inset(0 100% 0 0)';
                const shown = 'inset(0 0% 0 0)';

                gsap.set(heroMedia, {
                    clipPath: hidden,
                    webkitClipPath: hidden,
                    opacity: 1,
                    visibility: 'visible',
                    willChange: 'clip-path',
                    force3D: true
                });

                gsap.to(heroMedia, {
                    clipPath: shown,
                    webkitClipPath: shown,
                    duration: 1.2,
                    ease: 'power2.inOut',
                    delay: 0.5,
                    force3D: true,
                    autoRound: false,
                    onComplete: () => {
                        gsap.set(heroMedia, { clearProps: 'will-change' });
                    }
                });
            }

            // Animate gradient with rise effect
            if (heroGradient && !isMobile) {
                gsap.set(heroGradient, {
                    autoAlpha: 0,
                    y: 200,
                    scale: 0.7,
                    force3D: true
                });

                gsap.to(heroGradient, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    delay: 0.7,
                    force3D: true
                });
            }

            return;
        }

        const heroTitle = document.querySelector('.hero-title');
        const heroTitleSpans = document.querySelectorAll('.hero-title span');
        const heroText = document.querySelector('.hero-text p');
        const heroButton = document.querySelector('.hero-text button');
        const heroGradient = document.querySelector('.hero-gradient');

        if (!heroTitle || !heroText) {
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
                y: 200, // Start below, like sunrise
                scale: 0.7, // Start smaller
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
                y: 0, // Rise up like sunrise
                scale: 1, // Grow to full size
                duration: 1.2, // Faster for more noticeable entrance
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

            const dropdownInstance =
                window.bootstrap && window.bootstrap.Dropdown
                    ? window.bootstrap.Dropdown.getOrCreateInstance(toggle, { autoClose: false })
                    : null;

            // Desktop hover opens dropdown (keeps GSAP animation)
            dropdown.addEventListener('mouseenter', () => {
                if (isMobile() || !dropdownInstance) return;
                dropdownInstance.show();
            });
            dropdown.addEventListener('mouseleave', () => {
                if (isMobile() || !dropdownInstance) return;
                dropdownInstance.hide();
            });

            // Prevent click toggle on desktop
            toggle.addEventListener('click', (e) => {
                if (!isMobile()) {
                    e.preventDefault();
                }
            });

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
            return;
        }

        // Create master timeline
        const headerTimeline = gsap.timeline({
            delay: 1.8 // Start after all hero animations complete
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
            overwrite: 'auto', // Auto-overwrite any existing animations
            onComplete: () => {
                visibleItems.forEach(item => {
                    item.style.transition = '';
                    item.style.animation = '';
                });
            }
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

    // Footer gradient - rise up from below when footer enters
    function initFooterGradientFade() {
        const footerGradient = document.querySelector('.footer-gradient');
        const footer = document.querySelector('footer.footer');
        if (!footerGradient || !footer) return;

        gsap.set(footerGradient, {
            autoAlpha: 0,
            y: 300, // Start below, out of view
            scale: 0.7 // Start smaller
        });
        gsap.to(footerGradient, {
            autoAlpha: 1,
            y: 0, // Rise to final position
            scale: 1, // Grow to full size
            duration: 1.5, // Faster for more noticeable entrance
            ease: 'power2.out',
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
        const trackAll = document.getElementById('latestNewsTrackAll');
        const trackJunior = document.getElementById('latestNewsTrackJunior');
        const trackSenior = document.getElementById('latestNewsTrackSenior');
        const prevBtn = document.getElementById('latestNewsPrev');
        const nextBtn = document.getElementById('latestNewsNext');

        if (!trackAll || !prevBtn || !nextBtn) return;

        const trackMap = { all: trackAll, junior: trackJunior, senior: trackSenior };
        let activeTrack = trackAll;
        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let cleanupFn = null;

        // Hide non-active tracks on init
        gsap.set([trackJunior, trackSenior], { display: 'none' });

        const isMobile = () => window.innerWidth <= 768;

        function initMobileSlider() {
            const localTrack = activeTrack;
            const slides = Array.from(localTrack.querySelectorAll('.latest-news-slide'));
            if (!slides.length) return () => {};

            const getSlideWidth = () => slides[0].offsetWidth;
            const getGap = () => parseFloat(getComputedStyle(localTrack).gap) || 20;

            const moveToSlide = (index, animate = true) => {
                if (index < 0) index = 0;
                if (index >= slides.length) index = slides.length - 1;
                const isChanging = animate && index !== currentIndex;
                currentIndex = index;
                const offset = -(currentIndex * (getSlideWidth() + getGap()));
                prevTranslate = offset;
                currentTranslate = offset;

                if (!animate) {
                    localTrack.style.transition = 'none';
                    localTrack.style.transform = `translateX(${offset}px)`;
                    return;
                }

                if (isChanging) {
                    gsap.killTweensOf(slides);
                    gsap.timeline()
                        .to(slides, { scale: 0.88, duration: 0.18, ease: 'power2.in' })
                        .call(() => {
                            localTrack.style.transition = 'none';
                            localTrack.style.transform = `translateX(${offset}px)`;
                        })
                        .to(slides, { scale: 1, duration: 0.38, ease: 'power3.out' });
                } else {
                    localTrack.style.transition = '';
                    localTrack.style.transform = `translateX(${offset}px)`;
                }
            };

            let startY = 0;
            let dragDirection = null; // 'h' | 'v' | null
            const handleDragStart = (e) => {
                isDragging = true;
                dragDirection = null;
                startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
                localTrack.classList.add('dragging');
                localTrack.style.transition = 'none';
            };
            const handleDragMove = (e) => {
                if (!isDragging) return;
                const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                const y = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
                if (!dragDirection) {
                    const dx = Math.abs(x - startX);
                    const dy = Math.abs(y - startY);
                    if (dx < 5 && dy < 5) return;
                    dragDirection = dx >= dy ? 'h' : 'v';
                }
                if (dragDirection === 'v') {
                    isDragging = false;
                    localTrack.classList.remove('dragging');
                    localTrack.style.transition = '';
                    return;
                }
                e.preventDefault();
                currentTranslate = prevTranslate + (x - startX);
                localTrack.style.transform = `translateX(${currentTranslate}px)`;
            };
            const handleDragEnd = () => {
                if (!isDragging) return;
                isDragging = false;
                localTrack.classList.remove('dragging');
                localTrack.style.transition = '';
                const movedBy = currentTranslate - prevTranslate;
                const threshold = getSlideWidth() * 0.2;
                if (movedBy < -threshold && currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
                else if (movedBy > threshold && currentIndex > 0) moveToSlide(currentIndex - 1);
                else moveToSlide(currentIndex);
            };
            const handlePrev = () => { if (currentIndex > 0) moveToSlide(currentIndex - 1); };
            const handleNext = () => { if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1); };

            prevBtn.addEventListener('click', handlePrev);
            nextBtn.addEventListener('click', handleNext);
            localTrack.addEventListener('mousedown', handleDragStart);
            localTrack.addEventListener('mousemove', handleDragMove);
            localTrack.addEventListener('mouseup', handleDragEnd);
            localTrack.addEventListener('mouseleave', handleDragEnd);
            localTrack.addEventListener('touchstart', handleDragStart, { passive: false });
            localTrack.addEventListener('touchmove', handleDragMove, { passive: false });
            localTrack.addEventListener('touchend', handleDragEnd);

            moveToSlide(0, false);

            return () => {
                prevBtn.removeEventListener('click', handlePrev);
                nextBtn.removeEventListener('click', handleNext);
                localTrack.removeEventListener('mousedown', handleDragStart);
                localTrack.removeEventListener('mousemove', handleDragMove);
                localTrack.removeEventListener('mouseup', handleDragEnd);
                localTrack.removeEventListener('mouseleave', handleDragEnd);
                localTrack.removeEventListener('touchstart', handleDragStart);
                localTrack.removeEventListener('touchmove', handleDragMove);
                localTrack.removeEventListener('touchend', handleDragEnd);
            };
        }

        function initDesktopSlider() {
            const localTrack = activeTrack;
            const slides = Array.from(localTrack.querySelectorAll('.latest-news-slide'));
            if (!slides.length) return () => {};

            const activeWidth = 680;
            const inactiveWidth = 333;
            const gap = 20;

            const updateSlides = () => {
                slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
            };
            const getPosition = (index) => {
                let pos = 0;
                for (let i = 0; i < index; i++) pos += inactiveWidth + gap;
                return -pos;
            };
            const moveToSlide = (index) => {
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;
                currentIndex = index;
                updateSlides();
                const pos = getPosition(currentIndex);
                localTrack.style.transform = `translateX(${pos}px)`;
                prevTranslate = pos;
            };

            const handleDragStart = (e) => {
                isDragging = true;
                startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                localTrack.classList.add('dragging');
            };
            const handleDragMove = (e) => {
                if (!isDragging) return;
                const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                currentTranslate = prevTranslate + (x - startX);
                localTrack.style.transform = `translateX(${currentTranslate}px)`;
            };
            const handleDragEnd = () => {
                if (!isDragging) return;
                isDragging = false;
                localTrack.classList.remove('dragging');
                const movedBy = currentTranslate - prevTranslate;
                if (movedBy < -100) moveToSlide(currentIndex + 1);
                else if (movedBy > 100) moveToSlide(currentIndex - 1);
                else moveToSlide(currentIndex);
            };
            const handlePrev = () => moveToSlide(currentIndex - 1);
            const handleNext = () => moveToSlide(currentIndex + 1);

            prevBtn.addEventListener('click', handlePrev);
            nextBtn.addEventListener('click', handleNext);
            localTrack.addEventListener('mousedown', handleDragStart);
            localTrack.addEventListener('mousemove', handleDragMove);
            localTrack.addEventListener('mouseup', handleDragEnd);
            localTrack.addEventListener('mouseleave', handleDragEnd);
            localTrack.addEventListener('touchstart', handleDragStart, { passive: true });
            localTrack.addEventListener('touchmove', handleDragMove, { passive: true });
            localTrack.addEventListener('touchend', handleDragEnd);

            moveToSlide(0);
            // Clear any inline transition override so CSS transition takes over for subsequent moves
            requestAnimationFrame(() => { localTrack.style.transition = ''; });

            return () => {
                prevBtn.removeEventListener('click', handlePrev);
                nextBtn.removeEventListener('click', handleNext);
                localTrack.removeEventListener('mousedown', handleDragStart);
                localTrack.removeEventListener('mousemove', handleDragMove);
                localTrack.removeEventListener('mouseup', handleDragEnd);
                localTrack.removeEventListener('mouseleave', handleDragEnd);
                localTrack.removeEventListener('touchstart', handleDragStart);
                localTrack.removeEventListener('touchmove', handleDragMove);
                localTrack.removeEventListener('touchend', handleDragEnd);
            };
        }

        const init = () => {
            if (cleanupFn) cleanupFn();
            currentIndex = 0;
            cleanupFn = isMobile() ? initMobileSlider() : initDesktopSlider();
        };

        // Filter tabs
        const filterTabs = document.querySelectorAll('.latest-news-filter-btn');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                if (this.classList.contains('latest-news-filter-btn-active')) return;
                filterTabs.forEach(t => t.classList.remove('latest-news-filter-btn-active'));
                this.classList.add('latest-news-filter-btn-active');

                const filter = this.dataset.filter;
                const newTrack = trackMap[filter];
                if (!newTrack || newTrack === activeTrack) return;

                const oldTrack = activeTrack;
                if (cleanupFn) { cleanupFn(); cleanupFn = null; }

                gsap.to(oldTrack, {
                    opacity: 0,
                    y: -10,
                    duration: 0.38,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        // Reset and hide old track
                        gsap.set(oldTrack, { display: 'none', opacity: 1, y: 0 });
                        oldTrack.style.transform = 'translateX(0)';

                        // Swap active track and reinit slider
                        activeTrack = newTrack;
                        currentIndex = 0;
                        prevTranslate = 0;
                        currentTranslate = 0;
                        newTrack.style.transition = 'none';
                        newTrack.style.transform = 'translateX(0)';

                        cleanupFn = isMobile() ? initMobileSlider() : initDesktopSlider();

                        // Fade in new track
                        gsap.fromTo(newTrack,
                            { display: 'flex', opacity: 0, y: 14 },
                            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
                        );
                    }
                });
            });
        });

        // Reinit on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 250);
        });

        init();
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
            lineEase: 'none',
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
            const content = card.querySelector('.statistics-card-content');
            const label = content ? content.querySelector('p:first-child') : null;
            const number = content ? content.querySelector('p:last-child') : null;

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
            const content = card.querySelector('.statistics-card-content');
            const label = content ? content.querySelector('p:first-child') : null;
            const number = content ? content.querySelector('p:last-child') : null;

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
                                number.textContent = prefix + currentValue + suffix;
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
            return;
        }

        const imageSlides = imageWrapper.querySelectorAll('.testimonials-image');
        const contentSlides = contentWrapper.querySelectorAll('.testimonials-slide-content');

        if (!imageSlides.length || !contentSlides.length) {
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
                const paragraphs = slide.querySelectorAll('p');
                const quote = paragraphs[0]; // First p is the quote
                const attr = paragraphs[1];  // Second p is the attribution

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
            const oldParagraphs = oldContent.querySelectorAll('p');
            const oldQuote = oldParagraphs[0];
            const oldAttr = oldParagraphs[1];

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
            const newParagraphs = newContent.querySelectorAll('p');
            const newQuote = newParagraphs[0];
            const newAttr = newParagraphs[1];

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
            maxRight: 550, // Increased from 300 for more right-side movement
            maxUp: 300,
            activeRadius: 500, // Increased from 400 for better diagonal coverage
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

                // Use actual distance for better diagonal scaling
                const moveDistance = Math.sqrt(moveRight * moveRight + moveUp * moveUp);
                const normalizedDistance = Math.min(1, moveDistance / CONFIG.activeRadius);

                // Calculate direction ratios
                const rightRatio = moveDistance > 0 ? moveRight / moveDistance : 0;
                const upRatio = moveDistance > 0 ? moveUp / moveDistance : 0;

                // Apply movement with normalized distance
                const offsetX = rightRatio * normalizedDistance * CONFIG.maxRight;
                const offsetY = upRatio * normalizedDistance * CONFIG.maxUp;

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

        animate();
    }

    setTimeout(() => {
        initGradientCursorEffect();
    }, 2000);

    // Cursor-following effect for FOOTER gradient - entire footer area
    function initFooterGradientCursorEffect() {
        if (window.innerWidth <= 991) {
            return;
        }

        const footerGradient = document.querySelector('.footer-gradient');
        const footerSection = document.querySelector('footer.footer');

        if (!footerGradient || !footerSection) {
            return;
        }

        const CONFIG = {
            maxLeft: 500, // Increased for more left movement
            maxRight: 500, // Increased for more right movement
            maxUp: 500, // Increased for more upward movement
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

            const activeHeightStart = footerRect.top + (footerRect.height * 0.1); // Increased active area (was 0.4)
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

        animate();
    }

    setTimeout(() => {
        initFooterGradientCursorEffect();
    }, 2000);

    // Cursor-following effect for TESTIMONIALS gradient - left and up movement
    function initTestimonialsGradientCursorEffect() {
        if (window.innerWidth <= 991) {
            return;
        }

        const testimonialsGradient = document.querySelector('.testimonials-gradient');
        const testimonialsSection = document.querySelector('.testimonials-section');
        const testimonialsContent = document.querySelector('.testimonials-quote-wrapper');

        if (!testimonialsGradient || !testimonialsSection || !testimonialsContent) {
            return;
        }

        const CONFIG = {
            maxLeft: 700, // Increased for more left-side movement
            maxUp: 500, // Increased to match diagonal movement better
            activeRadius: 600, // Larger active area
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

                // Calculate percentages independently for stronger diagonal movement
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

        animate();
    }

    setTimeout(() => {
        initTestimonialsGradientCursorEffect();
    }, 2000);

    // Co-Curricular Slider
    function initCocurricularSlider() {
        const section = document.querySelector('.cocurricular-section');
        if (!section) return;

        const slides = Array.from(section.querySelectorAll('.cocurricular-slide'));
        const bgSlides = Array.from(section.querySelectorAll('.cocurricular-bg-slide'));
        const navBtns = Array.from(section.querySelectorAll('.cocurricular-nav-btn'));
        if (!slides.length) return;

        let currentIndex = 1;
        let isAnimating = false;

        // Initial state — active slide visible, rest hidden
        slides.forEach((slide, i) => gsap.set(slide, { autoAlpha: i === currentIndex ? 1 : 0, zIndex: i === currentIndex ? 1 : 0 }));
        bgSlides.forEach((bg, i) => gsap.set(bg, { autoAlpha: i === currentIndex ? 1 : 0 }));

        function goToSlide(newIndex) {
            if (isAnimating || newIndex === currentIndex) return;
            isAnimating = true;

            const dir = newIndex > currentIndex ? 1 : -1;
            const oldIndex = currentIndex;
            currentIndex = newIndex;

            navBtns.forEach((btn, i) => btn.classList.toggle('active', i === newIndex));

            const fromSlide = slides[oldIndex];
            const toSlide = slides[newIndex];
            const fromBg = bgSlides[oldIndex];
            const toBg = bgSlides[newIndex];
            const fromItems = Array.from(fromSlide.querySelectorAll('small, h2, p, button'));
            const toItems = Array.from(toSlide.querySelectorAll('small, h2, p, button'));

            // Stack: fromSlide on top during out, toSlide below
            gsap.set(fromSlide, { zIndex: 3 });
            gsap.set(toSlide, { autoAlpha: 1, zIndex: 2 });
            gsap.set(toItems, { y: dir * 50, autoAlpha: 0 });
            gsap.set(toBg, { autoAlpha: 0, scale: 1.08 });

            const tl = gsap.timeline({
                onComplete: () => { isAnimating = false; }
            });

            // Content out — directional stagger
            tl.to(fromItems, {
                y: dir * -35,
                autoAlpha: 0,
                duration: 0.4,
                stagger: 0.055,
                ease: 'power2.in'
            }, 0);

            // Background crossfade with Ken Burns
            tl.to(fromBg, { autoAlpha: 0, scale: 1.06, duration: 0.65, ease: 'power2.inOut' }, 0);
            tl.to(toBg, { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'power2.out' }, 0.1);

            // Hide old slide once its content is gone
            tl.set(fromSlide, { autoAlpha: 0, zIndex: 0 }, 0.6);

            // Content in
            tl.to(toItems, {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            }, 0.5);
        }

        // Nav button clicks
        navBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => goToSlide(i));
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchStartY = 0;
        section.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        section.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
                if (dx < 0 && currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
                else if (dx > 0 && currentIndex > 0) goToSlide(currentIndex - 1);
            }
        }, { passive: true });

        // ========== MOUSE PARALLAX ==========
        const PARALLAX_INTENSITY = 15; // px
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        // Scale each bg image slightly so parallax movement never reveals edges
        bgSlides.forEach(bg => {
            const img = bg.querySelector('img');
            if (img) gsap.set(img, { scale: 1.06 });
        });

        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        });

        section.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
        });

        function updateParallax() {
            currentX += (mouseX - currentX) * 0.06;
            currentY += (mouseY - currentY) * 0.06;

            const activeImg = bgSlides[currentIndex].querySelector('img');
            if (activeImg) {
                const moveX = currentX * PARALLAX_INTENSITY;
                const moveY = currentY * PARALLAX_INTENSITY;
                gsap.set(activeImg, { x: moveX, y: moveY });
            }

            requestAnimationFrame(updateParallax);
        }

        requestAnimationFrame(updateParallax);
    }

    initCocurricularSlider();

});
