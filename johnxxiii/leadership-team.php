<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Leadership Team | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/simple.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
  <link rel="stylesheet" href="./assets/css/main.css"> -->
</head>

<body class="pw-page">
  <div id="before-preloader-content" class="before-preloader-content">
    <?php
    include("header.php");
    ?>
    <div id="body-content-wrap" class="content-wrap body-content-wrap" data-scrollbar>
      <div id="body-content" class="body-content overflow-hidden position-relative">
        <main id="main">
          <?php
          $hero_class = 's-hero--secondary s-hero--third';
          $hero_pic = 'pw/pw-1.webp';
          $hero_title = 'Leadership Team';
          $hero_description = '<p>Step into the world of John XXIII College – where students from Pre-Kindergarten to Year 12 thrive in <br class="del-on-mob-js"> an environment that values intellectual growth, spiritual development, and service to others.</p>';
          $hero_nav_title = 'ABOUT Us';
          $hero_nav_active = 'Our College';
          $hero_nav_items = [
            'Our College',
            'Principal',
            'Faith',
            'Heritage',
            'Vision, Mission and Values',
            'Governance',
            'Reconciliation',
            'Sustainability',
            'Connections',
            'Performance',
          ];
          include("sections/hero.php");
          ?>
          <section class="s-team section-padding-def">
            <div class="container s-team__container">
              <div class="s-team__heading text-center mx-auto w-100 last-el-mb-0">
                <h3 class="s-team__kicker kicker-def color-2 batch-item-js batch-item--static-js">Explore our Team </h3>
                <h2 class="s-team__title h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">our people make the difference.</h2>
                <div class="s-team__txt-wrap simple-content lead-txt ls-3 color-4 last-el-mb-0 children-batch-anim-js">
                  <p>We are renowned as a centre of Catholic co-educational excellence, a launchpad for society’s future leaders and a powerful community united by a shared vision and values. </p>
                </div>
              </div>
              <?php
              $categories = [
                ['slug' => 'leadership-team', 'name' => 'Leadership Team'],
                ['slug' => 'college-council', 'name' => 'College Council'],
                ['slug' => 'finance-and-risk-management-committee', 'name' => 'Finance and Risk Management Committee'],
                ['slug' => 'property-and-planning-committee', 'name' => 'Property and Planning Committee'],
              ];
              $current_category = 'leadership-team';
              ?>
              <ul class="nav s-new-cards__nav s-blog__filter-js mx-auto w-100 color-1 d-flex justify-content-center" data-filter-group="select_category">
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
              $team_cards = [
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Mr Simon Martin',
                  'position' => 'Chair',
                  'location' => 'BCom, CA, GAICD',
                  'date' => 'Appointed: May 2025',
                  'class' => 'leadership-team'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Mr Christian Owen',
                  'position' => 'Deputy Chair',
                  'location' => 'Bachelor of Laws (Hons) <br> Parent Representative',
                  'date' => 'Appointed: October 2020',
                  'class' => 'leadership-team college-council'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Mr John Cumming',
                  'position' => 'Secretary',
                  'location' => 'BBus, FCA, GAICD  (ex officio Member of <br> all Council Standing Committees)',
                  'date' => 'Appointed: November 2015',
                  'class' => 'leadership-team college-council'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Dr Liz Dallimore',
                  'position' => 'Loreto Provincial Representative',
                  'location' => 'Bsc (Hons), PHD Neuroscience, MBA <br> Technology, AICD',
                  'date' => 'Appointed: June 2025',
                  'class' => 'leadership-team'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Ms Jessica O\'Hara',
                  'position' => 'Representative member',
                  'location' => 'Bachelor of Laws (LLB), Bachelor of <br> Commerce (BCom)',
                  'date' => 'Appointed: Feb 2024',
                  'class' => 'leadership-team'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Very Rev Dr Sean <br> Fernandes SThD',
                  'position' => 'Archbishop Nominee ',
                  'location' => 'BTh, SThL, SThD, Senior Lecture',
                  'date' => 'Appointed: July 2025',
                  'class' => 'leadership-team'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Mr Neil Hackett',
                  'position' => 'Past Student Member',
                  'location' => 'BEcon, GAICD',
                  'date' => 'Appointed: June 2018',
                  'class' => 'leadership-team'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Mr Adrian Iredale',
                  'position' => 'Chair Property and Planning',
                  'location' => 'M.Arch (RMIT), B.Arch (Hons), B.App.Sci. AAIA',
                  'date' => 'Appointed June 2022',
                  'class' => 'leadership-team'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Ms Natalie Kendal',
                  'position' => 'Parent Representative',
                  'location' => 'BCom (Finance) and Law',
                  'date' => 'Appointed: August 2019',
                  'class' => 'leadership-team'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Mr Daniel Mahon',
                  'position' => 'Principal',
                  'location' => 'MSL, BEd, GradCertRE, MiniCertGiftedEd, <br> FIML ANZ',
                  'date' => 'Appointed: May 2023',
                  'class' => 'leadership-team finance-and-risk-management-committee'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Ms Maureen Ryan',
                  'position' => 'Nominee of the Loreto Provincial',
                  'location' => 'BCom, CA, GAICD',
                  'date' => 'Appointed January 2024',
                  'class' => 'leadership-team finance-and-risk-management-committee'
                ],
                [
                  'image' => 'placeholder.webp',
                  'title' => 'Sr Wendy Hildebrand <br> ibvm',
                  'position' => 'Province Leader, Loreto Australia <br> and South East Asia',
                  'location' => 'Loreto Provincial Member',
                  'date' => 'Appointed: Feb 2024',
                  'class' => 'leadership-team finance-and-risk-management-committee'
                ],
              ];
              ?>
              <div id="s-new-cards__items-wrap" class="s-team__row s-blog__items-js row">
                <?php foreach ($team_cards as $card): ?>
                  <?php
                  $card_img = $card['image'];
                  $card_title = $card['title'];
                  $card_position = $card['position'];
                  $card_location = $card['location'];
                  $card_date = $card['date'];
                  $card_class = $card['class'];
                  include("./snippets/team-card.php");
                  ?>
                <?php endforeach; ?>
              </div>
              <div class="s-new-cards__pagination d-flex flex-wrap justify-content-center pagination-js batch-item-js batch-item--static-js"></div>
            </div>
          </section>
          <section class="s-cta dark-theme position-relative z-index-1 section-padding-def d-flex align-items-center">
            <div class="overlay s-cta__overlay z-index-0 after-el--full after-el">
              <img loading="lazy" class="s-cta__overlay-pic w-100 h-100 obj-cover" src="./assets/images/pw/pw-2.webp" style="object-position: 75% 50%" alt="">
            </div>
            <div class="container s-cta__container container-anim-js position-relative z-index-1">
              <blockquote class="s-cta__txt-wrap color-1 text-center quote-txt ls-2 mx-auto w-100 last-el-mb-0 mb-0 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">
                <p>“John XXIII College has outstanding academics, phenomenal athletic and arts programs and every resource needed to grow, learn and prepare students for success.”</p>
              </blockquote>
            </div>
          </section>
          <?php
          $cards_section_cards_load_more = true;
          $cards_section_title = 'keep Exploring ABOUT US';
          $cards_section_cards = [
            [
              'title' => 'Our College',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'pw/pw-5.webp',
            ],
            [
              'title' => 'Faith',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'pw/pw-6.webp',
            ],
            [
              'title' => 'Heritage',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'pw/pw-7.webp',
            ],

            [
              'title' => 'Vision, Mission <br> and Values',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-6.webp',
            ],
            [
              'title' => 'Governance',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-7.webp',
            ],
            [
              'title' => 'Reconciliation <br> in Action',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-8.webp',
            ],
            [
              'title' => 'Sustainability Initiatives',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-9.webp',
            ],
            [
              'title' => 'National and <br> Global Connections',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-10.webp',
            ],
            [
              'title' => 'Performance',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-11.webp',
            ],
            [
              'title' => 'Publications',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-12.webp',
            ],
            [
              'title' => 'Giving',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-13.webp',
            ],
            [
              'title' => 'Policies',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-14.webp',
            ],
          ];
          include("sections/cards-section.php");
          ?>
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