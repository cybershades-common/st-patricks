<?php
if (!isset($banner_video)) $banner_video = null;
if (!isset($banner_pic)) $banner_pic = null;
if (!isset($banner_title)) $banner_title = null;
if (!isset($banner_description)) $banner_description = null;
if (!isset($banner_class)) $banner_class = '';
if (!isset($banner_buttons)) $banner_buttons = [];
if (!isset($banner_pic_position) || empty($banner_pic_position)) {
  $banner_pic_position = '50% 30%';
}
?>
<section class="section-padding-def <?= $banner_class ?> container-video-js dark-theme position-relative s-banner d-flex align-items-lg-center align-items-end">
  <div class="overlay s-banner__overlay after-el after-el--full">
    <?php if (!empty($banner_video)): ?>
      <video class="video-js s-banner__overlay-pic w-100 h-100 obj-cover" src="./assets/videos/<?= $banner_video ?>" preload="metadata" playsinline muted loop></video>
    <?php endif; ?>
    <img class="video-poster-js transition-def w-100 h-100 position-absolute z-index-1 obj-cover" style="object-position:<?= $banner_pic_position ?>" loading="lazy" src="./assets/images/<?= $banner_pic ?>" alt="">
  </div>
  <div class="container container-anim-js s-banner__container position-relative z-index-2 text-center last-el-mb-0">
    <?php if (!empty($banner_title)): ?>
      <h2 class="s-banner__title batch-item-js batch-item--text-js split-text-init-js split-text-lines-js"><?= $banner_title ?></h2>
    <?php endif; ?>
    <?php if (!empty($banner_description)): ?>
      <div class="s-banner__txt-wrap last-el-mb-0 body-2 batch-item--static-js batch-item-js">
        <?= $banner_description ?>
      </div>
    <?php endif; ?>
    <?php if (!empty($banner_buttons) && is_array($banner_buttons)): ?>
    <div class="s-banner__btns d-flex flex-wrap justify-content-center">
        <?php foreach ($banner_buttons as $btn): ?>
          <div class="s-banner__btn-wrap batch-item--static-js batch-item-js">
            <a href="#" class="btn s-banner__btn <?= isset($btn['secondary']) && $btn['secondary'] ? 'btn--secondary' : 'color-1' ?>">
              <?= $btn['label'] ?>
            </a>
          </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
  </div>
</section>


