   <?php
   if (!isset($card_img)) $card_img = null;
   if (!isset($card_title)) $card_title = null;
   if (!isset($card_position)) $card_position = null;
   if (!isset($card_location)) $card_location = null;
   if (!isset($card_date)) $card_date = null;
   if (!isset($card_class)) $card_class = '';
   ?>
   <div class="s-team__col s-blog__item-js col-lg-3 col-md-4 col-sm-6 col-12 <?= $card_class; ?>">
      <div class="team-card position-relative hover-pic-wrap last-el-mb-0">
         <a href="#" class="link-mask"></a>
         <div class="team-card__pic-wrap w-100 overflow-hidden batch-item-js batch-item--clip-js">
            <img loading="lazy" class="team-card__pic transition-def pic-def-bg hover-pic w-100 h-100 obj-cover" src="./assets/images/<?= $card_img ?>" alt="pic">
         </div>
         <div class="team-card__content batch-item-js batch-item--static-js">
            <h3 class="team-card__name h6"><?= $card_title; ?></h3>
            <p class="team-card__position body-2"><?= $card_position; ?></p>
            <p class="team-card__location ls-1"><?= $card_location; ?></p>
            <p class="team-card__date ls-1"><?= $card_date; ?></p>
         </div>
      </div>
   </div>