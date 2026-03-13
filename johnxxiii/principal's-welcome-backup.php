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
          $hero_description = '<p>Step into the world of John XXIII College – where students from Pre-Kindergarten to Year 12 thrive
          <br class="del-on-mob-js"> an environment that values intellectual growth, spiritual development, and service to others.</p>';
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
          $simple_txt_title = 'John XXIII College is <br class="del-on-mob-js"> an extraordinary place.';
          $simple_txt_lead_text = '<p>We are renowned as a centre of Catholic co-educational excellence, a launchpad for society’s future leaders and a powerful community united by a shared vision and values.</p>';
          $simple_txt_description = ' <p>Our alumni are recognised in their local communities and beyond as leaders who are shaping the world in which we live. We consistently attract staff members of the highest calibre; individuals filled with a hunger for excellence and a commitment to ensuring our students are at the heart of everything we do. Our College community is profoundly and consistently involved and supportive.</p>
              <p>Throughout our history, we have continually evolved to best meet the needs of the young people whose education has been entrusted to us, and as the world we live in changes swiftly and radically, we will continue to evolve and adapt to be able to deliver the kind of education necessary for a generation whose inheritance is a planet facing the most significant social and environmental challenges of its history.</p>
              <p>Our Ignatian tradition encourages us to value the importance of contemplation, discernment, and action. Discernment can guide us to listen attentively, engage in dialogue and discern how we can contribute. It is through this lens that the process of developing our new strategic plan has provided a powerful opportunity to reflect on our achievements and to challenge ourselves about our next steps.</p>
           ';
          include("sections/simple-txt.php");
          ?>
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
          unset($simple_txt_class, $simple_txt_kicker, $simple_txt_title, $simple_txt_lead_text, $simple_txt_description, $simple_txt_use_crest);
          $simple_txt_class = 's-simple-txt--secondary s-simple-txt--third';
          $simple_txt_use_crest = false;
          $simple_txt_description = '
        <h4>the five pillars of our strategic Plan</h4>
        <p>Underpinned by our Mission, Values and Vision, the five pillars of our new strategic plan are: </p>
        <ul>
          <li>Enriching our Catholic Community of Faith</li>
          <li>Inspiring Educational Excellence
          <li>Cura Personalis (care for the whole person)</li>
          <li>Nurturing an Inclusive Community</li>
          <li>Sustainability</li>
        </ul>
        <p>With this in mind, our strategic plan is profoundly future-focused; it challenges us to become even more responsive, to focus on ‘next practice’ rather than ‘best practice’ and to form transformative partnerships to achieve our goals. Just as we encourage our students to embrace the challenge and struggle of their learning and to use their mistakes to enhance growth, resilience and sense of empowerment, so too do we embrace this same mindset as we set forth on this next stage of our College’s journey. </p>
        <p>Our vision, as detailed in our new strategic plan, is to be a leading Catholic, independent, co-educational College where academic and personal excellence, along with the commitment to serve others and seek justice, are the aspirations of every student.</p>
        <p>To realise this vision, we need to prepare our students for their future as opposed to our past. To be well prepared for their future, our students need to critically think, be creative, communicate and collaborate and the development of these skills needs to start as early as possible. One of the blessings of our Pre K-12 College is that we can ensure our students are taught how to develop these skills from a very young age. </p>
           ';
          $simple_txt_pics = [
            ['src' => 'pw/pw-3.webp'],
            ['src' => 'pw/pw-4.webp']
          ];
          $simple_txt_second_description = '
          <blockquote><p>We can have a powerful influence on our students’ preparedness for their changeable world. Our commitment to our Catholic faith, and our Ignatian tradition, underpins every aspect of our new strategic plan. </p>  <cite>Author Name, Position</cite> </blockquote>
          <p>Delivering education in a faith that actively seeks justice is profoundly important to us, as is our deep commitment to respecting the dignity of all people. We are driven to ensure that our students graduate as passionate contributors to their communities who, when confronted with the need to answer difficult questions and face life’s inevitable challenges, do so well-informed by the values they have learnt during their excellent Catholic education. </p>
          <p>This strategic plan has been shaped and refined over an extended period by multiple stakeholders. Deep collaboration and consultation have been essential in building and articulating a shared vision for our future. Just as producing the plan has been a team effort, so too we will rely on every member of our community to achieve our ambitions. I sincerely thank everyone involved in the development of this plan, as well as all members of our extraordinary College community for their ongoing contributions. I look forward with great excitement to the years of growth and transformation ahead and commend our new Strategic Plan 2023-2027 to you.</p>
          <p>
             <b>Daniel Mahon</b> <br>
             Principal
          </p>
        ';
          include("sections/simple-txt.php");
          ?>
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