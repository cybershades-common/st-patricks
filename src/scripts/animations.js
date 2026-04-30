(function () {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);

    if (typeof SplitText !== 'undefined') {
        document.querySelectorAll('.spc-quote-write').forEach(function (host) {
            var target =
                host.matches('blockquote, p') ? host :
                (host.querySelector('blockquote') || host.querySelector('p') || host);
            target.classList.add('spc-item', 'spc-item--quote-write', 'spc-split', 'spc-split--chars');
        });
    }

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

    document.querySelectorAll('.spc-block').forEach(function (el) {
        el.classList.add('spc-item', 'spc-item--appear');
    });

    document.querySelectorAll('.spc-children > *:not(blockquote)').forEach(function (el) {
        var p = el.parentElement;
        var useAppear = !!(p && p.classList && p.classList.contains('spc-children--appear'));
        el.classList.add('spc-item', useAppear ? 'spc-item--appear' : 'spc-item--rise');
        if (p && p.classList && p.classList.contains('spc-auto')) {
            el.classList.add('spc-auto');
            if (p.dataset && p.dataset.spcDelay) el.dataset.spcDelay = p.dataset.spcDelay;
        }
    });

    document.querySelectorAll('.spc-card-grid').forEach(function (grid) {
        var cards = grid.querySelectorAll(
            '.about-nav-card, .latest-news-list-card, .news-detail-keep-reading-card'
        );
        if (!cards.length) return;

        cards.forEach(function (card) {
            var img = card.querySelector(
                '.about-nav-card-image img, .latest-news-list-card-image img'
            );
            if (img) img.classList.add('spc-item', 'spc-item--clip');
            var content = card.querySelector('.latest-news-list-card-content');
            if (content) content.classList.add('spc-item', 'spc-item--appear');
            var h5 = card.querySelector('h5');
            if (h5) h5.classList.add('spc-item', 'spc-item--appear');
        });
    });

    document.querySelectorAll('.spc-grid-zoom').forEach(function (grid) {
        var isLate = grid.classList.contains('spc-trigger--late');
        var items = grid.querySelectorAll(
            '.latest-news-list-card, .about-nav-card, .news-detail-keep-reading-card, .news-detail-gallery-item'
        );
        if (!items.length) return;
        items.forEach(function (el) {
            el.classList.add('spc-item', 'spc-item--img');
            if (isLate) el.classList.add('spc-trigger--late');
        });
    });

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

    var items = document.querySelectorAll('.spc-item');
    if (!items.length) return;

    if (document.querySelectorAll('.spc-item--text.spc-split--lines').length) {
        gsap.set('.spc-item--text.spc-split--lines', { autoAlpha: 1 });
    }
    if (document.querySelectorAll('.spc-item--text.spc-split--chars').length) {
        gsap.set('.spc-item--text.spc-split--chars', { autoAlpha: 1 });
    }

    if (document.querySelectorAll('.spc-item--text.spc-split--lines .spc-line').length) {
        gsap.set('.spc-item--text.spc-split--lines .spc-line', { y: 30, autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--text.spc-split--chars .spc-char').length) {
        gsap.set('.spc-item--text.spc-split--chars .spc-char', { autoAlpha: 0 });
    }
    if (document.querySelectorAll('.spc-item--quote-write .spc-char').length) {
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

    function animateItem(card, index, baseDelay) {
        var ease  = 'power1.out';
        var delay = (baseDelay || 0) + index * 0.1;

        if (card.classList.contains('spc-item--btn')) {
            gsap.to(card, {
                scale: 1, autoAlpha: 1, duration: 1,
                ease: 'back.out(1.1)', delay: delay, force3D: true,
                onComplete: function () { card.classList.add('spc-done'); }
            });
            return;
        }

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
                gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay });
            }
            return;
        }

        if (card.classList.contains('spc-item--rise')) {
            gsap.to(card, { duration: 0.7, ease: ease, x: 0, y: 0, delay: delay });
            gsap.to(card, {
                duration: 0.5, ease: ease, autoAlpha: 1, delay: delay + 0.1,
                onStart:    function () { card.classList.add('spc-start'); },
                onComplete: function () { card.classList.add('spc-done'); }
            });
            return;
        }

        if (card.classList.contains('spc-item--appear')) {
            gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay });
            return;
        }

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

        if (card.classList.contains('spc-item--right')) {
            gsap.to(card, { duration: 0.7, ease: ease, x: 0, y: 0, delay: delay });
            gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay + 0.1 });
            return;
        }

        if (card.classList.contains('spc-item--up')) {
            gsap.to(card, { duration: 0.7, ease: ease, x: 0, y: 0, delay: delay });
            gsap.to(card, { duration: 0.5, ease: ease, autoAlpha: 1, delay: delay + 0.1 });
        }
    }

    ScrollTrigger.batch('.spc-item:not(.spc-auto):not(.spc-item--hero):not(.spc-trigger--late)', {
        start: 'top bottom-=100',
        once: true,
        onEnter: function (batch) {
            batch.forEach(function (card, index) { animateItem(card, index, 0); });
        }
    });

    ScrollTrigger.batch('.spc-item:not(.spc-auto).spc-trigger--late', {
        start: 'top 65%',
        once: true,
        onEnter: function (batch) {
            batch.forEach(function (card, index) { animateItem(card, index, 0); });
        }
    });

    ScrollTrigger.batch('.spc-item--hero:not(.spc-auto)', {
        start: 'top bottom',
        once: true,
        onEnter: function (batch) {
            batch.forEach(function (card, index) { animateItem(card, index, 0); });
        }
    });

    var autoGroups = new Map();
    document.querySelectorAll('.spc-item.spc-auto').forEach(function (el) {
        var parent = el.parentElement || document.body;
        if (!autoGroups.has(parent)) autoGroups.set(parent, []);
        autoGroups.get(parent).push(el);
    });

    autoGroups.forEach(function (els, parent) {
        var baseDelay = 0.8;
        if (parent && parent.dataset && parent.dataset.spcDelay) {
            var v = parseFloat(parent.dataset.spcDelay);
            if (!Number.isNaN(v)) baseDelay = v;
        } else if (els[0] && els[0].dataset && els[0].dataset.spcDelay) {
            var v2 = parseFloat(els[0].dataset.spcDelay);
            if (!Number.isNaN(v2)) baseDelay = v2;
        }
        els.forEach(function (card, index) { animateItem(card, index, baseDelay); });
    });

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
