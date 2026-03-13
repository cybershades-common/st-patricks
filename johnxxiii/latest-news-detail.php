<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Latest News Detail View | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/index.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
  <link rel="stylesheet" href="./assets/css/venobox.min.css">
  <link rel="stylesheet" href="./assets/css/main.css"> -->
</head>

<body class="news-list-page header-secondary-style">
  <div id="before-preloader-content" class="before-preloader-content">
    <?php
    include("header.php");
    ?>
    <div id="body-content-wrap" class="content-wrap body-content-wrap" data-scrollbar>
      <div id="body-content" class="body-content overflow-hidden position-relative">
        <main id="main">
          <section class="s-hero-news parallax-trigger-js container-anim-js s-hero-news--simple">
            <div class="s-hero-news__container container position-relative z-index-1">
              <nav class="s-hero-news__nav-wrap color-3 swiper-simple-labels-js overflow-visible swiper">
                <ul class="swiper-wrapper list-unstyled s-hero-news__nav">
                  <?php
                  $heroItems = [
                    ['label' => 'Home'],
                    ['label' => 'Community'],
                    ['label' => 'Latest News', 'text_only' => true],
                  ];
                  foreach ($heroItems as $index => $item): ?>
                    <?php if ($index > 0): ?>
                      <li class="swiper-slide w-auto s-hero-news__nav-item batch-item-js batch-hero-item-js batch-item--static-js">
                        <svg class="s-hero-news__nav-item-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M12.0312 10L11.7656 10.2656L9.26562 12.7656L9 13.0312L8.48438 12.5L8.75 12.2344L10.9844 10L8.75 7.76562L8.48438 7.5L9 6.96875L9.26562 7.23438L11.7656 9.73438L12.0312 10Z" fill="currentColor" />
                        </svg>
                      </li>
                    <?php endif; ?>
                    <li class="swiper-slide w-auto s-hero-news__nav-item batch-item-js batch-hero-item-js batch-item--static-js">
                      <?php if (!empty($item['text_only'])): ?>
                        <span class="d-block s-hero-news__nav-item-link"><?= $item['label'] ?></span>
                      <?php else: ?>
                        <a class="link-inner-wrap d-block s-hero-news__nav-item-link" href="#">
                          <span class="link-inner"><?= $item['label'] ?></span> </a>
                      <?php endif; ?>
                    </li>
                  <?php endforeach; ?>
                </ul>
              </nav>
              <div class="s-hero-news__heading text-center last-el-mb-0 mx-auto w-100">
                <h2 class="s-hero-news__up-title text-normal batch-item-js fw-400 batch-hero-item-js batch-item--static-js"><b>News</b> Grounds and Maintenance</h2>
                <h1 class="s-hero-news__title h2 color-3 batch-item-js batch-hero-item-js batch-item--text-js split-text-init-js split-text-lines-js">2025 graduates spend summer break alongside Grounds and Maintenance team</h1>
                <time class="s-hero-news__time text-uppercase d-block batch-item-js batch-hero-item-js batch-item--static-js" datetime="2026-02-16">16 January 2026</time>
              </div>
            </div>
            <div class="s-hero-news__banner-pic-wrap overflow-hidden batch-item-js batch-hero-item-js batch-item--static-js">
              <img class="s-hero-news__banner-pic w-100 h-100 obj-cover parallax-js parallax-reverse-js is-parallax-trigger-js parallax-scale-js parallax-img-js" style="object-position: 50% 10%;transform: scale(1.2);" loading="lazy" src="assets/images/lnd/lnd-1.webp" data-parallax-trigger-start="top top" data-parallax-trigger-end="bottom top" data-parallax-value="1" alt="">
            </div>
          </section>

          <section class="section-padding-def overflow-hidden s-simple-txt--fourth s-simple-txt">
            <div class="container container-anim-js position-relative z-index-1 s-simple-txt__container last-el-mb-0">
              <div class="s-simple-txt__symbol-wrap pointer-event-none position-absolute z-index-min-1">
                <img src="assets/images/logos/Crest-Symbol.svg" alt="" loading="lazy" class="s-simple-txt__symbol obj-contain w-100 batch-item-js batch-item--static-js">
              </div>
              <div class="s-simple-txt__text-part mx-auto w-100">
                <div class="s-simple-txt__txt-wrap-3 simple-content lead-txt ls-3 color-1 last-el-mb-0 children-batch-anim-js">
                  <p>This summer break, a group of 2025 graduates from John XXIII College chose to spend their free time in a meaningful way — beside the College’s Grounds and Maintenance team, helping keep the campus beautiful and preparing it for the year ahead. Their contribution has become a symbol of service, care and community spirit that defines life at the College.</p>
                </div>
                <div class="s-simple-txt__hor-line batch-item-js batch-item--scale-x-js batch-item--scale-x-fast-js"></div>
                <div class="s-simple-txt__txt-wrap-2 simple-content body-2 last-el-mb-0 children-batch-anim-js">
                  <p>For many of the graduates, it was an opportunity to give back to the place that shaped so much of their young lives. Rather than take a traditional break after completing their studies, these alumni stepped up to support the team responsible for the College’s iconic green spaces, gardens and facilities. Their presence has reinforced the value of service that they learned during their time as students.</p>
                  <p>The work varied from landscaping tasks and general grounds upkeep to assisting with preparations for upcoming events and the new school year. Throughout the break, the graduates worked with care and pride, connecting with staff and each other in a spirit of cooperation that resonates with the College’s ethos of cura personalis — care for the whole person.</p>
                </div>
              </div>
              <?php
              $images = [
                'lnd-2.webp',
                'lnd-3.webp',
                'lnd-4.webp',
                'lnd-5.webp',
                'lnd-6.webp',
                'lnd-7.webp',
              ];
              $basePath = './assets/images/lnd/';
              ?>
              <div class="s-simple-txt__pics-grid row">
                <?php foreach ($images as $file):
                  $src = $basePath . $file;
                ?>
                  <div class="s-simple-txt__pic-grid-item col-lg-4 col-sm-6 col-12 batch-item-js batch-item--static-js">
                    <div class="s-simple-txt__pic-grid-wrap position-relative">
                      <a href="<?php echo $src; ?>" data-gall="feedGallery" class="link-mask venobox-link"></a>
                      <div class="overlay s-simple-txt__pic-grid-overlay d-flex align-items-center justify-content-center transition-smooth">
                        <img class="s-simple-txt__pic-grid-overlay-icon" loading="lazy" src="assets/images/icons/fs-icon.svg" alt="icon">
                      </div>
                      <img
                        loading="lazy"
                        class="s-simple-txt__pic-grid pic-def-bg w-100 h-100 obj-cover"
                        src="<?php echo $src; ?>"
                        alt="pic">

                    </div>
                  </div>
                <?php endforeach; ?>
              </div>
              <div class="s-simple-txt__text-part mx-auto w-100">
                <div class="s-simple-txt__txt-wrap-2 simple-content simple-content--secondary children-batch-anim-js body-2 last-el-mb-0 children-batch-anim-secondary-js">
                  <blockquote>
                    <p>“Our graduates have shown that service does not end at graduation. Working alongside our Grounds and Maintenance team has been a way for them to express gratitude, stay connected and live out the values they learned here.”</p> <cite>— Daniel Mahon, Principal</cite>
                  </blockquote>
                  <p>Their contribution has not only helped maintain the beauty of the campus, but also strengthened bonds between generations of the College community. It has been a reminder that the spirit of John XXIII College lives beyond graduation, with alumni continuing to serve with humility and generosity long after they leave the classroom.</p>
                </div>
                <div class="s-simple-txt__btns color-1 d-flex flex-wrap">
                  <div class="s-simple-txt__btn-wrap batch-item-js batch-item--static-js">
                    <a href="#" class="btn btn--fourth s-simple-txt__btn">View alumni network</a>
                  </div>
                  <div class="s-simple-txt__btn-wrap batch-item-js batch-item--static-js">
                    <a href="#" class="btn s-simple-txt__btn">Explore campus Facilities</a>
                  </div>
                </div>
                <div class="s-simple-txt__footer color-1 position-relative d-flex flex-wrap align-items-center justify-content-between">
                  <div class="s-simple-txt__footer-line-top position-absolute top-line batch-item-js batch-item--scale-x-js batch-item--scale-x-fast-js"></div>
                  <div class="s-simple-txt__footer-btn-wrap batch-item-js batch-item--static-js">
                    <a class="link-inner-wrap s-simple-txt__link" href="#">
                      <svg class="btn__icon btn__icon--prev transition-def" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                        <path d="M1.25 9.46875L6.5 4.21875L7.03125 3.6875L8.0625 4.75L7.53125 5.28125L3.5625 9.25H17.0312V10.75H3.5625L7.53125 14.7188L8.0625 15.25L7.03125 16.3125L6.5 15.7812L1.25 10.5312L0.71875 10L1.25 9.46875Z" fill="currentColor"></path>
                      </svg>
                      <span class="link-inner"><span class="d-sm-none">Back to </span> All News</span> </a>
                  </div>
                  <ul class="s-simple-txt__footer-list nav align-items-center">
                    <li>
                      <h3 class="s-simple-txt__footer-list-title text-normal fw-400 batch-item-js batch-item--static-js">Share this story:</h3>
                    </li>
                    <li class="s-simple-txt__footer-list-item batch-item-js batch-item--static-js">
                      <a class="s-simple-txt__footer-list-link bg-none hover-pic-wrap js-share-btn" data-share href="latest-news-detail.php">
                        <img loading="lazy" class="transition-def s-simple-txt__footer-list-link-icon d-block hover-pic obj-contain" src="assets/images/icons/share-icon.svg" alt="icon">
                      </a>
                    </li>
                    <li class="s-simple-txt__footer-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-simple-txt__footer-list-link bg-none hover-pic-wrap" href="#">
                        <img loading="lazy" class="transition-def s-simple-txt__footer-list-link-icon d-block hover-pic obj-contain" src="assets/images/icons/fb-icon.svg" alt="icon">
                      </a>
                    </li>
                    <li class="s-simple-txt__footer-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-simple-txt__footer-list-link bg-none hover-pic-wrap" href="#">
                        <img loading="lazy" class="transition-def s-simple-txt__footer-list-link-icon d-block hover-pic obj-contain" src="assets/images/icons/insta-icon.svg" alt="icon">
                      </a>
                    </li>
                    <li class="s-simple-txt__footer-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-simple-txt__footer-list-link bg-none hover-pic-wrap" href="#">
                        <img loading="lazy" class="transition-def s-simple-txt__footer-list-link-icon d-block hover-pic obj-contain" src="assets/images/icons/in-icon.svg" alt="icon">
                      </a>
                    </li>
                  </ul>
                </div>
              </div>



            </div>
          </section>

          <section class="s-new-cards s-new-cards--simple position-relative color-1 section-padding-def">
            <div class="top-line top-line--container s-new-cards__line position-absolute batch-item-js batch-item--scale-x-js"></div>
            <div class="container container-anim-js s-new-cards__container">
              <h2 class="s-new-cards__title h3 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Related Articles</h2>
              <?php
              $new_cards = [
                [
                  'category' => 'Event',
                  'label' => 'Alumni Spotlight',
                  'title' => 'The Circuitous path to silicon valley',
                  'image' => 'lnl/lnl-2.webp',
                ],
                [
                  'category' => 'Leaders Edition',
                  'label' => 'Student Spotlight',
                  'title' => 'Student Spotlight: Claire | Visual Arts Captain',
                  'image' => 'lnl/lnl-3.webp',
                ],
                [
                  'category' => 'News',
                  'label' => 'Performing Arts',
                  'title' => 'SDA Production\'s MATILDA JR THE MUSICAL',
                  'image' => 'lnl/lnl-4.webp',
                ],
                [
                  'category' => 'Theatre Edition',
                  'label' => 'Alumni Spotlight',
                  'title' => 'Free Aviary\' s single ‘CALL MY OWN’ one of WA Music \'s Fresh Picks',
                  'image' => 'lnl/lnl-5.webp',
                ]
              ];
              ?>
              <div id="s-new-cards__items-wrap" class="s-new-cards__items-wrap overflow-hidden">
                <div class="s-new-cards__items row">
                  <?php foreach ($new_cards as $card): ?>
                    <?php
                    $card_img = $card['image'];
                    $card_title = $card['title'];
                    $card_category = $card['category'];
                    $card_label = $card['label'];
                    include("./snippets/blog-card.php");
                    ?>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
          </section>
          <?php
          $banner_pic = 'pw/pw-8.webp';
          $banner_title = 'Become a person for others';
          $banner_description = '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish. From Pre-kindergarten to Year 12, we guide students to grow in competence, conscience and compassion.</p>';
          $banner_buttons = [
            ['label' => 'Book&nbsp;<span class="d-sm-inline d-none">a college</span>&nbsp;Tour', 'secondary' => true],
            ['label' => 'Apply&nbsp;<span class="d-sm-inline d-none">to enrol</span>&nbsp;Today']
          ];
          include("sections/banner.php");
          ?>
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
  <script src="assets/dist/index.min.js"></script>
  <!-- <script src="assets/js/libraries.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/venobox.min.js"></script>
  <script src="assets/js/swiper.min.js"></script> -->
</body>

</html>