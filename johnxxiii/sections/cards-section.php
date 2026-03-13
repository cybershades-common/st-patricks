<?php
if (!isset($cards_section_title)) $cards_section_title = null;
if (!isset($cards_section_description)) $cards_section_description = null;
if (!isset($cards_section_class)) $cards_section_class = '';
if (!isset($cards_section_cards)) $cards_section_cards = [];
if (!isset($cards_section_cards_load_more)) $cards_section_cards_load_more = false;
?>
<section class="section-padding-def <?= $cards_section_class ?> s-explore">
  <div class="container s-explore__container container-anim-js">
    <div class="s-explore__heading text-center last-el-mb-0 mx-auto w-100">
      <?php if (!empty($cards_section_title)): ?>
        <h2 class="h3 s-explore__title color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js"><?= $cards_section_title ?></h2>
      <?php endif; ?>
      <?php if (!empty($cards_section_description)): ?>
        <div class="s-explore__txt-wrap last-el-mb-0 body-2  batch-item-js batch-item--static-js">
          <?= $cards_section_description ?>
        </div>
      <?php endif; ?>
    </div>
    <?php if (!empty($cards_section_cards) && is_array($cards_section_cards)): ?>
      <div class="row s-explore__row<?= $cards_section_cards_load_more ? ' grid-simple-js' : '' ?>">
        <?php foreach ($cards_section_cards as $index => $card): ?>
          <div data-index="<?= $index ?>" class="s-explore__col col-xl-4 col-md-6 col-12<?= $cards_section_cards_load_more ? ' grid-item-js' : '' ?>">
            <?php
            $card_class = 'card--secondary';
            $card_img = $card['img'];
            $card_title = $card['title'];
            $card_text = $card['text'];
            include("./snippets/card.php");
            ?>
          </div>
        <?php endforeach; ?>
      </div>
      <?php if ($cards_section_cards_load_more): ?>
        <div id="loadMore-wrap" class="text-center s-explore__btn-wrap batch-item-js batch-item--static-js">
          <a id="loadMore" href="#" class="btn btn--md btn--third s-explore__btn">
            Load more
          </a>
        </div>
      <?php endif; ?>
    <?php endif; ?>
  </div>
</section>
