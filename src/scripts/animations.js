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
        zoom:  'back.out(1.05)'
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
    document.querySelectorAll('[data-gsap]').forEach(el => {
      const type = el.getAttribute('data-gsap');
      const cfg  = this.readConfig(el);

      try {
        switch (type) {
          case 'fade-up':         this.fadeUp(el, cfg);        break;
          case 'fade-in':         this.fadeIn(el, cfg);        break;
          case 'slide-left':      this.slideLeft(el, cfg);     break;
          case 'slide-right':     this.slideRight(el, cfg);    break;
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
    const s = el.getAttribute('data-gsap-stagger');
    return {
      delay:    parseFloat(el.getAttribute('data-gsap-delay'))    || 0,
      duration: parseFloat(el.getAttribute('data-gsap-duration')) || this.defaults.duration,
      stagger:  s ? parseFloat(s) : null,
      start:    el.getAttribute('data-gsap-start') || this.defaults.start,
      ease:     el.getAttribute('data-gsap-ease')  || null
    };
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

    gsap.set(target, { y: 50, autoAlpha: 0, force3D: true });
    gsap.to(target, {
      y: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.fade,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg)
    });
  }

  fadeIn(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;

    gsap.set(target, { autoAlpha: 0 });
    gsap.to(target, {
      autoAlpha: 1,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.fade,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg)
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

    gsap.set(target, { x: -dist, autoAlpha: 0, force3D: true });
    gsap.to(target, {
      x: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.slide,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg)
    });
  }

  slideRight(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;
    const dist    = window.innerWidth <= 991 ? 80 : 300;

    gsap.set(target, { x: dist, autoAlpha: 0, force3D: true });
    gsap.to(target, {
      x: 0, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
      ease:     cfg.ease || this.defaults.ease.slide,
      delay:    cfg.delay,
      stagger,
      scrollTrigger: this.triggerCfg(el, cfg)
    });
  }

  // -----------------------------------------------------------------------
  // Zoom
  // -----------------------------------------------------------------------

  zoomIn(el, cfg) {
    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;

    gsap.set(target, { scale: 0.7, autoAlpha: 0, force3D: true });
    gsap.to(target, {
      scale: 1, autoAlpha: 1, force3D: true,
      duration: cfg.duration,
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
      stagger:  cfg.stagger || 0.15,
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
        start:   'top 90%',
        end:     end,
        scrub:   1,
        once:    true
      }
    });

    tl.to(lines, {
      y: 0, autoAlpha: 1, force3D: true,
      duration: 1,
      ease:     cfg.ease || this.defaults.ease.fade,
      stagger:  cfg.stagger || 0.1
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
        duration: 0.6,
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
      duration: 1.6,
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

  // Smooth fade-in with zoom out (scale 1.15 → 1)
  imageFadeIn(el, cfg) {
    if (!el) return;

    const kids    = this.animChildren(el);
    const target  = kids && cfg.stagger ? kids : el;
    const stagger = kids && cfg.stagger ? cfg.stagger : 0;

    gsap.set(target, { scale: 1.15, opacity: 0, force3D: true });
    gsap.to(target, {
      scale: 1, opacity: 1,
      duration: cfg.duration || 1.2,
      ease:     cfg.ease || 'power2.out',
      delay:    cfg.delay,
      stagger,
      force3D:  true,
      scrollTrigger: this.triggerCfg(el, cfg)
    });
  }

  // -----------------------------------------------------------------------
  // Parallax
  // -----------------------------------------------------------------------

  // Scroll-driven vertical parallax for background images.
  // Element should be inside an overflow:hidden section.
  parallaxBg(el, cfg) {
    if (!el) return;

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
  document.fonts.ready.then(() => new GSAPAnimations());
});
