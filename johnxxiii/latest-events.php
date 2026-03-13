<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Events and Bookings List View | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/simple.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
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
          <section class="s-hero-news s-hero-news--secondary">
            <div class="s-hero-news__container container-anim-js container position-relative z-index-1">
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

              <div class="s-hero-news__heading text-center last-el-mb-0  mx-auto w-100">
                <h1 class="s-hero-news__title batch-item-js color-3 batch-hero-item-js batch-item--text-js split-text-init-js split-text-chars-js">EVENTS and bookings</h1>
                <div class="s-hero-news__txt-wrap ls-1 last-el-mb-0 batch-item-js batch-hero-item-js batch-item--text-js split-text-init-js split-text-lines-js">
                  <p>Experience the life of John XXIII College through our events.</p>
                </div>
              </div>

            </div>


            <?php
            $hero_news_slides = [
              [
                'image' => 'eab/eab-1.webp',
                'object_position' => '50% 50%',
                'category' => 'Events',
                'category_name' => 'Senior Secondary',
                'time' => 'Friday 6 February 2026, 6:30pm – 11:00pm',
                'title_line_1' => 'The John XXIII',
                'title_line_2' => '2026 Year 12 Ball',
                'text' => '<p style="color: #fff;">The Westin Perth, 480 Hay Street, Perth </p><p>The Ball is one of the highlights of Year 12. To ensure the smooth running of the event, the College would like to draw your attention to several key points.</p>',
              ],
              [
                'image' => 'lnd/lnd-1.webp',
                'object_position' => '50% 20%',
                'category' => 'News',
                'category_name' => 'Local',
                'time' => 'Friday 6 February 2026, 6:30pm – 11:00pm',
                'title_line_1' => 'Another Headline',
                'title_line_2' => 'Event News',
                'text' => '<p>More text about this event here...</p>',
              ],
              [
                'image' => 'lnd/lnd-2.webp',
                'object_position' => '50% 20%',
                'category' => 'Feature',
                'category_name' => 'Culture',
                'time' => 'Friday 6 February 2026, 6:30pm – 11:00pm',
                'title_line_1' => 'Culture Event',
                'title_line_2' => 'Highlights',
                'text' => '<p>Some featured content details...</p>',
              ],
            ];
            ?>
            <div class="s-hero-news__sliders dark-theme position-relative z-index-1 overview-sliders-js">
              <div class="s-hero-news__swiper overview-slider-1-js swiper def-position w-100 h-100 position-absolute z-index-min-1 after-el after-el--full before-el before-el--full">
                <div class="swiper-wrapper s-hero-news__swiper-wrapper">
                  <?php foreach ($hero_news_slides as $slide): ?>
                    <div class="s-hero-news__swiper-slide swiper-slide">
                      <img loading="lazy" data-swiper-parallax-scale="1.5" class="w-100 h-100 obj-cover s-hero-news__swiper-slide-pic"
                        src="./assets/images/<?= $slide['image'] ?>"
                        style="object-position: <?= $slide['object_position'] ?>;"
                        alt="">
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
              <div class="s-hero-news__swiper-controls container  container-anim-js flex-row-xl-reverse d-flex align-items-sm-center align-items-end justify-content-between w-100 position-absolute z-index-2">
                <div class="swiper-pagination s-hero-news__swiper-controls-pagination batch-item-js batch-hero-item-js batch-item--static-js pointer-event-none d-flex align-items-center justify-content-center swiper-pagination--fraction s-hero-news__swiper-fraction"></div>
                <div class="swiper-buttons d-flex s-hero-news__swiper-btns batch-item-js batch-hero-item-js batch-item--static-js">
                  <div class="swiper-button swiper-button--fifth s-hero-news__swiper-btn cursor-pointer swiper-button-prev d-flex align-items-center justify-content-center">
                    <svg class="swiper-button__icon transition-def" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <use href="#arrow-short-left"></use>
                    </svg>
                  </div>
                  <div class="swiper-button swiper-button--fifth s-hero-news__swiper-btn cursor-pointer swiper-button-next d-flex align-items-center justify-content-center">
                    <svg class="swiper-button__icon transition-def" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <use href="#arrow-short-right"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="s-hero-news__swiper-content overview-slider-2-js swiper container-anim-js">
                <div class="swiper-wrapper s-hero-news__swiper-content-wrapper">
                  <?php foreach ($hero_news_slides as $i => $slide): ?>
                    <div class="s-hero-news__swiper-content-slide swiper-slide">
                      <div class="s-hero-news__swiper-content-slide-content container d-flex flex-column">
                        <?php if ($i === 0): ?>

                          <div class="s-hero-news__swiper-content-slide-content-cat-wrap batch-item-js batch-item--static-js">
                            <h3 class="swiper-slide-anim-static text-normal swiper-slide-anim--1-static s-hero-news__swiper-content-slide-content-cat ff-body fw-600"> <?= $slide['category'] ?>
                              <span class="s-hero-news__swiper-content-slide-content-cat-name fw-300"><?= $slide['category_name'] ?></span>
                            </h3>
                          </div>
                          <div class="s-hero-news__swiper-content-slide-content-main last-el-mb-0">
                            <div class="s-hero-news__swiper-content-slide-content-time-wrap batch-item-js batch-item--static-js">
                              <time class="s-hero-news__swiper-content-slide-content-time color-1 d-block swiper-slide-anim-static swiper-slide-anim--1-static fw-500"><?= $slide['time'] ?></time>
                            </div>
                            <div class="s-hero-news__swiper-content-slide-content-title-wrap swiper-slide-anim-static swiper-slide-anim--1-static">
                              <h2 class="s-hero-news__swiper-content-slide-content-title">
                                <span class="second-style s-hero-news__swiper-content-slide-content-title-line d-block batch-hero-item-js  batch-item-js batch-item--text-js split-text-init-js split-text-lines-js"><?= $slide['title_line_1'] ?></span>
                                <span class="s-hero-news__swiper-content-slide-content-title-line d-block batch-hero-item-js  batch-item-js batch-item--text-js split-text-init-js split-text-lines-js"><?= $slide['title_line_2'] ?></span>
                              </h2>
                            </div>
                            <div class="s-hero-news__swiper-content-slide-content-txt-wrap-2 swiper-slide-anim-static swiper-slide-anim--1-static">
                              <div class="s-hero-news__swiper-content-slide-content-txt-wrap body-2 last-el-mb-0 batch-hero-item-js  batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">
                                <?= $slide['text'] ?>
                              </div>
                            </div>
                            <div class="s-hero-news__swiper-content-slide-content-btn-wrap-2 batch-item-js batch-hero-item-js batch-item--static-js">
                              <div class="s-hero-news__swiper-content-slide-content-btn-wrap color-1 text-uppercase swiper-slide-anim-static swiper-slide-anim--1-static">
                                <a class="btn s-hero-news__swiper-content-slide-content-btn" href="#">
                                  Book Tickets
                                  <svg class="btn__icon btn__icon--next transition-def" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                    <path d="M16.7812 10.5312L11.5312 15.7812L11 16.3125L9.96875 15.25L10.5 14.7188L14.4688 10.75H1V9.25H14.4688L10.5 5.28125L9.96875 4.75L11 3.6875L11.5312 4.21875L16.7812 9.46875L17.3125 10L16.7812 10.5312Z" fill="currentColor" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        <?php else: ?>
                          <h3 class="s-hero-news__swiper-content-slide-content-cat swiper-slide-anim-static swiper-slide-anim--1-static text-normal ff-body fw-600"><?= $slide['category'] ?>
                            <span class="s-hero-news__swiper-content-slide-content-cat-name fw-300"><?= $slide['category_name'] ?></span>
                          </h3>
                          <div class="s-hero-news__swiper-content-slide-content-main last-el-mb-0">
                            <time class="s-hero-news__swiper-content-slide-content-time color-1 d-block swiper-slide-anim-static swiper-slide-anim--1-static fw-500"><?= $slide['time'] ?></time>
                            <h2 class="s-hero-news__swiper-content-slide-content-title swiper-slide-anim-static swiper-slide-anim--1-static">
                              <span class="second-style s-hero-news__swiper-content-slide-content-title-line"><?= $slide['title_line_1'] ?></span>
                              <span class="s-hero-news__swiper-content-slide-content-title-line"><?= $slide['title_line_2'] ?></span>
                            </h2>
                            <div class="s-hero-news__swiper-content-slide-content-txt-wrap last-el-mb-0 swiper-slide-anim-static body-2 swiper-slide-anim--1-static">
                              <?= $slide['text'] ?>
                            </div>
                            <div class="s-hero-news__swiper-content-slide-content-btn-wrap color-1 text-uppercase swiper-slide-anim-static swiper-slide-anim--1-static">
                              <a class="btn s-hero-news__swiper-content-slide-content-btn" href="#">
                                Book Tickets
                                <svg class="btn__icon btn__icon--next transition-def" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                  <path d="M16.7812 10.5312L11.5312 15.7812L11 16.3125L9.96875 15.25L10.5 14.7188L14.4688 10.75H1V9.25H14.4688L10.5 5.28125L9.96875 4.75L11 3.6875L11.5312 4.21875L16.7812 9.46875L17.3125 10L16.7812 10.5312Z" fill="currentColor" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        <?php endif; ?>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
          </section>
          <section id="s-new-cards" class="s-new-cards s-new-cards--secondary z-index-2 position-relative color-1 section-padding-def">
            <div class="s-new-cards__symbol-wrap-2 overflow-hidden container z-index-min-1 position-absolute h-100 def-position">
              <div class="s-new-cards__symbol-wrap pointer-event-none position-absolute">
                <img src="assets/images/logos/Crest-Symbol.svg" alt="" loading="lazy" class="s-new-cards__symbol obj-contain w-100 batch-item-js batch-item--static-js">
              </div>
            </div>
            <div class="container container-anim-js s-new-cards__container s-blog__filter-js" data-filter-group="select_category">
              <h2 class="s-new-cards__title h3 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Explore <span class="d-sm-inline d-none">all</span> Events</h2>
              <?php
              $categories = [
                ['slug' => 'faith', 'name' => 'Faith'],
                ['slug' => 'sport', 'name' => 'Sport'],
                ['slug' => 'early-learning', 'name' => 'Early Learning'],
                ['slug' => 'lower-primary', 'name' => 'Lower Primary'],
                ['slug' => 'upper-primary', 'name' => 'Upper Primary'],
                ['slug' => 'transition', 'name' => 'Transition'],
                ['slug' => 'middle-secondary', 'name' => 'Middle Secondary'],
                ['slug' => 'senior-secondary', 'name' => 'Senior Secondary'],
                ['slug' => 'community', 'name' => 'Community'],
                ['slug' => 'performing-arts', 'name' => 'Performing Arts'],
              ];
              ?>
              <div class="s-new-cards__dropdown d-md-none position-relative batch-item-js batch-item--static-js dropdown-block-js">
                <div class="s-new-cards__dropdown-btn text-normal dropdown-block__btn-js btn d-flex align-items-center justify-content-between w-100">
                  <span class="s-new-cards__dropdown-btn-txt ls-1">Select Events Category</span>

                  <svg class="s-new-cards__dropdown-btn-icon transition-def" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 14.0625H10.0312L9.5 13.5312L4.5 8.53125L3.96875 8L5.03125 6.9375L5.5625 7.46875L10.0312 11.9375L14.5 7.46875L15.0312 6.9375L16.0625 8L15.5312 8.53125L10.5312 13.5312L10 14.0625Z" fill="currentColor" />
                  </svg>
                </div>
                <div class="s-new-cards__dropdown-content position-absolute" data-lenis-prevent data-scroll="exclude">
                  <ul class="list-unstyled s-new-cards__dropdown-nav">
                    <?php foreach ($categories as $category): ?>
                      <li class="s-new-cards__dropdown-item">
                        <div data-filter="<?= '.' . $category['slug']; ?>"
                          class="s-new-cards__nav-link link-inner-wrap s-blog__filter-link-js">
                          <span class="link-inner"><?= $category['name']; ?></span>
                        </div>
                      </li>
                    <?php endforeach; ?>
                  </ul>

                </div>

              </div>
              <ul class="nav s-new-cards__nav d-md-flex d-none">
                <?php foreach ($categories as $category): ?>
                  <li class="s-new-cards__nav-item  batch-item-js batch-item--static-js">
                    <div data-filter="<?= '.' . $category['slug']; ?>"
                      class="s-new-cards__nav-btn btn s-blog__filter-link-js <?= ($current_category === $category['slug']) ? 'is-active' : ''; ?>">
                      <?= $category['name']; ?>
                    </div>
                  </li>
                <?php endforeach; ?>
              </ul>

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
                ],
                [
                  'image' => 'eab/eab-4.webp',
                  'category' => 'Event',
                  'label' => 'Parents',
                  'time' => 'Saturday, February 14, 2026 at 10 AM – 1 PM AWST',
                  'title' => 'Parents\' Association Meeting - Term 1',
                  'location' => 'John XXIII Avenue, Mount Claremont, WA, Australia, Western Australia 6010',
                  'description' => '<p>Join us for our Term 1 Parents\' Association Meeting – an important opportunity to hear updates from our Parent Committees and College Executive Team, and</p>',
                  'class' => 'community'
                ],
                [
                  'image' => 'eab/eab-4.webp',
                  'category' => 'Event',
                  'label' => 'Middle Secondary',
                  'time' => 'Test 1',
                  'title' => 'Parents\' Association Meeting - Term 1',
                  'location' => 'John XXIII Avenue, Mount Claremont, WA, Australia, Western Australia 6010',
                  'description' => '<p>Join us for our Term 1 Parents\' Association Meeting – an important opportunity to hear updates from our Parent Committees and College Executive Team, and</p>',
                  'class' => 'middle-secondary'
                ],


                [
                  'image' => 'eab/eab-4.webp',
                  'category' => 'Event',
                  'label' => 'Middle Secondary',
                  'time' => 'Test 2',
                  'title' => 'Parents\' Association Meeting - Term 1',
                  'location' => 'John XXIII Avenue, Mount Claremont, WA, Australia, Western Australia 6010',
                  'description' => '<p>Join us for our Term 1 Parents\' Association Meeting – an important opportunity to hear updates from our Parent Committees and College Executive Team, and</p>',
                  'class' => 'middle-secondary'
                ],

                [
                  'image' => 'eab/eab-4.webp',
                  'category' => 'Event',
                  'label' => 'Middle Secondary',
                  'time' => 'Test 3',
                  'title' => 'Parents\' Association Meeting - Term 1',
                  'location' => 'John XXIII Avenue, Mount Claremont, WA, Australia, Western Australia 6010',
                  'description' => '<p>Join us for our Term 1 Parents\' Association Meeting – an important opportunity to hear updates from our Parent Committees and College Executive Team, and</p>',
                  'class' => 'middle-secondary'
                ],
              ];
              ?>
              <div id="s-new-cards__items-wrap" class="s-new-cards__items-wrap overflow-hidden">
                <div class="s-new-cards__items row s-blog__items-js s-blog__items-secondary-js">
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
              <div class="s-new-cards__pagination d-flex flex-wrap justify-content-center pagination-js batch-item-js batch-item--static-js"></div>
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
  <script src="assets/dist/simple-complex.min.js"></script>
  <!-- <script src="assets/js/libraries.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/swiper.min.js"></script>
  <script src="assets/js/isotope.min.js"></script> -->
</body>

</html>