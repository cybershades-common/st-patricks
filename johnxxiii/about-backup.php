<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>About JTC Landing | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/index.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
  <link rel="stylesheet" href="./assets/css/venobox.min.css">
  <link rel="stylesheet" href="./assets/css/main.css"> -->
</head>

<body class="about-page">
  <div id="before-preloader-content" class="before-preloader-content">
    <?php
    include("header.php");
    ?>
    <div id="body-content-wrap" class="content-wrap body-content-wrap" data-scrollbar>
      <div id="body-content" class="body-content overflow-hidden position-relative">
        <main id="main">
          <?php
          $hero_class = 's-hero--secondary';
          $hero_pic = 'about/about-1.webp';
          $hero_kicker = 'Seek Justice';
          $hero_title = 'ABOUT John XXIII COllege';
          $hero_description = '<p>Step into the world of John XXIII College – where students from Pre-Kindergarten to Year 12 thrive
          <br class="del-on-mob-js"> an environment that values intellectual growth, spiritual development, and service to others.</p>';
          $hero_nav_title = 'ABOUT Us';
          $hero_nav_active = 'About';
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
          <?php
          $simple_txt_class = 's-simple-txt--secondary';
          $simple_txt_kicker = 'Welcome';
          $simple_txt_title = 'Welcome to John XXIII College';
          $simple_txt_description = ' <p>Faith formation at John XXIII College is both deeply grounded in Catholic tradition and dynamically engaged with contemporary life. Our approach invites students to explore Catholic faith through study, reflection, prayer, and service.</p>
              <p>Our Catholic identity shapes not only religious education but the entire educational experience. Through liturgical celebrations, prayer, and service opportunities, students encounter the richness of Catholic faith and its relevance for life today. The Ignatian spiritual tradition provides distinctive elements – finding God in all things, care for the whole person, and the call to be people for others.</p>
              <p>Students learn to pause, reflect, and discern meaning in their experiences, developing self-awareness and ethical judgment that prepare them for lives of purpose, integrity, and service.</p>
           ';
          $simple_txt_buttons = [
            ['label' => 'Meet our principal', 'classes' => 'btn--md btn--third', 'icon' => false],
            ['label' => 'Our College', 'classes' => 'btn--md btn--transparent', 'icon' => true]
          ];
          include("sections/simple-txt.php");
          ?>
          <?php
          include("sections/video-block.php");
          ?>
          <?php
          $cards_section_title = 'Explore ABOUT US';
          $cards_section_description = '<p>Inspired by the Gospels, and in the spirit of John XXIII, Mary Ward and St Ignatius of Loyola, we seek to be people of competence, conscience and compassion who are committed to God and the service of others.</p>';
          $cards_section_cards = [
            [
              'title' => 'Our College',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-3.webp',
            ],
            [
              'title' => 'Faith',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-4.webp',
            ],
            [
              'title' => 'Heritage',
              'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
              'img' => 'about/about-5.webp',
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
          unset($banner_class, $banner_pic, $banner_title, $banner_description, $banner_buttons);
          $banner_pic = 'about/about-15.webp';
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