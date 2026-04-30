// ==========================================================================
// SPC Animation System — St Patrick's College
// ==========================================================================
// Class reference (all classes use spc- prefix):
//
//   spc-item            base marker — every animated element needs this
//   spc-item--rise      fade-up: y 30→0 + opacity 0→1
//   spc-item--appear    fade-in: opacity 0→1, no movement
//   spc-item--text      heading text — split lines, animate line-by-line
//   spc-item--img       single standalone image: scale 1.08→1 + fade
//   spc-item--clip      grid/slider images: clip-reveal bottom-to-top, staggered
//   spc-item--right     slide in from right: x 15%→0 + fade
//   spc-item--up        slide in from above: y -15%→0 + fade
//   spc-item--btn       button zoom-in: scale 0.8→1 + opacity 0→1, smooth pop
//   spc-item--hero      above-fold item: trigger fires as soon as it enters view
//   spc-item--quote-write "writing" quote: SplitText chars reveal (typing feel)
//
// Trigger modifiers (combine with any spc-item):
//   spc-trigger--late   fires when element top hits 65% down viewport (element more visible first)
//
//   spc-children        parent shortcut — every direct child → spc-item spc-item--rise
//   spc-block           standalone block shortcut → spc-item spc-item--appear at runtime
//
//   spc-split           marks an element for SplitText processing
//   spc-split--lines    split into rendered lines
//   spc-split--chars    split into individual characters
//   spc-line            generated line wrapper (set by SplitText linesClass)
//   spc-char            generated char wrapper (set by SplitText charsClass)
//
// Quote helper:
//   spc-quote-write     add to any quote container OR the text element itself;
//                       script promotes the best text node to spc-item--quote-write + SplitText chars.
//
//   spc-clip-done       added on clip animation complete (removes CSS clip-path)
//
// Parallax classes (data attrs):
//   spc-parallax        root parallax element
//   spc-parallax--img   oversized image for parallax
//   spc-parallax--block block offset parallax
//   spc-parallax--y     move on Y axis   (data-spc-parallax="<value>")
//   spc-parallax--x     move on X axis
//   spc-parallax--scale scale parallax
//   spc-parallax--reverse reverse direction
//   spc-parallax--trigger  use nearest .spc-parallax-wrap as scroll trigger
//   spc-parallax-wrap   scroll trigger container for spc-parallax--trigger
// ==========================================================================

(function () {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);

    // ------------------------------------------------------------------
    // 0. Quote "writing" helper promotion (runs before SplitText)
    //    Add `spc-quote-write` to any element; we will find the best text
    //    node and prepare it for SplitText chars + animation.
    // ------------------------------------------------------------------
    if (typeof SplitText !== 'undefined') {
        document.querySelectorAll('.spc-quote-write').forEach(function (host) {
            // Prefer a direct <blockquote> or <p> child; otherwise use host.
            var target =
                host.matches('blockquote, p') ? host :
                (host.querySelector('blockquote') || host.querySelector('p') || host);

            // Avoid splitting a wrapper that contains multiple complex nodes.
            // If host contains a blockquote/p, we split that text node only.
            target.classList.add('spc-item', 'spc-item--quote-write', 'spc-split', 'spc-split--chars');
        });
    }

    // ------------------------------------------------------------------
    // 1. SplitText — text line / char splitting
    // ------------------------------------------------------------------
    if (typeof SplitText !== 'undefined') {
        document.querySelectorAll('.spc-split').forEach(function (el) {
            if (el.classList.contains('spc-split--lines')) {
                var targets = el.querySelectorAll('p, li, h4, h3, h5, h6');
                if (targets.length > 0) {
                    targets.forEach(function (t) {
                        new SplitText(t, { type: 'lines', linesClass: 'spc-line', aria: 'none' });
                    });
                } else {
                    new SplitText(el, { type: 'lines', linesClass: 'spc-line', aria: 'none' });
                }
            } else if (el.classList.contains('spc-split--chars')) {
                // Quote writing: chars only (no line wrappers) to preserve layout + link underlines
                if (el.classList.contains('spc-item--quote-write')) {
                    new SplitText(el, { type: 'chars', charsClass: 'spc-char', aria: 'none' });
                } else {
                    new SplitText(el, {
                        type: 'chars,lines',
                        linesClass: 'spc-line',
                        charsClass: 'spc-char',
                        aria: 'none'
                    });
                }
            }
        });
    }

    // ------------------------------------------------------------------
    // 2. Runtime class promotion
    //    spc-block    → spc-item + spc-item--appear
    //    spc-children → direct children get spc-item + spc-item--rise
    //
    //    spc-card-grid → card grids helper:
    //      - images get spc-item + spc-item--clip (clip reveal)
    //      - card content gets spc-item + spc-item--appear (fade-in)
    // ------------------------------------------------------------------
    document.querySelectorAll('.spc-block').forEach(function (el) {
        el.classList.add('spc-item', 'spc-item--appear');
    });

    // Regular children
    document.querySelectorAll('.spc-children > *:not(blockquote)').forEach(function (el) {
        el.classList.add('spc-item', 'spc-item--rise');
    });

    // Card grids (universal helper)
    // Usage: add class "spc-card-grid" on the parent container of a card grid.
    // This avoids needing to manually sprinkle spc-item classes in each card.
    document.querySelectorAll('.spc-card-grid').forEach(function (grid) {
        // Known card patterns across the site
        var cards = grid.querySelectorAll(
            '.about-nav-card, .latest-news-list-card, .news-detail-keep-reading-card'
        );
        if (!cards.length) return;

        cards.forEach(function (card) {
            // Primary image clip (scoped to common wrappers to avoid icons)
            var img = card.querySelector(
                '.about-nav-card-image img, .latest-news-list-card-image img'
            );
            if (img) img.classList.add('spc-item', 'spc-item--clip');

            // Content fade-in
            var content = card.querySelector('.latest-news-list-card-content');
            if (content) content.classList.add('spc-item', 'spc-item--appear');

            // Headings fade-in (about-nav cards)
            var h5 = card.querySelector('h5');
            if (h5) h5.classList.add('spc-item', 'spc-item--appear');
        });
    });

    // Blockquote children — wrap with decorative lines
    document.querySelectorAll('.spc-children > blockquote').forEach(function (el) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('spc-bq-wrap');

        var clone = el.cloneNode(true);
        el.parentNode.replaceChild(wrapper, el);
        wrapper.appendChild(clone);

        var lineTop = document.createElement('div');
        lineTop.classList.add('spc-bq-line', 'spc-bq-line--top');
        var lineBtm = document.createElement('div');
        lineBtm.classList.add('spc-bq-line', 'spc-bq-line--btm');
        wrapper.appendChild(lineTop);
        wrapper.appendChild(lineBtm);

        wrapper.classList.add('spc-item', 'spc-item--bq');
    });

    // ------------------------------------------------------------------
    // 3. GSAP initial states — hide before animation fires
    // ------------------------------------------------------------------
    var items = document.querySelectorAll('.spc-item');
    if (!items.length) return;

    if (document.querySelectorAll('.spc-item--text.spc-split--lines .spc-line').length) {
        gsap.set('.spc-item--text.spc-split--lines .spc-line', { y: 30, autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--text.spc-split--chars .spc-char').length) {
        gsap.set('.spc-item--text.spc-split--chars .spc-char', { autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--quote-write .spc-char').length) {
        // opacity-only: avoids layout shifts and keeps underlines continuous
        gsap.set('.spc-item--quote-write .spc-char', { autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--rise').length) {
        gsap.set('.spc-item--rise', { y: 30, autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--bq blockquote').length) {
        gsap.set('.spc-item--bq blockquote', { y: 30, autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--appear').length) {
        gsap.set('.spc-item--appear', { autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--img').length) {
        gsap.set('.spc-item--img', {
            scale: 1.08, autoAlpha: 0,
            transformOrigin: '50% 50%', force3D: true
        });
    }
    if (document.querySelectorAll('.spc-item--btn').length) {
        gsap.set('.spc-item--btn', { scale: 0.9, autoAlpha: 0, transformOrigin: '50% 50%' });
    }
    if (document.querySelectorAll('.spc-item--right').length) {
        gsap.set('.spc-item--right', { x: '15%', autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--up').length) {
        gsap.set('.spc-item--up', { y: '-15%', autoAlpha: 0 });
    }

    // ------------------------------------------------------------------
    // 4. Animation function — called per item in each batch
    // ------------------------------------------------------------------
    function animateItem(card, index) {
        var ease  = 'power1.out';
        var delay = index * 0.1;

        // button zoom-in
        if (card.classList.contains('spc-item--btn')) {
            gsap.to(card, {
                scale: 1, autoAlpha: 1, duration: 1,
                ease: 'back.out(1.1)', delay: delay, force3D: true,
                onComplete: function () { card.classList.add('spc-done'); }
            });
            return;
        }

        // quote writing / typing reveal
        if (card.classList.contains('spc-item--quote-write')) {
            var charsQ = card.querySelectorAll('.spc-char');
            if (charsQ && charsQ.length) {
                gsap.to(charsQ, {
                    autoAlpha: 1,
                    duration: 0.25,
                    ease: 'none',
                    stagger: 0.015,
                    delay: delay,
                    onComplete: function () { card.classList.add('spc-done'); }
                });
            } else {
                // Fallback if SplitText isn't available or didn't run
                gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay });
            }
            return;
        }

        // fade-up
        if (card.classList.contains('spc-item--rise')) {
            gsap.to(card, { duration: 0.7, ease: ease, x: 0, y: 0, delay: delay });
            gsap.to(card, {
                duration: 0.5, ease: ease, autoAlpha: 1, delay: delay + 0.1,
                onStart:    function () { card.classList.add('spc-start'); },
                onComplete: function () { card.classList.add('spc-done'); }
            });
            return;
        }

        // fade-in only
        if (card.classList.contains('spc-item--appear')) {
            gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay });
            return;
        }

        // single standalone image — gentle scale + fade
        if (card.classList.contains('spc-item--img')) {
            gsap.to(card, {
                scale: 1, autoAlpha: 1, duration: 0.9,
                ease: 'power2.out', delay: delay, force3D: true,
                onComplete: function () {
                    gsap.set(card, { clearProps: 'transform,will-change' });
                    card.classList.add('spc-done');
                }
            });
            return;
        }

        // grid/slider images — clip reveal from bottom, staggered by batch index
        if (card.classList.contains('spc-item--clip')) {
            gsap.fromTo(card,
                { '--spc-clip': '100%' },
                {
                    '--spc-clip': '0%',
                    duration: 1.1,
                    ease: 'power3.out',
                    delay: index * 0.2,
                    onComplete: function () {
                        card.classList.add('spc-clip-done');
                    }
                }
            );
            return;
        }

        // heading text — animate split lines
        if (card.classList.contains('spc-item--text')) {
            if (card.classList.contains('spc-split--lines')) {
                var lines = card.querySelectorAll('.spc-line');
                gsap.to(lines, { y: 0, duration: 0.6, stagger: 0.15, ease: ease, delay: delay });
                gsap.to(lines, { autoAlpha: 1, duration: 0.5, stagger: 0.15, ease: ease, delay: delay + 0.1 });
            }
            if (card.classList.contains('spc-split--chars')) {
                var chars = card.querySelectorAll('.spc-char');
                gsap.to(chars, { duration: 0.4, stagger: 0.05, ease: 'power3.inOut', autoAlpha: 1, delay: delay });
            }
            return;
        }

        // blockquote special
        if (card.classList.contains('spc-item--bq')) {
            var bq = card.querySelector('blockquote');
            if (bq) {
                gsap.to(bq, { duration: 0.7, ease: ease, x: 0, y: 0, delay: delay });
                gsap.to(bq, {
                    duration: 0.5, ease: ease, autoAlpha: 1, delay: delay + 0.1,
                    onStart:    function () { card.classList.add('spc-start'); },
                    onComplete: function () { card.classList.add('spc-done'); }
                });
            }
            return;
        }

        // slide from right
        if (card.classList.contains('spc-item--right')) {
            gsap.to(card, { duration: 0.7, ease: ease, x: 0, y: 0, delay: delay });
            gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay + 0.1 });
            return;
        }

        // slide from above
        if (card.classList.contains('spc-item--up')) {
            gsap.to(card, { duration: 0.7, ease: ease, x: 0, y: 0, delay: delay });
            gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay + 0.1 });
        }
    }

    // ------------------------------------------------------------------
    // 5. ScrollTrigger batch registration
    // ------------------------------------------------------------------
    // Regular items: trigger 100px before viewport edge
    ScrollTrigger.batch('.spc-item:not(.spc-item--hero):not(.spc-trigger--late)', {
        start: 'top bottom-=100',
        once: true,
        onEnter: function (batch) {
            batch.forEach(function (card, index) { animateItem(card, index); });
        }
    });

    // Late-trigger items: fire when element top hits 65% down the viewport
    ScrollTrigger.batch('.spc-item.spc-trigger--late', {
        start: 'top 65%',
        once: true,
        onEnter: function (batch) {
            batch.forEach(function (card, index) { animateItem(card, index); });
        }
    });

    // Hero items: trigger as soon as they scroll into view (above-fold)
    ScrollTrigger.batch('.spc-item--hero', {
        start: 'top bottom',
        once: true,
        onEnter: function (batch) {
            batch.forEach(function (card, index) { animateItem(card, index); });
        }
    });

    // ------------------------------------------------------------------
    // 6. Parallax system
    // ------------------------------------------------------------------
    document.querySelectorAll('.spc-parallax').forEach(function (el) {
        var isImg     = el.classList.contains('spc-parallax--img');
        var isBlock   = el.classList.contains('spc-parallax--block');
        var isReverse = el.classList.contains('spc-parallax--reverse');
        var val       = parseFloat(el.dataset.spcParallax) || 0;
        var translateY = el.classList.contains('spc-parallax--y') ? val : 0;
        var translateX = el.classList.contains('spc-parallax--x') ? val : 0;
        var scale      = el.classList.contains('spc-parallax--scale') ? val : 1;
        var scrub      = el.dataset.spcScrub !== undefined ? parseFloat(el.dataset.spcScrub) : 1;
        var startPos   = el.dataset.spcStart || 'top bottom';
        var endPos     = el.dataset.spcEnd   || 'bottom top';
        var trig       = el.classList.contains('spc-parallax--trigger')
                         ? (el.closest('.spc-parallax-wrap') || el) : el;

        if (isImg && (translateY || translateX)) {
            Object.assign(el.style, {
                height: 'calc(100% + ' + translateY + '%)',
                width:  'calc(100% + ' + translateX + '%)',
                position: 'relative',
                top:  (isReverse ? 0 : -translateY) + '%',
                left: (isReverse ? 0 : -translateX) + '%'
            });
        }
        if (isBlock && (translateY || translateX)) {
            Object.assign(el.style, {
                position: 'relative',
                top:  (isReverse ?  translateY / 2 : -translateY / 2) + '%',
                left: (isReverse ?  translateX / 2 : -translateX / 2) + '%'
            });
        }

        var yTo = (isReverse && translateY) ? -translateY + 3 : translateY;
        var xTo = (isReverse && translateX) ? -translateX + 3 : translateX;

        gsap.timeline({
            scrollTrigger: {
                trigger: trig,
                start: startPos,
                end: endPos,
                scrub: scrub,
                pin: false
            }
        }).to(el, { xPercent: xTo, yPercent: yTo, scale: scale, duration: 1, ease: 'none' });
    });

}());
