<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Latest News List View | John XXIII College </title>
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
          <section class="s-hero-news">
            <div class="s-hero-news__container container-anim-js container position-relative z-index-1">
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

              <div class="s-hero-news__heading text-center last-el-mb-0  mx-auto w-100">
                <h1 class="s-hero-news__title batch-item-js color-3 batch-hero-item-js batch-item--text-js split-text-init-js split-text-chars-js">Latest News</h1>
                <div class="s-hero-news__txt-wrap ls-1 last-el-mb-0 batch-item-js batch-hero-item-js batch-item--text-js split-text-init-js split-text-lines-js">
                  <p>Stories, updates, insights, highlights that capture the moments, achievements and everyday life of our community.</p>
                </div>
              </div>

            </div>


            <?php
            $hero_news_slides = [
              [
                'image' => 'lnl/lnl-1.webp',
                'object_position' => '50% 50%',
                'category' => 'News',
                'category_name' => 'Facilities',
                'title_line_1' => 'a fresh new look',
                'title_line_2' => 'for College Canteen',
                'text' => '<p>Over the holidays, we have been busy with renovations, including new counters and modern equipment, creating a welcoming space that celebrates good food and great company.</p>',
              ],
              [
                'image' => 'lnd/lnd-1.webp',
                'object_position' => '50% 20%',
                'category' => 'News',
                'category_name' => 'Local',
                'title_line_1' => 'Another Headline',
                'title_line_2' => 'Event News',
                'text' => '<p>More text about this event here...</p>',
              ],
              [
                'image' => 'eab/eab-1.webp',
                'object_position' => '50% 50%',
                'category' => 'Feature',
                'category_name' => 'Culture',
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
                                <a class="link-inner-wrap ls-0-12 fw-500 s-hero-news__swiper-content-slide-content-btn" href="#">
                                  <span class="link-inner">read full article</span>
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
                            <h2 class="s-hero-news__swiper-content-slide-content-title swiper-slide-anim-static swiper-slide-anim--1-static">
                              <span class="second-style s-hero-news__swiper-content-slide-content-title-line"><?= $slide['title_line_1'] ?></span>
                              <span class="s-hero-news__swiper-content-slide-content-title-line"><?= $slide['title_line_2'] ?></span>
                            </h2>
                            <div class="s-hero-news__swiper-content-slide-content-txt-wrap last-el-mb-0 swiper-slide-anim-static body-2 swiper-slide-anim--1-static">
                              <?= $slide['text'] ?>
                            </div>
                            <div class="s-hero-news__swiper-content-slide-content-btn-wrap color-1 text-uppercase swiper-slide-anim-static swiper-slide-anim--1-static">
                              <a class="link-inner-wrap ls-0-12 fw-500 s-hero-news__swiper-content-slide-content-btn" href="#">
                                <span class="link-inner">read full article</span>
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
          <section id="s-new-cards" class="s-new-cards z-index-2 position-relative color-1 section-padding-def">
            <div class="s-new-cards__symbol-wrap-2 overflow-hidden container z-index-min-1 position-absolute h-100 def-position">
              <div class="s-new-cards__symbol-wrap pointer-event-none position-absolute">
                <img src="assets/images/logos/Crest-Symbol.svg" alt="" loading="lazy" class="s-new-cards__symbol obj-contain w-100 batch-item-js batch-item--static-js">
              </div>
            </div>
            <div class="container container-anim-js s-new-cards__container s-blog__filter-js" data-filter-group="select_category">
              <h2 class="s-new-cards__title h3 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Explore News Articles</h2>
              <?php
              $categories = [
                ['slug' => 'whole-school-news', 'name' => 'Whole School News'],
                ['slug' => 'announcements', 'name' => 'Announcements'],
                ['slug' => 'academic', 'name' => 'Academic'],
                ['slug' => 'faith', 'name' => 'Faith'],
                ['slug' => 'sport', 'name' => 'Sport'],
                ['slug' => 'student-spotlight', 'name' => 'Student Spotlight'],
                ['slug' => 'alumni-spotlight', 'name' => 'Alumni Spotlight'],
                ['slug' => 'staff', 'name' => 'Teaching and Staff'],
                ['slug' => 'early-learning', 'name' => 'Early Learning'],
                ['slug' => 'lower-primary', 'name' => 'Lower Primary'],
                ['slug' => 'upper-primary', 'name' => 'Upper Primary'],
                ['slug' => 'transition', 'name' => 'Transition'],
                ['slug' => 'middle-secondary', 'name' => 'Middle Secondary'],
                ['slug' => 'senior-secondary', 'name' => 'Senior Secondary'],
                ['slug' => 'careers', 'name' => 'Careers'],
                ['slug' => 'co-curricular', 'name' => 'Co-Curricular'],
                ['slug' => 'enrolments', 'name' => 'Enrolments'],
                ['slug' => 'achievements', 'name' => 'Achievements'],
                ['slug' => 'grounds-and-maintenance', 'name' => 'Grounds and Maintenance'],
                ['slug' => 'community', 'name' => 'Community'],
                ['slug' => 'facilities', 'name' => 'Facilities'],
                ['slug' => 'performing-arts', 'name' => 'Performing Arts'],
              ];
              $current_category = 'whole-school-news';
              ?>
              <div class="s-new-cards__dropdown d-md-none position-relative batch-item-js batch-item--static-js dropdown-block-js">
                <div class="s-new-cards__dropdown-btn text-normal dropdown-block__btn-js btn d-flex align-items-center justify-content-between w-100">
                  <span class="s-new-cards__dropdown-btn-txt ls-1">Select News Category</span>

                  <svg class="s-new-cards__dropdown-btn-icon transition-def" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 14.0625H10.0312L9.5 13.5312L4.5 8.53125L3.96875 8L5.03125 6.9375L5.5625 7.46875L10.0312 11.9375L14.5 7.46875L15.0312 6.9375L16.0625 8L15.5312 8.53125L10.5312 13.5312L10 14.0625Z" fill="currentColor" />
                  </svg>
                </div>
                <div class="s-new-cards__dropdown-content position-absolute" data-lenis-prevent data-scroll="exclude">
                  <ul class="list-unstyled s-new-cards__dropdown-nav">
                    <?php foreach ($categories as $category): ?>
                      <li class="s-new-cards__dropdown-item">
                        <div data-filter="<?= '.' . $category['slug']; ?>"
                          class="s-new-cards__nav-link link-inner-wrap s-blog__filter-link-js <?= ($current_category === $category['slug']) ? 'is-active' : ''; ?>">
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
              $new_cards = [
                [
                  'category' => 'Event',
                  'label' => 'Alumni Spotlight',
                  'title' => 'The Circuitous path to silicon valley',
                  'image' => 'lnl/lnl-2.webp',
                  'class' => 'whole-school-news alumni-spotlight'
                ],
                [
                  'category' => 'Leaders Edition',
                  'label' => 'Student Spotlight',
                  'title' => 'Student Spotlight: Claire | Visual Arts Captain',
                  'image' => 'lnl/lnl-3.webp',
                  'class' => 'whole-school-news student-spotlight'
                ],
                [
                  'category' => 'News',
                  'label' => 'Performing Arts',
                  'title' => 'SDA Production\'s MATILDA JR THE MUSICAL',
                  'image' => 'lnl/lnl-4.webp',
                  'class' => 'whole-school-news performing-arts'
                ],
                [
                  'category' => 'Theatre Edition',
                  'label' => 'Alumni Spotlight',
                  'title' => 'Free Aviary\' s single ‘CALL MY OWN’ one of WA Music \'s Fresh Picks',
                  'image' => 'lnl/lnl-5.webp',
                  'class' => 'whole-school-news alumni-spotlight'
                ],
                [
                  'category' => 'Event',
                  'label' => 'News',
                  'title' => 'Introducing our 2026 Parents\' Association Committee',
                  'image' => 'lnl/lnl-6.webp',
                  'class' => 'announcements whole-school-news'
                ],
                [
                  'category' => 'Theatre Edition',
                  'label' => 'Alumni Spotlight',
                  'title' => 'Summer Rule (Class 2023) has co-written, co-directed and will co-star in BITE BACK',
                  'image' => 'lnl/lnl-7.webp',
                  'class' => 'whole-school-news alumni-spotlight'
                ],
                [
                  'category' => 'Leaders Edition',
                  'label' => 'Student Spotlight',
                  'title' => 'Student Spotlight: Leader Edition Isabela | Drama Captain',
                  'image' => 'lnl/lnl-8.webp',
                  'class' => 'whole-school-news student-spotlight'
                ],
                [
                  'category' => 'Grounds and Maintenance',
                  'label' => 'News',
                  'title' => '2025 graduates spend summer break alongside Grounds and Maintenance team',
                  'image' => 'lnl/lnl-9.webp',
                  'class' => 'whole-school-news whole-school-news'
                ],
                [
                  'category' => 'Event',
                  'label' => 'Alumni Spotlight',
                  'title' => 'Pat Boere (Class 2014) named finalist in Camera House ‘Sport Image of The Year’ category',
                  'image' => 'lnl/lnl-10.webp',
                  'class' => 'whole-school-news alumni-spotlight'
                ],
                [
                  'category' => 'Leaders Edition',
                  'label' => 'Student Spotlight',
                  'title' => 'Student Spotlight: Leader Edition Matilda | Music Captain',
                  'image' => 'lnl/lnl-11.webp',
                  'class' => 'whole-school-news student-spotlight'
                ],
                [
                  'category' => 'Performing Arts',
                  'label' => 'News',
                  'title' => 'Set construction is underway for CHARLIE AND THE CHOCOLATE FACTORY!',
                  'image' => 'lnl/lnl-12.webp',
                  'class' => 'whole-school-news performing-arts whole-school-news'
                ],
                [
                  'category' => 'Leaders Edition',
                  'label' => 'Student Spotlight',
                  'title' => 'Student Spotlight: Leader Edition Ollie | Events Captain',
                  'image' => 'lnl/lnl-13.webp',
                  'class' => 'whole-school-news student-spotlight'
                ],
                // ---------------------------------
                [
                  'category' => 'News',
                  'label' => 'Event',
                  'title' => 'Test 1',
                  'image' => 'lnl/lnl-2.webp',
                  'class' => 'whole-school-news announcements event'
                ],
                [
                  'category' => 'News',
                  'label' => 'Sport',
                  'title' => 'Test 2',
                  'image' => 'lnl/lnl-3.webp',
                  'class' => 'whole-school-news announcements academic'
                ],
                [
                  'category' => 'News',
                  'label' => 'Sport',
                  'title' => 'Test 3',
                  'image' => 'lnl/lnl-4.webp',
                  'class' => 'whole-school-news announcements academic'
                ],
                [
                  'category' => 'News',
                  'label' => 'Achievements',
                  'title' => 'Test 4',
                  'image' => 'lnl/lnl-5.webp',
                  'class' => 'whole-school-news announcements achievements'
                ],
              ];
              ?>
              <div id="s-new-cards__items-wrap" class="s-new-cards__items-wrap overflow-hidden">
                <div class="s-new-cards__items row s-blog__items-js">
                  <?php foreach ($new_cards as $card): ?>
                    <?php
                    $card_img = $card['image'];
                    $card_title = $card['title'];
                    $card_category = $card['category'];
                    $card_label = $card['label'];
                    $card_class = $card['class'];
                    include("./snippets/blog-card.php");
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