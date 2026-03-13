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
  
  <style>
      .desktop-break {
  display: none;
}

@media (min-width: 768px) {
  .desktop-break {
    display: inline;
  }
}
      </style>
  </style>
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
          $hero_description = '<p>Where Ignatian tradition meets contemporary education – John XXIII College develops
students of competence, conscience, and compassion from Pre-Kindergarten through Year
12. Our Catholic co-educational community balances academic excellence with character
formation, preparing students not just for further studies, but for lives of purpose and service.</p>';
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
          $simple_txt_description = ' <p>Welcome to John XXIII College, one of Western Australia&#39;s leading independent Catholic
schools. Located on an expansive 24.6-hectare campus in Mount Claremont, our College
offers a distinctive educational experience that extends far beyond academic achievement.</p>
              <p>At John XXIII College, we embrace the Ignatian understanding that true education
addresses the development of the whole person. From Pre-Kindergarten through Year 12,
students grow in competence, conscience, and compassion within a community that
balances intellectual rigour with ethical formation.</p>
              <p>Our approach, <em>cura personalis</em> – care for the whole person – ensures every student is
known, valued, and supported throughout their educational journey. We celebrate diversity,
encourage curiosity and resilience, and provide opportunities for young people to discover
their unique gifts within a safe, supportive environment. Guided by our motto <strong>Seek Justice</strong>
and inspired by the rich traditions of the Jesuits and Loreto Sisters, we empower students to
become people for others and lead lives of purpose and integrity.</p>
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
          $cards_section_description = '<p>Inspired by the Gospels and the spirit of John XXIII, Mary Ward, and St Ignatius of Loyola,
we strive to educate people of competence, conscience, and compassion dedicated to God
and the service of others. Our Catholic identity, Ignatian heritage, and dedication to the
whole person shape <br class="desktop-break">every aspect of College life.</p>';
          $cards_section_cards = [
            [
              'title' => 'Our College',
              'text' => '<p>A purposeful Catholic community where students are known, challenged, and inspired
from Pre-Kindergarten to Year 12.</p>',
              'img' => 'about/about-3.webp',
            ],
            [
              'title' => 'Faith',
              'text' => '<p>Guided by Ignatian spirituality, we nurture faith that inspires action, deepens purpose, and
calls students to serve the world with courage and compassion.</p>',
              'img' => 'about/about-4.webp',
            ],
            [
              'title' => 'Heritage',
              'text' => '<p>Our Jesuit and Loreto heritage shapes a culture of respect, service, and principled
innovation – honouring the past while responding to the present.</p>',
              'img' => 'about/about-5.webp',
            ],
            [
              'title' => 'Vision, Mission <br> and Values',
              'text' => '<p>Pursuing excellence, justice, and service, we prepare students to lead
with integrity and compassion.</p>',
              'img' => 'about/about-6.webp',
            ],
            [
              'title' => 'Governance',
              'text' => '<p>Strong leadership and transparent governance ensure the College fulfils its mission
and upholds its values with integrity.</p>',
              'img' => 'about/about-7.webp',
            ],
            [
              'title' => 'Reconciliation <br> in Action',
              'text' => '<p>We walk alongside Aboriginal and Torres Strait Islander peoples,
fostering understanding, deep respect, and a genuine commitment to reconciliation.</p>',
              'img' => 'about/about-8.webp',
            ],
            [
              'title' => 'Sustainability Initiatives',
              'text' => '<p>We model responsible stewardship, embracing practices that care for
our community and the natural environment.</p>',
              'img' => 'about/about-9.webp',
            ],
            [
              'title' => 'National and <br> Global Connections',
              'text' => '<p>Our students are enriched by meaningful partnerships with
worldwide Jesuit and Loreto educational networks.</p>',
              'img' => 'about/about-10.webp',
            ],
            [
              'title' => 'Performance',
              'text' => '<p>Academic achievement and personal growth go hand in hand at John XXIII College,
where every student is supported to realise their potential.</p>',
              'img' => 'about/about-11.webp',
            ],
            [
              'title' => 'Publications',
              'text' => '<p>Our publications capture the stories, achievements, and community life that define
the John XXIII College experience.</p>',
              'img' => 'about/about-12.webp',
            ],
            [
              'title' => 'Giving',
              'text' => '<p>The generosity of our community helps provide the opportunities and resources that enrich
student life and extend our mission.</p>',
              'img' => 'about/about-13.webp',
            ],
            [
              'title' => 'Policies',
              'text' => '<p>Our policies uphold our commitment to the safety, respect, and wellbeing of every
member of our community.</p>',
              'img' => 'about/about-14.webp',
            ],
          ];
          include("sections/cards-section.php");
          ?>
          <?php
          unset($banner_class, $banner_pic, $banner_title, $banner_description, $banner_buttons);
          $banner_pic = 'about/about-15.webp';
          $banner_title = 'Become a person for others';
          $banner_description = '<p>Join a community where students are challenged to think deeply, act with compassion, and
make meaningful contributions to the world. From Pre-Kindergarten to Year 12, we nurture

every child to grow in competence, conscience and compassion, empowering them to thrive
in a modern, ever-changing society.</p>';
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
  <!-- <script src="assets/dist/index.min.js"></script> -->
  <script src="assets/js/libraries.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/venobox.min.js"></script>
<script src="assets/js/swiper.min.js"></script> 
</body>

</html>