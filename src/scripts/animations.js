//==========================================================================
// GSAP SCROLL ANIMATIONS
//==========================================================================

class GSAPAnimations {
  constructor() {
    this.defaults = {
      duration: 1.25,
      start: 'top 80%',
      ease: {
        fade:  'power2.out',
        slide: 'power2.out',
        zoom:  'none'
      }
    };
    this.init();
  }

  init() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    this.setupAnimations();
  }

  // -----------------------------------------------------------------------
  // Setup
  // -----------------------------------------------------------------------

  setupAnimations() {
    this.setupSectionAnimations(document);
  }

  // -----------------------------------------------------------------------
  // Section-Level Animations (data-gsap-children)
  // -----------------------------------------------------------------------
  //
  // Allows you to define animations for multiple child elements using one
  // data attribute on the parent, instead of adding data-gsap to each child.
  //
  // BASIC USAGE (Same animation for desktop & mobile):
  // ------------------------------------------------
  // <section data-gsap-children='{"h2":"fade-up","p":"slide-left","button":"zoom-in"}'>
  //   <h2>Heading</h2>
  //   <p>Paragraph</p>
  //   <button>Button</button>
  // </section>
  //
  // ADVANCED USAGE (Custom timing, easing, duration):
  // ------------------------------------------------
  // <section data-gsap-children='{
  //   "h2": {"type":"fade-up", "delay":0, "duration":1.5, "start":"top 90%", "ease":"power2.out"},
  //   "p": {"type":"slide-left", "delay":0.2, "duration":1.2, "ease":"power3.out"},
  //   "button": {"type":"zoom-in", "delay":0.4, "duration":0.8, "ease":"back.out(1.7)"}
  // }'>
  //
  // MOBILE-SPECIFIC ANIMATIONS:
  // ------------------------------------------------
  // <section
  //   data-gsap-children='{"h2":"slide-left","p":"slide-right"}'
  //   data-gsap-children-mobile='{"h2":"fade-up","p":"fade-up"}'>
  //   <!-- Desktop: slide animations -->
  //   <!-- Mobile: simpler fade animations -->
  // </section>
  //
  // MOBILE-SPECIFIC TIMING:
  // ------------------------------------------------
  // <section
  //   data-gsap-children='{
  //     "button": {"type":"zoom-in", "ease":"back.out(1.7)"}
  //   }'
  //   data-gsap-children-mobile='{
  //     "button": {"type":"zoom-in", "ease":"power2.out"}
  //   }'
  //   data-gsap-start="top 80%"
  //   data-gsap-start-mobile="top 90%">
  //   <!-- Desktop: bouncy ease, triggers at 80% -->
  //   <!-- Mobile: simpler ease, triggers at 90% -->
  // </section>
  //
  // AVAILABLE ANIMATIONS:
  // - fade-up, fade-in, slide-left, slide-right, zoom-in, image-fade-in
  //
  // AVAILABLE PROPERTIES PER ELEMENT:
  // - type: animation name (required if using object config)
  // - delay: delay in seconds (default: auto-stagger 0.1s increments)
  // - duration: animation duration (default: 1.25s)
  // - start: ScrollTrigger start position (default: inherits from parent or "top 80%")
  // - ease: GSAP easing function (default: power2.out)
  //
  // PARENT ATTRIBUTES:
  // - data-gsap-children: Desktop animation config (required)
  // - data-gsap-children-mobile: Mobile animation config (optional, falls back to desktop)
  // - data-gsap-start: Desktop trigger start (optional, default: "top 80%")
  // - data-gsap-start-mobile: Mobile trigger start (optional, falls back to desktop)
  // - data-gsap-delay: Base delay for all animations (optional, default: 0)
  // - data-gsap-delay-mobile: Mobile base delay (optional, falls back to desktop)
  //
  // -----------------------------------------------------------------------

  setupSectionAnimations(root) {
    const isMobile = window.innerWidth <= 991;

    root.querySelectorAll('[data-gsap-children],[data-gsap-children-mobile]').forEach(section => {
      if (section.hasAttribute('data-gsap-children-initialized')) return;
      section.setAttribute('data-gsap-children-initialized', 'true');

      // Get configs
      const desktopConfigAttr = section.getAttribute('data-gsap-children');
      const mobileConfigAttr = section.getAttribute('data-gsap-children-mobile');

      if (!desktopConfigAttr) return;

      let desktopConfig, mobileConfig;
      try {
        desktopConfig = JSON.parse(desktopConfigAttr);
        if (mobileConfigAttr) {
          mobileConfig = JSON.parse(mobileConfigAttr);
        }
      } catch (err) {
        return;
      }

      // Merge mobile config over desktop config
      let config = desktopConfig;
      if (isMobile && mobileConfig) {
        config = {...desktopConfig};
        Object.entries(mobileConfig).forEach(([selector, mobileAnim]) => {
          const desktopAnim = config[selector];

          if (desktopAnim) {
            // If both are strings, use mobile
            if (typeof desktopAnim === 'string' && typeof mobileAnim === 'string') {
              config[selector] = mobileAnim;
            }
            // If desktop is string but mobile is object, convert desktop to object and merge
            else if (typeof desktopAnim === 'string' && typeof mobileAnim === 'object') {
              config[selector] = { type: desktopAnim, ...mobileAnim };
            }
            // If both are objects, merge mobile over desktop
            else if (typeof desktopAnim === 'object' && typeof mobileAnim === 'object') {
              config[selector] = { ...desktopAnim, ...mobileAnim };
            }
            // If desktop is object but mobile is string, use mobile string
            else {
              config[selector] = mobileAnim;
            }
          } else {
            // Mobile has a selector that desktop doesn't have
            config[selector] = mobileAnim;
          }
        });
      }

      // Get trigger start (check mobile-specific first)
      const triggerStart = (isMobile && section.getAttribute('data-gsap-start-mobile'))
        || section.getAttribute('data-gsap-start')
        || 'top 80%';

      // Get base delay (check mobile-specific first)
      const baseDelay = parseFloat(
        (isMobile && section.getAttribute('data-gsap-delay-mobile'))
        || section.getAttribute('data-gsap-delay')
      ) || 0;

      // Check if this section should animate immediately (no ScrollTrigger)
      const immediate = section.hasAttribute('data-gsap-immediate');

      // Process each selector in the config
      Object.entries(config).forEach(([selector, animConfig], index) => {
        const elements = section.querySelectorAll(selector);
        if (!elements.length) {
          return;
        }

        // Parse animation config (can be string or object)
        let animation, delay, duration, start, end, ease, stagger;
        if (typeof animConfig === 'string') {
          animation = animConfig;
          delay = baseDelay + (index * 0.1);
        } else {
          animation = animConfig.type || 'fade-up';
          delay = animConfig.delay !== undefined ? parseFloat(animConfig.delay) : (baseDelay + (index * 0.1));
          duration = animConfig.duration ? parseFloat(animConfig.duration) : undefined;
          start = animConfig.start;
          end = animConfig.end;
          ease = animConfig.ease;
          stagger = animConfig.stagger ? parseFloat(animConfig.stagger) : null;
        }

        // Apply animation to elements
        const cfg = {
          delay: delay,
          duration: duration || this.defaults.duration,
          start: start || triggerStart,
          end: end || null,
          ease: ease || null,
          stagger: stagger || null,
          immediate: immediate // Pass immediate flag to animation functions
        };

        // If stagger is enabled with multiple elements, animate them together
        // Otherwise animate each element individually
        if (stagger && elements.length > 1) {
          this.animateMultiple(elements, animation, cfg);
        } else {
          elements.forEach(el => {
            this.animateSingle(el, animation, cfg);
          });
        }
      });
    });
  }

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  // One-shot ScrollTrigger: plays once when element hits start position
  triggerCfg(el, cfg) {
    return { trigger: el, start: cfg.start, toggleActions: 'play none none none' };
  }

  // Check if element is in hero section (should animate on page load, not scroll)
  isHeroElement(el) {
    if (!el) return false;

    // Check if element or its parent has hero-related classes
    const hasHeroClass = el?.closest('.hero-section') ||
                        el?.closest('.hero-content') ||
                        el?.closest('.hero-text') ||
                        el?.classList?.contains('hero-content') ||
                        el?.classList?.contains('hero-text');

    if (hasHeroClass) {
      return true;
    }

    // Also check if element is in viewport on page load (above fold)
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewport && rect.top < window.innerHeight * 0.5) {
      return true;
    }

    return false;
  }

  // Animate a single element using the appropriate animation method
  animateSingle(el, animation, cfg) {
    try {
      switch (animation) {
        case 'fade-up':         this.fadeUp(el, cfg);        break;
        case 'fade-in':         this.fadeIn(el, cfg);        break;
        case 'slide-left':      this.slideLeft(el, cfg);     break;
        case 'slide-right':     this.slideRight(el, cfg);    break;
        case 'zoom-in':         this.zoomIn(el, cfg);        break;
        case 'word-reveal':     this.wordReveal(el, cfg);     break;
        case 'lines':           this.linesAnimation(el, cfg);  break;
        case 'lines-scrub':     this.linesScrub(el, cfg);     break;
        case 'masked-title':    this.maskedTitle(el, cfg);    break;
        case 'masked-word':     this.maskedWord(el, cfg);     break;
        case 'writing-text':    this.writingText(el, cfg);   break;
        case 'btn-clip-reveal': this.btnClipReveal(el, cfg); break;
        case 'image-clip-top':    this.imageClipTop(el, cfg);    break;
        case 'image-clip-bottom': this.imageClipBottom(el, cfg); break;
        case 'image-clip-left':   this.imageClipLeft(el, cfg);   break;
        case 'image-clip-right':  this.imageClipRight(el, cfg);  break;
        case 'image-fade-in':     this.imageFadeIn(el, cfg);    break;
        case 'card-row-stagger':  this.cardRowStagger(el, cfg);  break;
        case 'parallax-bg':     this.parallaxBg(el, cfg);    break;
      }
    } catch (err) {
      // Animation error
    }
  }

  // Animate multiple elements together with stagger
  animateMultiple(elements, animation, cfg) {
    const firstEl = elements[0];
    try {
      switch (animation) {
        case 'fade-up':
          const yDist = window.innerWidth <= 991 ? 30 : 50;
          gsap.set(elements, { y: yDist, autoAlpha: 0, force3D: true });
          gsap.to(elements, {
            y: 0, autoAlpha: 1, force3D: true,
            duration: cfg.duration,
            ease: cfg.ease || this.defaults.ease.fade,
            delay: cfg.delay,
            stagger: cfg.stagger,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'fade-in':
          gsap.set(elements, { autoAlpha: 0 });
          gsap.to(elements, {
            autoAlpha: 1,
            duration: cfg.duration,
            ease: cfg.ease || this.defaults.ease.fade,
            delay: cfg.delay,
            stagger: cfg.stagger,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'slide-left':
          const distL = window.innerWidth <= 991 ? 80 : 300;
          gsap.set(elements, { x: -distL, autoAlpha: 0, force3D: true });
          gsap.to(elements, {
            x: 0, autoAlpha: 1, force3D: true,
            duration: cfg.duration,
            ease: cfg.ease || this.defaults.ease.slide,
            delay: cfg.delay,
            stagger: cfg.stagger,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'slide-right':
          const distR = window.innerWidth <= 991 ? 80 : 300;
          gsap.set(elements, { x: distR, autoAlpha: 0, force3D: true });
          gsap.to(elements, {
            x: 0, autoAlpha: 1, force3D: true,
            duration: cfg.duration,
            ease: cfg.ease || this.defaults.ease.slide,
            delay: cfg.delay,
            stagger: cfg.stagger,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'zoom-in':
          gsap.set(elements, { scale: 0.9, autoAlpha: 0, force3D: true });
          gsap.to(elements, {
            scale: 1, autoAlpha: 1, force3D: true,
            duration: 0.6,
            ease: cfg.ease || this.defaults.ease.zoom,
            delay: cfg.delay,
            stagger: cfg.stagger,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'masked-word':
          // Create mask wrappers for each element
          const skipScrollTriggerMasked = cfg.immediate || this.isHeroElement(firstEl);

          // Make parent element visible (in case CSS hides it)
          const parent = firstEl.parentElement;
          if (parent) {
            gsap.set(parent, { autoAlpha: 1 });
          }

          elements.forEach(element => {
            // Check if original text had trailing space
            const hasTrailingSpace = element.textContent !== element.textContent.trimEnd();

            const mask = document.createElement('span');
            mask.style.display = 'inline-block';
            mask.style.overflow = 'hidden';
            mask.style.paddingBottom = '0.2em';
            mask.style.marginBottom = '-0.2em';
            mask.style.verticalAlign = 'bottom';

            // Add margin-right for spacing if original had trailing space
            if (hasTrailingSpace) {
              mask.style.marginRight = '0.25em';
            }

            const inner = document.createElement('span');
            inner.style.display = 'inline-block';
            inner.textContent = element.textContent.trim();
            inner.setAttribute('data-masked-inner', 'true');

            element.textContent = '';
            element.appendChild(mask);
            mask.appendChild(inner);

            void element.offsetHeight;
            gsap.set(inner, { y: mask.offsetHeight, force3D: true });
          });

          // Animate all inner elements with stagger
          const inners = Array.from(elements).map(el => el.querySelector('[data-masked-inner]'));
          const maskedAnimConfig = {
            y: 0,
            duration: cfg.duration || 1.2,
            ease: cfg.ease || 'power3.out',
            delay: cfg.delay,
            stagger: cfg.stagger,
            force3D: true
          };

          // Immediate or hero elements: animate on page load. Others: use ScrollTrigger
          if (!skipScrollTriggerMasked) {
            maskedAnimConfig.scrollTrigger = this.triggerCfg(firstEl, cfg);
          }

          gsap.to(inners, maskedAnimConfig);
          break;
        case 'image-fade-in':
          const scaleFrom = 1.3;
          gsap.set(elements, { scale: scaleFrom, autoAlpha: 0, transformOrigin: '50% 50%', force3D: true });
          gsap.to(elements, {
            scale: 1, autoAlpha: 1, force3D: true,
            duration: 1,
            ease: cfg.ease || 'power2.out',
            delay: cfg.delay,
            stagger: cfg.stagger,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'image-clip-top':
          const hiddenTop = 'inset(0 0 100% 0)';
          const shownTop = 'inset(0 0 0% 0)';
          gsap.set(elements, { clipPath: hiddenTop, webkitClipPath: hiddenTop, willChange: 'clip-path', force3D: true });
          gsap.to(elements, {
            clipPath: shownTop, webkitClipPath: shownTop,
            duration: cfg.duration || 0.6,
            ease: cfg.ease || 'power2.inOut',
            delay: cfg.delay,
            stagger: cfg.stagger,
            force3D: true,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'image-clip-bottom':
          const hiddenBottom = 'inset(100% 0 0 0)';
          const shownBottom = 'inset(0% 0 0 0)';
          gsap.set(elements, { clipPath: hiddenBottom, webkitClipPath: hiddenBottom, willChange: 'clip-path', force3D: true });
          gsap.to(elements, {
            clipPath: shownBottom, webkitClipPath: shownBottom,
            duration: cfg.duration || 0.6,
            ease: cfg.ease || 'power2.inOut',
            delay: cfg.delay,
            stagger: cfg.stagger,
            force3D: true,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'image-clip-left':
          const hiddenLeft = 'inset(0 100% 0 0)';
          const shownLeft = 'inset(0 0% 0 0)';
          gsap.set(elements, { clipPath: hiddenLeft, webkitClipPath: hiddenLeft, willChange: 'clip-path', force3D: true });
          gsap.to(elements, {
            clipPath: shownLeft, webkitClipPath: shownLeft,
            duration: cfg.duration || 0.6,
            ease: cfg.ease || 'power2.inOut',
            delay: cfg.delay,
            stagger: cfg.stagger,
            force3D: true,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        case 'image-clip-right':
          const hiddenRight = 'inset(0 0 0 100%)';
          const shownRight = 'inset(0 0 0 0%)';
          gsap.set(elements, { clipPath: hiddenRight, webkitClipPath: hiddenRight, willChange: 'clip-path', force3D: true });
          gsap.to(elements, {
            clipPath: shownRight, webkitClipPath: shownRight,
            duration: cfg.duration || 0.6,
            ease: cfg.ease || 'power2.inOut',
            delay: cfg.delay,
            stagger: cfg.stagger,
            force3D: true,
            scrollTrigger: this.triggerCfg(firstEl, cfg)
          });
          break;
        default:
          // For animations without multi-element support, fall back to individual
          elements.forEach(el => this.animateSingle(el, animation, cfg));
      }
    } catch (err) {
      // Animation error with stagger
    }
  }

  // Direct children that don't have their own data-gsap (avoids double-animating)
  animChildren(el) {
    if (!el?.children?.length) return null;
    const kids = [...el.children].filter(c => !c.hasAttribute('data-gsap'));
    return kids.length ? kids : null;
  }

  // Detects rendered text lines by measuring word positions.
  // Returns array of <span class="gsap-line"> block wrappers.
  splitLines(el) {
    if (!el) return [];
    if (el.querySelector('.gsap-line')) return [...el.querySelectorAll('.gsap-line')];

    const text = el.textContent;
    el.textContent = '';

    // Wrap each word in an inline-block span so we can measure its top position
    const wordEls = [];
    text.split(/(\s+)/).forEach(part => {
      if (part.trim()) {
        const span       = document.createElement('span');
        span.style.display = 'inline-block';
        span.textContent   = part;
        el.appendChild(span);
        wordEls.push(span);
      } else if (part) {
        el.appendChild(document.createTextNode(part));
      }
    });

    void el.offsetHeight; // force layout so getBoundingClientRect is accurate

    // Bucket words into lines by comparing top edge (< 2px tolerance)
    const lines   = [];
    let   line    = [];
    let   lineTop = null;

    wordEls.forEach(w => {
      const top = w.getBoundingClientRect().top;
      if (lineTop === null || Math.abs(top - lineTop) < 2) {
        line.push(w);
        if (lineTop === null) lineTop = top;
      } else {
        lines.push(line);
        line    = [w];
        lineTop = top;
      }
    });
    if (line.length) lines.push(line);

    // Rebuild DOM: each line wrapped in a block <span>
    el.textContent = '';
    return lines.map(words => {
      const wrapper       = document.createElement('span');
      wrapper.className     = 'gsap-line';
      wrapper.style.display = 'block';
      words.forEach((w, i) => {
        if (i > 0) wrapper.appendChild(document.createTextNode(' '));
        wrapper.appendChild(w);
      });
      el.appendChild(wrapper);
      return wrapper;
    });
  }

  // -----------------------------------------------------------------------
  // Fade
  // -----------------------------------------------------------------------

  fadeUp(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const targets = Array.isArray(target) ? target : [target];

    // Reduce movement distance on mobile for smoother animation
    const yDist = window.innerWidth <= 991 ? 30 : 50;

    gsap.set(targets, { transition: 'none' });
    gsap.set(target, { y: yDist, autoAlpha: 0, force3D: true });
    gsap.to(target, {
      y: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.fade,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => {
        targets.forEach(t => gsap.set(t, { clearProps: 'transition' }));
      }
    });
  }

  fadeIn(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const targets = Array.isArray(target) ? target : [target];

    gsap.set(targets, { transition: 'none' });
    gsap.set(target, { autoAlpha: 0 });
    gsap.to(target, {
      autoAlpha: 1,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.fade,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => {
        targets.forEach(t => gsap.set(t, { clearProps: 'transition' }));
      }
    });
  }

  // -----------------------------------------------------------------------
  // Slide  (displacement scales down on mobile for smoother feel)
  // -----------------------------------------------------------------------

  slideLeft(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const dist    = window.innerWidth <= 991 ? 80 : 300;

    const targets = Array.isArray(target) ? target : [target];
    gsap.set(targets, { transition: 'none' });
    gsap.set(target, { x: -dist, autoAlpha: 0, force3D: true });
    gsap.to(target, {
      x: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.slide,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => {
        targets.forEach(t => gsap.set(t, { clearProps: 'transition' }));
      }
    });
  }

  slideRight(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const dist    = window.innerWidth <= 991 ? 80 : 300;
    const skipScrollTrigger = cfg.immediate || this.isHeroElement(el);

    const targets = Array.isArray(target) ? target : [target];
    gsap.set(targets, { transition: 'none' });
    gsap.set(target, { x: dist, autoAlpha: 0, force3D: true });

    const animConfig = {
      x: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.slide,
      delay:    cfg.delay,
      stagger,
      onComplete: () => {
        targets.forEach(t => gsap.set(t, { clearProps: 'transition' }));
      }
    };

    // Immediate or hero elements: animate on page load. Others: use ScrollTrigger
    if (!skipScrollTrigger) {
      animConfig.scrollTrigger = this.triggerCfg(el, cfg);
    }

    gsap.to(target, animConfig);
  }

  // -----------------------------------------------------------------------
  // Zoom
  // -----------------------------------------------------------------------

  zoomIn(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;

    gsap.set(target, { scale: 0.9, autoAlpha: 0, force3D: true });
    gsap.to(target, {
      scale: 1, autoAlpha: 1, force3D: true,
      duration: 0.6,  // Increased from 0.2s for smoother animation
      ease:     cfg.ease || this.defaults.ease.zoom,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg)
    });
  }

  // -----------------------------------------------------------------------
  // Text
  // -----------------------------------------------------------------------

  // Word-by-word opacity reveal, scrub-driven (same style as about section).
  // Works on plain text and preserves child elements (e.g. .underline spans).
  // Usage: data-gsap-children='{"h2":{"type":"word-reveal"}}'
  wordReveal(el, cfg) {
    if (!el) return;

    const isMobile = window.innerWidth <= 991;

    // Wrap each direct text-node word in <span class="gsap-word">
    // Child elements (like .underline spans) are left intact
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.trim()) textNodes.push(node);
    }

    textNodes.forEach(textNode => {
      if (textNode.parentNode === el) {
        // Direct child text — wrap each word
        const parts = textNode.nodeValue.split(/(\s+)/);
        const frag  = document.createDocumentFragment();
        parts.forEach(part => {
          if (part.trim() === '') {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.className   = 'gsap-word';
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        textNode.parentNode.replaceChild(frag, textNode);
      }
      // Text inside child elements (e.g. .underline) stays untouched
    });

    // Animate .gsap-word spans plus any preserved child element spans
    const pieces = gsap.utils.toArray(el.querySelectorAll('.gsap-word, .underline'));
    if (!pieces.length) return;

    gsap.set(el, { autoAlpha: 1 });
    gsap.set(pieces, { opacity: 0 });

    const startPos = cfg.start  || (isMobile ? 'top 90%' : 'top 85%');
    const endPos   = cfg.end    || el.getAttribute('data-gsap-end') || (isMobile ? 'top 60%' : 'top 20%');

    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start:   startPos,
        end:     endPos,
        scrub:   1,
        once:    true
      }
    }).to(pieces, {
      opacity:  1,
      duration: cfg.duration || 0.9,
      ease:     cfg.ease     || 'power3.out',
      stagger:  cfg.stagger  || 0.12
    });
  }

  // Reveals text one rendered line at a time
  linesAnimation(el, cfg) {
    const lines = this.splitLines(el);

    if (!lines.length) {
      return;
    }

    const skipScrollTrigger = cfg.immediate || this.isHeroElement(el);

    // Make parent element visible (in case CSS hides it)
    gsap.set(el, { autoAlpha: 1, transition: 'none' });

    gsap.set(lines, { y: 30, autoAlpha: 0, force3D: true, transition: 'none' });

    const animConfig = {
      y: 0,
      autoAlpha: 1,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.fade,
      stagger:  cfg.stagger || 0.1,
      delay:    cfg.delay,
      force3D:  true,
      onComplete: () => {
        // Clear GSAP properties to prevent jerkiness
        lines.forEach(line => {
          gsap.set(line, { clearProps: 'transform,transition' });
        });
      }
    };

    // Immediate or hero elements: animate on page load. Others: use ScrollTrigger
    if (!skipScrollTrigger) {
      animConfig.scrollTrigger = this.triggerCfg(el, cfg);
    }

    gsap.to(lines, animConfig);
  }

  // Line-by-line fade up, scrub-driven, plays once then stays
  linesScrub(el, cfg) {
    const lines = this.splitLines(el);
    if (!lines.length) return;

    gsap.set(lines, { y: 20, autoAlpha: 0, force3D: true });

    const end = el.getAttribute('data-gsap-end') || 'top 40%';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start:   cfg.start || 'top 90%',
        end:     end,
        scrub:   1,
        once:    true
      }
    });

    tl.to(lines, {
      y: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration || 1,
      ease:     cfg.ease || this.defaults.ease.fade,
      stagger:  0.5
    });
  }

  // Title lines slide up under overflow mask, scrub-driven, once.
  // Splits on <br> only — all other nodes (spans, text) moved intact.
  maskedTitle(el, cfg) {
    const segments = [];
    let current    = [];

    [...el.childNodes].forEach(node => {
      if (node.nodeName === 'BR') {
        if (current.length) segments.push(current);
        current = [];
      } else {
        current.push(node);
      }
    });
    if (current.length) segments.push(current);

    // Rebuild: each segment inside mask (overflow:hidden) + inner (animated)
    // paddingBottom gives descender room; negative marginBottom compensates layout
    const inners = [];
    segments.forEach(nodes => {
      const mask  = document.createElement('span');
      mask.style.display       = 'block';
      mask.style.overflow      = 'hidden';
      mask.style.paddingBottom = '0.2em';
      mask.style.marginBottom  = '-0.2em';

      const inner = document.createElement('span');
      inner.style.display = 'block';
      nodes.forEach(node => inner.appendChild(node));

      mask.appendChild(inner);
      el.appendChild(mask);
      inners.push(inner);
    });

    // Force layout so offsetHeight is accurate, then set each line
    // below its mask using pixels (includes the padding)
    void el.offsetHeight;
    inners.forEach(inner => {
      gsap.set(inner, { y: inner.parentElement.offsetHeight, force3D: true });
    });

    const end = el.getAttribute('data-gsap-end') || 'top 40%';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start:   cfg.start,
        end:     end,
        scrub:   1,
        once:    true
      }
    });

    inners.forEach((inner, i) => {
      tl.to(inner, {
        y: 0,
        duration: cfg.duration || 0.6,
        ease:     cfg.ease || this.defaults.ease.fade,
        force3D:  true
      }, i * (cfg.stagger || 0.65));
    });
  }

  // Individual word masked reveal: each word slides up from under mask
  maskedWord(el, cfg) {
    const kids = this.animChildren(el);
    const targets = kids && kids.length ? kids : [el];
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const skipScrollTrigger = cfg.immediate || this.isHeroElement(el);

    // Make parent element visible (in case CSS hides it)
    gsap.set(el, { autoAlpha: 1 });

    // Wrap each target in a mask container
    targets.forEach((target, index) => {
      // Check if original text had trailing space
      const hasTrailingSpace = target.textContent !== target.textContent.trimEnd();

      // Create mask wrapper
      const mask = document.createElement('span');
      mask.style.display = 'inline-block';
      mask.style.overflow = 'hidden';
      mask.style.paddingBottom = '0.2em';
      mask.style.marginBottom = '-0.2em';
      mask.style.verticalAlign = 'bottom';

      // Add margin-right for spacing if original had trailing space
      if (hasTrailingSpace) {
        mask.style.marginRight = '0.25em';
      }

      // Create inner animated element
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = target.textContent.trim();

      // Replace target content with masked structure
      target.textContent = '';
      target.appendChild(mask);
      mask.appendChild(inner);

      // Force layout
      void target.offsetHeight;

      // Set initial state: word is below the mask
      gsap.set(inner, {
        y: mask.offsetHeight,
        force3D: true
      });

      // Animate word sliding up from under mask
      const animConfig = {
        y: 0,
        duration: cfg.duration || 1.2,
        ease: cfg.ease || 'power3.out',
        delay: (cfg.delay || 0) + (index * stagger),
        force3D: true
      };

      // Immediate or hero elements: animate on page load. Others: use ScrollTrigger
      if (!skipScrollTrigger) {
        animConfig.scrollTrigger = this.triggerCfg(target, cfg);
      }

      gsap.to(inner, animConfig);
    });
  }

  // Handwritten-style clip reveal (left → right)
  writingText(el, cfg) {
    if (!el) return;

    const target  = el.querySelector('.hero-script-text') || el;
    const hidden  = 'inset(-0.4em 100% -0.4em 0)';
    const shown   = 'inset(-0.4em 0%   -0.4em 0)';

    gsap.set(target, {
      clipPath: hidden, webkitClipPath: hidden,
      opacity: 0, y: 6,
      willChange: 'clip-path, transform, opacity'
    });

    // Respect prefers-reduced-motion
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(target, { autoAlpha: 1, y: 0, clipPath: 'none', webkitClipPath: 'none' });
      return;
    }

    gsap.to(target, {
      clipPath: shown, webkitClipPath: shown,
      opacity: 1, y: 0,
      duration: cfg.duration || 1.6,
      ease:  cfg.ease || 'power2.out',
      delay: cfg.delay,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => gsap.set(target, { clearProps: 'will-change' })
    });
  }

  // -----------------------------------------------------------------------
  // Clip reveals
  // -----------------------------------------------------------------------

  // Two-step button: shape fills right→left, then text uncovers left→right
  btnClipReveal(el, cfg) {
    if (!el) return;

    const btn = (el.tagName === 'A' || el.tagName === 'BUTTON')
      ? el
      : el.querySelector('a, button');
    if (!btn) return;

    const skipScrollTrigger = cfg.immediate || this.isHeroElement(el);

    // Wrap bare text in a <span> for the two-step clip effect
    let txt = btn.querySelector('span');
    if (!txt) {
      txt              = document.createElement('span');
      txt.textContent  = btn.textContent.trim();
      btn.innerHTML    = '';
      btn.appendChild(txt);
    }

    const hidden = 'inset(0 100% 0 0)';
    const shown  = 'inset(0 -1px 0 0)';

    gsap.set(btn, { clipPath: hidden, webkitClipPath: hidden, willChange: 'clip-path', autoAlpha: 1 });
    gsap.set(txt, { clipPath: hidden, webkitClipPath: hidden, display: 'inline-block', lineHeight: 'normal', willChange: 'clip-path' });

    const tlConfig = {
      delay: cfg.delay || 0
    };

    // Immediate or hero elements: animate on page load. Others: use ScrollTrigger
    if (!skipScrollTrigger) {
      tlConfig.scrollTrigger = { trigger: btn, start: cfg.start, toggleActions: 'play none none none' };
    }

    const tl = gsap.timeline(tlConfig);

    // 1. Button shape fills
    tl.to(btn, {
      clipPath: shown, webkitClipPath: shown,
      duration: 0.6, ease: 'none', force3D: true, autoRound: false
    });

    // 2. Text reveals (starts 0.65s into the fill)
    tl.to(txt, {
      clipPath: shown, webkitClipPath: shown,
      duration: 0.9, ease: 'none', force3D: true, autoRound: false
    }, 0.65);
  }

  // Image curtain-drop: clip opens from top to bottom
  imageClipTop(el, cfg) {
    if (!el) return;

    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const hidden  = 'inset(0 0 100% 0)';
    const shown   = 'inset(0 0 0%   0)';

    gsap.set(target, { clipPath: hidden, webkitClipPath: hidden, willChange: 'clip-path', force3D: true });
    gsap.to(target, {
      clipPath: shown, webkitClipPath: shown,
      duration: cfg.duration || 0.6,
      ease:     cfg.ease || 'power2.inOut',
      delay:    cfg.delay,
      stagger,
      force3D:  true,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => {
        (Array.isArray(target) ? target : [target]).forEach(e =>
          gsap.set(e, { clearProps: 'will-change' })
        );
      }
    });
  }

  // Image curtain-rise: clip opens from bottom to top
  imageClipBottom(el, cfg) {
    if (!el) return;

    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const hidden  = 'inset(100% 0 0 0)';
    const shown   = 'inset(0%   0 0 0)';

    gsap.set(target, { clipPath: hidden, webkitClipPath: hidden, willChange: 'clip-path', force3D: true });
    gsap.to(target, {
      clipPath: shown, webkitClipPath: shown,
      duration: cfg.duration || 0.6,
      ease:     cfg.ease || 'power2.inOut',
      delay:    cfg.delay,
      stagger,
      force3D:  true,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => {
        (Array.isArray(target) ? target : [target]).forEach(e =>
          gsap.set(e, { clearProps: 'will-change' })
        );
      }
    });
  }

  // Image curtain-right: clip opens from left to right
  imageClipLeft(el, cfg) {
    if (!el) return;

    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const hidden  = 'inset(0 100% 0 0)';
    const shown   = 'inset(0 0%   0 0)';

    gsap.set(target, { clipPath: hidden, webkitClipPath: hidden, willChange: 'clip-path', force3D: true });
    gsap.to(target, {
      clipPath: shown, webkitClipPath: shown,
      duration: cfg.duration || 0.6,
      ease:     cfg.ease || 'power2.inOut',
      delay:    cfg.delay,
      stagger,
      force3D:  true,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => {
        (Array.isArray(target) ? target : [target]).forEach(e =>
          gsap.set(e, { clearProps: 'will-change' })
        );
      }
    });
  }

  // Image curtain-left: clip opens from right to left
  imageClipRight(el, cfg) {
    if (!el) return;

    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const hidden  = 'inset(0 0 0 100%)';
    const shown   = 'inset(0 0 0 0%)';

    gsap.set(target, { clipPath: hidden, webkitClipPath: hidden, willChange: 'clip-path', force3D: true });
    gsap.to(target, {
      clipPath: shown, webkitClipPath: shown,
      duration: cfg.duration || 0.6,
      ease:     cfg.ease || 'power2.inOut',
      delay:    cfg.delay,
      stagger,
      force3D:  true,
      scrollTrigger: this.triggerCfg(el, cfg),
      onComplete: () => {
        (Array.isArray(target) ? target : [target]).forEach(e =>
          gsap.set(e, { clearProps: 'will-change' })
        );
      }
    });
  }

  // Smooth fade-in with gentle zoom out (scale > 1 → 1)
  imageFadeIn(el, cfg) {
    if (!el) return;

    const kids    = this.animChildren(el);
    const isMobile = window.innerWidth <= 991;
    const start = cfg.start || 'top 50%';
    const scaleFrom = isMobile ? 1.4 : 1.4;

    // On mobile with stagger:0, treat each element separately
    // On desktop or when stagger is set, use group animation
    const useIndividualTriggers = isMobile && kids && kids.length > 1 && cfg.stagger === 0;
    const target = useIndividualTriggers ? kids : (kids && cfg.stagger ? kids : el);
    const stagger = (!useIndividualTriggers && kids && cfg.stagger) ? cfg.stagger : 0;

    const targets = Array.isArray(target) ? target : [target];
    targets.forEach(node => {
      const img = node.tagName === 'IMG' ? node : node.querySelector?.('img');
      const wrapper = img ? img.parentElement : node.parentElement;
      if (wrapper && wrapper.style.overflow !== 'hidden') {
        wrapper.style.overflow = 'hidden';
      }
    });

    gsap.set(targets, {
      scale: scaleFrom,
      autoAlpha: 0,
      transformOrigin: '50% 50%',
      force3D: true,
      backfaceVisibility: 'hidden',
      willChange: 'transform, opacity',
      transition: 'none'
    });

    // On mobile with stagger:0: animate each element individually when it enters viewport
    if (useIndividualTriggers) {
      targets.forEach(element => {
        gsap.to(element, {
          scale: 1,
          autoAlpha: 1,
          duration:  1,
          ease:     cfg.ease || 'power2.out',
          delay:    cfg.delay || 0,
          force3D:  true,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none'
          },
          onComplete: () => {
            gsap.set(element, { clearProps: 'will-change,transition' });
          }
        });
      });
    } else {
      // Desktop or single element: use group animation with optional stagger
      gsap.to(target, {
        scale: 1,
        autoAlpha: 1,
        duration:  1,
        ease:     cfg.ease || 'power2.out',
        delay:    cfg.delay,
        stagger,
        force3D:  true,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none'
        },
        onComplete: () => {
          (Array.isArray(target) ? target : [target]).forEach(e =>
            gsap.set(e, { clearProps: 'will-change,transition' })
          );
        }
      });
    }
  }

  // -----------------------------------------------------------------------
  // Card Row Stagger
  // -----------------------------------------------------------------------

  // Animates cards in rows with stagger within each row
  // Each card triggers individually when it comes into view
  // Animates both image and h5 together for each card
  // Detects rows based on card positions (desktop: 4 per row, mobile: 2 per row)
  cardRowStagger(el, cfg) {
    if (!el) return;

    // If called on a card, find the container (row)
    // If called on container, use it directly
    const isCard = el.classList.contains('internal-explore-card') || el.classList.contains('latest-news-list-card') || el.classList.contains('about-nav-card');
    const container = isCard
      ? (el.closest('.news-detail-keep-reading-cards')
        || el.closest('.latest-news-list-grid')
        || el.closest('.row')
        || el.parentElement)
      : el;
    
    if (!container) return;

    // Check if already initialized
    if (container.hasAttribute('data-card-row-stagger-initialized')) return;
    container.setAttribute('data-card-row-stagger-initialized', 'true');

    const isMobile = window.innerWidth <= 991;
    const start = cfg.start || 'top 70%';
    const stagger = cfg.stagger ? parseFloat(cfg.stagger) : (isMobile ? 0.2 : 0.15);

    // Find all cards within the container (support all card types)
    const cards = Array.from(container.querySelectorAll('.internal-explore-card, .latest-news-list-card, .about-nav-card'));
    if (!cards.length) return;

    // Group cards by their visual row based on offsetTop
    // This is more reliable than getBoundingClientRect as it doesn't depend on scroll position
    const rows = [];
    const rowMap = new Map();

    cards.forEach((card) => {
      // Use offsetTop relative to the container for row detection
      const containerTop = container.offsetTop;
      const cardTop = card.offsetTop;
      const relativeTop = cardTop - containerTop;
      
      // Round to nearest 10px to group cards in same row (handles small variations)
      const rowKey = Math.round(relativeTop / 10) * 10;

      if (!rowMap.has(rowKey)) {
        rowMap.set(rowKey, []);
      }
      rowMap.get(rowKey).push(card);
    });

    // Convert map to sorted array of rows
    const sortedRows = Array.from(rowMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(entry => entry[1]);

    // Animate each card individually with stagger based on row position
    sortedRows.forEach((row, rowIndex) => {
      row.forEach((card, cardIndexInRow) => {
        const img = card.querySelector('img');
        const h5 = card.querySelector('h5');
        // Support both image wrapper classes
        const imageWrapper = card.querySelector('.internal-explore-card-image') || card.querySelector('.latest-news-list-card-image') || card.querySelector('.about-nav-card-image');
        // Get category content for news cards
        const category = card.querySelector('.latest-news-list-card-category');
        const contentWrapper = card.querySelector('.latest-news-list-card-content');
        // Get divider for news cards
        const divider = card.querySelector('.latest-news-list-card-divider');

        if (!img || !h5) return;

        // Calculate stagger delay based on position in row
        const staggerDelay = cardIndexInRow * stagger;

        // Set overflow hidden for image wrapper
        if (imageWrapper && imageWrapper.style.overflow !== 'hidden') {
          imageWrapper.style.overflow = 'hidden';
        }

        // Initial state for divider (news cards) - clip from top
        if (divider) {
          gsap.set(divider, {
            clipPath: 'inset(100% 0 0% 0)',
            webkitClipPath: 'inset(100% 0 0% 0)',
            force3D: true,
            willChange: 'clip-path'
          });
        }

        // Initial state for image
        gsap.set(img, {
          scale: 1.3,
          autoAlpha: 0,
          transformOrigin: '50% 50%',
          force3D: true,
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity'
        });

        // Initial state for h5 (fade-up)
        gsap.set(h5, {
          y: 20,
          autoAlpha: 0,
          force3D: true,
          willChange: 'transform, opacity'
        });

        // Initial state for category content (news cards)
        if (category) {
          gsap.set(category, {
            autoAlpha: 0,
            force3D: true,
            willChange: 'opacity'
          });
        }

        // Animate divider first (news cards) - grows from top to bottom (slowly)
        if (divider) {
          gsap.to(divider, {
            clipPath: 'inset(0% 0 0% 0)',
            webkitClipPath: 'inset(0% 0 0% 0)',
            duration: 1.2,
            ease: cfg.ease || 'power2.out',
            delay: staggerDelay,
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: start,
              toggleActions: 'play none none none'
            },
            onComplete: () => {
              gsap.set(divider, { clearProps: 'will-change' });
            }
          });
        }

        // Animate image
        gsap.to(img, {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: cfg.ease || 'power2.out',
          delay: staggerDelay,
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: start,
            toggleActions: 'play none none none'
          },
          onComplete: () => {
            gsap.set(img, { clearProps: 'will-change' });
          }
        });

        // Animate category first (news cards) - slightly before h5
        if (category) {
          gsap.to(category, {
            autoAlpha: 1,
            duration: cfg.duration || 1.25,
            ease: cfg.ease || 'power2.out',
            delay: staggerDelay + 0.1,
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: start,
              toggleActions: 'play none none none'
            },
            onComplete: () => {
              gsap.set(category, { clearProps: 'will-change' });
            }
          });
        }

        // Animate h5 with fade-up
        gsap.to(h5, {
          y: 0,
          autoAlpha: 1,
          duration: cfg.duration || 1.25,
          ease: cfg.ease || 'power2.out',
          delay: staggerDelay + 0.2,
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: start,
            toggleActions: 'play none none none'
          },
          onComplete: () => {
            gsap.set(h5, { clearProps: 'will-change' });
          }
        });
      });
    });
  }

  // -----------------------------------------------------------------------
  // Parallax
  // -----------------------------------------------------------------------

  // Scroll-driven vertical parallax for background images.
  // Element should be inside an overflow:hidden section.
  parallaxBg(el, cfg) {
    if (!el) return;

    // Disable parallax on mobile for better performance
    const isMobile = window.innerWidth <= 991;
    if (isMobile) return;

    const section = el.closest('section') || el.parentElement;
    gsap.to(el, {
      yPercent: -25,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: section,
        start:   'top bottom',
        end:     'bottom top',
        scrub:   true
      }
    });
  }
}

// Auto-init after fonts are loaded — splitLines measures word positions,
// so it must run with the final font, not the fallback (font-display: swap).
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(() => {
    const instance = new GSAPAnimations();
    window.gsapAnimations = instance;
    window.gsapInitFor = (root) => instance.setupAnimationsFor(root);
  });
});
