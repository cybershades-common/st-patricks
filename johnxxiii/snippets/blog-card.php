 <?php
 if (!isset($card_img)) $card_img = null;
 if (!isset($card_title)) $card_title = null;
 if (!isset($card_category)) $card_category = null;
 if (!isset($card_label)) $card_label = null;
 if (!isset($card_class)) $card_class = '';
 ?>
 <div class="s-blog__item-js s-new-cards__item-col col-xl-3 col-lg-4 col-sm-6 col-12 <?= $card_class; ?>">
  <div class="s-new-cards__item-col-line  batch-item-js batch-item--scale-y-js d-sm-block d-none position-absolute"></div>
  <div class="new-item hover-pic-wrap link-inner-wrap position-relative d-flex flex-wrap z-index-1">
   <a href="#" class="link-mask"></a>
   <div class="new-item__pic-wrap w-100 overflow-hidden batch-item-js batch-item--clip-js batch-item--secondary-js">
    <img loading="lazy" class="new-item__pic transition-def pic-def-bg hover-pic w-100 h-100 obj-cover" src="./assets/images/<?= $card_img ?>" alt="pic">
   </div>
   <div class="new-item__content s-blog__item-content-js batch-item-js batch-item--static-js d-sm-flex flex-column align-items-start">
    <div class="new-item__label fw-400">
     <span class="fw-600 new-item__label-cat"><?= $card_category; ?></span><?= $card_label; ?>
    </div>
    <h3 class="new-item__title h6"><?= $card_title; ?></h3>
    <span class="new-item__btn mt-auto text-uppercase fw-500">
     <span class="new-item__btn-txt link-inner">Read Article</span>
     <svg class="btn__icon btn__icon--next transition-def" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <use href="#arrow-long-right"></use>
     </svg>
    </span>
   </div>
  </div>
 </div>