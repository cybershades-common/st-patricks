# Sticky Hero Roll-Over (Desktop + Mobile)

This project uses a **sticky hero media** pattern so the next section rolls over the hero video while scrolling down, and reveals it again when scrolling up. The behavior is stable across desktop and mobile.

## Structure (HTML)

The key is to wrap the sticky media and the rolling content inside a **single wrapper**, like this:

```html
<!-- Hero text section (normal flow) -->
<section class="hero">...</section>

<!-- Sticky Wrapper: constrains sticky behavior -->
<div class="sticky-wrapper">
  <div class="hero-media">...</div>

  <!-- Rolling content -->
  <div class="sticky-content">
    <section class="about-section">...</section>
  </div>
</div>
```

Why:
- The wrapper defines the scroll range where sticky should apply.
- The rolling content is a separate stacking layer above the sticky media.

## Core CSS (Desktop + Mobile)

### 1) Sticky media

```less
.sticky-wrapper {
  position: relative;
  z-index: 0;
}

.sticky-wrapper .hero-media {
  position: sticky !important;
  top: 0;
  z-index: 1;
}

.hero-media {
  position: relative;
  width: 100%;
  height: 100svh;
  height: 100vh;
  min-height: 31.25rem;
  overflow: hidden;
  z-index: 0;
  transform: translateZ(0);
}
```

Notes:
- `position: sticky` is inside `.sticky-wrapper` so it only sticks in that section.
- `height: 100svh; height: 100vh;` keeps full‑screen height in mobile browsers.
- `transform: translateZ(0)` helps iOS/Android keep layers stable while scrolling.

### 2) Rolling content above the video

```less
.sticky-content {
  position: relative;
  z-index: 5;
  transform: translateZ(0);
}
```

Why:
- Ensures the next section always renders above the sticky hero video.

### 3) Video layer + overlay

```less
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  object-position: center;
  transform: translateZ(0);
}

.hero-media-overlay {
  z-index: 1;
  pointer-events: none;
}
```

## Mobile Stability Tips

These fixes were required for consistent mobile behavior:

- Keep **all sticky ancestors `overflow: visible`**.
  - `body` can use `overflow-x: hidden`, but **don’t set overflow on wrappers**.
- Avoid Bootstrap `position-*` utility classes on sticky elements.
  - Those classes use `!important` and can override `sticky`.
- Use `100svh` + `100vh` to prevent Safari address‑bar issues.
- Use `transform: translateZ(0)` on both the sticky media and the rolling content to avoid layer flipping.

## Files in This Project

- HTML structure:
  - `index.html`
  - `.sticky-wrapper`, `.hero-media`, `.sticky-content`

- Core styles:
  - `src/styles/_hero.less`
  - `src/styles/_about.less`
  - `src/styles/style.less`

## Quick Checklist (when recreating)

- [ ] Hero media is inside `.sticky-wrapper`.
- [ ] Rolling content is inside `.sticky-content` (z-index higher).
- [ ] Sticky element has **no** `position-relative` utility class.
- [ ] Parent wrappers do **not** set `overflow: hidden`.
- [ ] `height: 100svh` is set for mobile.
- [ ] `transform: translateZ(0)` is added for layer stability.

