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
    this.setupAnimationsFor(document);
    this.setupSectionAnimations(document);
  }

  setupAnimationsFor(root) {
    const isMobile = window.innerWidth <= 991;
    root.querySelectorAll('[data-gsap],[data-gsap-mobile]').forEach(el => {
      if (el.hasAttribute('data-gsap-initialized')) return;
      const mobileType = el.getAttribute('data-gsap-mobile');
      const desktopType = el.getAttribute('data-gsap');
      const type = (isMobile && mobileType) ? mobileType : desktopType;
      if (!type) return;
      el.setAttribute('data-gsap-initialized', 'true');
      const cfg  = this.readConfig(el);

      try {
        switch (type) {
          case 'fade-up':         this.fadeUp(el, cfg);        break;
          case 'fade-in':         this.fadeIn(el, cfg);        break;
          case 'slide-left':      this.slideLeft(el, cfg);     break;
          case 'slide-right':     this.slideRight(el, cfg);      break;
          case 'zoom-in':         this.zoomIn(el, cfg);        break;
          case 'lines':           this.linesAnimation(el, cfg);  break;
          case 'lines-scrub':     this.linesScrub(el, cfg);     break;
          case 'masked-title':    this.maskedTitle(el, cfg);    break;
          case 'writing-text':    this.writingText(el, cfg);   break;
          case 'btn-clip-reveal': this.btnClipReveal(el, cfg); break;
          case 'image-clip-top':    this.imageClipTop(el, cfg);    break;
          case 'image-clip-bottom': this.imageClipBottom(el, cfg); break;
          case 'image-clip-left':   this.imageClipLeft(el, cfg);   break;
          case 'image-clip-right':  this.imageClipRight(el, cfg);  break;
          case 'image-fade-in':     this.imageFadeIn(el, cfg);    break;
          case 'parallax-bg':     this.parallaxBg(el, cfg);    break;
          default: console.warn(`Unknown data-gsap: "${type}"`);
        }
      } catch (err) {
        console.error(`[GSAPAnimations] "${type}"`, err);
      }
    });
  }

  readConfig(el) {
    const isMobile = window.innerWidth <= 991;
    const s = (isMobile && el.getAttribute('data-gsap-stagger-mobile')) || el.getAttribute('data-gsap-stagger');
    const durationAttr = (isMobile && el.getAttribute('data-gsap-duration-mobile')) || el.getAttribute('data-gsap-duration');
    const delayAttr = (isMobile && el.getAttribute('data-gsap-delay-mobile')) || el.getAttribute('data-gsap-delay');
    const easeAttr = (isMobile && el.getAttribute('data-gsap-ease-mobile')) || el.getAttribute('data-gsap-ease');
    const startAttr = (isMobile && el.getAttribute('data-gsap-start-mobile')) || el.getAttribute('data-gsap-start');
    const duration = parseFloat(durationAttr);
    const delay = parseFloat(delayAttr);
    const stagger = s ? parseFloat(s) : null;
    return {
      delay:    Number.isFinite(delay) ? delay : 0,
      duration: Number.isFinite(duration) ? duration : this.defaults.duration,
      stagger,
      start:    startAttr || this.defaults.start,
      ease:     easeAttr || null
    };
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
        console.error('[GSAPAnimations] Invalid JSON in data-gsap-children:', err);
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

      // Process each selector in the config
      Object.entries(config).forEach(([selector, animConfig], index) => {
        const elements = section.querySelectorAll(selector);
        if (!elements.length) return;

        // Parse animation config (can be string or object)
        let animation, delay, duration, start, ease;
        if (typeof animConfig === 'string') {
          animation = animConfig;
          delay = baseDelay + (index * 0.1);
        } else {
          animation = animConfig.type || 'fade-up';
          delay = animConfig.delay !== undefined ? animConfig.delay : (baseDelay + (index * 0.1));
          duration = animConfig.duration;
          start = animConfig.start;
          ease = animConfig.ease;
        }

        // Apply animation to each element
        elements.forEach(el => {
          const cfg = {
            delay: delay,
            duration: duration || this.defaults.duration,
            start: start || triggerStart,
            ease: ease || null,
            stagger: null
          };

          try {
            switch (animation) {
              case 'fade-up':         this.fadeUp(el, cfg);        break;
              case 'fade-in':         this.fadeIn(el, cfg);        break;
              case 'slide-left':      this.slideLeft(el, cfg);     break;
              case 'slide-right':     this.slideRight(el, cfg);    break;
              case 'zoom-in':         this.zoomIn(el, cfg);        break;
              case 'image-fade-in':   this.imageFadeIn(el, cfg);   break;
              default: console.warn(`Unknown animation: "${animation}"`);
            }
          } catch (err) {
            console.error(`[GSAPAnimations] Error applying "${animation}":`, err);
          }
        });
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

    const targets = Array.isArray(target) ? target : [target];
    gsap.set(targets, { transition: 'none' });
    gsap.set(target, { x: dist, autoAlpha: 0, force3D: true });
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

  // Reveals text one rendered line at a time
  linesAnimation(el, cfg) {
    const lines = this.splitLines(el);
    if (!lines.length) return;

    gsap.set(lines, { y: 30, autoAlpha: 0, force3D: true });
    gsap.to(lines, {
      y: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.fade,
      stagger:  cfg.stagger || 0.1,
      delay:    cfg.delay,
      scrollTrigger: this.triggerCfg(el, cfg)
    });
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

    gsap.set(btn, { clipPath: hidden, webkitClipPath: hidden, willChange: 'clip-path' });
    gsap.set(txt, { clipPath: hidden, webkitClipPath: hidden, display: 'inline-block', lineHeight: 'normal', willChange: 'clip-path' });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: btn, start: cfg.start, toggleActions: 'play none none none' },
      delay: cfg.delay || 0
    });

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
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;

    const isMobile = window.innerWidth <= 991;
    const start = cfg.start || 'top 50%';

    const scaleFrom = isMobile ? 1.3 : 1.3;

    const targets = Array.isArray(target) ? target : [target];
    targets.forEach(node => {
      const img = node.tagName === 'IMG' ? node : node.querySelector?.('img');
      const wrapper = img ? img.parentElement : node.parentElement;
      if (wrapper && wrapper.style.overflow !== 'hidden') {
        wrapper.style.overflow = 'hidden';
      }
    });

    gsap.set(target, {
      scale: scaleFrom,
      autoAlpha: 0,
      transformOrigin: '50% 50%',
      force3D: true,
      backfaceVisibility: 'hidden',
      willChange: 'transform, opacity',
      transition: 'none'
    });
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
        // Clean up willChange after animation completes
        (Array.isArray(target) ? target : [target]).forEach(e =>
          gsap.set(e, { clearProps: 'will-change,transition' })
        );
      }
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
