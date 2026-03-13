<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Events and Bookings Detail View | John XXIII College </title>
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
          <section class="s-hero-news parallax-trigger-js  container-anim-js s-hero-news--simple s-hero-news--simple-2">
            <div class="s-hero-news__container container position-relative z-index-1">
              <nav class="s-hero-news__nav-wrap color-3 swiper-simple-labels-js overflow-visible swiper">
                <ul class="swiper-wrapper list-unstyled s-hero-news__nav">
                  <?php
                  $heroItems = [
                    ['label' => 'Home'],
                    ['label' => 'Community'],
                    ['label' => 'Events', 'text_only' => true],
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
                <h2 class="s-hero-news__up-title text-normal batch-item-js fw-400 batch-hero-item-js batch-item--static-js"><b>Events</b> Senior Secondary</h2>
                <h1 class="s-hero-news__title h2 color-3 batch-item-js batch-hero-item-js batch-item--text-js split-text-init-js split-text-lines-js">The John XXIII 2026 Year 12 Ball</h1>
                <time class="s-hero-news__time text-uppercase d-block batch-item-js batch-hero-item-js batch-item--static-js" datetime="2026-02-16">16 January 2026</time>
              </div>
            </div>
            <div class="s-hero-news__banner-pic-wrap overflow-hidden batch-item-js batch-hero-item-js batch-item--static-js">
              <img class="s-hero-news__banner-pic w-100 h-100 obj-cover parallax-js parallax-reverse-js is-parallax-trigger-js parallax-scale-js parallax-img-js" style="object-position: 50% 10%;transform: scale(1.2);" loading="lazy" src="assets/images/eab/eab-1.webp" data-parallax-trigger-start="top top" data-parallax-trigger-end="bottom top" data-parallax-value="1" alt="">
            </div>
          </section>
          <section class="s-event-details section-padding-def">
            <div class="container container-anim-js s-event-details__container  position-relative">
              <div class="s-event-details__symbol-wrap pointer-event-none d-sm-block d-none position-absolute z-index-min-1">
                <img src="assets/images/logos/Crest-Symbol.svg" alt="" loading="lazy" class="s-simple-txt__symbol obj-contain w-100 batch-item-js batch-item--static-js">
              </div>
              <h2 class="s-event-details__title h5 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js color-1">Event Details</h2>
              <?php
              $eventDetails = [
                [
                  'icon' => 'ed-icon-1.svg',
                  'text' => 'Friday 6 February 2026',
                  'datetime' => '2026-02-06'
                ],
                [
                  'icon' => 'ed-icon-2.svg',
                  'text' => '6:30pm – 11:00pm',
                ],
                [
                  'icon' => 'ed-icon-3.svg',
                  'text' => 'The Westin Perth, 480 Hay Street, Perth',
                ],
                [
                  'icon' => 'ed-icon-4.svg',
                  'text' => '$170 per person (includes three-course meal, mocktails and soft drinks)',
                ],
              ];
              ?>
              <ul class="s-event-details__list body-1 ls-2 list-unstyled">
                <?php foreach ($eventDetails as $item): ?>
                  <li class="s-event-details__list-item d-flex last-el-mb-0 batch-item-js batch-item--static-js">
                    <img
                      class="s-event-details__list-item-icon col-auto obj-contain"
                      src="assets/images/icons/<?= $item['icon']; ?>"
                      loading="lazy"
                      alt="icon">
                    <p class="align-self-center">
                      <?php if (!empty($item['datetime'])): ?>
                        <time datetime=" <?= $item['datetime']; ?>">
                          <?= $item['text']; ?>
                        </time>
                      <?php else: ?>
                        <?= $item['text']; ?>
                      <?php endif; ?>
                    </p>
                  </li>
                <?php endforeach; ?>
              </ul>
              <div class="s-event-details__downloads">
                <div class="s-event-details__download-item link-inner-wrap position-relative d-flex align-items-center batch-item-js batch-item--static-js">
                  <a href="assets/files/event-details.pdf" class="link-mask" download></a>
                  <img class="s-event-details__download-item-icon obj-contain col-auto" src="assets/images/icons/download-icon.svg" loading="lazy" alt="icon">
                  <h3 class="s-event-details__download-item-title mb-0 text-normal"><span class="link-inner">Ball Information and Partner Declaration</span></h3>
                  <div class="s-event-details__download-item-size color-2 body-2 col-auto">41KB</div>
                </div>

              </div>
              <div class="s-event-details__text-wrap ls-2 body-1 last-el-mb-0 children-batch-anim-js children-batch-anim-secondary-js simple-content simple-content--secondary">
                <p><b>Formal Dress</b></p>
                <p>For enquiries, please contact Luke Bostelman <br> <a href="mailto:luke.bostelman@johnxxiii.edu.au">luke.bostelman@johnxxiii.edu.au</a> or phone 9383 0413</p>
                <p>Tickets need to be purchased before Monday, 19 January 2026 <br>
                  Partner declaration form to be emailed <br>
                  to <a href="mailto:luke.bostelman@johnxxiii.edu.au">luke.bostelman@johnxxiii.edu.au</a> or submitted to Secondary Student Services by Monday, 2 February 2026.
                </p>
              </div>
              <div class="s-simple-txt__footer color-1 position-relative d-flex flex-wrap align-items-center justify-content-between">
                <div class="s-simple-txt__footer-line-top position-absolute top-line batch-item-js batch-item--scale-x-js batch-item--scale-x-fast-js"></div>
                <div class="s-simple-txt__footer-btn-wrap batch-item-js batch-item--static-js">
                  <a class="link-inner-wrap s-simple-txt__link" href="#">
                    <svg class="btn__icon btn__icon--prev transition-def" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                      <path d="M1.25 9.46875L6.5 4.21875L7.03125 3.6875L8.0625 4.75L7.53125 5.28125L3.5625 9.25H17.0312V10.75H3.5625L7.53125 14.7188L8.0625 15.25L7.03125 16.3125L6.5 15.7812L1.25 10.5312L0.71875 10L1.25 9.46875Z" fill="currentColor"></path>
                    </svg>
                    <span class="link-inner">All Events</span> </a>
                </div>
                <ul class="s-simple-txt__footer-list nav align-items-center">
                  <li>
                    <h3 class="s-simple-txt__footer-list-title text-normal fw-400 batch-item-js batch-item--static-js">Share this event:</h3>
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
          </section>
          <section class="s-new-cards s-new-cards--simple-2 position-relative color-1 section-padding-def">
            <div class="top-line top-line--container s-new-cards__line position-absolute batch-item-js batch-item--scale-x-js"></div>
            <div class="container container-anim-js s-new-cards__container">
              <h2 class="s-new-cards__title h3 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">More Events</h2>
              <?php
              $event_cards = [
                [
                  'image' => 'eab/eab-2.webp',
                  'category' => 'Event',
                  'label' => 'Faith',
                  'time' => 'Tuesday, February 24, 2026 at 9:30 AM AWST',
                  'title' => 'Fr Frank Brennan Book Launch',
                  'location' => 'John XXIII Avenue, Mount Claremont, WA, Australia, Western Australia 6010',
                  'description' => '<p>For many of the graduates, it was an opportunity to give back to the place that shaped so much of their young lives.</p>',
                  'class' => 'faith'
                ],
                [
                  'image' => 'eab/eab-3.webp',
                  'category' => 'Event',
                  'label' => 'Primary',
                  'time' => 'Saturday, February 14, 2026 at 10 AM – 1 PM AWST',
                  'title' => 'Primary scHOOL Picnic',
                  'location' => 'Primary School Oval, via Mooro Drive, Mount Claremont',
                  'description' => '<p>Welcome back to the new school year! Join the College community for our annual Primary Picnic on the Primary School Oval.</p>',
                  'class' => 'lower-primary'
                ]
              ];
              ?>
              <div id="s-new-cards__items-wrap" class="s-new-cards__items-wrap overflow-hidden">
                <div class="s-new-cards__items row">
                  <?php foreach ($event_cards as $card): ?>
                    <?php
                    $card_img = $card['image'];
                    $card_title = $card['title'];
                    $card_time = $card['time'];
                    $card_location = $card['location'];
                    $card_text = $card['description'];
                    $card_category = $card['category'];
                    $card_label = $card['label'];
                    $card_class = $card['class'];
                    include("./snippets/event-card.php");
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