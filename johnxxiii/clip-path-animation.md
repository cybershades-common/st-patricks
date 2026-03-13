# Clip-Path Scroll Reveal Animation

Used in `s-cards__row` — cards wipe in from bottom to top when they enter the viewport.

---

## How it works

1. CSS hides the element by clipping it entirely (`inset(100% 0 0 0)` = fully hidden from top)
2. ScrollTrigger watches for the element to enter viewport
3. GSAP animates the CSS variable `--clip-value` from `100%` → `0%` — revealing the element upward
4. After animation completes, `disable-clip` class is added to clean up the clip-path

---

## Dependencies

- GSAP 3.x
- GSAP ScrollTrigger plugin

---

## CSS

```css
/* Hidden state — add this to your stylesheet */
.batch-item--clip-js:not(.disable-clip) {
    --clip-value: 100%;
    -webkit-clip-path: inset(var(--clip-value) 0 0 0);
    clip-path: inset(var(--clip-value) 0 0 0);
}
```

---

## HTML

Add these two classes to any element you want to animate:

```html
<div class="batch-item-js batch-item--clip-js">
  <!-- your card or element content -->
</div>
```

Multiple cards in a row get staggered automatically (each one delays by `index * 0.2s`):

```html
<div class="row">
  <div class="col-4">
    <div class="batch-item-js batch-item--clip-js">Card 1</div>
  </div>
  <div class="col-4">
    <div class="batch-item-js batch-item--clip-js">Card 2</div>
  </div>
  <div class="col-4">
    <div class="batch-item-js batch-item--clip-js">Card 3</div>
  </div>
</div>
```

---

## JS

### Step 1 — ScrollTrigger batch setup (run once on page load)

```js
// Set ScrollTrigger defaults to use your scroll container
function setScrollTrigger() {
  ScrollTrigger.defaults({
    scroller: "#body-content-wrap", // your scroll container, or remove this line for window scroll
  });
}
setScrollTrigger();
window.addEventListener("resize", setScrollTrigger);
```

> If you're using plain window scroll (no Lenis/smooth scroll), remove the `scroller` line entirely.

---

### Step 2 — The batch animation function

```js
function each_batch(batch) {
  batch.forEach((card, index) => {

    if (card.classList.contains("batch-item--clip-js")) {
      gsap.fromTo(
        card,
        {
          "--clip-value": "100%",
        },
        {
          duration: 1.1,
          ease: "power3.out",
          "--clip-value": "0%",
          delay: index * 0.2,           // stagger — each card 0.2s later
          onComplete: function () {
            card.classList.add("disable-clip"); // clean up after animation
          },
        }
      );
    }

  });
}
```

---

### Step 3 — Watch elements with ScrollTrigger.batch

```js
ScrollTrigger.batch(".batch-item-js", {
  start: "top bottom-=100",  // trigger when element is 100px above bottom of viewport
  once: true,                // only animate once
  onEnter: (batch) => {
    each_batch(batch);
  },
});
```

---

### Step 4 — Lenis smooth scroll sync (only if using Lenis)

```js
const lenis = new Lenis();

lenis.on("scroll", () => {
  ScrollTrigger.update();
});

gsap.ticker.add((time) => {
  lenis.raf(1000 * time);
});

gsap.ticker.lagSmoothing(0);
```

> Skip this step entirely if using native window scroll.

---

## Animation breakdown

| Property | Value | Effect |
|----------|-------|--------|
| `clip-path` start | `inset(100% 0 0 0)` | Element fully hidden (clipped from top) |
| `clip-path` end | `inset(0% 0 0 0)` | Element fully visible |
| `duration` | `1.1s` | How long the wipe takes |
| `ease` | `power3.out` | Fast start, decelerates at end — feels natural |
| `delay` | `index * 0.2s` | Each card in a batch staggers 0.2s after previous |
| `once: true` | ScrollTrigger | Animation only fires once, not every scroll |

---

## Customisation

**Faster reveal:**
```js
duration: 0.7,
ease: "power2.out",
```

**Less stagger:**
```js
delay: index * 0.1,
```

**Wipe from left instead of bottom:**
```css
.batch-item--clip-js:not(.disable-clip) {
    --clip-value: 100%;
    clip-path: inset(0 var(--clip-value) 0 0); /* right side clips */
}
```
```js
// same JS, just change CSS direction
```

**Trigger earlier (more of element visible before animating):**
```js
start: "top bottom-=200",
```
