 <?php
 if (!isset($card_img)) $card_img = null;
 if (!isset($card_title)) $card_title = null;
 if (!isset($card_time)) $card_time = null;
 if (!isset($card_location)) $card_location = null;
 if (!isset($card_text)) $card_text = null;
 if (!isset($card_category)) $card_category = null;
 if (!isset($card_label)) $card_label = null;
 if (!isset($card_class)) $card_class = '';
 ?>
 <div class="s-blog__item-js s-event-cards__item-col s-new-cards__item-col--secondary col-md-6 col-12 <?= $card_class; ?>">
  <div class="s-event-cards__item-col-line  batch-item-js batch-item--scale-y-js d-sm-block d-none position-absolute"></div>
  <div class="event-item hover-pic-wrap link-inner-wrap position-relative d-flex flex-wrap z-index-1">
   <a href="#" class="link-mask"></a>
   <div class="event-item__pic-wrap w-100 overflow-hidden batch-item-js batch-item--clip-js">
    <img loading="lazy" class="event-item__pic transition-def pic-def-bg hover-pic w-100 h-100 obj-cover" src="./assets/images/<?= $card_img ?>" alt="pic">
   </div>
   <div class="event-item__content s-blog__item-content-js batch-item-js batch-item--static-js d-sm-flex flex-column align-items-start">
    <div class="event-item__label fw-400">
     <span class="fw-600 event-item__label-cat"><?= $card_category; ?></span><?= $card_label; ?>
    </div>
    <time class="event-item__time color-4 fw-500 d-block"><?= $card_time; ?></time>
    <h3 class="event-item__title h5"><?= $card_title; ?></h3>
    <p class="event-item__loc ls-2 body-2"><?= $card_location; ?></p>
    <div class="event-item__txt-wrap last-el-mb-0 body-2 text-2-lines">
     <?= $card_text; ?>
    </div>
    <span class="event-item__btn mt-auto btn--md btn btn--secondary">
     Book Tickets
     <svg class="btn__icon btn__icon--next transition-def" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <use href="#arrow-long-right"></use>
     </svg>
    </span>
   </div>
  </div>
 </div>