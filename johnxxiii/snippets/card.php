<?php
if (!isset($card_img)) $card_img = null;
if (!isset($card_title)) $card_title = null;
if (!isset($card_text)) $card_text = null;
if (!isset($card_class)) $card_class = '';
?>
<div class="card <?= $card_class ?> dark-theme overflow-hidden d-flex flex-column z-index-1 position-relative batch-item-js batch-item--clip-js">
  <a href="#" class="link-mask"></a>
  <div class="card__pic-wrap z-index-min-1 def-position w-100 h-100 position-absolute">
    <img
        class="card__pic w-100 h-100 obj-cover"
        style="object-position: 50% 30%"
        src="./assets/images/<?= $card_img ?>"
        loading="lazy"
        alt="<?= $card_title ?>"
    >
  </div>
  <div class="card__content-wrap position-relative z-index-1 mt-auto after-el after-el--full">
    <div class="card__content">
      <h3 class="card__title"><?= $card_title ?></h3>
      <div class="card__txt-wrap-2  position-relative">
        <div class="card__circle position-absolute d-flex align-items-center justify-content-center">
          <svg class="card__circle-arrow" width="21" height="16" viewBox="0 0 21 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <use href="#arrow-middle-right"></use>
          </svg>
        </div>
        <div class="card__txt-wrap last-el-mb-0">
          <?= $card_text ?>
        </div>
      </div>
    </div>
  </div>
</div>