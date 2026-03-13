# Scroll Animation System — Reference Guide

This documents the complete animation system used in this project.
Copy `libraries.js` and the relevant JS/CSS sections into any new project and use the HTML classes below.

---

## Stack

| Library | Version | Purpose |
|---------|---------|---------|
| GSAP | 3.13.0 | Core animation engine |
| GSAP ScrollTrigger | 3.13.0 | Trigger animations on scroll |
| GSAP SplitText | 3.13.0 | Split text into lines/chars for animation |
| Lenis | 1.3.8 | Smooth scroll (non-Safari) |
| Smooth Scrollbar | 8.8.4 | Smooth scroll fallback for Safari |

All bundled into `assets/js/libraries.js` — no CDN, no npm imports, all global variables.

---

## Scroll Setup

The site detects browser and applies the right scroll engine automatically.

### Non-Safari (Lenis)

```js
lenis = new Lenis({
  duration: 1.5,
  smooth: true,
  syncTouch: true,
  smoothTouch: false,
  touchMultiplier: 1.5,
  wheelMultiplier: 0.8,
  wrapper: document.querySelector("#body-content-wrap"),
  content: document.querySelector("#body-content"),
});

lenis.on("scroll", () => {
  ScrollTrigger.update();
});

gsap.ticker.add((time) => {
  lenis.raf(1000 * time);
});
gsap.ticker.lagSmoothing(0);
```

### Safari (Smooth Scrollbar fallback)

```js
bodyScrollBar = Scrollbar.init(document.querySelector("#body-content-wrap"));

ScrollTrigger.scrollerProxy("#body-content-wrap", {
  scrollTop(value) {
    if (arguments.length) bodyScrollBar.scrollTop = value;
    return bodyScrollBar.scrollTop;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
});

bodyScrollBar.addListener(() => {
  ScrollTrigger.update();
});
```

### ScrollTrigger defaults

```js
function setScrollTrigger() {
  ScrollTrigger.defaults({
    scroller: "#body-content-wrap",  // your scroll container
    pinType: "transform",
  });
}
setScrollTrigger();
window.addEventListener("resize", setScrollTrigger);
window.addEventListener("load", () => ScrollTrigger.refresh(true));
```

### Required HTML structure

```html
<body>
  <div id="body-content-wrap" data-scrollbar>   <!-- scroll container -->
    <div id="body-content">                      <!-- actual content -->
      <!-- all page content here -->
    </div>
  </div>
</body>
```

---

## Animation Types — HTML Classes

Add `batch-item-js` to every element you want to animate, then add ONE modifier class to define the animation type.

### 1. Fade + Slide Up (default) — `batch-item--def-js`

Element starts at `y: 30, opacity: 0` → animates to `y: 0, opacity: 1`.

```html
<div class="batch-item-js batch-item--def-js">
  Any element
</div>
```

---

### 2. Fade Only (no movement) — `batch-item--static-js`

Element starts at `opacity: 0` → animates to `opacity: 1`. No position change.
Use for paragraphs, buttons, anything that shouldn't move.

```html
<div class="batch-item-js batch-item--static-js">
  Any element
</div>
```

Auto-applied to all direct children of `.children-batch-anim-js`:

```html
<div class="children-batch-anim-js">
  <p>This gets batch-item--static-js automatically</p>
  <p>So does this</p>
</div>
```

---

### 3. Clip-Path Wipe — `batch-item--clip-js`

Element is hidden via `clip-path: inset(100% 0 0 0)` and wipes in upward.
Best for image cards, full-bleed sections.

```html
<div class="batch-item-js batch-item--clip-js">
  Card or image element
</div>
```

CSS required:
```css
.batch-item--clip-js:not(.disable-clip) {
    --clip-value: 100%;
    -webkit-clip-path: inset(var(--clip-value) 0 0 0);
    clip-path: inset(var(--clip-value) 0 0 0);
}
```

Stagger: each card delays `index * 0.2s`. Duration: `1.1s`. Ease: `power3.out`.

---

### 4. Slide From Right — `batch-item--from-right-js`

Element starts at `x: 15%, opacity: 0` → slides in from right.

```html
<div class="batch-item-js batch-item--from-right-js">
  Element
</div>
```

---

### 5. Slide From Left — `batch-item--from-left-js`

Element starts at `y: -15%, opacity: 0` → slides in from top-left.

```html
<div class="batch-item-js batch-item--from-left-js">
  Element
</div>
```

---

### 6. Scale In — `batch-item--scale-js`

Requires an inner element with `.batch-scale-block-js`.
Inner block starts at `scale: 1.5`, zooms out to `scale: 1` as parent fades in.

```html
<div class="batch-item-js batch-item--scale-js">
  <div class="batch-scale-block-js">
    <img src="..." />
  </div>
</div>
```

---

### 7. Scale Y — `batch-item--scale-y-js`

Element starts at `scaleY: 0` → grows to full height. Good for dividers, lines.

```html
<div class="batch-item-js batch-item--scale-y-js">
  Element
</div>
```

For faster version:
```html
<div class="batch-item-js batch-item--scale-y-js batch-item--scale-y-fast-js">
```

---

### 8. Scale X — `batch-item--scale-x-js`

Element starts at `scaleX: 0` → expands to full width. Good for horizontal lines.

```html
<div class="batch-item-js batch-item--scale-x-js">
  Element
</div>
```

For faster version:
```html
<div class="batch-item-js batch-item--scale-x-js batch-item--scale-x-fast-js">
```

---

### 9. Text Lines Reveal — `batch-item--text-js split-text-lines-js`

Splits text into lines, each line slides up and fades in with stagger.
GSAP SplitText wraps each line in `.line-st` spans automatically.

```html
<h2 class="batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">
  Your heading text here
</h2>
```

- `split-text-init-js` — triggers SplitText to run on this element
- `split-text-lines-js` — tells it to split by lines
- `batch-item--text-js` — tells batch animator to animate `.line-st` children

Works on elements containing `p`, `li`, `h3`, `h4`, `h5`, `h6` — splits each tag separately.

---

### 10. Text Chars Reveal — `batch-item--text-js split-text-chars-js`

Splits text into individual characters, each fades + slides up with stagger.

```html
<h3 class="batch-item-js batch-item--text-js split-text-init-js split-text-chars-js">
  Short heading
</h3>
```

Stagger is adaptive: `0.05s` for long words, `0.1s` for short (< 10 chars).

---

### 11. Hero Section Items — `batch-hero-item-js`

Same animations but triggers as soon as element hits the bottom of viewport (no `-=100` offset).
Used for above-the-fold/hero content.

```html
<div class="batch-item-js batch-hero-item-js batch-item--static-js">
  Hero content
</div>
```

---

### 12. Secondary Batch — `batch-item--secondary-js`

Triggers slightly earlier than normal (`top bottom-=50` instead of `-=100`).
Used for elements near the bottom of sections.

```html
<div class="batch-item-js batch-item--secondary-js batch-item--static-js">
  Element
</div>
```

---

## Parallax System

### Basic Parallax — `parallax-js`

Configure entirely via classes and `data-` attributes on the element.

```html
<!-- Parallax image — moves upward as you scroll down -->
<img
  class="parallax-js parallax-img-js parallax-y-js"
  data-parallax-value="20"
  src="..."
/>

<!-- Parallax block (a div, not an image) -->
<div
  class="parallax-js parallax-block-js parallax-y-js"
  data-parallax-value="15"
>
</div>

<!-- Horizontal parallax -->
<div
  class="parallax-js parallax-block-js parallax-x-js"
  data-parallax-value="10"
>
</div>

<!-- Reverse direction -->
<div
  class="parallax-js parallax-block-js parallax-y-js parallax-reverse-js"
  data-parallax-value="20"
>
</div>

<!-- Custom scrub speed (default 1) -->
<div
  class="parallax-js parallax-block-js parallax-y-js"
  data-parallax-value="20"
  data-parallax-scrub="2"
>
</div>

<!-- Custom trigger start/end -->
<div
  class="parallax-js parallax-block-js parallax-y-js"
  data-parallax-value="20"
  data-parallax-trigger-start="top center"
  data-parallax-trigger-end="bottom top"
>
</div>
```

`data-parallax-value` = percentage to translate (e.g. `20` = moves 20% of its size).

---

### Pinned Scroll Banner — `.s-scroll-banner-wrap-js`

Left side pins while right side scrolls. Desktop only (> 991px).

```html
<div class="s-scroll-banner-wrap-js">
  <div class="s-scroll-banner-js">
    <!-- This side pins (stays fixed while scrolling) -->
    <h2>Pinned content</h2>
  </div>
  <div class="s-scroll-banner__cards-js">
    <!-- This side scrolls up -->
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
  </div>
</div>
```

---

### Custom Hero Parallax — `.full-custom-hero-js`

Full-height hero that stays pinned while scroll container moves over it.

```html
<div class="full-custom-container-js">
  <div class="full-custom-hero-js">
    <div class="full-custom-overlay-js">
      <!-- overlay that fades on scroll -->
    </div>
    <!-- hero content -->
  </div>
</div>
```

---

## Stagger Timing Reference

| Animation type | Stagger formula | Result for 3 cards |
|---------------|-----------------|-------------------|
| clip-path wipe | `index * 0.2s` | 0s, 0.2s, 0.4s |
| def / static / text | `index * 0.1s` | 0s, 0.1s, 0.2s |
| text lines (within element) | `stagger: 0.1` per line | rapid line-by-line |
| text chars (long word) | `stagger: 0.05` per char | fast typewriter |
| text chars (short word) | `stagger: 0.1` per char | slower typewriter |

---

## Scroll Trigger Start Positions Reference

| Class / context | `start` value | Meaning |
|----------------|--------------|---------|
| Normal batch items | `top bottom-=100` | Triggers when element top is 100px above bottom of viewport |
| Secondary batch | `top bottom-=50` | Triggers 50px above bottom |
| Hero items | `top bottom` | Triggers the moment element enters viewport |
| Parallax | `top bottom` → `bottom top` | Runs across full scroll through viewport |
| Pin scroll banner | `top top` → `bottom bottom` | Pins for duration of parent container scroll |

---

## Body Classes (added by JS automatically)

| Class | When added | Use in CSS |
|-------|-----------|------------|
| `window-load` | `window load` event | Trigger CSS transitions after load |
| `Lenis-init` | Lenis active (non-Safari) | Style scroll container via CSS |
| `Scrollbar-init` | Smooth Scrollbar active (Safari) | Safari-specific styles |
| `is-offset-top` | User has scrolled down | Show sticky header styles |
| `scroll-down` | User scrolling downward | Hide header on scroll down |
| `disable-clip` | After clip-path animation completes | Removes clip-path from element |

---

## Quick Checklist for New Project

- [ ] Copy `libraries.js` into `assets/js/`
- [ ] Add `#body-content-wrap` + `#body-content` HTML structure
- [ ] Add scroll setup JS (Lenis + ScrollTrigger defaults)
- [ ] Add `setScrollTrigger()` + resize listener
- [ ] Add `ScrollTrigger.refresh(true)` on window load
- [ ] Add SplitText init code if using text animations
- [ ] Add batch init code (`gsap.set` for initial states)
- [ ] Add `each_batch()` function
- [ ] Add `ScrollTrigger.batch()` calls
- [ ] Add parallax JS if using parallax
- [ ] Add CSS for `.batch-item--clip-js` if using clip-path animation
