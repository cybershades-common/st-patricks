<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Visit | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/index.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
  <link rel="stylesheet" href="./assets/css/venobox.min.css">
  <link rel="stylesheet" href="./assets/css/main.css"> -->
</head>

<body class="visit-page">
  <div id="before-preloader-content" class="before-preloader-content">
    <?php
    include("header.php");
    ?>
    <div id="body-content-wrap" class="content-wrap body-content-wrap" data-scrollbar>
      <div id="body-content" class="body-content overflow-hidden position-relative">
        <main id="main">
          <?php
          $hero_class = 's-hero--secondary s-hero--fourth';
          $hero_pic = 'visit/visit-1.webp';
          $hero_title = 'Visit John XXIII';
          $hero_description = '<p>Meet our vibrant community and see our beautiful Mount Claremont campus.</p>';
          $hero_use_video_btn = true;
          include("sections/hero.php");
          ?>
          <section class="section-padding-def s-overview-items">
            <div class="container s-overview-items__container">
              <div class="row s-overview-items__row mx-0 justify-content-center">
                <?php
                $overview_items = [
                  [
                    'icon' => 'overview-icon-1.svg',
                    'title' => 'College Tours',
                    'text' => '<p>We offer guided campus tours and information sessions throughout the year for prospective families and students.</p>',
                    'label' => 'View next available tours',
                  ],
                  [
                    'icon' => 'overview-icon-2.svg',
                    'title' => 'Prepare to Visit',
                    'text' => '<p>Helpful information to know before you visit, including directions, parking, accessibility and more.</p>',
                    'label' => 'Map, Directions and Parking',
                  ],
                  [
                    'icon' => 'overview-icon-3.svg',
                    'title' => 'Take a Virtual Tour',
                    'text' => '<p>Can’t visit in person? We invite you to explore the College from your device anywhere.</p>',
                    'label' => 'Explore JTC From any device',
                  ],
                ];
                ?>
                <?php foreach ($overview_items as $item): ?>
                  <div class="s-overview-items__col batch-item-js batch-item--static-js col-lg-4 col-12 px-0">
                    <div class="overview-item position-relative h-100 d-flex flex-column align-items-start">
                      <img src="./assets/images/icons/<?= $item['icon'] ?>" alt="icon" class="overview-item__icon d-block obj-contain">
                      <h3 class="overview-item__title color-1 h5"><?= $item['title'] ?></h3>
                      <div class="overview-item__txt-wrap body-4 last-el-mb-0">
                        <?= $item['text'] ?>
                      </div>
                      <a class="overview-item__link mt-auto arrow-link-simple color-4 text-uppercase link-inner-wrap fw-500" target="_blank" href="#">
                        <span class="link-inner"><?= $item['label'] ?></span>
                        <svg class="btn__icon btn__icon--next transition-def" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#arrow-long-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          </section>
          <?php
          $base_width = 1420;
          $gallery_items = [
            ['src' => 'visit-2.webp', 'width' => 715, 'height' => 630],
            ['src' => 'visit-3.webp', 'width' => 262, 'height' => 315],
            ['src' => 'visit-4.webp', 'width' => 443, 'height' => 315],
            ['src' => 'visit-5.webp', 'width' => 443, 'height' => 315],
            ['src' => 'visit-6.webp', 'width' => 262, 'height' => 315],
          ];

          foreach ($gallery_items as &$item) {
            $percent = round(($item['width'] / $base_width) * 100, -1);
            $item['width_percent'] = max(10, $percent);

            if ($item['width_percent'] >= 50) {
              $item['size_class'] = 'big';
            } elseif ($item['width_percent'] >= 30) {
              $item['size_class'] = 'middle';
            } else {
              $item['size_class'] = 'small';
            }
          }
          ?>
          <div class="s-gallery position-relative grid-gallery-js">
            <div class="s-gallery__grid-sizer s-gallery__grid-sizer-js"></div>
            <?php foreach ($gallery_items as $gallery_item): ?>
              <div class="s-gallery__item s-gallery__grid-item-js <?= $gallery_item['size_class'] ?>"
                data-height="<?= $gallery_item['height'] ?>"
                data-width="<?= $gallery_item['width_percent'] ?>"
                style="--w:<?= $gallery_item['width'] ?>; --h:<?= $gallery_item['height'] ?>; --h-size:<?= $gallery_item['height'] ?>; --item_width:<?= $gallery_item['width_percent'] ?>%;">
                <img loading="lazy" class="s-gallery__item-pic position-absolute obj-cover pic-def-bg batch-item-js batch-item--static-js"
                  src="./assets/images/visit/<?= $gallery_item['src'] ?>" alt="pic">
              </div>
            <?php endforeach; ?>
          </div>
          <?php
          $simple_txt_class = 's-simple-txt--secondary s-simple-txt--third';
          $simple_txt_kicker = 'Plan your visit';
          $simple_txt_title = 'Explore our bright, beautiful campus';
          $simple_txt_description = ' <p>John XXIII College sits within a calm, leafy corner of Mount Claremont, offering a campus that feels open, generous and quietly inspiring. With wide green spaces and purpose built learning environments, the College has the atmosphere of a small university where students move with confidence and belonging.</p>
              <p>On any day, you will find students studying together outdoors, gathering with friends between classes, rehearsing, training on the fields, or pausing for reflection in moments of prayer and community life.</p>
              <p>It is a place filled with energy, warmth and a deep sense of purpose.</p>
           ';
          $simple_txt_buttons = [
            ['label' => 'Book a Tour', 'classes' => 'btn--md btn--third', 'icon' => false],
            ['label' => 'Upcoming Tours', 'classes' => 'btn--md btn--transparent', 'icon' => true]
          ];
          $simple_txt_items = [
            ['icon' => 'explore-icon-1.svg', 'title' => 'How to Find Us', 'text' => '<p>John XXIII College is located in Mt Claremont, Perth, on the traditional lands of the Whadjuk Noongar people.</p>', 'link_text' => 'See map and location'],
            ['icon' => 'explore-icon-2.svg', 'title' => 'Transport and Parking Info', 'text' => '<p>See our recommended routes to the campus. Free visitor parking is available on campus.</p>', 'link_text' => 'View routes and parking areas'],
            ['icon' => 'explore-icon-3.svg', 'title' => 'Visitor Sign IN at Reception', 'text' => '<p>All visitors must sign in at main reception. Our friendly admin staff will help you where to go next.</p>', 'link_text' => 'where to go once you arrive'],
          ];
          include("sections/simple-txt.php");
          ?>
          <?php
          include("sections/video-block.php");
          ?>
          <section class="section-padding-def s-faq">
            <div class="container s-faq__container">
              <div class="s-faq__heading last-el-mb-0">
                <h3 class="s-faq__kicker kicker-def color-2 batch-item-js batch-item--static-js">Helpful things to know</h3>
                <h2 class="s-faq__title h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Frequently Asked Questions</h2>
              </div>
              <?php
              $faq_items = [
                [
                  'title' => 'Who can book a visit to John XXIII College?',
                  'content' => '<p>No matter what you study, the future demands both depth of knowledge and <br> breadth of experience.</p>'
                ],
                [
                  'title' => 'How do I book a campus tour or information session?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'What happens during a campus visit?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'Can my child attend the visit with me?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'Do you offer visits for both Primary and Secondary School?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'Where should visitors park when they arrive?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'What should we wear for a campus visit?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'Can we visit if we live interstate or cannot attend in person?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'Are there Open Days as well as private tours?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
                [
                  'title' => 'Who can I contact if I have questions before or after my visit?',
                  'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis dolor inventore laudantium minima nihil non quam tempore vel vero.</p>'
                ],
              ];
              ?>
              <div class="s-faq__items acc-items-js">
                <?php foreach ($faq_items as $index => $faq):
                  $is_first = ($index === 0);
                ?>
                  <div class="s-faq__item-wrap acc-item-wrap-js batch-item-js batch-item--static-js">
                    <div class="s-faq__item acc-item-js<?= $is_first ? ' open' : '' ?>">
                      <h3 class="s-faq__item-title h6 ls-2 transition-def cursor-pointer mb-0 position-relative acc-title-js">
                        <span class="s-faq__item-title-txt transition-def position-relative d-block"><?= $faq['title'] ?></span>
                        <span class="s-faq__item-icon transition-def position-absolute after-el before-el"></span>
                      </h3>
                      <div<?= $is_first ? ' style="display:block;"' : '' ?> class="s-faq__item-content-wrap acc-content-js">
                        <div class="s-faq__item-content ls-1 last-el-mb-0">
                          <?= $faq['content'] ?>
                        </div>
                    </div>
                  </div>
              </div>
            <?php endforeach; ?>
            </div>
            <div class="s-faq__btns d-flex flex-wrap">
              <div class="s-simple-txt__btn-wrap batch-item-js batch-item--static-js">
                <a href="#" class="btn s-simple-txt__btn btn--third">How to visit the College </a>
              </div>
              <div class="s-simple-txt__btn-wrap batch-item-js batch-item--static-js">
                <a href="#" class="btn s-simple-txt__btn btn--transparent">Upcoming Tours
                  <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use href="#arrow-right"></use>
                  </svg>
                </a>
              </div>
            </div>
      </div>
      </section>
      </main>
      <?php
      include("footer.php");
      ?>
    </div>
  </div>
  <?php
  include("modal.php");
  ?>
  </div>
  <script src="assets/dist/visit.min.js"></script>
  <!-- <script src="assets/js/libraries.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/swiper.min.js"></script>
  <script src="assets/js/venobox.min.js"></script>
  <script src="assets/js/isotope.min.js"></script> -->
</body>

</html>