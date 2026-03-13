<?php
if (!isset($simple_txt_kicker)) $simple_txt_kicker = null;
if (!isset($simple_txt_title)) $simple_txt_title = null;
if (!isset($simple_txt_lead_text)) $simple_txt_lead_text = null;
if (!isset($simple_txt_description)) $simple_txt_description = null;
if (!isset($simple_txt_class)) $simple_txt_class = '';
if (!isset($simple_txt_buttons)) $simple_txt_buttons = [];
if (!isset($simple_txt_pics)) $simple_txt_pics = [];
if (!isset($simple_txt_second_description)) $simple_txt_second_description = null;
if (!isset($simple_txt_use_crest)) $simple_txt_use_crest = true;
if (!isset($simple_txt_items)) $simple_txt_items = [];
?>
<section class="section-padding-def <?= $simple_txt_class ?> s-simple-txt">
  <div class="container container-anim-js position-relative z-index-1 s-simple-txt__container last-el-mb-0">
    <?php if ($simple_txt_use_crest): ?>
      <div class="s-simple-txt__symbol-wrap pointer-event-none position-absolute z-index-min-1">
        <img src="assets/images/logos/Crest-Symbol.svg" alt="" loading="lazy" class="s-simple-txt__symbol obj-contain w-100 batch-item-js batch-item--static-js">
      </div>
    <?php endif; ?>
    <?php if (!empty($simple_txt_kicker)): ?>
      <h3 class="s-simple-txt__kicker kicker-def color-2 batch-item-js batch-item--static-js"><?= $simple_txt_kicker ?></h3>
    <?php endif; ?>
    <?php if (!empty($simple_txt_title)): ?>
      <h2 class="s-simple-txt__title h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js"><?= $simple_txt_title ?></h2>
    <?php endif; ?>
    <?php if (!empty($simple_txt_lead_text)): ?>
      <div class="s-simple-txt__txt-wrap-3  simple-content lead-txt ls-3 color-4 last-el-mb-0 children-batch-anim-js">
        <?= $simple_txt_lead_text ?>
      </div>
    <?php endif; ?>
    <?php if (!empty($simple_txt_description)): ?>
      <div class="s-simple-txt__txt-wrap-2  simple-content body-1 ls-2 last-el-mb-0 children-batch-anim-js">
        <?= $simple_txt_description ?>
      </div>
    <?php endif; ?>
    <?php if (!empty($simple_txt_buttons) && is_array($simple_txt_buttons)): ?>
      <div class="s-simple-txt__btns d-flex flex-wrap">
        <?php foreach ($simple_txt_buttons as $btn): ?>
          <div class="s-simple-txt__btn-wrap batch-item-js batch-item--static-js">
            <a href="#" class="btn s-simple-txt__btn <?= $btn['classes'] ?>"><?= $btn['label'] ?>
              <?php if (!empty($btn['icon'])): ?>
                <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use href="#arrow-right"></use>
                </svg>
              <?php endif; ?>
            </a>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
  <?php if (!empty($simple_txt_pics) && is_array($simple_txt_pics)): ?>
    <div class="container container-anim-js s-simple-txt__container-2">
      <div class="s-simple-txt__pics d-flex flex-wrap">
        <?php foreach ($simple_txt_pics as $pic): ?>
          <img loading="lazy" class="s-simple-txt__pic obj-cover pic-def-bg batch-item-js batch-item--static-js" src="./assets/images/<?= $pic['src'] ?>" alt="pic">
        <?php endforeach; ?>
      </div>
    </div>
  <?php endif; ?>
  <?php if (!empty($simple_txt_second_description)): ?>
    <div class="container container-anim-js s-simple-txt__container last-el-mb-0">
      <div class="s-simple-txt__txt-wrap-2  simple-content body-1 ls-2 last-el-mb-0 children-batch-anim-js">
        <?= $simple_txt_second_description ?>
      </div>
    </div>
  <?php endif; ?>
  <?php if (!empty($simple_txt_items) && is_array($simple_txt_items)): ?>
    <div class="container container-anim-js s-simple-txt__container last-el-mb-0">
      <div class="s-simple-txt__items">
        <?php foreach ($simple_txt_items as $item): ?>
          <div class="s-simple-txt__item d-flex batch-item-js batch-item--static-js">
            <img src="./assets/images/icons/<?= $item['icon'] ?>" alt="icon" class="s-simple-txt__item-icon obj-contain col-auto">
            <div class="s-simple-txt__item-content">
              <h3 class="h6 s-simple-txt__item-title color-1"><?= $item['title'] ?></h3>
              <div class="s-simple-txt__item-txt-wrap body-4 last-el-mb-0">
                <?= $item['text'] ?>
              </div>
              <a class="s-simple-txt__item-txt-link arrow-link-simple color-4 text-uppercase link-inner-wrap fw-500" target="_blank" href="#">
                <span class="link-inner"><?= $item['link_text'] ?></span>
                <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use href="#arrow-right"></use>
                </svg>
              </a>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  <?php endif; ?>
</section>