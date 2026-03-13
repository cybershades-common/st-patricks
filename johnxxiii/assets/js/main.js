//-------------------------------------------------------------------
if (window.innerWidth < 768) {
  document.querySelectorAll("br.del-on-mob-js").forEach((el) => el.remove());
}
//-------------------------------------------------------------------
let cardsWrap = document.querySelector("#s-new-cards__items-wrap");
if (cardsWrap && window.innerWidth > 575) {
  let contents_block = cardsWrap.querySelectorAll(".s-blog__item-content-js"),
      maxHeight = 0;
  contents_block.forEach((content) => {
    const height = content.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });
  cardsWrap.style.setProperty("--blog-content-min-height", `${maxHeight}px`);
}
//-------------------------------------------------------------------
let hero_nav_items = document.querySelectorAll(
  ".s-hero__bottom-nav-slide.batch-hero-item-js",
);
if (window.innerWidth < 992 && hero_nav_items.length) {
  document
    .querySelector("#s-hero__bottom-dropdown")
    .classList.add("dropdown-block-js");
  document
    .querySelector("#s-hero__bottom-dropdown-title")
    .classList.add(
      "dropdown-block__btn-js",
      "batch-hero-item-js",
      "batch-item--static-js",
      "batch-item-js",
    );
  let dropdown_content = document.querySelector("#s-hero__bottom-nav");
  dropdown_content.classList.add("dropdown-block__content-js");
  dropdown_content.setAttribute("data-lenis-prevent", "");
  dropdown_content.setAttribute("data-scroll", "exclude");
  hero_nav_items.forEach((el) => {
    el.classList.remove(
      "batch-hero-item-js",
      "batch-item--static-js",
      "batch-item-js",
    );
  });
}
//-------------------------------------------------------------------
const updateHeaderLayout = () => {
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);
  const isMobile = () => window.innerWidth < 1200;
  const shortNav = qs("#header__short-nav");
  const navWrap = qs("#header__nav-wrap");
  const col1 = qs("#menu__header-col--1");
  if (isMobile()) {
    let about_menu = document.querySelector(
      "body:not(.use-mobile-header) #about-menu",
    );
    if (about_menu) {
      about_menu.classList.remove("is-open");
    }
    document.body.classList.add("use-mobile-header");
  }
  if (!isMobile()) {
    document.querySelector("#about-menu").classList.add("is-open");
    document.body.classList.remove("use-mobile-header");
  }
  if (shortNav) {
    if (isMobile()) {
      qsa(".internal-anim-block-js", shortNav).forEach((el) =>
        el.classList.remove("internal-anim-block-js"),
      );
    }
    if (isMobile() && navWrap?.contains(shortNav)) {
      col1?.appendChild(shortNav);
    }
    if (!isMobile() && col1?.contains(shortNav)) {
      navWrap?.prepend(shortNav);
    }
  }
  const navBtnsLine = qs("#header__nav-btns-line");
  if (navBtnsLine && isMobile()) {
    navBtnsLine.classList.remove("internal-anim-block-js");
  }
  const dropdown = qs("#header__nav-dropdown");
  const navBtns = qs("#header__nav-btns");
  const col2 = qs("#menu__header-col--2");
  if (dropdown) {
    if (isMobile()) {
      dropdown.classList.remove("internal-anim-block-js");
    }
    if (isMobile() && navBtns?.contains(dropdown)) {
      col2?.appendChild(dropdown);
    }
    if (!isMobile() && col2?.contains(dropdown)) {
      navBtns?.prepend(dropdown);
    }
  }
};
updateHeaderLayout();
window.addEventListener("resize", updateHeaderLayout);
//-------------------------------------------------------------------
const isTouchNoHover = window.matchMedia(
  "(hover: none) and (pointer: coarse)",
).matches;
if (isTouchNoHover) {
  document.body.classList.add("touch-device");
}
//-------------------------------------------------------------------
const dropdownBtns = document.querySelectorAll(".dropdown-block__btn-js");
if (dropdownBtns.length) {
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const block = btn.closest(".dropdown-block-js");
      if (!block) return;
      block.classList.toggle("is-open-dropdown");
    });
  });
}
//-------------------------------------------------------------------
const blocks = document.querySelectorAll(".block-toggle-txt");
if (blocks.length !== 0) {
  blocks.forEach((block) => {
    const outer = block.querySelector(".block-toggle-txt-wrap-2");
    const inner = block.querySelector(".block-toggle-txt-wrap-3");
    const toggle = block.querySelector(".block-toggle-txt-read-toggle");
    if (!outer || !inner || !toggle) return;
    const collapsedHeight = 360;
    const fullHeight = inner.scrollHeight;
    if (fullHeight <= collapsedHeight) {
      toggle.style.display = "none";
      outer.style.height = "auto";
      return;
    }
    outer.classList.add("is-enable-expanded");
    outer.style.height = `${collapsedHeight}px`;
    outer.style.transition = "height 0.4s ease";
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = block.classList.contains("expanded");
      if (isExpanded) {
        outer.style.height = `${collapsedHeight}px`;
        block.classList.remove("expanded");
        outer.addEventListener("transitionend", function cb() {
          outer.removeEventListener("transitionend", cb);
          // console.log('✅');
          ScrollTrigger.refresh(true);
        });
      } else {
        outer.style.height = `${fullHeight}px`;
        block.classList.add("expanded");
        outer.addEventListener("transitionend", function cb() {
          outer.removeEventListener("transitionend", cb);
          // console.log('✅');
          ScrollTrigger.refresh(true);
        });
      }
    });
  });
}
//-------------------------------------------------------------------
// if (document.getElementById('is-homepage')) {
//     disableScroll();
// }
//-------------------------------------------------------------------
let header = document.querySelector("#header"),
  headerHeight = header?.offsetHeight || 0;
// function updateHeaderVars() {
//     headerHeight = header?.offsetHeight || 0;
// document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
// if(document.body.classList.contains('is-offset-top')) {
//     document.documentElement.style.setProperty('--header-height-offset', `${headerHeight}px`);
// }
// }
// updateHeaderVars();
// window.addEventListener('load', function() {
//     updateHeaderVars();
// });
// window.addEventListener('resize', function() {
//     updateHeaderVars();
// });
const menuBtn = document.getElementById("menu-btn");
if (menuBtn) {
  menuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("is-open-menu");
    // document.querySelector('#search-menu')?.classList.remove('is-open');
    // document.querySelector('#header__search-link')?.classList.remove('is-active');
    // document.body.classList.remove('is-open-menu-2');
  });
}
//-------------------------------------------------------------------
document.querySelectorAll(".tabs-block-js").forEach((block) => {
  block.querySelectorAll(".tab-title-js").forEach((caller) => {
    caller.addEventListener("click", (e) => {
      e.preventDefault();
      let targetSelector = caller.getAttribute("href"),
        target = block.querySelector(targetSelector),
        others = block.querySelectorAll(".tab-content-js.is-active"),
        titles = block.querySelectorAll(".tab-title-js.is-active");
      if (target) {
        [...titles].forEach((li) => li.classList.remove("is-active"));
        caller.classList.add("is-active");
        [...block.querySelectorAll(".tab-title-js")].forEach((li) =>
          li.classList.add("not-allow"),
        );
        [...others].forEach((li) => {
          li.classList.remove("is-animated", "is-active");
        });
        target.classList.add("is-active");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            target.classList.add("is-animated");
          });
          if (!caller.classList.contains("header-full-menu__title-link")) {
            ScrollTrigger.refresh(true);
          }
        });
        [...block.querySelectorAll(".tab-title-js")].forEach((li) =>
          li.classList.remove("not-allow"),
        );
      }
    });
  });
});
//-------------------------------------------------------------------
let mainPageWrap = document.querySelector(".main-page-wrap");
function isSafari() {
  return (
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
    (!!window.safari && typeof window.safari === "object") ||
    typeof window.ApplePaySession !== "undefined"
  );
}
function isWindows() {
  return /windows/i.test(navigator.userAgent);
}
if (isSafari()) {
  document.documentElement.classList.add("safari-browser");
}
if (isWindows()) {
  document.documentElement.classList.add("windows-browser");
}
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function isEnableCustomScroll() {
  const hasDisabledScroll = document.querySelector(
    ".disabled-smooth-scroll-js",
  );
  if (hasDisabledScroll) {
    document.body.classList.add("smooth-scroll-css");
    return true;
  }
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
let vh_ = window.innerHeight * 0.01,
  vh_static = window.innerHeight;
document.documentElement.style.setProperty("--vh", vh_ + "px");
document.documentElement.style.setProperty("--vh-2", vh_ + "px");
var isMobile =
  /iPhone|iPad|iPod|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile|BlackBerry|IEMobile|Opera Mini|Android/i.test(
    navigator.userAgent,
  );
window.addEventListener("resize", function () {
  vh_ = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh_ + "px");
  if (!isMobile) {
    document.documentElement.style.setProperty("--vh-2", vh_ + "px");
  }
});
function updateVhOnceOnScroll() {
  vh_ = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh_ + "px");
  window.removeEventListener("scroll", updateVhOnceOnScroll);
}
window.addEventListener("scroll", updateVhOnceOnScroll);
//--------------------------------------------------------------------
let lenis = null,
  bodyScrollBar = null,
  isOffsetTop = false;
function scroll_offset(scroll) {
  if (scroll > 0) {
    if (!isOffsetTop) {
      document.body.classList.add("is-offset-top");
      isOffsetTop = true;
    }
  } else {
    if (isOffsetTop) {
      document.body.classList.remove("is-offset-top");
      isOffsetTop = false;
      // headerHeight = header?.offsetHeight || 0;
      // document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
  }
}
function scroll_dir(direction) {
  if (direction === 1) {
    document.body.classList.add("scroll-down");
  } else {
    document.body.classList.remove("scroll-down");
  }
}
function openModal(scrollbar) {
  scrollbar.updatePluginOptions("modal", { open: true });
}
function closeModal(scrollbar) {
  scrollbar.updatePluginOptions("modal", { open: false });
}
if (!isEnableCustomScroll()) {
  if (!isSafari()) {
    document.body.classList.add("Lenis-init");
    lenis = new Lenis({
      duration: 1.5,
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      syncTouch: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 0.8,
      wrapper: document.body.querySelector("#body-content-wrap"),
      content: document.body.querySelector("#body-content"),
    });
    lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
      ScrollTrigger.update();
      scroll_offset(scroll);
      scroll_dir(direction);
    });
    gsap.ticker.add((time) => {
      lenis.raf(1000 * time);
    });
    gsap.ticker.lagSmoothing(0);
    if (is_preloader) {
      lenis.stop();
    }
  }
  if (isSafari()) {
    document.body.classList.add("Scrollbar-init");
    const elements = document.querySelectorAll(".custom-scrollbar");
    elements.forEach((el) => {
      el.classList.remove("custom-scrollbar", "hide-scrollbar");
      el.setAttribute("data-scrollbar", "");
    });
    const ScrollbarPlugin = window.Scrollbar.ScrollbarPlugin;
    const Scrollbar = window.Scrollbar;
    class ModalPlugin extends ScrollbarPlugin {
      static pluginName = "modal";
      static defaultOptions = {
        open: false,
      };
      transformDelta(delta) {
        return this.options.open ? { x: 0, y: 0 } : delta;
      }
    }
    Scrollbar.use(ModalPlugin);
    const bodyScrollBar_all = Scrollbar.initAll({
      ignoreEvents: (event) => {
        return event.target.closest('[data-scroll="exclude"]');
      },
    });
    const scrollableBlocks = document.querySelectorAll(
      '[data-scroll="exclude"]',
    );
    scrollableBlocks.forEach((block) => {
      block.addEventListener("wheel", (e) => e.stopPropagation(), {
        passive: false,
      });
      block.addEventListener("touchmove", (e) => e.stopPropagation(), {
        passive: false,
      });
    });
    bodyScrollBar = Scrollbar.get(document.querySelector("#body-content-wrap"));
    ScrollTrigger.scrollerProxy("#body-content-wrap", {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    let lastScrollTop = 0;
    bodyScrollBar.addListener(({ offset }) => {
      ScrollTrigger.update();
      const currentScrollTop = bodyScrollBar.offset.y;
      const direction = currentScrollTop > lastScrollTop ? 1 : -1;
      scroll_dir(direction);
      scroll_offset(currentScrollTop);
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
    if (is_preloader) {
      openModal(bodyScrollBar);
    }
  }
}
if (isEnableCustomScroll()) {
  let lastScrollTop_ = 0;
  scroll_offset(window.scrollY);
  window.addEventListener("scroll", function () {
    scroll_offset(window.scrollY);
    let currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop_) {
      document.body.classList.add("scroll-down");
    } else {
      document.body.classList.remove("scroll-down");
    }
    lastScrollTop_ = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });
}
//--------------------------------------------------------------------
function setScrollTrigger() {
  const scroller = !isEnableCustomScroll() ? "#body-content-wrap" : "body";
  ScrollTrigger.defaults({
    scroller: scroller,
    pinType: !isEnableCustomScroll() ? "transform" : "fixed",
  });
}
setScrollTrigger();
window.addEventListener("resize", setScrollTrigger);
//--------------------------------------------------------------------
window.addEventListener("load", function () {
  document.body.classList.add("window-load");
  ScrollTrigger.refresh(true);
});
//--------------------------------------------------------------------
const banners = document.querySelectorAll(".s-scroll-banner-wrap-js");
if (banners.length > 0 && window.innerWidth > 991) {
  banners.forEach((item) => {
    const pinBlock = item.querySelector(".s-scroll-banner-js");
    const cards = item.querySelector(".s-scroll-banner__cards-js");
    if (!pinBlock || !cards) return;
    const heightCards = cards.offsetHeight;
    const pinHeight = pinBlock.offsetHeight;
    if (heightCards > pinHeight) {
      item.classList.add("enable-height");
      const trip = heightCards - pinHeight + 70;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          pin: pinBlock,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // markers: true,
        },
      });
      tl.to(cards, {
        y: -trip,
        ease: "none",
      });
    }
  });
}
//-------------------------------------------------------------------
const customParallaxElements = document.querySelectorAll(".parallax-custom-js");
customParallaxElements.forEach((item) => {
  const container = item.closest(".parallax-custom-container-js");
  if (!container) return;
  item.classList.add("add-styles");
  let start_value = "top bottom";
  if (item.classList.contains("parallax-custom-hero-js")) {
    start_value = "top top";
  }
  let parallaxTL = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: start_value,
      end: "bottom top",
      pin: item,
      pinSpacing: false,
    },
  });
});
//--------------------------------------------------------------------
const customHeroParallaxElements = document.querySelectorAll(
  ".full-custom-hero-js",
);
if (customHeroParallaxElements.length > 0) {
  if (window.innerHeight > 349) {
    document.body.classList.add("disable-offset-top");
  }
  customHeroParallaxElements.forEach((item) => {
    const container = item.closest(".full-custom-container-js"),
      overlay = item.querySelector(".full-custom-overlay-js");
    if (!container) return;
    if (window.innerHeight > 349) {
      let pinTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: item,
          pinSpacing: false, // markers:
          // true,
          scrub: 1,
          onLeave: () => {
            document.body.classList.remove("disable-offset-top");
          },
          onEnterBack: () => {
            document.body.classList.add("disable-offset-top");
          },
        },
      });
      pinTL.to(overlay, {
        "--left": 0,
        ease: "none",
      });
      let bottom_offset = 80,
        end_trigger = 75;
      if (window.innerWidth < 1200) {
        bottom_offset = 40;
        end_trigger = 50;
      }
      let parallaxTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "bottom center",
          end: "bottom+=" + end_trigger + "px top", // markers:
          // true,
          scrub: 1,
        },
      });
      parallaxTL.to(overlay, {
        "--left": 80,
        "--bottom": bottom_offset,
        ease: "none",
      });
    } else {
      let pinTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom+=" + 75 + "px top",
          scrub: 1, // markers: true,
        },
      });
      pinTL
        .to(overlay, {
          "--left": 0,
        })
        .to(overlay, {
          "--left": 80,
          "--bottom": 40,
          ease: "none",
        });
    }
  });
}
//--------------------------------------------------------------------
const fullParallaxElements = document.querySelectorAll(".full-custom-2-js");
if (fullParallaxElements.length > 0) {
  fullParallaxElements.forEach((item) => {
    const container = item.querySelector(".full-custom-container-2-js"),
      overlay = item.querySelector(".full-custom-overlay-2-js");
    if (!container) return;
    let start_pos = "center center",
      emd_pos = "bottom top";
    if (
      window.innerHeight * 0.8 >
        document.querySelector("#footer").offsetHeight &&
      item.classList.contains("full-custom-2--footer-js")
    ) {
      emd_pos = "bottom center";
    }
    let parallaxTL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: start_pos,
        end: emd_pos, // markers: true,
        scrub: 1,
      },
    });
    parallaxTL.from(item, {
      "--banner-offset-bottom": 0,
      "--banner-offset-x": 0,
      ease: "none",
    });
  });
}
//--------------------------------------------------------------------
const fullParallaxElements_3 = document.querySelectorAll(".full-custom-3-js");
if (fullParallaxElements_3.length > 0) {
  fullParallaxElements_3.forEach((item) => {
    const container = item.querySelector(".full-custom-container-3-js"),
      overlay = item.querySelector(".full-custom-overlay-3-js");
    if (!container) return;
    let parallaxTL_01 = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top top",
        endTrigger: container,
        end: "center center", // markers: true,
        scrub: 1,
      },
    });
    let parallaxTL_02 = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "bottom center",
        endTrigger: container,
        end: "bottom top", // markers: true,
        scrub: 1,
      },
    });
    let parallax_value = window.innerWidth < 1200 ? 40 : 80;
    parallaxTL_01.to(item, {
      "--hero-offset-bottom": 0,
      "--hero-offset-x": 0,
      ease: "none",
    });
    parallaxTL_02.to(item, {
      "--hero-offset-bottom": parallax_value,
      "--hero-offset-x": parallax_value,
      ease: "none",
    });
  });
}
//--------------------------------------------------------------------
//js scroll disable
// if (isEnableCustomScroll()) {
//     customParallaxElements.forEach(item => {
//         item.classList.remove('add-styles');
//         item.classList.add('is-parallax-trigger-js', 'parallax-js', 'parallax-img-js', 'parallax-y-js');
//         item.setAttribute('data-parallax-value', '15');
//         const parent = item.closest('.parallax-custom-container-js');
//         if (parent) {
//             parent.classList.add('parallax-trigger-js');
//         }
//     });
// }
let disable_lg_parallax = document.querySelectorAll(".disable-lg-parallax-js");
if (disable_lg_parallax.length > 0 && window.innerWidth < 992) {
  disable_lg_parallax.forEach((item) => {
    item.classList.remove("parallax-js");
  });
}
//--------------------------------------------------------------------
const triggers = document.querySelectorAll("[data-scrollto]");
if (triggers.length) {
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      const elementId = this.getAttribute("data-scrollto");
      const target = document.querySelector(elementId);
      if (!target) return;
      let paddingOffset = 0;
      if (this.hasAttribute("data-scroll-offset-default") && header) {
        paddingOffset = 91;
        if (window.innerWidth < 1200) {
          paddingOffset = 78;
        }
        if (window.innerWidth < 375) {
          paddingOffset = 69;
        }
      }
      const targetOffset =
        target.getBoundingClientRect().top + window.pageYOffset - paddingOffset;
      if (!isEnableCustomScroll()) {
        if (!isSafari()) {
          lenis.scrollTo(target, {
            offset: paddingOffset,
            immediate: false,
            duration: 0.5,
            easing: (t) => t,
          });
        } else {
          bodyScrollBar.scrollIntoView(target, {
            offsetLeft: 0,
            offsetTop: paddingOffset,
            alignToTop: true,
            onlyScrollIfNeeded: false,
          });
        }
      } else {
        window.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });
      }
      event.preventDefault();
    });
  });
}
//--------------------------------------------------------------------
if (window.innerWidth < 768) {
  const brs = document.querySelectorAll(
    "#s-hero__title br, #s-hero__txt-wrap br",
  );
  brs.forEach((br) => br.remove());
}
//--------------------------------------------------------------------
const splitTextElements = document.querySelectorAll(".split-text-init-js");
splitTextElements.forEach((item) => {
  if (item.classList.contains("split-text-lines-js")) {
    const targets = item.querySelectorAll("p, li, h4, h3, h5, h6");
    //mask: 'lines',
    if (targets.length > 0) {
      targets.forEach((el) => {
        new SplitText(el, {
          type: "lines",
          linesClass: "line-st",
          aria: "none",
          mask: "lines",
          tag: "span"
        });
      });
    } else {
      new SplitText(item, {
        type: "lines",
        linesClass: "line-st",
        aria: "none",
        mask: "lines",
        tag: "span"
      });
    }
  } else if (item.classList.contains("split-text-chars-js")) {
    new SplitText(item, {
      type: "chars,lines",
      linesClass: "line-st",
      charsClass: "char-st",
      aria: "none",
      mask: "lines",
      tag: "span"
    });
  }
  // else if (item.classList.contains('split-text-chars-2-js')) {
  //     new SplitText(item, {
  //         type: 'chars,lines', linesClass: 'line-st', charsClass: 'char-st', aria: 'none', mask: 'lines',
  //     });
  // }
});
let internal_blocks = document.querySelectorAll(".internal-anim-block-js"),
  header_line = document.querySelector("#header__line-top");
if (!is_preloader && internal_blocks.length > 0) {
  header_line.classList.add("transition-smooth");
  header_line.classList.remove("header__line-top--anim");
  internal_blocks.forEach((el) => {
    el.classList.add("batch-item-js", "batch-item--static-js");
  });
}
let text_blocks = document.querySelectorAll(
  ".children-batch-anim-js > *:not(blockquote):not(br)",
);
if (text_blocks.length > 0) {
  text_blocks.forEach((el) => {
    el.classList.add("batch-item-js", "batch-item--static-js");
  });
}
let blockquote_blocks = document.querySelectorAll(
  ".children-batch-anim-js:not(.children-batch-anim-secondary-js) > blockquote",
);
let blockquote_blocks_secondary = document.querySelectorAll(
  ".children-batch-anim-js.children-batch-anim-secondary-js > blockquote",
);
if (blockquote_blocks.length > 0) {
  blockquote_blocks.forEach((el) => {
    const line1 = document.createElement("div");
    line1.classList.add("blockquote-line", "blockquote-line");
    // const line2 = document.createElement('div');
    // line2.classList.add('blockquote-line', 'blockquote-line-bottom');
    const wrapper = document.createElement("div");
    wrapper.classList.add("blockquote-lines-wrapper");
    wrapper.appendChild(el.cloneNode(true));
    el.parentNode.replaceChild(wrapper, el);
    wrapper.appendChild(line1);
    // wrapper.appendChild(line2);
    wrapper.classList.add(
      "batch-item-js",
      "batch-item--special-child-js",
      "blockquote-added-lines",
    );
  });
}
if (blockquote_blocks_secondary.length > 0) {
  blockquote_blocks_secondary.forEach((el) => {
    const line1 = document.createElement("div");
    line1.classList.add("blockquote-line-secondary", "blockquote-line-top");
    const line2 = document.createElement('div');
    line2.classList.add('blockquote-line-secondary', 'blockquote-line-bottom');
    const wrapper = document.createElement("div");
    wrapper.classList.add("blockquote-lines-wrapper-secondary");
    wrapper.appendChild(el.cloneNode(true));
    el.parentNode.replaceChild(wrapper, el);
    wrapper.appendChild(line1);
    wrapper.appendChild(line2);
    wrapper.classList.add(
      "batch-item-js",
      "batch-item--special-child-js",
      "blockquote-added-lines",
    );
  });
}
// Batch animation logic
const batchItems = document.querySelectorAll(".batch-item-js");
if (batchItems.length > 0) {
  if (
    document.querySelectorAll(
      ".batch-item--text-js.split-text-lines-js .line-st",
    ).length > 0
  ) {
    gsap.set(".batch-item--text-js.split-text-lines-js .line-st", {
      y: 30,
      autoAlpha: 0,
    });
  }
  if (
    document.querySelectorAll(
      ".batch-item--text-js.split-text-chars-js .char-st",
    ).length > 0
  ) {
    gsap.set(".batch-item--text-js.split-text-chars-js .char-st", {
      autoAlpha: 0,
      y: 30,
    });
  }
  // if (document.querySelectorAll('.batch-item--text-up-js.split-text-chars-2-js .char-st').length > 0) {
  //     gsap.set('.batch-item--text-up-js.split-text-chars-2-js .char-st', {
  //         autoAlpha: 0, y: 30
  //     });
  // }
  if (document.querySelectorAll(".batch-item--def-js").length > 0) {
    gsap.set(".batch-item--def-js", {
      y: 30,
      autoAlpha: 0,
    });
  }
  if (document.querySelectorAll(".batch-item--special-child-js").length > 0) {
    gsap.set(".batch-item--special-child-js blockquote", {
      y: 30,
      autoAlpha: 0,
    });
  }
  if (document.querySelectorAll(".batch-item--static-js").length > 0) {
    gsap.set(".batch-item--static-js", {
      autoAlpha: 0,
    });
  }
  if (document.querySelectorAll(".batch-item--from-right-js").length > 0) {
    gsap.set(".batch-item--from-right-js", {
      x: "15%",
      autoAlpha: 0,
    });
  }
  if (document.querySelectorAll(".batch-item--from-left-js").length > 0) {
    gsap.set(".batch-item--from-left-js", {
      y: "-15%",
      autoAlpha: 0,
    });
  }
  if (document.querySelectorAll(".batch-item--scale-js").length > 0) {
    gsap.set(".batch-item--scale-js", {
      autoAlpha: 0,
    });
    gsap.set(".batch-scale-block-js", {
      scale: 1.5,
    });
  }
  if (document.querySelectorAll(".batch-item--scale-y-js").length > 0) {
    gsap.set(".batch-item--scale-y-js", {
      scaleY: 0,
    });
  }
  if (document.querySelectorAll(".batch-item--scale-x-js").length > 0) {
    gsap.set(".batch-item--scale-x-js", {
      scaleX: 0,
    });
  }
  if (document.querySelectorAll(".arrow-link-js").length > 0) {
    gsap.set(".arrow-link-js .char-st", {
      autoAlpha: 0,
    });
    gsap.set(".arrow-link-js .arrow-link__arrow-js", {
      autoAlpha: 0,
      x: -20,
    });
    gsap.set(".arrow-link-js .arrow-link__circle-part-js", {
      strokeDashoffset: 55,
    });
  }
  function animation_def({
    card,
    ease_default = "power1.out",
    index = 0,
    is_static = false,
    use_events = false,
  } = {}) {
    if (!is_static) {
      gsap.to(card, {
        duration: 0.7,
        ease: ease_default,
        x: 0,
        y: 0,
        delay: index * 0.1,
      });
    }
    gsap.to(card, {
      duration: 0.5,
      ease: ease_default,
      autoAlpha: 1,
      delay: index * 0.1 + 0.1,
      onStart: function () {
        if (use_events) {
          card.classList.add("start-animation");
        }
      },
      onComplete: function () {
        if (use_events) {
          card.classList.add("end-animation");
        }
      },
    });
  }
  function each_batch(batch) {
    batch.forEach((card, index) => {
      if (card.classList.contains("batch-item--def-js")) {
        animation_def({ card: card, index: index });
      }
      if (card.classList.contains("batch-item--special-child-js")) {
        gsap.to(card.querySelector("blockquote"), {
          duration: 0.7,
          ease: "power1.out",
          x: 0,
          y: 0,
          delay: index * 0.1,
        });
        gsap.to(card.querySelector("blockquote"), {
          duration: 0.5,
          ease: "power1.out",
          autoAlpha: 1,
          delay: index * 0.1 + 0.1,
          onStart: function () {
            card.classList.add("start-animation");
          },
          onComplete: function () {
            card.classList.add("end-animation");
          },
        });
      }
      if (card.classList.contains("batch-item--static-js")) {
        animation_def({ card: card, index: index, is_static: true });
      }
      if (card.classList.contains("batch-item--from-right-js")) {
        animation_def({ card: card, index: index });
      }
      if (card.classList.contains("batch-item--from-left-js")) {
        animation_def({ card: card, index: index });
      }
      if (card.classList.contains("batch-item--scale-js")) {
        gsap.to(card, {
          duration: 1.5,
          ease: "power4.inOut",
          autoAlpha: 1,
          delay: index * 0.1,
        });
        gsap.to(card.querySelector(".batch-scale-block-js"), {
          duration: 1.3,
          ease: "power4.inOut",
          scale: 1,
          delay: index * 0.1,
        });
      }
      if (card.classList.contains("batch-item--scale-y-js")) {
        if (card.classList.contains("batch-item--scale-y-fast-js")) {
          gsap.to(card, {
            scaleY: 1,
            duration: 1,
            ease: "power4.inOut",
            delay: index * 0.1,
          });
        } else {
          gsap.to(card, {
            scaleY: 1,
            duration: 2,
            ease: "power4.inOut",
            delay: index * 0.1,
          });
        }
      }
      if (card.classList.contains("batch-item--scale-x-js")) {
        if (card.classList.contains("batch-item--scale-x-fast-js")) {
          gsap.to(card, {
            scaleX: 1,
            duration: 1,
            ease: "power4.inOut",
            delay: index * 0.1,
          });
        } else {
          gsap.to(card, {
            scaleX: 1,
            duration: 2,
            ease: "power4.inOut",
            delay: index * 0.1,
          });
        }
      }
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
            delay: index * 0.2,
            onComplete: function () {
              card.classList.add("disable-clip");
            },
          },
        );
      }
      if (card.classList.contains("split-text-lines-js")) {
        const lines = card.querySelectorAll(".line-st");
        gsap.to(lines, {
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power1.out",
          delay: index * 0.1,
        });
        gsap.to(lines, {
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power1.out",
          delay: index * 0.1 + 0.1,
        });
      }
      // if (card.classList.contains('split-text-chars-js')) {
      //     const chars = card.querySelectorAll('.char-st');
      //     gsap.to(chars, {
      //         duration: 0.2, stagger: 0.15, ease: 'power3.inOut', autoAlpha: 1, delay: index * 0.1
      //     });
      // }
      if (card.classList.contains("split-text-chars-js")) {
        const chars = card.querySelectorAll(".char-st");
        let staggerDelay = 0.05;
        if (chars.length < 10) {
          staggerDelay = 0.1;
        }
        gsap.to(chars, {
          duration: 0.4,
          stagger: staggerDelay,
          ease: "power1.out",
          autoAlpha: 1,
          delay: index * 0.1 + 0.1,
        });
        gsap.to(chars, {
          duration: 0.3,
          stagger: staggerDelay,
          ease: "power1.out",
          y: 0,
          delay: index * 0.1,
        });
      }
      if (card.classList.contains("arrow-link-js")) {
        gsap.to(card.querySelectorAll(".char-st"), {
          autoAlpha: 1,
          stagger: 0.01,
          ease: "power1.out",
          delay: index * 0.1 + 0.1,
          onComplete: function () {
            card.classList.remove("batch-item-js");
          },
        });
        gsap.to(card.querySelector(".arrow-link__arrow-js"), {
          autoAlpha: 1,
          x: 0,
          ease: "power1.out",
          delay: index * 0.1,
        });
        gsap.to(card.querySelectorAll(".arrow-link__circle-part-js"), {
          strokeDashoffset: 0,
          ease: "power1.out",
          delay: index * 0.1,
        });
      }
    });
  }
  ScrollTrigger.batch(
    ".batch-item-js:not(.batch-hero-item-js):not(.batch-item--secondary-js)",
    {
      start: "top bottom-=100",
      once: true,
      onEnter: (batch) => {
        each_batch(batch);
      },
    },
  );
  ScrollTrigger.batch(".batch-item--secondary-js", {
    start: "top bottom-=50",
    once: true,
    onEnter: (batch) => {
      each_batch(batch);
    },
  });
  ScrollTrigger.batch(".batch-hero-item-js", {
    start: "top bottom",
    once: true,
    onEnter: (batch) => {
      each_batch(batch);
    },
  });
}
//--------------------------------------------
const parallaxes = document.querySelectorAll(".parallax-js");
if (parallaxes.length) {
  parallaxes.forEach((el) => {
    const isImg = el.classList.contains("parallax-img-js");
    const useWillChange = el.classList.contains("use-will-change-js");
    const isBlock = el.classList.contains("parallax-block-js");
    const isReverse = el.classList.contains("parallax-reverse-js");
    const translateValue = parseFloat(el.dataset.parallaxValue) || 0;
    const translateY = el.classList.contains("parallax-y-js")
      ? translateValue
      : 0;
    const translateX = el.classList.contains("parallax-x-js")
      ? translateValue
      : 0;
    const scale = el.classList.contains("parallax-scale-js")
      ? translateValue
      : 1;
    const scrubVal =
      el.dataset.parallaxScrub !== undefined ? el.dataset.parallaxScrub : 1;
    const startPos = el.dataset.parallaxTriggerStart || "top bottom";
    const endPos = el.dataset.parallaxTriggerEnd || "bottom top";
    const trig = el.classList.contains("is-parallax-trigger-js")
      ? el.closest(".parallax-trigger-js")
      : el;
    const trigEnd = el.dataset.endTrigger || trig;
    if (isImg && (translateY || translateX)) {
      const translateYVal = isReverse ? 0 : -translateY;
      const translateXVal = isReverse ? 0 : -translateX;
      Object.assign(el.style, {
        height: `calc(100% + ${translateY}%)`,
        width: `calc(100% + ${translateX}%)`,
        position: "relative",
        top: `${translateYVal}%`,
        left: `${translateXVal}%`,
      });
    }
    if (isBlock && (translateY || translateX)) {
      let translateYVal = translateY / 2;
      let translateXVal = translateX / 2;
      if (!isReverse) {
        translateYVal *= -1;
        translateXVal *= -1;
      }
      Object.assign(el.style, {
        position: "relative",
        top: `${translateYVal}%`,
        left: `${translateXVal}%`,
      });
    }
    const section = el.closest("section");
    let bro_safari = isSafari();
    const parallaxTL = gsap.timeline({
      scrollTrigger: {
        trigger: trig,
        endTrigger: trigEnd,
        start: startPos,
        end: endPos,
        scrub: scrubVal,
        // markers: true,
        pin: false,
        onEnter: () => {
          if (bro_safari && section && useWillChange)
            section.classList.add("use-will-change-on-children");
        },
        onLeave: () => {
          if (bro_safari && section && useWillChange)
            section.classList.remove("use-will-change-on-children");
        },
        onEnterBack: () => {
          if (bro_safari && section && useWillChange)
            section.classList.add("use-will-change-on-children");
        },
        onLeaveBack: () => {
          if (bro_safari && section && useWillChange)
            section.classList.remove("use-will-change-on-children");
        },
      },
    });
    let translateYVal = translateY;
    let translateXVal = translateX;
    if (isReverse) {
      if (translateY) translateYVal = -translateY + 3;
      if (translateX) translateXVal = -translateX + 3;
    }
    parallaxTL.to(el, {
      xPercent: translateXVal,
      yPercent: translateYVal,
      scale: scale,
      duration: 1,
      ease: "none",
    });
  });
}
//--------------------------------------------
function slideUp(element, duration = 300, callback) {
  if (!element || element.dataset.sliding === "true") return;
  element.dataset.sliding = "true";
  const style = window.getComputedStyle(element);
  const height = element.offsetHeight;
  element.style.height = height + "px";
  element.style.overflow = "hidden";
  element.style.transition = `height ${duration}ms ease, opacity ${duration}ms ease`;
  element.offsetHeight; // force reflow
  requestAnimationFrame(() => {
    element.style.height = "0px";
    element.style.opacity = "0";
  });
  setTimeout(() => {
    element.style.display = "none";
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition");
    element.style.removeProperty("opacity");
    delete element.dataset.sliding;
    if (typeof callback === "function") callback();
  }, duration);
}
function slideDown(element, duration = 300, callback) {
  if (!element || element.dataset.sliding === "true") return;
  element.dataset.sliding = "true";
  element.style.removeProperty("display");
  let display = window.getComputedStyle(element).display;
  // console.log(window.getComputedStyle(element).display)
  if (display === "none") display = "block";
  element.style.display = display;
  element.style.height = "auto";
  const targetHeight = element.offsetHeight;
  element.style.height = "0";
  element.style.opacity = "0";
  element.style.overflow = "hidden";
  element.offsetHeight; // force reflow
  element.style.transition = `height ${duration}ms ease, opacity ${duration}ms ease`;
  requestAnimationFrame(() => {
    element.style.height = targetHeight + "px";
    element.style.opacity = "1";
  });
  setTimeout(() => {
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition");
    element.style.removeProperty("opacity");
    delete element.dataset.sliding;
    if (typeof callback === "function") callback();
  }, duration);
}
//--------------------------------------------
if (isTouchDevice()) {
  document.body.classList.add("is-touch-device");
}
//--------------------------------------------
document.querySelectorAll(".video-js").forEach((video) => {
  video.addEventListener("mouseenter", () => {
    if (video.paused) {
      video.play();
    }
  });
  video.addEventListener("mouseleave", () => {
    if (!video.paused) {
      video.pause();
    }
  });
});
document.querySelectorAll(".video-overlay-js").forEach((overlay) => {
  overlay.addEventListener("mouseenter", () => {
    const parent =
      overlay.closest(".video-container-js") || overlay.parentElement;
    const video = parent.querySelector(".video-js");
    if (video && video.paused) {
      video.play();
    }
  });
  overlay.addEventListener("mouseleave", () => {
    const parent =
      overlay.closest(".video-container-js") || overlay.parentElement;
    const video = parent.querySelector(".video-js");
    if (video && !video.paused) {
      video.pause();
    }
  });
});
//--------------------------------------------
// tl_hero.from('.hero-anim-js', {
//     stagger: 0.15, autoAlpha: 0,
// })
// tl_hero.play();
//--------------------------------------------------------------------
const animContainers = document.querySelectorAll(".container-anim-js");
if (animContainers.length > 0) {
  gsap.set(animContainers, {
    autoAlpha: 1,
  });
}
//-------------------------------------------------------------------
const sections_in_view = document.querySelectorAll(
  ".trigger-safari-section-js",
);
if (sections_in_view.length && isSafari()) {
  sections_in_view.forEach((section) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => section.classList.add("section-in-view"),
        onLeave: () => section.classList.remove("section-in-view"),
        onEnterBack: () => section.classList.add("section-in-view"),
        onLeaveBack: () => section.classList.remove("section-in-view"),
      },
    });
  });
}
//-------------------------------------------------------------------
const videos = document.querySelectorAll(".video-js");
if (videos.length) {
  videos.forEach((video) => {
    const container = video.closest(".container-video-js"),
      parent = video.parentElement;
    function play() {
      video.play();
    }
    function pause() {
      video.pause();
    }
    pause();
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: play,
        onLeave: pause,
        onEnterBack: play,
        onLeaveBack: pause, // markers: true,
      },
    });
    function addClassIfPlaying() {
      if (!video.paused && !video.ended) {
        parent.classList.add("child-video-play");
      }
    }
    video.addEventListener("play", () => {
      parent.classList.add("child-video-play");
    });
    video.addEventListener("pause", () => {
      parent.classList.remove("child-video-play");
    });
    video.addEventListener("ended", () => {
      parent.classList.remove("child-video-play");
    });
    addClassIfPlaying();
  });
}
//-------------------------------------------------------------------
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=/";
}
function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}
document
  .querySelectorAll(".modal__close-btn,.modal__overlay")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.classList.remove("is-open");
        document.body.classList.remove("is-open-modal");
        if (modal.id === "modal") {
          setCookie("modalClose", "true", 7);
          // enableScroll();
        }
      }
    });
  });
document.querySelectorAll(".modal-caller-js").forEach((caller) => {
  caller.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSelector = caller.getAttribute("href");
    const modal = document.querySelector(targetSelector);
    if (modal) {
      modal.classList.add("is-open");
      document.body.classList.add("is-open-modal");
    }
  });
});
let hero_line = document.querySelector("#s-hero-line");
function hero_line_anim() {
  if (hero_line) {
    hero_line.classList.add("play");
    gsap.timeline({
      scrollTrigger: {
        trigger: hero_line,
        start: "bottom top",
        end: "bottom top",
        onLeave: () => hero_line.classList.remove("play"),
        onEnterBack: () => hero_line.classList.add("play"),
      },
    });
  }
}
if (window.innerWidth < 992) {
  document
    .querySelectorAll(
      ".header__nav-middle .internal-anim-block-js,.header__nav-top .internal-anim-block-2-js",
    )
    .forEach((el) => {
      el.classList.remove("internal-anim-block-js", "internal-anim-block-2-js");
    });
}
if (!!tl_preloader) {
  let tl_hero = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
    },
  });
  if (document.querySelector("#header__line-top")) {
    tl_hero.to(
      "#header__line-top",
      {
        scaleX: 1,
        duration: 1,
      },
      0,
    );
  }
  if (document.querySelectorAll(".internal-anim-block-js").length > 0) {
    tl_hero.from(
      ".internal-anim-block-js",
      {
        autoAlpha: 0,
      },
      0,
    );
  }
  if (document.querySelectorAll(".internal-anim-block-2-js").length > 0) {
    tl_hero.from(
      ".internal-anim-block-2-js",
      {
        autoAlpha: 0,
      },
      0,
    );
  }
  tl_hero
    .from(
      "#s-hero__kicker-def",
      {
        autoAlpha: 0,
      },
      0,
    )
    .from(
      "#s-hero__title .line-st",
      {
        autoAlpha: 0,
        y: 30,
        ease: "power1.out",
        stagger: 0.05,
      },
      ">-.25",
    )
    .from(
      "#s-hero__txt-wrap .line-st",
      {
        autoAlpha: 0,
        y: 30,
        ease: "power1.out",
        stagger: 0.05,
      },
      ">-.25",
    )
    .from(
      "#s-hero__btn-wrap",
      {
        autoAlpha: 0,
      },
      ">-.25",
    );
  gsap.set(".container-hero-anim-js", {
    autoAlpha: 1,
  });
  // console.log(tl_preloader.duration())
  tl_preloader.then(function () {
    gsap.delayedCall(0.1, function () {
      tl_hero.play();
      hero_line_anim();
      gsap.delayedCall(2, function () {
        if (getCookie("modalClose") !== "true") {
          document.querySelector("#modal").classList.add("is-open");
          document.body.classList.add("is-open-modal");
          // disableScroll();
          // console.log('open');
        }
      });
    });
  });
}
if (!tl_preloader) {
  hero_line_anim();
  if (getCookie("modalClose") !== "true") {
    gsap.delayedCall(4, function () {
      document.querySelector("#modal").classList.add("is-open");
      document.body.classList.add("is-open-modal");
      // disableScroll();
      // console.log('open');
    });
  }
}
//-------------------------------------------------------------------
const header_nav = document.querySelector("#header__nav");
const header_btns = document.querySelector("#header-mob-btns");
if (header_nav && header_btns) {
  function moveNavItems() {
    if (window.innerWidth < 992 && header_nav.children.length > 0) {
      [...header_nav.querySelectorAll("li")].forEach((li) =>
        header_btns.appendChild(li),
      );
    }
    if (window.innerWidth > 991 && header_btns.children.length > 0) {
      [...header_btns.querySelectorAll("li")].forEach((li) =>
        header_nav.appendChild(li),
      );
    }
  }
  moveNavItems();
  window.addEventListener(
    "resize",
    debounce(function (e) {
      moveNavItems();
    }),
  );
}
//-------------------------------------------------------------------
if (document.querySelectorAll(".header-full-menu__content-block-row").length) {
  function block_mix() {
    document
      .querySelectorAll(".header-full-menu__content-block-row")
      .forEach((item) => {
        const respBlock = item.querySelector(
          ".header-full-menu__content-block-col--responsive",
        );
        const blocks = item.querySelectorAll(
          ".header-full-menu__content-block-col--1, .header-full-menu__content-block-col--2, .header-full-menu__content-block-col--4",
        );
        if (window.innerWidth < 1200 && respBlock && item.children.length > 2) {
          blocks.forEach((block) => {
            respBlock.appendChild(block);
          });
        }
        if (
          window.innerWidth > 1199 &&
          respBlock &&
          respBlock.children.length > 0
        ) {
          blocks.forEach((block) => {
            item.appendChild(block);
          });
        }
      });
  }
  block_mix();
  window.addEventListener(
    "resize",
    debounce(function (e) {
      block_mix();
    }),
  );
}
//-------------------------------------------------------------------
let header_mob_btn = document.querySelector("#header-mob-btns");
if (header_mob_btn) {
  gsap.timeline({
    scrollTrigger: {
      trigger: "#footer",
      start: "top bottom", // markers: true,
      onEnter: () => header_mob_btn.classList.add("hide-object"),
      onLeaveBack: () => header_mob_btn.classList.remove("hide-object"),
    },
  });
}
//-------------------------------------------------------------------
const accItems = document.querySelectorAll(".acc-items-js");
if (accItems.length) {
  accItems.forEach((item) => {
    const titles = item.querySelectorAll(
      ".acc-title-js:not(.acc-title-disable-js)",
    );
    titles.forEach((title) => {
      title.addEventListener("click", (e) => {
        e.preventDefault();
        const accItem = title.closest(".acc-item-js");
        const accContent = accItem.querySelector(".acc-content-js");
        let accBlockActive =
          Array.from(item.querySelectorAll(".acc-item-js.open")).filter(
            (el) => el !== accItem,
          )[0] || null;
        const accContentActive = accBlockActive
          ? accBlockActive.querySelector(".acc-content-js")
          : null;
        if (accItem.classList.contains("open")) {
          accItem.classList.remove("open");
          accItem.classList.add("pointer-event-none");
          slideUp(accContent, 400, () => {
            ScrollTrigger.refresh(true);
            accItem.classList.remove("pointer-event-none");
          });
        } else {
          if (accBlockActive) {
            accBlockActive.classList.remove("open");
            accBlockActive.classList.add("pointer-event-none");
            slideUp(accContentActive, 400, () => {
              ScrollTrigger.refresh(true);
              accBlockActive.classList.remove("pointer-event-none");
            });
          }
          accItem.classList.add("open");
          accItem.classList.add("pointer-event-none");
          slideDown(accContent, 400, () => {
            ScrollTrigger.refresh(true);
            accItem.classList.remove("pointer-event-none");
          });
        }
      });
    });
  });
}
//-------------------------------------------------------------------
if (
  document.querySelectorAll(".header__nav-middle-link-js").length > 0 &&
  window.innerWidth < 1200
) {
  document.querySelectorAll(".header__nav-middle-link-js").forEach((el) => {
    el.classList.remove("header__nav-middle-link-js");
  });
}
//-------------------------------------------------------------------
document
  .querySelectorAll(".menu__child-list-link-js")
  .forEach(function (item, i) {
    const id = item.dataset.id;
    const slide = document.querySelector(id);
    if (slide) {
      const panelId = id.replace(/^#/, "") + "-panel";
      const content = slide.querySelector(".menu__sub-child-list");
      const panelHtml = document.createElement("div");
      panelHtml.id = panelId;
      panelHtml.className = `menu menu--secondary ${panelId} menu-js position-absolute`;
      panelHtml.innerHTML = `
            <div class="menu__content menu__content-js">
                <div class="menu__content-back-btn-wrap">
                    <a class="link-inner-wrap menu__content-back-btn close-menu-btn-js" href="${id}">
                        <svg class="btn__icon btn__icon--prev menu__content-back-btn-icon btn__icon--rotate-2 transition-def" height="22" width="22" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="#arrow-right"></use>
                        </svg>
                        <span class="link-inner">Back</span>
                    </a>
                </div>
            </div>
        `;
      const contentClone = content.cloneNode(true);
      panelHtml.querySelector(".menu__content-js").appendChild(contentClone);
      document.getElementById("menus").appendChild(panelHtml);
    }
  });
//-------------------------------------------------------------------
document.querySelectorAll(".header__caller-menu-js").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const menuSelector = this.getAttribute("href");
    const menu = document.querySelector(menuSelector);
    if (menu) {
      menu.classList.add("is-open");
    }
  });
});
document.querySelectorAll(".close-menu-btn-js").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const menu = this.closest(".menu-js"),
      search = this.closest(".search-menu-js");
    if (menu) {
      menu.classList.remove("is-open");
    }
    if (search) {
      search.classList.remove("is-open");
    }
  });
});
//-------------------------------------------------------------------
let hideMenuTimeout;
const links = document.querySelectorAll(".header__nav-middle-link-js");
const menus = document.querySelectorAll(".menu-js");
if (links.length > 0 && menus.length > 0) {
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      // document.getElementById('search-menu')?.classList.remove('is-open');
      // document.querySelector('#header__search-link')?.classList.remove('is-active');
      // document.body.classList.remove('is-open-menu-2');
      clearTimeout(hideMenuTimeout);
      const menuSelector = link.dataset.id;
      const menu = document.querySelector(menuSelector);
      links.forEach((el) => el.classList.remove("is-active"));
      menus.forEach((el) => {
        if (el !== menu) {
          el.classList.remove("is-open");
        }
      });
      link.classList.add("is-active");
      if (menu) menu.classList.add("is-open");
      // document.body.classList.add('is-open-menu');
    });
    // link.addEventListener('mouseleave', () => startHideTimer());
  });
  menus.forEach((menu) => {
    // menu.addEventListener('mouseleave', () => startHideTimer());
    menu.addEventListener("mouseenter", () => clearTimeout(hideMenuTimeout));
  });
}
function startHideTimer() {
  hideMenuTimeout = setTimeout(() => {
    const isLinkHovered = Array.from(links).some((el) => el.matches(":hover"));
    const isMenuHovered = Array.from(menus).some((el) => el.matches(":hover"));
    if (!isLinkHovered && !isMenuHovered) {
      document.body.classList.remove("is-open-menu");
      links.forEach((el) => el.classList.remove("is-active"));
      menus.forEach((el) => el.classList.remove("is-open"));
    }
  }, 100);
}
//-------------------------------------------------------------------
document.querySelectorAll("#header__search-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const searchMenuSelector = this.getAttribute("href");
    const searchMenu = document.querySelector(searchMenuSelector);
    this.classList.toggle("is-active");
    if (searchMenu) {
      searchMenu.classList.toggle("is-open");
      // searchMenu.classList.toggle('is-open-width-header');
    }
    // document.body.classList.toggle('is-open-menu-2');
    // document.body.classList.remove('is-open-menu');
  });
});
//-------------------------------------------------------------------
document
  .getElementById("search-menu__search")
  .addEventListener("input", function (e) {
    const value = e.target.value;
    if (/[a-zа-яё0-9]/i.test(value)) {
      document
        .getElementById("search-menu__search-btn")
        ?.classList.remove("is-active");
      document
        .getElementById("search-menu__search-clear")
        ?.classList.add("is-active");
      document.getElementById("search-menu__col--2")?.classList.add("d-none");
      document
        .getElementById("search-menu__results-block")
        ?.classList.remove("d-none");
    }
  });
document
  .getElementById("search-menu__search-clear")
  .addEventListener("click", function () {
    const input = document.getElementById("search-menu__search");
    input.value = "";
    document
      .getElementById("search-menu__search-btn")
      ?.classList.add("is-active");
    this.classList.remove("is-active");
    document.getElementById("search-menu__col--2")?.classList.remove("d-none");
    document
      .getElementById("search-menu__results-block")
      ?.classList.add("d-none");
  });
//-------------------------------------------------------------------
const txt1 = document.querySelector("#footer__title-txt--1");
const txt2 = document.querySelector("#footer__title-txt--2");
const footerTitle = document.querySelector("#footer__title");
if (txt1 && txt2 && footerTitle) {
  new SplitText([txt1, txt2], {
    type: "chars,lines",
    linesClass: "line-st",
    charsClass: "char-st",
    aria: "none",
  });
  const tl_text = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.25,
      ease: "power1.out",
      stagger: 0.05,
    },
  });
  gsap.set("#footer__title-txt--2 .char-st", {
    autoAlpha: 0,
  });
  tl_text
    .to(
      "#footer__title-txt--1 .char-st",
      {
        autoAlpha: 0,
      },
      0,
    )
    .to(
      "#footer__title-txt--2 .char-st",
      {
        autoAlpha: 1,
      },
      0,
    );
  gsap.set("#footer__title-txt--2", {
    autoAlpha: 1,
  });
  footerTitle.addEventListener("mouseenter", () => {
    tl_text.play();
  });
  footerTitle.addEventListener("mouseleave", () => {
    tl_text.reverse();
  });
}
//-------------------------------------------------------------------
const valueItems = document.querySelectorAll(".value-item-js");
const overlayPics = document.querySelectorAll(".s-values__overlay-pic-js");
if (valueItems.length) {
  valueItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const idPic = item.dataset.pic;
      const targetPic = document.querySelector(idPic);
      overlayPics.forEach((pic) => pic.classList.remove("is-active"));
      if (targetPic) targetPic.classList.add("is-active");
    });
  });
  function reposPics() {
    if (window.innerWidth < 1200) {
      valueItems.forEach((item) => {
        const idPic = item.dataset.pic;
        const targetPic = document.querySelector(idPic);
        if (targetPic) item.appendChild(targetPic);
      });
    }
  }
  reposPics();
  window.addEventListener(
    "resize",
    debounce(() => {
      reposPics();
    }),
  );
}
//-------------------------------------------------------------------
let wrap = document.querySelector("#s-hero__bottom-nav-wrap"),
  titleWrap = document.querySelector("#s-hero__bottom-nav-slide-title-wrap"),
  dropdown = document.querySelector("#s-hero__bottom-dropdown");
if (wrap && titleWrap && dropdown) {
  let setDropdownWidth = () => {
    let title_width = titleWrap.getBoundingClientRect().width,
      container_width = wrap.getBoundingClientRect().width;
    document.documentElement.style.setProperty(
      "--hero_dropdown_width",
      `${container_width - title_width}px`,
    );
  };
  // if(window.innerWidth > 992) {
  setDropdownWidth();
  window.addEventListener(
    "resize",
    debounce(() => {
      setDropdownWidth();
    }),
  );
  window.addEventListener("load", () => {
    setDropdownWidth();
  });
  // }
}
//-------------------------------------------------------------------
  const shareBtns = document.querySelectorAll("[data-share]");
  if (shareBtns.length) {
    shareBtns.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const shareData = {
          title: document.title,
          text: document.title,
          url: window.location.href,
        };

        // Mobile / modern browsers
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.warn("Share cancelled");
          }
          return;
        }

        // Fallback — copy link
        try {
          await navigator.clipboard.writeText(shareData.url);
          showShareFeedback(btn);
        } catch (err) {
          alert("Link copied");
        }
      });
    });
    function showShareFeedback(btn) {
      btn.classList.add("is-copied");
      setTimeout(() => btn.classList.remove("is-copied"), 1500);
    }
  }
  //-------------------------------------------------------------------
document.body.classList.add("scripts-loaded");
