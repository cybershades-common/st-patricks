<?php
if (!isset($hero_video)) $hero_video = null;
if (!isset($hero_pic)) $hero_pic = null;
if (!isset($hero_kicker)) $hero_kicker = null;
if (!isset($hero_title)) $hero_title = null;
if (!isset($hero_description)) $hero_description = null;
if (!isset($hero_class)) $hero_class = '';
if (!isset($hero_buttons)) $hero_buttons = [];
if (!isset($hero_use_video_btn)) $hero_use_video_btn = false;
if (!isset($hero_pic_position) || empty($hero_pic_position)) {
  $hero_pic_position = '50% 30%';
}
if (!isset($hero_nav_title)) $hero_nav_title = null;
if (!isset($hero_nav_active)) $hero_nav_active = null;
if (!isset($hero_nav_items)) $hero_nav_items = [];
?>
<section class="s-hero <?= $hero_class ?> d-flex align-items-sm-center align-items-end container-video-js position-relative z-index-2 dark-theme mh-100vh">
  <div class="s-hero__overlay z-index-0 after-el--full after-el overlay">
    <div class="s-hero__overlay-2 position-absolute w-100 h-100 def-position z-index-2 after-el after-el--full before-el before-el--full"></div>
    <?php if (!empty($hero_video)): ?>
      <video class="s-hero__pic video-js w-100 h-100 obj-cover" src="./assets/videos/<?= $hero_video ?>" preload="metadata" playsinline="" muted="" loop=""></video>
    <?php endif; ?>
    <img loading="lazy" class="video-poster-js transition-def s-hero__overlay-pic w-100 h-100 position-absolute z-index-1 obj-cover" style="object-position:<?= $hero_pic_position ?>" src="./assets/images/<?= $hero_pic ?>" alt="">
  </div>
  <div class="container container-anim-js s-hero__container position-relative z-index-1 text-center">
    <div class="s-hero__content mx-auto">
      <?php if (!empty($hero_kicker)): ?>
        <h3 class="kicker-def s-hero__kicker-def batch-hero-item-js batch-item-js batch-item--static-js"><?= $hero_kicker ?></h3>
      <?php endif; ?>
      <?php if (!empty($hero_title)): ?>
        <h1 class="s-hero__title batch-hero-item-js batch-item-js batch-item--text-js split-text-init-js split-text-lines-js"><?= $hero_title ?></h1>
      <?php endif; ?>
      <?php if (!empty($hero_description)): ?>
        <div class="s-hero__txt-wrap ls-1 last-el-mb-0 batch-hero-item-js batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">
          <?= $hero_description ?>
        </div>
      <?php endif; ?>
      <?php if ($hero_use_video_btn): ?>
        <div class="s-hero__btn-wrap batch-hero-item-js batch-item-js batch-item--static-js">
          <a href="https://cim-school-videos-library.s3.ap-southeast-2.amazonaws.com/highlights_1.mp4" class="circle-btn bg-none s-hero__btn venobox-link transition-def d-flex align-items-center justify-content-center" data-autoplay="true" data-vbtype="video">
            <svg class="s-hero__btn-icon" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10.5L0 21V0L18 10.5Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      <?php endif; ?>
    </div>
  </div>
  <?php if (!empty($hero_nav_title) && !empty($hero_nav_items)): ?>
    <div id="s-hero__bottom-nav-wrap" class="s-hero__bottom-nav-wrap mx-auto d-flex align-items-center w-auto position-absolute after-el">
      <?php if (!empty($hero_nav_title)): ?>
        <div id="s-hero__bottom-nav-slide-title-wrap" class="s-hero__bottom-nav-slide-title-wrap container-anim-js">
          <span class="s-hero__bottom-nav-slide-title d-block fw-500 text-uppercase batch-hero-item-js batch-item-js batch-item--static-js"><?= $hero_nav_title ?></span>
        </div>
      <?php endif; ?>
      <div id="s-hero__bottom-dropdown" class="s-hero__bottom-dropdown container-anim-js">
        <?php if (!empty($hero_nav_active)): ?>
          <div id="s-hero__bottom-dropdown-title" class="s-hero__bottom-dropdown-title d-lg-none">
            <span class="s-hero__bottom-dropdown-title-txt w-100 d-block text-truncate"><?= $hero_nav_active ?></span>
            <svg class="s-hero__bottom-dropdown-icon position-absolute z-index-1 transition-def" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <use href="#arrow-down"></use>
            </svg>
          </div>
        <?php endif; ?>
        <div id="s-hero__bottom-nav" class="s-hero__bottom-nav swiper swiper-second-labels-js overflow-visible">
          <div class="swiper-wrapper s-hero__bottom-nav-wrapper">
            <?php foreach ($hero_nav_items as $item): ?>
              <div class="swiper-slide s-hero__bottom-nav-slide batch-hero-item-js batch-item-js batch-item--static-js">
                <a class="s-hero__bottom-nav-slide-link link-inner-wrap" href="#">
                  <span class="link-inner"><?= $item ?></span> </a>
              </div>
            <?php endforeach; ?>
          </div>
          <div class="s-hero__bottom-nav-btns-wrap  container-anim-js position-absolute d-xl-none">
            <div class="s-hero__bottom-nav-btns swiper-buttons d-flex justify-content-between batch-hero-item-js batch-item-js batch-item--static-js">
              <div class="swiper-button swiper-button--secondary swiper-button-prev d-flex align-items-center justify-content-center batch-hero-item-js">
                <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use href="#swiper-icon-prev"></use>
                </svg>
              </div>
              <div class="swiper-button swiper-button--secondary swiper-button-next d-flex align-items-center justify-content-center batch-hero-item-js">
                <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use href="#swiper-icon-next"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <?php endif; ?>
</section>