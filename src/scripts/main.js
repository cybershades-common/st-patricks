// Scroll to top on page refresh/load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});

// Menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const megaMenu = document.getElementById('megaMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const hamburger = document.getElementById('hamburger');
    const menuText = menuToggle.querySelector('.menu-text');
    function animateMenuText(newText) {
        gsap.timeline()
            .to(menuText, { opacity: 0, duration: 0.15, ease: 'none' })
            .call(() => { menuText.textContent = newText; })
            .to(menuText, { opacity: 1, duration: 0.2, ease: 'none' });
    }

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

    function isMobile() {
        return window.innerWidth <= 767;
    }

    const menuSubGroups = menuSubItemsContainer
        ? Array.from(menuSubItemsContainer.querySelectorAll('.menu-sub-items-group'))
        : [];
    const menuSubGroupMap = new Map(menuSubGroups.map(group => [group.dataset.menu, group]));

    const menuOrder = Array.from(menuMainItems).map(item => item.dataset.menu || '');
    let currentMenuKey = null;
    let isSubMenuAnimating = false;
    let pendingMenuKey = null;
    let menuImageNext = null; // tracks any in-progress overlay img

    function getMenuDirection(nextKey) {
        const currentIndex = menuOrder.indexOf(currentMenuKey);
        const nextIndex = menuOrder.indexOf(nextKey);
        if (currentIndex === -1 || nextIndex === -1) return 1;
        return nextIndex > currentIndex ? 1 : -1;
    }


    function setMenuImage(src, instant) {
        if (!menuImageWrapper || !src) return;
        const img = menuImageWrapper.querySelector('img.menu-image');
        if (!img || img.getAttribute('src') === src) return;

        // Abort any in-progress transition cleanly
        if (menuImageNext) {
            const abortedSrc = menuImageNext.getAttribute('src');
            gsap.killTweensOf(menuImageNext);
            menuImageNext.remove();
            menuImageNext = null;
            img.setAttribute('src', abortedSrc);
        }

        gsap.killTweensOf(img);
        gsap.set(img, { opacity: 1, scale: 1, x: 0 });

        if (img.getAttribute('src') === src) return;

        if (instant) {
            img.setAttribute('src', src);
            return;
        }

        const next = document.createElement('img');
        next.setAttribute('src', src);
        next.setAttribute('alt', img.getAttribute('alt') || '');
        next.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;';
        menuImageWrapper.appendChild(next);
        menuImageNext = next;

        gsap.set(next, { opacity: 0, scale: 1.5 });

        gsap.to(img, { opacity: 0, scale: 1.5, duration: 0.9, ease: 'power1.inOut' });
        gsap.to(next, {
            opacity: 1, scale: 1, duration: 0.9, ease: 'power1.inOut',
            onComplete: () => {
                img.setAttribute('src', src);
                gsap.set(img, { opacity: 1, scale: 1, x: 0 });
                next.remove();
                menuImageNext = null;
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

        const direction = currentMenuKey ? getMenuDirection(nextKey) : 1;

        if (!instant && isSubMenuAnimating) {
            pendingMenuKey = nextKey;
            return;
        }
        currentMenuKey = nextKey;

        if (instant) {
            setActiveSubGroup(nextKey, direction, true);
            // Set default image from first sub-item with data-image in this group
            const group = menuSubGroupMap.get(nextKey);
            const firstSubItem = group ? group.querySelector('.menu-sub-item[data-image]') : null;
            if (firstSubItem) setMenuImage(firstSubItem.dataset.image, true);
            return;
        }

        setActiveSubGroup(nextKey, direction, false);
        // Set default image from first sub-item with data-image in this group
        const group = menuSubGroupMap.get(nextKey);
        const firstSubItem = group ? group.querySelector('.menu-sub-item[data-image]') : null;
        if (firstSubItem) setMenuImage(firstSubItem.dataset.image, false);
    }

    const initialActiveItem = document.querySelector('.menu-main-item.active');
    const initialKey = initialActiveItem ? initialActiveItem.dataset.menu : 'about';
    updateMenuForKey(initialKey, true);

    // Sub-item hover: change image when hovering sub-items that have data-image
    menuSubItems.forEach(item => {
        if (!item.dataset.image) return;
        item.addEventListener('mouseenter', () => {
            setMenuImage(item.dataset.image, false);
        });
    });

    function getExpandedRightBlockMaxWidth() {
        const width = window.innerWidth;
        if (width <= 767) return '40%';
        if (width <= 991) return '57.875%';
        return '65.875%';
    }

    function revealBookTourButton(bookTourBtn) {
        if (!bookTourBtn) return;

        gsap.killTweensOf(bookTourBtn);
        gsap.fromTo(bookTourBtn,
            {
                autoAlpha: 0
            },
            {
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power1.out',
                overwrite: 'auto',
                onComplete: () => {
                    bookTourBtn.style.transition = '';
                }
            }
        );
    }

    function setSearchOverlayVisibility(open, instant) {
        const searchOverlay = document.getElementById('searchOverlay');
        if (!searchOverlay) return;

        if (open) {
            const headerH = header ? header.offsetHeight : 0;
            searchOverlay.style.setProperty('--search-header-h', headerH + 'px');
        }

        const applyState = () => {
            searchOverlay.classList.toggle('is-open', open);
            document.body.classList.toggle('search-is-open', open);
            document.querySelectorAll('.header-icon-btn--search').forEach(trigger => {
                trigger.classList.toggle('search-active', open);
            });
        };

        if (!instant) {
            applyState();
            return;
        }

        const prevTransition = searchOverlay.style.transition;
        searchOverlay.style.transition = 'none';
        applyState();
        void searchOverlay.offsetHeight;
        searchOverlay.style.transition = prevTransition;
    }

    function openMenu() {
        const searchOverlay = document.getElementById('searchOverlay');
        const wasSearchOpen = searchOverlay && searchOverlay.classList.contains('is-open');
        const rightBlock = header ? header.querySelector('.right-block') : null;

        if (wasSearchOpen) {
            if (rightBlock) rightBlock.style.maxWidth = '';
        }

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
        const bookTourBtn = document.querySelector('.header-nav .btn-book-tour');

        if (!wasSearchOpen) {
            gsap.set(headerMenuItems, { opacity: 0, force3D: true });
        }

        header.classList.add('menu-open');
        header.classList.remove('header-hidden');
        isHeaderHidden = false;
        megaMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuOverlay.style.pointerEvents = 'none';
        hamburger.classList.add('active');
        animateMenuText('CLOSE');
        document.body.style.overflow = 'hidden';

        if (wasSearchOpen) {
            gsap.set(megaMenu, { opacity: 1 });
            gsap.set(menuOverlay, { opacity: 1 });
            setSearchOverlayVisibility(false, true);
        }

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
        const menuImage = menuImageWrapper ? menuImageWrapper.querySelector('.menu-image') : document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');

        // Clear any existing properties
        gsap.set([menuMainItems, menuSubItems, menuImage], { clearProps: 'all' });
        if (menuImageWrapper) gsap.set(menuImageWrapper, { clearProps: 'clipPath' });

        const isMobileView = isMobile();

        // Mobile-only header dropdowns — set grid + hidden before timeline starts
        const mobileHeaderBtns = isMobileView
            ? header.querySelector('.header-row > .mobile-only-btns')
            : null;
        if (mobileHeaderBtns) {
            gsap.set(mobileHeaderBtns, { display: 'grid', opacity: 0, y: 8, force3D: true });
        }

        if (!wasSearchOpen) {
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
                );
        } else {
            menuTimeline
                .set(megaMenu, { opacity: 1 }, 0)
                .set(menuOverlay, { opacity: 1 }, 0);
        }

        if (!wasSearchOpen) {
            // Header menu items (fade in)
            menuTimeline.to(headerMenuItems, {
                opacity: 1,
                duration: 0.35,
                ease: 'power2.out',
                stagger: 0.08,
                force3D: true,
                immediateRender: false
            }, 0.2);
        } else {
            gsap.killTweensOf(headerMenuItems);
            gsap.set(headerMenuItems, { opacity: 1, clearProps: 'transform' });
            if (bookTourBtn) {
                gsap.set(bookTourBtn, { opacity: 1, clearProps: 'transform' });
            }
        }

        menuTimeline
            // Main menu items (after header items)
            .fromTo(menuMainItems,
                { opacity: 0, x: -60, force3D: true },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power1.out', force3D: true },
                0.15
            )
            // Sub menu items (after main menu)
            .fromTo(menuSubItems,
                { opacity: 0, x: -20, force3D: true },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.04, ease: 'power1.out', force3D: true },
                0.45
            )
            // Menu image - clip + parallax on wrapper/image
            .fromTo(menuImageWrapper,
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
                isMobileView ? 0.8 : 1.1
            )
            .call(() => {
                menuOverlay.style.pointerEvents = 'auto';
            }, null, 0.35);

        // Mobile header dropdowns fade in after main items have staggered
        if (mobileHeaderBtns) {
            menuTimeline.to(mobileHeaderBtns, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out',
                force3D: true
            }, 1.1);
        }

    }

    function closeMenu(options = {}) {
        const keepHeaderItems = options.keepHeaderItems === true;
        isMenuOpen = false;

        // Reset menu items AFTER fade to avoid flicker
        const menuMainItems = document.querySelectorAll('.menu-main-item');
        const menuSubItems = document.querySelectorAll('.menu-sub-item');
        const menuImage = menuImageWrapper ? menuImageWrapper.querySelector('.menu-image') : document.querySelector('.menu-image');
        const menuFooter = document.querySelector('.mega-menu-footer');
        const headerMenuItems = document.querySelectorAll(
            '.header-nav .btn-book-tour, .header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );
        const headerMenuItemsHidden = document.querySelectorAll(
            '.header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
        );
        const bookTourBtn = document.querySelector('.header-nav .btn-book-tour');
        const rightBlock = header ? header.querySelector('.right-block') : null;
        const mobileHeaderBtns = header.querySelector('.header-row > .mobile-only-btns');
        const logoTexts = header.querySelectorAll('.logo-text');

        // Close any open dropdowns before the menu animates out
        if (mobileHeaderBtns) {
            mobileHeaderBtns.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(btn => {
                if (typeof btn._dropdownClose === 'function') btn._dropdownClose();
            });
        }

        // Snap logo to its post-close color immediately — mirrors the instant snap when the menu opens
        const isInternal = document.body.classList.contains('internal-page');
        const isScrolled = header.classList.contains('header-scrolled');
        if (!keepHeaderItems && isInternal && !isScrolled) {
            logoTexts.forEach(t => { t.style.color = 'var(--basic-white)'; });
        }

        gsap.killTweensOf([
            menuMainItems,
            menuSubItems,
            menuImageWrapper,
            menuImage,
            menuFooter,
            megaMenu,
            menuOverlay,
            headerMenuItems,
            bookTourBtn
        ]);

        function getRightBlockMaxWidth() {
            const width = window.innerWidth;
            if (width <= 767) return '40%';
            if (width <= 991) return '57.875%';
            return '33.33333333%';
        }

        const closeTimeline = gsap.timeline({
            onComplete: () => {
                if (menuImageWrapper) {
                    gsap.set(menuImageWrapper, { clipPath: 'inset(0% 100% 0% 0%)' });
                }
                if (menuImage) {
                    gsap.set(menuImage, { opacity: 1, scale: 1.15, x: 0 });
                }
                gsap.set(menuMainItems, { opacity: 0, x: -60 });
                gsap.set(menuSubItems, { opacity: 0, x: -20 });
                gsap.set(menuFooter, { opacity: 0, y: 20 });
                if (keepHeaderItems && !isMobile()) {
                    gsap.set(headerMenuItems, { opacity: 1, clearProps: 'transform' });
                } else {
                    gsap.set(headerMenuItems, { clearProps: 'opacity,transform' });
                }
                if (rightBlock) {
                    gsap.set(rightBlock, { clearProps: 'max-width' });
                }
                // Hide mobile header dropdowns and clear all GSAP inline styles
                if (mobileHeaderBtns) {
                    gsap.set(mobileHeaderBtns, { display: 'none', clearProps: 'opacity,y,transform' });
                }
                // Remove padding from body AND header
                if (usePaddingCompensation) {
                    document.body.style.paddingRight = '';
                    header.style.paddingRight = '';
                }

                // Disable btn transition so color snaps to its post-close CSS state (e.g. white on internal pages)
                if (!keepHeaderItems && bookTourBtn) {
                    bookTourBtn.style.transition = 'none';
                }
                header.classList.remove('menu-open');
                logoTexts.forEach(t => { t.style.color = ''; }); // restore CSS
                hamburger.classList.remove('active');
                animateMenuText('MENU');

                megaMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                menuOverlay.style.pointerEvents = '';
                document.body.style.overflow = '';

                if (!keepHeaderItems && bookTourBtn) {
                    revealBookTourButton(bookTourBtn);
                }

                if (keepHeaderItems && !isMobile()) {
                    if (rightBlock) rightBlock.style.maxWidth = getExpandedRightBlockMaxWidth();
                    btnEnquire.style.display = 'inline-flex';
                    dropdownWrappers.forEach(wrapper => {
                        wrapper.style.display = 'flex';
                    });
                }

                updateHeaderOnScroll();
            }
        });

        // Hide overlay instantly, fade mega menu
        const menuCloseDuration = keepHeaderItems ? 0 : 0.25;
        gsap.set(menuOverlay, { opacity: 0 });
        closeTimeline.to(megaMenu, {
            opacity: 0,
            duration: menuCloseDuration,
            ease: 'power1.inOut'
        }, 0);

        // Hide mobile header dropdowns immediately on close
        if (mobileHeaderBtns) {
            gsap.set(mobileHeaderBtns, { display: 'none', opacity: 0, clearProps: 'y,transform' });
        }

        if (!keepHeaderItems) {
            // Hide header menu items (except Book a Tour) smoothly
            closeTimeline.to(headerMenuItemsHidden, {
                opacity: 0,
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

        if (!keepHeaderItems) {
            btnEnquire.style.display = 'none';
            dropdownWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });
        }

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

    function initMobileMenu() {
        if (!isMobile()) return;

        // Add click handlers to main menu items
        menuMainItems.forEach((item) => {
            item.addEventListener('click', function (e) {
                if (!isMobile()) return;

                const nextKey = item.dataset.menu;
                const hasSubmenu = item.classList.contains('has-submenu');

                // If Home is clicked, redirect to home page instead of showing submenu
                if (nextKey === 'home') {
                    window.location.href = '/';
                    return;
                }

                if (!hasSubmenu) {
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
            const hasSubmenu = item.classList.contains('has-submenu');
            if (!nextKey) return;

            // If Home is clicked, redirect to home page instead of changing menu
            if (nextKey === 'home') {
                window.location.href = '/';
                return;
            }

            if (!hasSubmenu) {
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
                header.classList.add('header-compact');
            } else {
                header.classList.remove('header-scrolled');
                header.classList.remove('header-compact');
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

        // Skip hardcoded animations if hero is driven by the SPC class-based animation system
        // (prevents double-animating elements that are already marked as spc-item / spc-children).
        if (heroContent?.querySelector?.('.spc-item, .spc-children') ||
            heroTextContainer?.querySelector?.('.spc-item, .spc-children')) {
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

        function buildHeroTitleSpans(titleEl) {
            if (!titleEl) return [];

            const existingSpans = Array.from(titleEl.querySelectorAll('span'));
            if (existingSpans.length > 0) {
                return existingSpans;
            }

            // Handle <br> tags: split content around <br> into two spans
            const brEl = titleEl.querySelector('br');
            if (brEl) {
                const nodes = Array.from(titleEl.childNodes);
                const brIndex = nodes.indexOf(brEl);
                const firstText = nodes.slice(0, brIndex).map(n => n.textContent).join('').trim();
                const secondText = nodes.slice(brIndex + 1).map(n => n.textContent).join('').trim();
                if (firstText && secondText) {
                    titleEl.innerHTML = '';
                    const firstSpan = document.createElement('span');
                    firstSpan.textContent = firstText;
                    firstSpan.classList.add('hero-title-part');
                    const secondSpan = document.createElement('span');
                    secondSpan.textContent = secondText;
                    secondSpan.classList.add('hero-title-part');
                    titleEl.appendChild(firstSpan);
                    titleEl.appendChild(document.createElement('br'));
                    titleEl.appendChild(secondSpan);
                    return [firstSpan, secondSpan];
                }
            }

            const hasElementChildren = Array.from(titleEl.childNodes)
                .some((node) => node.nodeType === 1);
            if (hasElementChildren) {
                return [];
            }

            const text = titleEl.textContent || '';
            if (!text.trim()) {
                return [];
            }

            const words = text.trim().split(/\s+/).filter(Boolean);
            if (words.length <= 2) {
                return [];
            }

            const splitIndex = words.length === 3 ? 1 : Math.ceil(words.length / 2);
            const firstChunk = words.slice(0, splitIndex).join(' ');
            const secondChunk = words.slice(splitIndex).join(' ');

            if (!firstChunk || !secondChunk) {
                return [];
            }

            titleEl.textContent = '';

            const firstSpan = document.createElement('span');
            firstSpan.textContent = firstChunk;
            firstSpan.classList.add('hero-title-part');

            const secondSpan = document.createElement('span');
            secondSpan.textContent = secondChunk;
            secondSpan.classList.add('hero-title-part');

            titleEl.appendChild(firstSpan);
            titleEl.appendChild(document.createTextNode(' '));
            titleEl.appendChild(secondSpan);

            return [firstSpan, secondSpan];
        }

        const heroTitle = document.querySelector('.hero-title');
        const heroTitleSpans = buildHeroTitleSpans(heroTitle);
        const heroText = document.querySelector('.hero-text p');
        const heroButton = document.querySelector('.hero-text a');
        const heroGradient = document.querySelector('.hero-gradient');

        if (!heroTitle || !heroText) {
            return;
        }

        // Create master timeline
        const heroTimeline = gsap.timeline({
            delay: 0.7
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

    // On the home page the loader fires 'spc-loader-done' when it starts revealing.
    // On other pages (no loader) run immediately.
    var isHomePage = !!document.getElementById('spcLoader');
    if (isHomePage) {
        function runPostLoader() {
            initHeroAnimations();
            initHeaderAnimations();
        }
        if (window.spcLoaderDone) {
            runPostLoader();
        } else {
            window.addEventListener('spc-loader-done', runPostLoader, { once: true });
        }
    } else {
        setTimeout(function () {
            initHeroAnimations();
        }, 50);
    }

    // Dropdown animation: clip-path curtain + stagger items
    function initDropdownAnimations() {
        const dropdowns = document.querySelectorAll('.dropdown');
        if (!dropdowns.length) return;

        dropdowns.forEach((dropdown) => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!toggle || !menu) return;

            // Prevent Bootstrap's delegated click listener from interfering
            toggle.removeAttribute('data-bs-toggle');

            let isOpen = false;

            function open() {
                if (isOpen) return;
                // Close any other open dropdown first
                document.querySelectorAll('.dropdown-toggle').forEach(t => {
                    if (t !== toggle && typeof t._dropdownClose === 'function') t._dropdownClose();
                });
                isOpen = true;
                toggle.setAttribute('aria-expanded', 'true');

                const items = menu.querySelectorAll('.dropdown-item');
                gsap.killTweensOf([menu, items]);

                menu.style.display = 'block';
                gsap.set(menu, { clipPath: 'inset(0 0 100% 0)', overflow: 'hidden' });
                gsap.set(items, { opacity: 0, x: -12, force3D: true });

                gsap.timeline({ onComplete: () => gsap.set(menu, { clearProps: 'overflow,clipPath' }) })
                    .to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.35, ease: 'power2.out' }, 0)
                    .to(items, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.04 }, 0.08);
            }

            function close() {
                if (!isOpen) return;
                isOpen = false;
                toggle.setAttribute('aria-expanded', 'false');

                const items = menu.querySelectorAll('.dropdown-item');
                gsap.killTweensOf([menu, items]);
                menu.style.display = 'none';
                gsap.set(menu, { clearProps: 'clipPath' });
                gsap.set(items, { clearProps: 'opacity,transform' });
            }

            // Store close fn on element so mega-menu teardown can call it
            toggle._dropdownClose = close;

            // Desktop: hover
            dropdown.addEventListener('mouseenter', () => { if (!isMobile()) open(); });
            dropdown.addEventListener('mouseleave', () => { if (!isMobile()) close(); });

            // Desktop: block click (hover controls it)
            toggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });


            toggle.addEventListener('touchstart', (e) => {
                if (!isMobile()) return;
                e.preventDefault();
                e.stopPropagation();
                isOpen ? close() : open();
            }, { passive: false });

            // Close on outside tap/click
            document.addEventListener('click', (e) => {
                if (isOpen && !dropdown.contains(e.target)) close();
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
            '.menu-toggle, ' +
            '.icon-menu-wrap .header-icon-btn--search.d-md-none'
        );

        if (headerItems.length === 0) {
            return;
        }


        const visibleItems = Array.from(headerItems).filter(item => {
            if (!item) return false;
            const style = window.getComputedStyle(item);

            return style.display !== 'none';
        });

        if (visibleItems.length === 0) {
            return;
        }

        // Create master timeline
        const isInternalPage = document.body.classList.contains('internal-page');
        const headerTimeline = gsap.timeline({
            delay: isInternalPage ? 0.6 : 1.8 // Internal pages have less hero content so animate sooner
        });

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

    // Initialize header animations (home page defers to runPostLoader)
    if (!document.getElementById('spcLoader')) {
        initHeaderAnimations();
    }

    // News detail hero navigation reveal
    function initNewsDetailHeroNavigationReveal() {
        const hero = document.querySelector('.news-detail-hero');
        if (!hero) return;

        const nav = hero.querySelector('.news-detail-hero-navigation');
        const backLink = hero.querySelector('.news-detail-hero-back-link');
        const targets = [nav, backLink].filter(Boolean);
        if (!targets.length) return;

        gsap.set(targets, { autoAlpha: 0, y: 14, force3D: true });
        gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            stagger: 0.08,
            force3D: true,
            scrollTrigger: {
                trigger: hero,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });
    }

    initNewsDetailHeroNavigationReveal();

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

    // Footer gradient - fade in when the footer enters view
    function initFooterGradientFade() {
        const footerGradient = document.querySelector('.footer-gradient');
        const footer = document.querySelector('footer.footer');
        if (!footerGradient || !footer) return;

        if (isMobile()) return; // visible via CSS on mobile, no GSAP needed

        gsap.set(footerGradient, {
            autoAlpha: 0
        });
        gsap.to(footerGradient, {
            autoAlpha: 1,
            duration: 1.2,
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
            if (node.parentNode && node.parentNode.closest && node.parentNode.closest('a')) {
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

        gsap.set('.about-section h2 .word, .about-section h2 a', { opacity: 0 });
        gsap.set('.about-text .sentence', { opacity: 0 });

        const headingPieces = gsap.utils.toArray('.about-section h2 .word, .about-section h2 a');

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




    // ============Latest News Slider=============


    function initLatestNewsSlider() {
        const track = document.getElementById('latestNewsTrack');
        const prevBtn = document.getElementById('latestNewsPrev');
        const nextBtn = document.getElementById('latestNewsNext');
        if (!track || !prevBtn || !nextBtn) return;

        const allSlides = Array.from(track.querySelectorAll('.latest-news-slide'));
        let visibleSlides = allSlides.slice();
        let activeIndex = 0;
        let step = 0;

        track.querySelectorAll('.latest-news-image').forEach(img => {
            const wrap = document.createElement('div');
            wrap.className = 'latest-news-img-wrap';
            img.parentNode.insertBefore(wrap, img);
            wrap.appendChild(img);
        });

        function measureStep() {
            const inactive = visibleSlides.filter(s => !s.classList.contains('active'));
            const probe = inactive[0] || visibleSlides[0];
            const g = parseFloat(getComputedStyle(track).gap) || 20;
            step = (probe ? probe.offsetWidth : 333) + g;
        }

        function goTo(index) {
            const len = visibleSlides.length;
            index = ((index % len) + len) % len;
            visibleSlides[activeIndex].classList.remove('active');
            activeIndex = index;
            visibleSlides[activeIndex].classList.add('active');
            gsap.to(track, { x: -(activeIndex * step), duration: 0.65, ease: 'power3.out' });
        }

        prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
        nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

        // Touch support
        let touchStartX = 0;
        track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 30) goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1);
        }, { passive: true });

        // Filters
        const filterTabs = document.querySelectorAll('.latest-news-filter-btn');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                filterTabs.forEach(t => t.classList.remove('latest-news-filter-btn-active'));
                this.classList.add('latest-news-filter-btn-active');
                const filter = this.dataset.filter;

                const currentVisible = allSlides.filter(s => !s.classList.contains('latest-news-slide--hidden'));
                gsap.to(currentVisible, {
                    opacity: 0,
                    y: 12,
                    duration: 0.25,
                    ease: 'power2.out',
                    stagger: 0.03,
                    onComplete: () => {
                        if (visibleSlides[activeIndex]) visibleSlides[activeIndex].classList.remove('active');
                        allSlides.forEach(slide => {
                            const cats = (slide.dataset.categories || '').trim().split(/\s+/);
                            const hide = filter !== 'all' && !cats.includes(filter);
                            slide.classList.toggle('latest-news-slide--hidden', hide);
                            if (!hide) gsap.set(slide, { opacity: 0, y: 12 });
                        });
                        visibleSlides = allSlides.filter(s => !s.classList.contains('latest-news-slide--hidden'));
                        activeIndex = 0;
                        if (visibleSlides.length) visibleSlides[0].classList.add('active');
                        gsap.set(track, { x: 0 });
                        measureStep();
                        gsap.to(visibleSlides, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.05, clearProps: 'opacity,y' });
                    }
                });
            });
        });

        // Re-measure after resize — layout changes on mobile
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (visibleSlides[activeIndex]) visibleSlides[activeIndex].classList.remove('active');
                activeIndex = 0;
                if (visibleSlides.length) visibleSlides[0].classList.add('active');
                gsap.set(track, { x: 0 });
                measureStep();
            }, 200);
        });

        measureStep();
        gsap.set(track, { x: 0 });
    }

    initLatestNewsSlider();

    // ==========================================================================
    // STATISTICS SECTION ANIMATION - START
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
    // CONTACT INTRO CARDS ANIMATION
    // Same visual rhythm as statistics cards:
    //   1. Divider line grows top → bottom
    //   2. All content children stagger fade-up
    // ==========================================================================

    function initContactCardsAnimation() {
        const container = document.querySelector('.contact-intro-cards');
        if (!container) return;

        const cards = container.querySelectorAll('.contact-intro-card');
        if (!cards.length) return;

        const TIMING = {
            lineDuration: 2.5,
            lineEase: 'none',
            lineStagger: 0.2,
            contentDuration: 1.2,
            contentEase: 'back.out(1.1)',
            contentDelay: 0.5,
            contentStagger: 0.15
        };

        // Set initial states
        cards.forEach(card => {
            const divider = card.querySelector('.contact-intro-card-divider');
            const children = card.querySelectorAll('.contact-intro-card-content > *');

            if (divider) {
                gsap.set(divider, {
                    clipPath: 'inset(0 0 100% 0)',
                    webkitClipPath: 'inset(0 0 100% 0)',
                    willChange: 'clip-path'
                });
            }

            if (children.length) {
                gsap.set(children, { y: 30, autoAlpha: 0 });
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        cards.forEach((card, index) => {
            const divider = card.querySelector('.contact-intro-card-divider');
            const children = card.querySelectorAll('.contact-intro-card-content > *');
            const cardStart = index * TIMING.lineStagger;

            // 1. Divider line reveals top → bottom
            if (divider) {
                tl.to(divider, {
                    clipPath: 'inset(0 0 0% 0)',
                    webkitClipPath: 'inset(0 0 0% 0)',
                    duration: TIMING.lineDuration,
                    ease: TIMING.lineEase
                }, cardStart);
            }

            // 2. Content children stagger fade-up
            if (children.length) {
                tl.to(children, {
                    y: 0,
                    autoAlpha: 1,
                    duration: TIMING.contentDuration,
                    ease: TIMING.contentEase,
                    stagger: TIMING.contentStagger
                }, cardStart + TIMING.contentDelay);
            }
        });

        tl.eventCallback('onComplete', () => {
            cards.forEach(card => {
                const divider = card.querySelector('.contact-intro-card-divider');
                if (divider) gsap.set(divider, { clearProps: 'will-change' });
            });
        });
    }

    initContactCardsAnimation();


    // ==========================================================================
    // CONTACT FORM — CUSTOM ANIMATED DROPDOWNS
    // Replaces native <select> elements with a fully styled custom dropdown.
    // The native <select> stays hidden so form submission still works.
    // ==========================================================================

    function initContactFormDropdowns() {
        const selects = document.querySelectorAll('.contact-form select');
        if (!selects.length) return;

        selects.forEach(select => {
            const wrapper = select.closest('.contact-form-input-wrapper');
            if (!wrapper) return;

            const options = Array.from(select.options);
            const isPlaceholder = (opt) => opt.value === '';

            // ── Build custom dropdown ──────────────────────────────────────────
            const dropdown = document.createElement('div');
            dropdown.className = 'cf-dropdown';

            // Trigger row (displayed value + arrow)
            const trigger = document.createElement('div');
            trigger.className = 'cf-dropdown-trigger';
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('tabindex', '0');

            const valueEl = document.createElement('span');
            valueEl.className = 'cf-dropdown-value';
            const initialOpt = options[select.selectedIndex] || options[0];
            valueEl.textContent = initialOpt ? initialOpt.text : '';
            if (!isPlaceholder(initialOpt)) valueEl.classList.add('has-value');

            const arrow = document.createElement('img');
            arrow.src = 'assets/icons/dropdown-icon.svg';
            arrow.className = 'cf-dropdown-arrow';
            arrow.alt = '';
            arrow.setAttribute('aria-hidden', 'true');

            trigger.appendChild(valueEl);
            trigger.appendChild(arrow);

            // Options list
            const optsList = document.createElement('ul');
            optsList.className = 'cf-dropdown-options';
            optsList.setAttribute('role', 'listbox');

            options.forEach(opt => {
                const li = document.createElement('li');
                li.className = 'cf-dropdown-option';
                if (isPlaceholder(opt)) li.classList.add('is-placeholder');
                if (opt.selected) li.classList.add('is-selected');
                li.textContent = opt.text;
                li.dataset.value = opt.value;
                li.setAttribute('role', 'option');

                li.addEventListener('click', () => {
                    select.value = opt.value;
                    valueEl.textContent = opt.text;
                    valueEl.classList.toggle('has-value', !isPlaceholder(opt));
                    optsList.querySelectorAll('.cf-dropdown-option')
                        .forEach(o => o.classList.remove('is-selected'));
                    li.classList.add('is-selected');
                    closeDropdown(dropdown);
                });

                optsList.appendChild(li);
            });

            dropdown.appendChild(trigger);
            dropdown.appendChild(optsList);

            // Hide native select, insert custom dropdown before it
            select.hidden = true;
            wrapper.insertBefore(dropdown, select);

            // ── Open / close ───────────────────────────────────────────────────
            function openDropdown(dd) {
                // Close any other open dropdown first
                document.querySelectorAll('.cf-dropdown.is-open').forEach(d => {
                    if (d !== dd) closeDropdown(d);
                });
                dd.classList.add('is-open');
            }

            function closeDropdown(dd) {
                dd.classList.remove('is-open');
            }

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.contains('is-open')
                    ? closeDropdown(dropdown)
                    : openDropdown(dropdown);
            });

            // Keyboard support
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.contains('is-open')
                        ? closeDropdown(dropdown)
                        : openDropdown(dropdown);
                }
                if (e.key === 'Escape') closeDropdown(dropdown);
            });
        });

        // Close on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.cf-dropdown.is-open')
                .forEach(d => d.classList.remove('is-open'));
        });
    }

    initContactFormDropdowns();


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
                    gsap.set(quote, { opacity: 0, y: 40 });
                    gsap.set(attr, { opacity: 0, y: 20 });
                    ScrollTrigger.create({
                        trigger: contentWrapper,
                        start: 'top 70%',
                        once: true,
                        onEnter: () => {
                            const tl = gsap.timeline({ delay: 0.2 });
                            tl.to(quote, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
                              .to(attr,  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
                        }
                    });
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
            updateNavState();

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
        function updateNavState() {
            const isAtStart = currentIndex === 0;
            const isAtEnd = currentIndex === totalSlides - 1;

            prevBtn.disabled = isAtStart;
            nextBtn.disabled = isAtEnd;
            prevBtn.classList.toggle('is-disabled', isAtStart);
            nextBtn.classList.toggle('is-disabled', isAtEnd);
        }

        function nextSlide() {
            if (currentIndex >= totalSlides - 1) return;
            goToSlide(currentIndex + 1, 1);
        }

        function prevSlide() {
            if (currentIndex <= 0) return;
            goToSlide(currentIndex - 1, -1);
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
        updateNavState();
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
        if (!marquee || marquee.dataset.marqueeInitialized === 'true') return;

        const original = marquee.querySelector('h1');
        if (!original) return;

        marquee.dataset.marqueeInitialized = 'true';

        const setup = () => {
            const readDuration = () => {
                const isMobileViewport = window.innerWidth <= 991;
                const durationAttr = (isMobileViewport && marquee.getAttribute('data-marquee-duration-mobile'))
                    || marquee.getAttribute('data-marquee-duration');
                const parsed = parseFloat(durationAttr);
                return !Number.isNaN(parsed) && parsed > 0 ? parsed : 10;
            };

            let duration = readDuration();

            const track = document.createElement('div');
            track.className = 'footer-marquee-track';

            const item = original;
            item.classList.add('footer-marquee-item');

            track.appendChild(item);
            const clone = item.cloneNode(true);
            clone.classList.add('footer-marquee-item');
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);

            marquee.replaceChildren(track);

            let itemWidth = 1;
            let position = 0;
            let rafId = null;
            let lastTime = 0;
            let isInView = false;

            const applyTransform = () => {
                track.style.transform = `translate3d(${position}px, 0, 0)`;
            };

            const measure = () => {
                const nextWidth = item.getBoundingClientRect().width;
                if (!nextWidth) return;

                const progress = itemWidth > 0 ? position / itemWidth : 0;
                itemWidth = nextWidth;
                position = progress * itemWidth;

                while (position <= -itemWidth) {
                    position += itemWidth;
                }

                while (position > 0) {
                    position -= itemWidth;
                }

                applyTransform();
            };

            const stop = () => {
                if (rafId === null) return;
                cancelAnimationFrame(rafId);
                rafId = null;
                lastTime = 0;
            };

            const speed = () => itemWidth / duration;

            const tick = (now) => {
                if (lastTime === 0) {
                    lastTime = now;
                }

                const delta = (now - lastTime) / 1000;
                lastTime = now;

                position -= speed() * delta;

                while (position <= -itemWidth) {
                    position += itemWidth;
                }

                applyTransform();
                rafId = requestAnimationFrame(tick);
            };

            const start = () => {
                if (rafId !== null || document.hidden || !isInView) return;
                lastTime = 0;
                rafId = requestAnimationFrame(tick);
            };

            measure();

            const footer = marquee.closest('footer') || marquee;
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    isInView = entries.some((entry) => entry.isIntersecting);

                    if (isInView) {
                        start();
                        return;
                    }

                    stop();
                }, {
                    rootMargin: '200px 0px'
                });

                observer.observe(footer);
            } else {
                isInView = true;
                start();
            }

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    stop();
                    return;
                }

                start();
            });

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    duration = readDuration();
                    measure();
                }, 100);
            });

            if (document.fonts && typeof document.fonts.addEventListener === 'function') {
                document.fonts.addEventListener('loadingdone', measure);
            } else {
                window.addEventListener('load', measure, { once: true });
            }
        };

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(setup);
            return;
        }

        setup();
    }

    initFooterMarquee();

    // Cursor-following gradient effect - gradient follows cursor around hero title only
    function initGradientCursorEffect() {
        if (window.innerWidth <= 991) return;

        const heroGradient = document.querySelector('.hero-gradient');
        const heroContentWrap = document.querySelector('.hero-content-wrap');
        const heroContent = document.querySelector('.hero-content');

        if (!heroGradient || !heroContentWrap || !heroContent) return;

        const CONFIG = {
            followEase: 0.02,
            returnEase: 0.01,
        };

        const originalLeft = -212;
        const originalBottom = -536;

        let halfW = heroGradient.offsetWidth / 2;
        let halfH = heroGradient.offsetHeight / 2;

        let mouseX = null;
        let mouseY = null;
        let currentLeft = originalLeft;
        let currentBottom = originalBottom;
        let hasMouseMoved = false;
        let isInActiveArea = false;

        function updateGradientSize() {
            halfW = heroGradient.offsetWidth / 2;
            halfH = heroGradient.offsetHeight / 2;
        }

        window.addEventListener('resize', updateGradientSize);

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

            const contentRect = heroContentWrap.getBoundingClientRect();
            const heroContentRect = heroContent.getBoundingClientRect();

            const activeStartY = contentRect.top + (contentRect.height * 0.2); // bottom 80%
            const isInContentBounds = (
                mouseX >= contentRect.left &&
                mouseX <= contentRect.right &&
                mouseY >= activeStartY &&
                mouseY <= contentRect.bottom
            );

            isInActiveArea = isInContentBounds;

            let targetLeft = originalLeft;
            let targetBottom = originalBottom;

            if (isInActiveArea) {
                const localX = mouseX - heroContentRect.left;
                const localBottom = heroContentRect.bottom - mouseY;

                targetLeft = localX - halfW;
                targetBottom = localBottom - (halfH * 2);
            }

            const currentEase = isInActiveArea ? CONFIG.followEase : CONFIG.returnEase;
            currentLeft += (targetLeft - currentLeft) * currentEase;
            currentBottom += (targetBottom - currentBottom) * currentEase;

            heroGradient.style.left = `${currentLeft}px`;
            heroGradient.style.bottom = `${currentBottom}px`;

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
            }

            const currentEase = isInFooter ? CONFIG.followEase : CONFIG.returnEase;
            currentX += (targetX - currentX) * currentEase;
            currentY += (targetY - currentY) * currentEase;

            footerGradient.style.setProperty('--gradient-offset-x', `${currentX}px`);
            footerGradient.style.setProperty('--gradient-offset-y', `${-currentY}px`);

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
            followEase: 0.02,
            returnEase: 0.01,
        };

        const computed = window.getComputedStyle(testimonialsGradient);
        const baseLeft = Number.parseFloat(computed.left) || 0;
        const baseTop = Number.parseFloat(computed.top) || 0;
        let halfW = testimonialsGradient.offsetWidth / 2;
        let halfH = testimonialsGradient.offsetHeight / 2;

        let mouseX = null;
        let mouseY = null;
        let currentX = 0;
        let currentY = 0;
        let hasMouseMoved = false;
        let isInActiveArea = false;

        function updateGradientSize() {
            halfW = testimonialsGradient.offsetWidth / 2;
            halfH = testimonialsGradient.offsetHeight / 2;
        }

        window.addEventListener('resize', updateGradientSize);

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

            isInActiveArea = (
                mouseX >= testimonialsRect.left &&
                mouseX <= testimonialsRect.right &&
                mouseY >= testimonialsRect.top &&
                mouseY <= testimonialsRect.bottom
            );

            let targetX = 0;
            let targetY = 0;

            if (isInActiveArea) {
                const targetCenterX = mouseX;
                const targetTopY = mouseY; // top edge follows cursor

                const baseCenterX = testimonialsRect.left + baseLeft + halfW;
                const baseTopY = testimonialsRect.top + baseTop;

                targetX = targetCenterX - baseCenterX;
                targetY = targetTopY - baseTopY;
            }

            const currentEase = isInActiveArea ? CONFIG.followEase : CONFIG.returnEase;
            currentX += (targetX - currentX) * currentEase;
            currentY += (targetY - currentY) * currentEase;

            testimonialsGradient.style.transform = `translate(${currentX}px, ${currentY}px)`;

            requestAnimationFrame(animate);
        }

        animate();
    }

    setTimeout(() => {
        initTestimonialsGradientCursorEffect();
    }, 2000);

    // Latest News Hero Slider (Cocurricular-style animation)
    function initLatestNewsHeroSlider() {
        const slider = document.querySelector('.hero-media-slider');
        if (!slider) return;

        const slides = Array.from(slider.querySelectorAll('.hero-media-slide'));
        if (!slides.length) return;

        const navInstances = Array.from(slider.querySelectorAll('.hero-media-slide-navigation'));
        let navRoot = navInstances[0] || null;
        if (navRoot) {
            navInstances.slice(1).forEach(nav => nav.remove());
            const navShell = document.createElement('div');
            navShell.className = 'hero-media-slide-navigation-shell';
            navShell.appendChild(navRoot);
            slider.appendChild(navShell);
        }

        const prevBtns = Array.from(slider.querySelectorAll('.hero-media-slide-arrow-prev'));
        const nextBtns = Array.from(slider.querySelectorAll('.hero-media-slide-arrow-next'));
        const currentEls = Array.from(slider.querySelectorAll('.hero-media-slide-pagination-current'));
        const totalEls = Array.from(slider.querySelectorAll('.hero-media-slide-pagination-total'));

        const total = String(slides.length).padStart(2, '0');
        totalEls.forEach(el => { el.textContent = total; });

        const bgSlides = slides.map(slide => slide.querySelector('.hero-media-slide-bg'));

        let currentIndex = 0;
        let isAnimating = false;

        slides.forEach((slide, i) => {
            gsap.set(slide, { autoAlpha: i === currentIndex ? 1 : 0, zIndex: i === currentIndex ? 1 : 0 });
        });
        bgSlides.forEach((bg, i) => {
            if (!bg) return;
            gsap.set(bg, { autoAlpha: i === currentIndex ? 1 : 0 });
            const img = bg.querySelector('img');
            if (img) gsap.set(img, { scale: 1.06 });
        });

        function updatePagination() {
            const current = String(currentIndex + 1).padStart(2, '0');
            currentEls.forEach(el => { el.textContent = current; });
        }

        function updateNavState() {
            const isAtStart = currentIndex === 0;
            const isAtEnd = currentIndex === slides.length - 1;
            prevBtns.forEach(btn => {
                btn.disabled = isAtStart;
                btn.classList.toggle('is-disabled', isAtStart);
            });
            nextBtns.forEach(btn => {
                btn.disabled = isAtEnd;
                btn.classList.toggle('is-disabled', isAtEnd);
            });
        }

        function getSlideItems(slide) {
            return Array.from(slide.querySelectorAll('.hero-media-slide-caption-inner > *, .hero-media-slide-link'));
        }

        function goToSlide(newIndex) {
            if (isAnimating || newIndex === currentIndex) return;
            if (newIndex < 0 || newIndex >= slides.length) return;
            isAnimating = true;

            const dir = newIndex > currentIndex ? 1 : -1;
            const oldIndex = currentIndex;
            currentIndex = newIndex;

            updatePagination();
            updateNavState();

            const fromSlide = slides[oldIndex];
            const toSlide = slides[newIndex];
            const fromBg = bgSlides[oldIndex];
            const toBg = bgSlides[newIndex];
            const fromItems = getSlideItems(fromSlide);
            const toItems = getSlideItems(toSlide);

            gsap.set(fromSlide, { zIndex: 3 });
            gsap.set(toSlide, { autoAlpha: 1, zIndex: 2 });
            gsap.set(toItems, { y: dir * 50, autoAlpha: 0 });
            if (toBg) gsap.set(toBg, { autoAlpha: 0, scale: 1.08 });

            const tl = gsap.timeline({
                onComplete: () => { isAnimating = false; }
            });

            tl.to(fromItems, {
                y: dir * -35,
                autoAlpha: 0,
                duration: 0.4,
                stagger: 0.055,
                ease: 'power2.in'
            }, 0);

            if (fromBg) tl.to(fromBg, { autoAlpha: 0, scale: 1.06, duration: 0.65, ease: 'power2.inOut' }, 0);
            if (toBg) tl.to(toBg, { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'power2.out' }, 0.1);

            tl.set(fromSlide, { autoAlpha: 0, zIndex: 0 }, 0.6);

            tl.to(toItems, {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            }, 0.5);
        }

        updatePagination();
        updateNavState();


        const firstSlide = slides[currentIndex];
        const firstItems = firstSlide ? getSlideItems(firstSlide) : [];
        const firstContentTrigger = firstSlide
            ? firstSlide.querySelector('.hero-media-slide-bottom-content')
            : null;

        const hidden = 'inset(0 100% 0 0)';
        const shown = 'inset(0 0% 0 0)';
        gsap.set(slider, {
            clipPath: hidden,
            webkitClipPath: hidden,
            opacity: 1,
            visibility: 'visible',
            willChange: 'clip-path',
            force3D: true
        });

        gsap.to(slider, {
            clipPath: shown,
            webkitClipPath: shown,
            duration: 1.2,
            ease: 'power2.inOut',
            delay: 0.2,
            force3D: true,
            autoRound: false,
            onComplete: () => {
                gsap.set(slider, { clearProps: 'will-change' });
            }
        });

        gsap.set(firstItems, { y: 40, autoAlpha: 0 });
        gsap.to(firstItems, {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: firstContentTrigger || slider,
                start: 'top 72%',
                once: true
            }
        });

        prevBtns.forEach(btn => btn.addEventListener('click', () => goToSlide(currentIndex - 1)));
        nextBtns.forEach(btn => btn.addEventListener('click', () => goToSlide(currentIndex + 1)));

        // Touch swipe support
        let touchStartX = 0;
        let touchStartY = 0;
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        slider.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
                if (dx < 0) goToSlide(currentIndex + 1);
                else goToSlide(currentIndex - 1);
            }
        }, { passive: true });

    }

    // Co-Curricular Slider
    function initCocurricularSlider() {
        const section = document.querySelector('.cocurricular-section');
        if (!section) return;

        const slides = Array.from(section.querySelectorAll('.cocurricular-slide'));
        const bgSlides = Array.from(section.querySelectorAll('.cocurricular-bg-slide'));
        const navBtns = Array.from(section.querySelectorAll('.cocurricular-nav-buttons a'));
        if (!slides.length) return;

        let currentIndex = 1;
        let activeTimeline = null;
        const itemSelector = 'small, h2, p, a';

        function syncToIndex(index) {
            slides.forEach((slide, i) => {
                const isActive = i === index;
                gsap.set(slide, { autoAlpha: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 });
                gsap.set(slide.querySelectorAll(itemSelector), { autoAlpha: isActive ? 1 : 0, y: 0 });
            });
            bgSlides.forEach((bg, i) => gsap.set(bg, { autoAlpha: i === index ? 1 : 0, scale: 1 }));
        }

        // Initial state — active slide visible, rest hidden
        syncToIndex(currentIndex);
        navBtns.forEach((btn, i) => btn.classList.toggle('active', i === currentIndex));

        // Entrance animation for active slide content on scroll
        const cocurricularLabel = section.querySelector('.cocurricular-label');
        const activeSlide = slides[currentIndex];
        const activeItems = Array.from(activeSlide.querySelectorAll(itemSelector));
        const entranceEls = cocurricularLabel ? [cocurricularLabel, ...activeItems] : activeItems;
        gsap.set(entranceEls, { autoAlpha: 0, y: 40 });
        ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            once: true,
            onEnter: () => {
                gsap.to(entranceEls, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay: 0.4
                });
            }
        });

        function goToSlide(newIndex) {
            if (newIndex === currentIndex) return;
            if (newIndex < 0 || newIndex >= slides.length) return;

            if (activeTimeline) {
                activeTimeline.kill();
                activeTimeline = null;
            }

            gsap.killTweensOf(section.querySelectorAll(`${itemSelector}, .cocurricular-bg-slide, .cocurricular-bg-slide img`));
            syncToIndex(currentIndex);

            const dir = newIndex > currentIndex ? 1 : -1;
            const oldIndex = currentIndex;
            currentIndex = newIndex;

            navBtns.forEach((btn, i) => btn.classList.toggle('active', i === newIndex));

            const fromSlide = slides[oldIndex];
            const toSlide = slides[newIndex];
            const fromBg = bgSlides[oldIndex];
            const toBg = bgSlides[newIndex];
            const fromItems = Array.from(fromSlide.querySelectorAll(itemSelector));
            const toItems = Array.from(toSlide.querySelectorAll(itemSelector));

            // Stack: fromSlide on top during out, toSlide below
            gsap.set(fromSlide, { zIndex: 3 });
            gsap.set(toSlide, { autoAlpha: 1, zIndex: 2 });
            gsap.set(toItems, { y: dir * 50, autoAlpha: 0 });
            gsap.set(toBg, { autoAlpha: 0, scale: 1.08 });

            const tl = gsap.timeline({
                onComplete: () => {
                    activeTimeline = null;
                }
            });
            activeTimeline = tl;

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
            btn.addEventListener('click', (e) => { e.preventDefault(); goToSlide(i); });
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
    initLatestNewsHeroSlider();

    // ─── Search Overlay ────────────────────────────────────────────────────────
    function liveSearch(query) {

        $.ajax({
            type: 'get',
            url: '/search',
            data: {
                query: query
            },

            beforeSend: function () {
                $('#searchResults').html('<div class="searching">Searching...</div>');
            },

            success: function (e) {
                $('#searchResults').html(e);
            },

            error: function () {
                $('#searchResults').html('<div class="error">Error loading results</div>');
            }
        });
        $('#searchResults').removeClass('d-none');
    }


    function initSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        if (!searchOverlay) return;

        const searchInput = document.getElementById('searchInput');
        const searchIconBtn = document.getElementById('searchIconBtn');
        const searchInputDemo = document.getElementsByClassName('searchInputDemo');
        const searchClearBtn = document.getElementById('searchClearBtn');
        const searchResults = document.getElementById('searchResults');
        const searchResultsList = searchResults ? searchResults.querySelector('.search-overlay-results-list') : null;
        const searchTriggers = document.querySelectorAll('.header-icon-btn--search');
        const searchPopularList = searchOverlay.querySelector('.search-overlay-popular-list');
        const searchTitle = searchOverlay.querySelector('.search-overlay-title');
        const searchInputWrap = searchOverlay.querySelector('.search-overlay-input-wrap');

        const searchData = window.SPC_SEARCH_DATA || [];
        let debounceTimer = null;

        // Replace search icon img with dual inline-SVG wrapper for smooth open/close transition
        const SEARCH_ICON_SVG = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.75C21 8.20312 17.2969 4.5 12.75 4.5C8.20312 4.5 4.5 8.20312 4.5 12.75C4.5 17.2969 8.20312 21 12.75 21C17.2969 21 21 17.2969 21 12.75ZM19.0781 20.1562C17.3906 21.6094 15.1875 22.5 12.75 22.5C7.35938 22.5 3 18.1406 3 12.75C3 7.35938 7.35938 3 12.75 3C18.1406 3 22.5 7.35938 22.5 12.75C22.5 15.1875 21.6094 17.3906 20.1562 19.0781L26.7656 25.7344C27.0938 26.0156 27.0938 26.4844 26.7656 26.7656C26.4844 27.0938 26.0156 27.0938 25.7344 26.7656L19.0781 20.1562Z" fill="currentColor"/></svg>`;
        const CLOSE_ICON_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.664062 1.99219L0 1.32812L1.28906 0L1.95312 0.664062L7.85156 6.5625L13.75 0.664062L14.4141 0L15.7422 1.32812L15.0781 1.99219L9.17969 7.89062L15.0781 13.7891L15.7422 14.4531L14.4141 15.7812L13.75 15.1172L7.85156 9.21875L1.95312 15.1172L1.28906 15.7812L0 14.4531L0.664062 13.7891L6.5625 7.89062L0.664062 1.99219Z" fill="currentColor"/></svg>`;
        searchTriggers.forEach(trigger => {
            const img = trigger.querySelector('img');
            if (!img) return;
            const wrap = document.createElement('span');
            wrap.className = 'search-icon-wrap';
            wrap.innerHTML = `<span class="search-icon-search" aria-label="${img.alt}">${SEARCH_ICON_SVG}</span><span class="search-icon-close" aria-hidden="true">${CLOSE_ICON_SVG}</span>`;
            trigger.replaceChild(wrap, img);
        });

        function animatePopularItems(delay = 0.16) {
            if (!searchPopularList) return;
            const popularItems = searchPopularList.querySelectorAll('.search-overlay-popular-item');
            if (!popularItems.length) return;

            gsap.killTweensOf(popularItems);
            gsap.set(popularItems, { opacity: 0, x: -24, force3D: true });
            gsap.to(popularItems, {
                opacity: 1,
                x: 0,
                duration: 0.35,
                ease: 'power2.out',
                stagger: 0.05,
                delay: delay,
                force3D: true
            });
        }

        function animateSearchIntro(delay = 0.1) {
            const introTargets = [searchTitle, searchInputWrap].filter(Boolean);
            if (!introTargets.length) return delay;

            const duration = 0.32;
            const stagger = 0.06;
            gsap.killTweensOf(introTargets);
            gsap.set(introTargets, { opacity: 0, x: -20, force3D: true });
            gsap.to(introTargets, {
                opacity: 1,
                x: 0,
                duration: duration,
                ease: 'power2.out',
                stagger: stagger,
                delay: delay,
                force3D: true
            });

            return delay + duration + ((introTargets.length - 1) * stagger);
        }

        function resetPopularItems() {
            if (!searchPopularList) return;
            const popularItems = searchPopularList.querySelectorAll('.search-overlay-popular-item');
            if (!popularItems.length) return;
            gsap.killTweensOf(popularItems);
            gsap.set(popularItems, { clearProps: 'opacity,transform' });
        }

        function resetSearchIntro() {
            const introTargets = [searchTitle, searchInputWrap].filter(Boolean);
            if (!introTargets.length) return;
            gsap.killTweensOf(introTargets);
            gsap.set(introTargets, { clearProps: 'opacity,transform' });
        }

        function openSearch() {
            const switchingFromMenu = isMenuOpen;
            setSearchOverlayVisibility(true, switchingFromMenu);

            if (switchingFromMenu) {
                closeMenu({ keepHeaderItems: true });
            } else if (!isMobile()) {
                const headerMenuItems = document.querySelectorAll(
                    '.header-nav .btn-book-tour, .header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
                );
                const rightBlock = header ? header.querySelector('.right-block') : null;
                if (rightBlock) rightBlock.style.maxWidth = getExpandedRightBlockMaxWidth();
                btnEnquire.style.display = 'inline-flex';
                dropdownWrappers.forEach(wrapper => {
                    wrapper.style.display = 'flex';
                });
                gsap.set(headerMenuItems, { opacity: 0, force3D: true });
                gsap.to(headerMenuItems, {
                    opacity: 1,
                    duration: 0.35,
                    ease: 'power2.out',
                    stagger: 0.08,
                    force3D: true,
                    immediateRender: false
                });
            }

            const introEnd = animateSearchIntro(switchingFromMenu ? 0.04 : 0.12);
            animatePopularItems(introEnd + 0.03);

            if (searchInput) setTimeout(() => searchInput.focus(), 350);
        }

        function closeSearch() {
            setSearchOverlayVisibility(false, false);
            resetSearchIntro();
            resetPopularItems();

            if (!isMenuOpen && !isMobile()) {
                const headerMenuItemsHidden = document.querySelectorAll(
                    '.header-nav .btn-enquire, .header-nav .dropdown-wrapper.hide-header-items'
                );
                const bookTourBtn = document.querySelector('.header-nav .btn-book-tour');
                const rightBlock = header ? header.querySelector('.right-block') : null;
                gsap.killTweensOf(headerMenuItemsHidden);
                if (bookTourBtn) {
                    bookTourBtn.style.transition = 'none';
                }
                gsap.to(headerMenuItemsHidden, {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power1.in',
                    force3D: true,
                    onComplete: () => {
                        gsap.set(headerMenuItemsHidden, { clearProps: 'opacity,transform' });
                        btnEnquire.style.display = 'none';
                        dropdownWrappers.forEach(wrapper => {
                            wrapper.style.display = 'none';
                        });
                        if (rightBlock) rightBlock.style.maxWidth = '';

                        if (bookTourBtn) {
                            revealBookTourButton(bookTourBtn);
                        }
                    }
                });
            }
        }

        // Close search when clicking anywhere in the header except the search button
        if (header) {
            header.addEventListener('click', function (e) {
                if (!searchOverlay.classList.contains('is-open')) return;
                if (e.target.closest('.header-icon-btn--search')) return;
                closeSearch();
            });
        }

        function scoreResult(item, query) {
            const q = query.toLowerCase().trim();
            const titleLow = item.title.toLowerCase();
            const descLow = item.description.toLowerCase();
            const tagsStr = (item.tags || []).join(' ').toLowerCase();
            let score = 0;
            if (titleLow.startsWith(q)) score += 10;
            if (titleLow.includes(q)) score += 6;
            if (tagsStr.includes(q)) score += 4;
            if (descLow.includes(q)) score += 2;
            // Also check individual words
            const words = q.split(/\s+/).filter(Boolean);
            words.forEach(w => {
                if (titleLow.includes(w)) score += 3;
                if (tagsStr.includes(w)) score += 2;
                if (descLow.includes(w)) score += 1;
            });
            return score;
        }

        function renderResults(query) {
            if (!searchResultsList) return;
            const q = query.trim();
            if (!q) {
                showPopular();
                return;
            }

            const scored = searchData
                .map(item => ({ item, score: scoreResult(item, q) }))
                .filter(({ score }) => score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 8)
                .map(({ item }) => item);

            if (scored.length === 0) {
                searchResultsList.innerHTML = `<li style="padding: 1.25rem 0; color: var(--basic-black); font-family: var(--font-family-helvetica-neue); font-size: var(--font-size-b2); opacity: 0.5;">No results found for "<strong>${escapeHtml(q)}</strong>"</li>`;
            } else {
                searchResultsList.innerHTML = scored.map(item => `
                    <li class="search-overlay-results-item position-relative">
                        <a href="${item.url}" class="search-overlay-results-item-link position-absolute w-100 h-100" aria-label="${escapeHtml(item.title)}"></a>
                        <div class="search-overlay-results-item-img">
                            <img src="${item.image}" alt="${escapeHtml(item.title)}" onerror="this.parentElement.style.display='none'">
                        </div>
                        <div class="search-overlay-results-item-body">
                            <h4 class="search-overlay-results-item-title">${highlightMatch(item.title, q)}</h4>
                            <p>${highlightMatch(item.description, q)}</p>
                        </div>
                    </li>`).join('');
            }

            searchResults?.classList.remove('d-none');
        }

        function showPopular() {
            searchResults?.classList.add('d-none');
        }

        function escapeHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        function highlightMatch(text, query) {
            if (!query) return escapeHtml(text);
            const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            return escapeHtml(text).replace(new RegExp(`(${escaped})`, 'gi'), '<mark style="background:rgba(16,6,159,0.1);color:inherit;padding:0;">$1</mark>');
        }

        searchTriggers.forEach(trigger => {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                searchOverlay.classList.contains('is-open') ? closeSearch() : openSearch();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const val = this.value;
                if (val.trim()) {
                    searchIconBtn?.classList.remove('is-active');
                    searchClearBtn?.classList.add('is-active');
                    if (window.innerWidth < 768) {
                        searchResults?.classList.remove('d-none');
                    }
                } else {
                    searchIconBtn?.classList.add('is-active');
                    searchClearBtn?.classList.remove('is-active');
                    showPopular();
                    return;
                }
                clearTimeout(debounceTimer);

                debounceTimer = setTimeout(function () {
                    liveSearch(val);
                }, 800); // wait 0.8 sec after typing stops

            });
        }



        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', function () {
                if (searchInput) searchInput.value = '';
                searchIconBtn?.classList.add('is-active');
                this.classList.remove('is-active');
                showPopular();
                if (searchInput) searchInput.focus();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
                closeSearch();
            }
        });
    }

    initSearch();

});
