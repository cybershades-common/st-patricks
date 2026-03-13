<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Principal's Welcome | John XXIII College </title>
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
          $hero_title = 'Meet our principal';
          $hero_description = '<p>Our Principal is committed to fostering a welcoming, inclusive and future-focused
environment. 
          <br class="del-on-mob-js">With a passion for Ignatian education, he leads our College in encouraging
students to strive for excellence, act with integrity and become people for others.</p>';
          $hero_nav_title = 'ABOUT Us';
          $hero_nav_active = 'Principal';
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
          $simple_txt_class = 's-simple-txt--secondary s-simple-txt--third';
          $simple_txt_kicker = 'Welcome';
          $simple_txt_title = 'As educators, we stand at a pivotal moment in history.';
          $simple_txt_lead_text = '<p>The young people in our care will
inherit a world shaped by rapid technological change, complex environmental challenges
and evolving social structures. They will need more than technical skills to navigate this
landscape – they will require wisdom, ethical judgment and a clear sense of purpose.</p>';
          $simple_txt_description = ' <p>At John XXIII College, we understand that authentic education must develop the whole
person. The Fourth Industrial Revolution demands critical thinking, creativity and
collaboration, yet these capabilities mean little without the foundation of character,
conscience and compassion. Our Ignatian tradition offers a robust framework for this
essential work, grounded in deep understanding of how young people develop purpose and
the capacity to contribute meaningfully to the world they will inherit.</p>
              <p>Throughout our history, we have continually evolved to meet the needs of the young people
entrusted to us. Our Strategic Plan represents our commitment to preparing students for
their future. Developed through deep consultation with our community, this plan challenges
us to be responsive, to focus on &#39;next practice&#39; rather than &#39;best practice&#39;, and to form
transformative partnerships that serve our students&#39; growth.</p>
              <p>Just as we encourage our students to embrace the challenge and struggle of learning – to
use their mistakes to enhance growth, resilience and empowerment – we adopt this same
mindset as we embark on the next stage of our College&#39;s journey.</p>
 <p>
             <b>Daniel Mahon</b> <br>
             Principal
          </p>
           ';
          include("sections/simple-txt.php");
          ?>
            <section class="section-padding-def text-center s-simple-txt" style="margin-top: -180px;">
            <div class="container container-anim-js position-relative z-index-1 s-simple-txt__container">
           <div class="s-simple-txt__link-wrap">
                <a href="#" class="s-simple-txt__link arrow-link arrow-link-js batch-item-js link-inner-wrap d-inline-flex align-items-center">
                  <span class="arrow-link__circle-wrap position-relative col-auto">
                    <svg class="arrow-link__circle" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="arrow-link__circle-right arrow-link__circle-part arrow-link__circle-part-js" d="M18.5 1 A17.5 17.5 0 0 1 18.5 36" />
                      <path class="arrow-link__circle-left arrow-link__circle-part arrow-link__circle-part-js" d="M18.5 1 A17.5 17.5 0 0 0 18.5 36" />
                    </svg>
                    <svg class="arrow-link__arrow position-absolute arrow-link__arrow-js" width="37" height="21" viewBox="0 0 37 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <use href="#arrow-big-right"></use>
                    </svg>
                  </span> <span class="arrow-link__txt-wrap">
                    <span class="link-inner arrow-link__txt arrow-link__txt-js split-text-init-js split-text-chars-js">READ OUR STRATEGIC PLAN</span>
                  </span> </a>
              </div>
          </div>
          </section>
          
          
          
          <section class="s-cta dark-theme position-relative z-index-1 section-padding-def d-flex align-items-center">
            <div class="overlay s-cta__overlay z-index-0 after-el--full after-el">
              <img loading="lazy" class="s-cta__overlay-pic w-100 h-100 obj-cover" src="./assets/images/pw/pw-2.webp" style="object-position: 75% 50%" alt="">
            </div>
            <div class="container s-cta__container container-anim-js position-relative z-index-1">
              <blockquote class="s-cta__txt-wrap color-1 text-center quote-txt ls-2 mx-auto w-100 last-el-mb-0 mb-0 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">
                <p>‘John XXIII College offers so much more than a great education. My children have thrived
academically and have also grown in confidence, resilience and character through the
College’s outstanding co-curricular and sports programs. It’s a place where every student is
supported to discover their strengths and feel part of a caring community.’</p>
              </blockquote>
            </div>
          </section>
          <?php
          unset($simple_txt_class, $simple_txt_kicker, $simple_txt_title, $simple_txt_lead_text, $simple_txt_description, $simple_txt_use_crest);
          $simple_txt_class = 's-simple-txt--secondary s-simple-txt--third';
          $simple_txt_use_crest = false;
          $simple_txt_description = '
        <h4>the five pillars of our strategic Plan</h4>
        <p>Underpinned by our mission, values and vision, our strategic plan is built on five essential
pillars that guide every aspect of College life: </p>
        <ul>
          <li><strong>Enriching our Catholic Community of Faith.</strong><p>Deepening our lived experience of Catholic identity and Ignatian spirituality across all
dimensions of College life.</p></li>
          <li><strong>Inspiring Educational Excellence</strong><p>Challenging students to develop both knowledge and wisdom through innovative,
engaging learning experiences.</p>
          <li><strong><em>Cura Personalis</em> (care for the whole person)</strong><p>Ensuring every student is known, valued and supported to discover and develop their
unique gifts.</p></li>
          <li><strong>Nurturing an Inclusive Community</strong><p>Creating authentic belonging where diversity is celebrated and every person&#39;s dignity
is honoured.</p></li>
          <li><strong>Sustainability</strong><p>Preparing students to be responsible stewards of our shared future through
environmental and social responsibility.</p></li>
        </ul>
        <p>These pillars reflect our vision to be a leading Catholic, independent, co-
educational College where academic and personal excellence, along with a
commitment to serve others and <strong>Seek Justice</strong>, are the aspirations of every
student.</p>
           ';
          $simple_txt_pics = [
            ['src' => 'pw/pw-3.webp'],
            ['src' => 'pw/pw-4.webp']
          ];
          $simple_txt_second_description = '
          <blockquote><p>‘We are called to nurture faith, inspire hope and act with love. Our Ignatian tradition invites
us to see God in all things and to walk alongside our students as they grow into
compassionate, courageous people for others. Every aspect of our strategic plan is shaped
by this commitment to faith, justice and the dignity of every person.’ </p>  <cite>Janeen Murphy, Deputy Principal – Faith and Mission</cite> </blockquote>
    
         
        ';
          include("sections/simple-txt.php");
          ?>
          <?php
          $cards_section_cards_load_more = true;
          $cards_section_title = 'keep Exploring ABOUT US';
          $cards_section_cards = [
            [
              'title' => 'Our College',
              'text' => '<p>A purposeful Catholic community where students are known, challenged,
and inspired from Pre-Kindergarten to Year 12.</p>',
              'img' => 'pw/pw-5.webp',
            ],
            [
              'title' => 'Faith',
              'text' => '<p>Guided by Ignatian spirituality, we nurture faith that inspires action, deepens purpose,
and calls students to serve the world with courage and compassion.</p>',
              'img' => 'pw/pw-6.webp',
            ],
            [
              'title' => 'Heritage',
              'text' => '<p>Our Jesuit and Loreto heritage shapes a culture of respect, service, and
principled innovation – honouring the past while responding to the present.</p>',
              'img' => 'pw/pw-7.webp',
            ],

            [
              'title' => 'Vision, Mission <br> and Values',
              'text' => '<p>Pursuing excellence, justice, and service, we prepare
students to lead with integrity and compassion.</p>',
              'img' => 'about/about-6.webp',
            ],
            [
              'title' => 'Governance',
              'text' => '<p>Strong leadership and transparent governance ensure the College fulfils its
mission and upholds its values with integrity.</p>',
              'img' => 'about/about-7.webp',
            ],
            [
              'title' => 'Reconciliation <br> in Action',
              'text' => '<p>We walk alongside Aboriginal and Torres Strait Islander
peoples, fostering understanding, deep respect, and a genuine commitment to reconciliation.</p>',
              'img' => 'about/about-8.webp',
            ],
            [
              'title' => 'Sustainability Initiatives',
              'text' => '<p>We model responsible stewardship, embracing practices
that care for our community and the natural environment.</p>',
              'img' => 'about/about-9.webp',
            ],
            [
              'title' => 'National and <br> Global Connections',
              'text' => '<p>Our students are enriched by meaningful
partnerships within worldwide Jesuit and Loreto educational networks.</p>',
              'img' => 'about/about-10.webp',
            ],
            [
              'title' => 'Performance',
              'text' => '<p>Academic achievement and personal growth go hand in hand at John
XXIII College, where every student is supported to realise their potential.</p>',
              'img' => 'about/about-11.webp',
            ],
            [
              'title' => 'Publications',
              'text' => '<p>Our publications capture the stories, achievements, and community life that
define the John XXIII College experience.</p>',
              'img' => 'about/about-12.webp',
            ],
            [
              'title' => 'Giving',
              'text' => '<p>The generosity of our community helps provide the opportunities and resources that
enrich student life and extend our mission.</p>',
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
          $banner_pic = 'pw/pw-8.webp';
          $banner_title = 'Become a person for others';
          $banner_description = '<p>Discover how our Ignatian tradition shapes an educational experience that develops the
whole person. Book a personal tour to see our vibrant community in action.</p>';
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