<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Homepage | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/index.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
  <link rel="stylesheet" href="./assets/css/venobox.min.css">
  <link rel="stylesheet" href="./assets/css/main.css"> -->
</head>

<body class="homepage">
  <?php
  include("preloader.php");
  ?>
  <div id="before-preloader-content" class="before-preloader-content">
    <?php
    include("header.php");
    ?>
    <div id="body-content-wrap" class="content-wrap body-content-wrap" data-scrollbar>
      <div id="body-content" class="body-content overflow-hidden position-relative">
        <main id="main">
          <section class="s-hero d-flex align-items-sm-center align-items-end container-video-js position-relative z-index-1 dark-theme mh-100vh">
            <div class="s-hero__overlay z-index-0 after-el--full after-el overlay">
              <video class="s-hero__pic video-js w-100 h-100 obj-cover" src="https://cim-school-videos-library.s3.ap-southeast-2.amazonaws.com/highlights_1.mp4" preload="metadata" playsinline="" muted="" loop=""></video>
              <img loading="lazy" class="video-poster-js transition-def s-hero__overlay-pic w-100 h-100 position-absolute z-index-1 obj-cover" src="./assets/images/home/index-1.webp" alt="">
            </div>
            <div class="container container-hero-anim-js s-hero__container position-relative z-index-1 text-center">
              <div class="s-hero__content mx-auto">
                <h3 id="s-hero__kicker-def" class="kicker-def s-hero__kicker-def">welcome to John XXIII College</h3>
                <h1 id="s-hero__title" class="s-hero__title split-text-init-js split-text-lines-js">EDUCATION WITH PURPOSE
                  <br> in the Ignatian tradition
                </h1>
                <div id="s-hero__txt-wrap" class="s-hero__txt-wrap ls-1 last-el-mb-0 split-text-init-js split-text-lines-js">
                  <p>At John XXIII College, academic excellence and character formation go hand in hand. From Pre-
Kindergarten to Year 12, we nurture the whole person – guiding students toward meaningful lives as
people of competence, conscience and compassion.
                  </p>
                </div>
                <div id="s-hero__btn-wrap" class="s-hero__btn-wrap">
                  <a href="https://cim-school-videos-library.s3.ap-southeast-2.amazonaws.com/highlights_1.mp4" class="circle-btn mx-auto bg-none s-hero__btn venobox-link transition-def d-flex align-items-center justify-content-center" data-autoplay="true" data-vbtype="video">
                    <svg class="s-hero__btn-icon" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 10.5L0 21V0L18 10.5Z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div class="s-fixed-btns d-sm-none d-flex container-anim-js">
            <div class="s-fixed-btns__btn-wrap batch-item-js batch-item--static-js">
              <a href="#" class="btn w-100 btn--secondary s-fixed-btns__btn">Visit</a>
            </div>
            <div class="s-fixed-btns__btn-wrap batch-item-js batch-item--static-js">
              <a href="#" class="btn w-100 btn--secondary s-fixed-btns__btn">enrol</a>
            </div>
            <div class="s-fixed-btns__btn-wrap batch-item-js batch-item--static-js">
              <a href="#" class="btn w-100 btn--secondary s-fixed-btns__btn">Give</a>
            </div>
          </div>
          <section class="section-padding-def text-center s-simple-txt">
            <div class="container container-anim-js position-relative z-index-1 s-simple-txt__container">
              <div class="s-simple-txt__symbol-wrap pointer-event-none position-absolute z-index-min-1">
                <img src="assets/images/logos/Crest-Symbol.svg" alt="" loading="lazy" class="s-simple-txt__symbol obj-contain w-100 batch-item-js batch-item--static-js">
              </div>
              <div class="s-simple-txt__txt-wrap mx-auto last-el-mb-0 children-batch-anim-js">
                <p>We believe education should form great minds and good hearts.</p>
                <p>Grounded in faith and guided by the Ignatian tradition, we challenge students to pursue academic
excellence while growing in compassion, integrity and a sense of purpose.</p>
                <p>Here, every student is known and valued. We empower young people to think deeply, act justly and
use their gifts in service of others as they step into the world with confidence and hope.</p>
              </div>
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
                    <span class="link-inner arrow-link__txt arrow-link__txt-js split-text-init-js split-text-chars-js">About John XXIII COLLEGE</span>
                  </span> </a>
              </div>
            </div>
          </section>
          <section class="section-padding-def s-cards">
            <div class="container container-anim-js s-cards__container">
              <div class="s-cards__heading mx-auto text-center last-el-mb-0">
                <h3 class="s-cards__kicker kicker-def color-2 batch-item-js batch-item--static-js">Our Values</h3>
                <h2 class="s-cards__title h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Seek Justice</h2>
                <div class="s-cards__txt-wrap body-2 last-el-mb-0 batch-item-js batch-item--static-js">
                  <p>Inspired by the Gospels, and in the spirit of John XXIII, Mary Ward and St Ignatius of Loyola, we seek
to be people of competence, conscience and compassion who are committed to God and the service
of others.</p>
                </div>
              </div>
              <div class="row s-cards__row justify-content-center">
                <?php
                $cards = [
                  [
                    'title' => 'Faith',
                    'text' => '<p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.</p>',
                    'img' => 'home/index-2.webp',
                  ],
                  [
                    'title' => 'LOVE AND SERVICE FOR OTHERS',
                    'text' => '<p>We inspire students to become people for others through compassionate action and social justice.</p>',
                    'img' => 'home/index-3.webp',
                  ],
                  [
                    'title' => 'CARE AND RESPECT FOR THE INDIVIDUAL',
                    'text' => '<p>We honour the dignity and unique gifts of every person in our community.</p>',
                    'img' => 'home/index-4.webp',
                  ],
                ];
                ?>
                <?php foreach ($cards as $card): ?>
                  <div class="s-cards__col col-lg-4 col-md-6 col-12">
                    <?php
                    $card_img = $card['img'];
                    $card_title = $card['title'];
                    $card_text = $card['text'];
                    include("./snippets/card.php");
                    ?>
                  </div>
                <?php endforeach; ?>
              </div>
              <div class="s-cards__btns d-flex flex-wrap justify-content-center">
                <div class="s-cards__btn-wrap batch-item-js batch-item--static-js">
                  <a href="#" class="btn s-cards__btn btn--md btn--third">Finding God in all things</a>
                </div>
                <div class="s-cards__btn-wrap batch-item-js batch-item--static-js">
                  <a href="#" class="btn s-cards__btn btn--md btn--transparent">Vision, Mission and Values
                    <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <use href="#arrow-right"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section class="section-padding-def d-flex align-items-center overflow-hidden position-relative z-index-1 dark-theme s-full-slider complex-sliders-block-js">
            <div class="s-full-slider__overlay overlay after-el after-el--full">
              <div class="swiper s-full-slider__pics-slider h-100 slider-pics-js">
                <div class="swiper-wrapper s-full-slider__pics-slider-wrapper">
                  <?php
                  $slides_pic = [
                    'index-5.webp',
                    'index-6.webp',
                    'index-7.webp',
                    'index-8.webp',
                    'index-9.webp',
                    'index-10.webp',
                  ];
                  ?>
                  <?php foreach ($slides_pic as $src): ?>
                    <div class="swiper-slide s-full-slider__pics-slide">
                      <img
                        data-swiper-parallax-scale="1.5"
                        class="s-full-slider__pics-slide-pic w-100 h-100 obj-cover"
                        src="./assets/images/home/<?= $src ?>"
                        loading="lazy"
                        alt="">
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
            <div class="container container-anim-js s-full-slider__container text-center position-relative z-index-1">
              <div class="swiper slider-contents-js overflow-visible s-full-slider__txt-slider">
                <div class="swiper-wrapper s-full-slider__txt-slider-wrapper">
                  <?php
                  $slides_txt = [
                    [
                      'kicker' => 'WHY families choose us',
                      'title' => 'A Catholic Independent co-education College',
                      'text' => '<p>Heart, mind, body and spirit thrive together here. Cura personalis – care for the whole person –
anchors our teaching, wellbeing and community life. Each student is known, valued and supported
as they become confident, thoughtful young people prepared for lives of purpose.</p>',
                      'link_text' => 'Our Wellbeing Approach'
                    ],
                    [
                      'kicker' => 'WHY families choose us',
                      'title' => 'Education in the Ignatian tradition',
                      'text' => '<p>We live our mission each day through reflection, liturgy, service, retreats and formation programs.
Students learn to recognise God in daily moments and to respond with generosity and integrity.</p>',
                      'link_text' => 'Our Mission in Action'
                    ],
                    [
                      'kicker' => 'WHY families choose us',
                      'title' => 'Learning that builds courage and curiosity',
                      'text' => '<p>Students are supported to achieve personal excellence. The Magis program, enrichment pathways and modern teaching practices give every learner a chance to stretch toward ambitious goals.</p>',
                      'link_text' => 'Explore Learning'
                    ],
                        [
                      'kicker' => 'WHY families choose us',
                      'title' => 'A VIBRANT LIFE BEYOND THE CLASSROOM',
                      'text' => '<p>Extensive opportunities across arts, sport, leadership, music, service, sustainability and co-curricular
clubs help students discover passions and forge friendships.</p>',
                      'link_text' => 'VIEW CO-CURRICULAR OPPORTUNITIES'
                    ],
                    [
                      'kicker' => 'WHY families choose us',
                      'title' => 'A COMMUNITY THAT FEELS LIKE HOME',
                      'text' => '<p>Families, staff, students and alumni create a welcoming community bound by shared values.
Education becomes a shared journey that strengthens families and forms future leaders.</p>',
                      'link_text' => 'Join Our Community'
                    ],
                         [
                      'kicker' => 'WHY families choose us',
                      'title' => 'A STUNNING CAMPUS THAT INSPIRES LEARNING',
                      'text' => '<p>Set among open green spaces and thoughtfully designed facilities, our expansive 24.6-hectare
campus invites students to take pride in their school community.</p>',
                      'link_text' => 'EXPLORE OUR CAMPUS'
                    ],
                  ];
                  ?>
                  <?php foreach ($slides_txt as $index => $slide):
                    $is_first = ($index === 0);
                  ?>
                    <div class="swiper-slide s-full-slider__txt-slide">
                      <div class="s-full-slider__txt-kicker-wrap swiper-slide-anim-static swiper-slide-anim--1-static">
                        <h3 class="s-full-slider__txt-kicker kicker-def mb-0<?= $is_first ? ' batch-item--static-js batch-item-js' : '' ?>">
                          <?= $slide['kicker'] ?>
                        </h3>
                      </div>
                      <div class="s-full-slider__txt-title-wrap swiper-slide-anim-static swiper-slide-anim--2-static">
                        <h2 class="s-full-slider__txt-title mb-0<?= $is_first ? ' batch-item-js batch-item--text-js split-text-init-js split-text-lines-js' : '' ?>">
                          <?= $slide['title'] ?>
                        </h2>
                      </div>
                      <div class="s-full-slider__txt-wrap-2 swiper-slide-anim-static swiper-slide-anim--3-static">
                        <div class="s-full-slider__txt-wrap color-1 body-2 last-el-mb-0<?= $is_first ? ' batch-item--static-js batch-item-js' : '' ?>">
                          <?= $slide['text'] ?>
                        </div>
                      </div>
                      <div class="s-full-slider__txt-link-wrap swiper-slide-anim-static swiper-slide-anim--4-static">
                        <a href="#"
                          class="s-full-slider__txt-link arrow-link  <?= $is_first ? 'arrow-link-js batch-item-js' : '' ?> link-inner-wrap d-inline-flex align-items-center">

                          <span class="arrow-link__circle-wrap position-relative col-auto">

                            <svg class="arrow-link__circle" width="37" height="37" viewBox="0 0 37 37" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path class="arrow-link__circle-right arrow-link__circle-part arrow-link__circle-part-js"
                                d="M18.5 1 A17.5 17.5 0 0 1 18.5 36" />
                              <path class="arrow-link__circle-left arrow-link__circle-part arrow-link__circle-part-js"
                                d="M18.5 1 A17.5 17.5 0 0 0 18.5 36" />
                            </svg>

                            <svg class="arrow-link__arrow position-absolute arrow-link__arrow-js"
                              width="37" height="21" viewBox="0 0 37 21" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <use href="#arrow-big-right"></use>
                            </svg>

                          </span> <span class="arrow-link__txt-wrap">
                            <span class="link-inner arrow-link__txt arrow-link__txt-js <?= $is_first ? 'split-text-init-js split-text-chars-js' : '' ?>">
                              <?= $slide['link_text'] ?>
                            </span>
                          </span> </a>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
            <div class="s-full-slider__controls">
              <div class="swiper-pagination s-full-slider__pagination  batch-item-js batch-hero-item-js batch-item--static-js"></div>
              <div class="s-full-slider__swiper-btns swiper-buttons  batch-item-js batch-item--static-js d-flex justify-content-between">
                <div class="swiper-button swiper-button-prev d-flex align-items-center justify-content-center">
                  <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use href="#swiper-icon-prev"></use>
                  </svg>
                </div>
                <div class="swiper-button swiper-button-next d-flex align-items-center justify-content-center">
                  <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use href="#swiper-icon-next"></use>
                  </svg>
                </div>
              </div>
            </div>
          </section>
          <section class="section-padding-def s-pre-k overflow-hidden">
            <div class="container container-anim-js s-pre-k__container">
              <div class="s-pre-k__heading d-flex flex-wrap mx-auto align-items-start">
                <div class="s-pre-k__heading-col s-pre-k__heading-col--1 col-lg-5 d-flex align-items-center">
                  <img class="s-pre-k__heading-col-logo col-auto obj-contain batch-item--static-js batch-item-js" loading="lazy" src="./assets/images/logos/Crest-Logo.svg" alt="">
                  <h2 class="s-pre-k__title mb-0 h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">The Pre-K
                    <br> to 12 Journey
                  </h2>
                </div>
                <div class="s-pre-k__heading-col position-relative s-pre-k__heading-col--2 col-lg-6 last-el-mb-0">
                  <div class="s-pre-k__line vertical-line position-absolute d-lg-block d-none batch-item-js batch-item--scale-x-js"></div>
                  <div class="s-pre-k__line-2 top-line position-absolute d-lg-none d-block batch-item-js batch-item--scale-y-js"></div>
                  <div class="s-pre-k__txt-wrap last-el-mb-0 body-3 batch-item--static-js batch-item-js">
                    <p>From first steps to graduation, students join John XXIII College at key stages, deepening in learning,
faith and belonging within one connected community.</p>
                  </div>
                  <div class="s-pre-k__btns d-flex flex-wrap">
                    <div class="s-pre-k__btn-wrap batch-item--static-js batch-item-js">
                      <a href="#" class="btn s-pre-k__btn btn--md btn--third">Learning at JTC</a>
                    </div>
                    <div class="s-pre-k__btn-wrap batch-item--static-js batch-item-js">
                      <a href="#" class="btn s-pre-k__btn btn--md btn--transparent">Inclusive Education
                        <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-pre-k__main-block complex-sliders-block-3-js position-relative dark-theme z-index-1 d-flex flex-column">
                <div class="s-pre-k__main-block-overlay overlay after-el--full after-el">
                  <div class="s-pre-k__pics-swiper h-100 slider-pics-3-js swiper">
                    <div class="swiper-wrapper s-pre-k__pics-swiper-wrapper">
                      <?php
                      $slides_2_pic = [
                        'index-11.webp',
                        'index-12.webp',
                        'Journey-Slide.jpg',
                        'index-13.webp',
                        'index-14.webp',
                        'index-15.webp',
                        'index-16.webp',
                      ];
                      ?>
                      <?php foreach ($slides_2_pic as $src): ?>
                        <div class="swiper-slide s-pre-k__pics-swiper-slide">
                          <img
                            data-swiper-parallax-scale="1.5"
                            class="s-pre-k__pics-swiper-slide-pic w-100 h-100 obj-cover"
                            src="./assets/images/home/<?= $src ?>"
                            loading="lazy"
                            alt=""
                            style="object-position: 50% 30%">
                        </div>
                      <?php endforeach; ?>
                    </div>
                  </div>
                </div>
                <div class="s-full-slider__controls">
                  <div class="swiper-pagination s-full-slider__pagination  batch-item-js batch-hero-item-js batch-item--static-js"></div>
                  <div class="s-full-slider__swiper-btns swiper-buttons  batch-item-js batch-item--static-js d-flex justify-content-between">
                    <div class="swiper-button swiper-button-prev d-flex align-items-center justify-content-center">
                      <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use href="#swiper-icon-prev"></use>
                      </svg>
                    </div>
                    <div class="swiper-button swiper-button-next d-flex align-items-center justify-content-center">
                      <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use href="#swiper-icon-next"></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="s-pre-k__txt-slider slider-contents-3-js text-center overflow-visible swiper">
                  <div class="swiper-wrapper s-pre-k__txt-slider-wrapper">
                    <?php
                    $slides_2_txt = [
                      [
                        'kicker' => 'Pre Kindy and Kindy (Ages 3-5)',
                        'title' => 'Early Learning',
                        'text' => '<p>The journey begins with wonder. In our early years, children learn through play, imagination and
gentle guidance. They feel safe, known and joyful as they discover friendships, curiosity and the first
steps of learning grounded in care and faith.</p>',
                        'btn_text' => 'Explore Early Learning'
                      ],
                      [
                        'kicker' => 'First Year of School',
                        'title' => 'Pre-Primary',
                        'text' => '<p>The transition to school begins here. In Pre-Primary, children experience their first year of formal schooling through a nurturing blend of play and structured learning. They build essential skills in literacy, numeracy and social interaction while developing confidence, independence and a love of discovery.</p>',
                        'btn_text' => 'Explore Lower Primary'
                      ],
                              [
                        'kicker' => 'YEARS 1-4',
                        'title' => 'Lower Primary',
                        'text' => '<p>Strong foundations take shape here. Students develop essential skills in literacy and numeracy while building confidence, independence and enthusiasm for learning. Through encouragement and care, each child cultivates self-belief.</p>',
                        'btn_text' => 'Explore Lower Primary'
                      ],
                      [
                        'kicker' => 'Years 5–6',
                        'title' => 'Upper Primary',
                        'text' => '<p>As independence strengthens, so does responsibility. Students are challenged to think more deeply, take ownership of their learning and develop leadership skills. This stage prepares them academically and emotionally for the transition ahead.</p>',
                        'btn_text' => 'Explore Upper Primary'
                      ],
                      [
                        'kicker' => 'Transition to Year 7',
                        'title' => 'Transition',
                        'text' => '<p>This significant period of change is guided with care. Our transition program supports students as they move into secondary school, building effective habits and a sense of belonging. Strong relationships and clear structures help students step forward with confidence.</p>',
                        'btn_text' => 'Explore Transition to Year 7'
                      ],
                      [
                        'kicker' => 'Years 7–9',
                        'title' => 'Middle Secondary',
                        'text' => '<p>These are years of discovery and growth. Students explore new subjects, interests and perspectives while developing critical thinking and resilience. Supported by pastoral care and academic guidance, they begin to shape who they are becoming.</p>',
                        'btn_text' => 'Explore Middle Secondary'
                      ],
                      [
                        'kicker' => 'Years 10–12',
                        'title' => 'Senior Secondary',
                        'text' => '<p>Purpose comes into focus. Students refine their academic pathways, prepare for life beyond school and emerge as people of integrity. With high expectations and strong support, they graduate ready to serve, lead and thrive in the world.</p>',
                        'btn_text' => 'Explore Senior Secondary'
                      ],
                    ];
                    ?>
                    <?php foreach ($slides_2_txt as $index => $slide):
                      $is_first = ($index === 0);
                    ?>
                      <div class="swiper-slide color-1 s-pre-k__txt-slide last-el-mb-0">
                        <div class="s-pre-k__txt-slide-title-wrap swiper-slide-anim-static swiper-slide-anim--1-static">
                          <h2 class="s-pre-k__txt-slide-title h3 mb-0<?= $is_first ? ' batch-item--static-js batch-item-js' : '' ?>">
                            <?= $slide['title'] ?>
                          </h2>
                        </div>
                        <div class="s-pre-k__txt-slide-kicker-wrap swiper-slide-anim-static swiper-slide-anim--2-static">
                          <h3 class="s-pre-k__txt-slide-kicker kicker-def mb-0<?= $is_first ? ' batch-item-js batch-item--text-js split-text-init-js split-text-lines-js' : '' ?>">
                            <?= $slide['kicker'] ?>
                          </h3>
                        </div>
                        <div class="s-pre-k__txt-slide-txt-wrap-2 swiper-slide-anim-static swiper-slide-anim--3-static">
                          <div class="ss-pre-k__txt-slide-txt-wrap body-3 last-el-mb-0<?= $is_first ? ' batch-item--static-js batch-item-js' : '' ?>">
                            <?= $slide['text'] ?>
                          </div>
                        </div>
                        <div class="s-pre-k__txt-slide-btn-wrap swiper-slide-anim-static swiper-slide-anim--4-static">
                          <div class="s-pre-k__txt-slide-btn-wrap-2<?= $is_first ? ' batch-item--static-js batch-item-js' : '' ?>">
                            <a href="#" class="btn btn--md s-pre-k__txt-slide-btn"><?= $slide['btn_text'] ?></a>
                          </div>
                        </div>
                      </div>
                    <?php endforeach; ?>
                  </div>
                </div>
                <div class="s-pre-k__blocks-swiper w-100 slider-thumbs-3-js swiper overflow-visible">
                  <div class="swiper-wrapper s-pre-k__blocks-swiper-wrapper justify-content-xl-center">
                    <?php
                    $slides_3_thumb = [
                     
                    ];
                    ?>
                    <?php foreach ($slides_3_thumb as $index => $thumb):
                      $is_first = ($index === 0);
                    ?>
                      <div class="s-pre-k__blocks-swiper-slide swiper-slide <?= $is_first ? 'is-active' : '' ?>" data-id="<?= $index ?>">
                        <div class="s-pre-k__block hover-pic-wrap batch-item--static-js batch-item-js text-center dark-theme position-relative z-index-1 d-flex flex-column justify-content-center">
                          <div class="s-pre-k__block-pic-wrap def-position overflow-hidden position-absolute z-index-min-1 after-el after-el--full d-lg-none">
                            <img loading="lazy" class="s-pre-k__block-pic hover-pic w-100 h-100 obj-cover transition-smooth" src="./assets/images/home/<?= $thumb['pic'] ?>" alt="">
                          </div>
                          <a href="#" class="link-mask d-lg-none"></a>
                          <h3 class="s-pre-k__block-title kicker-def"><?= $thumb['title'] ?></h3>
                          <p class="s-pre-k__block-txt body-4 mb-0"><?= $thumb['text'] ?></p>
                        </div>
                      </div>
                    <?php endforeach; ?>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section-padding-def s-results">
            <div class="container container-anim-js s-results__container position-relative z-index-1">
              <div class="s-results__symbol-wrap pointer-event-none position-absolute z-index-min-1">
                <img src="assets/images/logos/Crest-Symbol.svg" alt="" loading="lazy" class="s-results__symbol obj-contain w-100 batch-item-js batch-item--static-js">
              </div>
              <div class="s-results__heading text-center mx-auto last-el-mb-0">
                <h3 class="s-results__kicker kicker-def color-2 batch-item-js batch-item--static-js">academic performance</h3>
                <h2 class="s-results__title h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">RIGOROUS LEARNING, EXCEPTIONAL OUTCOMES</h2>
                <div class="s-results__txt-wrap body-2 last-el-mb-0 batch-item-js batch-item--static-js">
                  <p>We empower students to question deeply, think critically and engage confidently with a changing
world. Together, we pursue excellence and prepare young people to meet the challenges of our
times with wisdom and purpose.</p>
                </div>
              </div>
              <?php
              $results = [
                [
                  'value' => '80%+',
                  'text' => '<p>of eligible students studying Religion and Life ATAR include this subject in their final WACE selection.</p>'
                ],
                [
                  'value' => '80+',
                  'text' => '<p>co-curricular teams, programs and clubs offered across sport, arts, service, academic extension, and
leadership.</p>'
                ],
                [
                  'value' => '50+',
                  'text' => '<p>subject choices across secondary years, including 24 ATAR options.</p>'
                ],
                [
                  'value' => '60%+',
                  'text' => '<p>of students achieve an ATAR of 90 or above, placing them among the top 10% statewide.</p>'
                ],
              ];
              ?>
              <div class="row s-results__row">
                <?php foreach ($results as $item): ?>
                  <div class="col-lg-3 col-md-6 col-12 s-results__col">
                    <div class="result-item position-relative">
                      <div class="result-item__line batch-item-js batch-item--scale-x-js batch-item--scale-x-fast-js top-line position-absolute"></div>
                      <h3 class="result-item__title fw-300 color-1 lh-1 display-3 batch-item-js batch-item--text-js split-text-chars-js split-text-init-js">
                        <?= $item['value'] ?>
                      </h3>
                      <div class="result-item__txt-wrap last-el-mb-0 batch-item--static-js batch-item-js">
                        <?= $item['text'] ?>
                      </div>
                      <div class="result-item__line-2 batch-item-js batch-item--scale-x-js batch-item--scale-x-fast-js bottom-line position-absolute"></div>
                    </div>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          </section>
          <section class="section-padding-def s-offering">
            <div class="container s-offering__container container-anim-js">
              <div class="s-offering__heading d-flex flex-wrap mx-auto">
                <div class="s-offering__heading-col s-offering__heading-col--1 col-5 d-flex align-items-center">
                  <h2 class="s-offering__title mb-0 h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Extensive
                    <br> Co-curricular <br> offering
                  </h2>
                </div>
                <div class="s-offering__heading-col position-relative s-offering__heading-col--2 col-6 last-el-mb-0">
                  <div class="s-offering__line vertical-line position-absolute  d-lg-block d-none batch-item-js batch-item--scale-x-js"></div>
                  <div class="s-offering__line-2 top-line position-absolute d-lg-none d-block batch-item-js batch-item--scale-y-js"></div>
                  <div class="s-offering__txt-wrap last-el-mb-0 body-3 batch-item--static-js batch-item-js">
                    <p>Beyond the classroom, students discover their unique gifts through sport, arts, service, academic
extension, and leadership– cultivating their talents in pursuit of the <em>magis</em>.</p>
                  </div>
                  <div class="s-offering__btns d-flex flex-wrap">
                    <div class="s-offering__btn-wrap batch-item--static-js batch-item-js">
                      <a href="#" class="btn s-offering__btn btn--md btn--third">Learning at JTC</a>
                    </div>
                    <div class="s-offering__btn-wrap batch-item--static-js batch-item-js">
                      <a href="#" class="btn s-offering__btn btn--md btn--transparent">Inclusive Education
                        <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                 
                  
                </div>
              </div>
              <div class="swiper cards-swiper-js overflow-visible s-offering__swiper">
                <div class="swiper-wrapper s-offering__swiper-wrapper">
                  <?php
                  $cards_2 = [
                    [
                      'title' => 'Sport',
                      'text' => '<p>Compete, develop and excel across team and individual sports – building fitness, resilience
and leadership through participation and representative opportunities.</p>',
                      'img' => 'home/index-17.webp',
                    ],
                    [
                      'title' => 'Music',
                      'text' => '<p>Explore musical passions through choirs, bands, orchestras and individual tuition – refining
technical skill, artistic expression and the confidence to perform.</p>',
                      'img' => 'home/index-18.webp',
                    ],
                    [
                      'title' => 'Performing Arts',
                      'text' => '<p>Bring stories to life through drama, dance and musical theatre – nurturing confidence,
creativity and collaboration while discovering the transformative power of performance.</p>',
                      'img' => 'home/index-19.webp',
                    ],
                    [
                      'title' => 'Magis',
                      'text' => '<p>Pursue academic excellence beyond the curriculum through enrichment projects, university
partnerships and competitions – extending knowledge, critical thinking and intellectual
curiosity.</p>',
                      'img' => 'home/index-20.webp',
                    ],
                    [
                      'title' => 'Visual Arts',
                      'text' => '<p>Express creative vision through painting, sculpture, photography and digital media – refining
artistic skills, technical confidence and unique visual expression.</p>',
                      'img' => 'home/index-21.webp',
                    ],
                    [
                      'title' => 'Clubs and Activities',
                      'text' => '<p>Explore diverse interests from robotics and coding to debating and sustainability –
connecting with like-minded peers while discovering new skills and passions.</p>',
                      'img' => 'home/index-22.webp',
                    ],
                    [
                      'title' => 'Outdoor Education',
                      'text' => '<p>Challenge yourself through bushwalking, camping and adventure activities – building
resilience, teamwork and environmental awareness in natural settings.</p>',
                      'img' => 'home/index-23.webp',
                    ],
                    [
                      'title' => 'Roncalli Service Program',
                      'text' => '<p>Serve others through community partnerships and social justice projects – living the call to
be people for others.</p>',
                      'img' => 'home/index-24.webp',
                    ],
                    [
                      'title' => 'Trips and Pilgrimage',
                      'text' => '<p>Broaden perspectives through international immersions, service experiences and spiritual
pilgrimages – deepening faith, cultural understanding and global awareness.</p>',
                      'img' => 'home/index-25.webp',
                    ],
                    [
                      'title' => 'Camps',
                      'text' => '<p>Build community and independence through year-level outdoor experiences – strengthening
bonds, personal growth and resilience through shared adventure and reflection.</p>',
                      'img' => 'home/index-26.webp',
                    ],
                    [
                      'title' => 'Homework Club',
                      'text' => '<p>Access after-school academic support and structured study space – building strong
homework routines, study habits and academic confidence with teacher and alumni
guidance.</p>',
                      'img' => 'home/index-27.webp',
                    ],
                  ];
                  ?>
                  <?php foreach ($cards_2 as $card): ?>
                    <div class="swiper-slide s-offering__swiper-slide">
                      <?php
                      $card_img = $card['img'];
                      $card_title = $card['title'];
                      $card_text = $card['text'];
                      include("./snippets/card.php");
                      ?>
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
          </section>
          <section class="section-padding-def s-news news-block-js">
            <div class="container s-news__container container-anim-js">
              <div class="s-news__heading row justify-content-between align-items-end">
                <div class="s-news__heading-col s-news__heading-col--1 col-auto last-el-mb-0">
                  <h3 class="s-news__kicker kicker-def color-2 batch-item-js batch-item--static-js">News and events</h3>
                  <h2 class="s-news__title h3 color-11 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">What's happening</h2>
                </div>
                <div class="s-news__heading-col s-news__heading-col--2 col-auto d-flex flex-wrap">
                  <div class="s-news__heading-col-tab-titles text-center fw-500 text-uppercase d-flex align-items-center batch-item-js batch-item--static-js">
                    <div class="s-news__heading-col-tab-title is-active news-block__cat-news-js cursor-pointer transition-def">News</div>
                    <div class="s-news__heading-col-tab-line"></div>
                    <div class="s-news__heading-col-tab-title news-block__cat-events-js cursor-pointer transition-def">Events</div>
                  </div>
                  <div class="s-news__btns position-relative batch-item-js batch-item--static-js">
                    <div class="s-news__btn-wrap news-block__btn-news-js is-active s-news__btn-wrap--1">
                      <a href="#" class="btn s-news__btn btn--md btn--third"> <span>all News</span>
                        <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                    <div class="s-news__btn-wrap news-block__btn-events-js s-news__btn-wrap--2">
                      <a href="#" class="btn s-news__btn btn--md btn--third"> <span>all Events</span>
                        <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper s-news__swiper-cats news-block__cats-slider-js overflow-visible">
                <div class="swiper-wrapper s-news__swiper-cat-wrapper">
                  <div class="swiper-slide s-news__swiper-cat-slide">
                    <div class="swiper s-news__swiper-news news-block__news-slider-js overflow-visible">
                      <?php
                      $news = [
                        [
                          'title' => 'From the Principal:<br>2025 A Year in Review',
                          'img' => 'index-28.webp',
                        ],
                        [
                          'title' => 'Faith and Mission Community <br> Mass and Sacraments',
                          'img' => 'index-29.webp',
                        ],
                        [
                          'title' => 'Black Carnaby’s Cockatoo <br> Conservation Project',
                          'img' => 'index-30.webp',
                        ],
                        [
                          'title' => 'Innovative Learning: <br> New Strategies for 2026',
                          'img' => 'index-31.webp',
                        ],
                      ];
                      ?>
                      <div class="swiper-wrapper s-news__swiper-news-wrapper">
                        <?php foreach ($news as $item): ?>
                          <div class="swiper-slide swiper-news-slide">
                            <div class="new-card position-relative hover-pic-wrap">
                              <a href="#" class="link-mask"></a>
                              <div class="new-card__pic-wrap overflow-hidden batch-item-js batch-item--clip-js">
                                <img class="new-card__pic w-100 h-100 obj-cover hover-pic pic-def-bg transition-smooth pic-def-bg"
                                  src="./assets/images/home/<?= $item['img'] ?>"
                                  loading="lazy"
                                  alt="<?= strip_tags($item['title']) ?>">
                              </div>
                              <h3 class="new-card__title batch-item-js batch-item--static-js">
                                <?= $item['title'] ?>
                              </h3>
                            </div>
                          </div>
                        <?php endforeach; ?>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide s-news__swiper-cat-slide">
                    <div class="swiper s-news__swiper-events news-block__events-slider-js overflow-visible">
                      <?php
                      $events = [
                        [
                          'title' => 'Test 1',
                          'img' => 'index-2.webp',
                        ],
                        [
                          'title' => 'Test 2',
                          'img' => 'index-3.webp',
                        ],
                        [
                          'title' => 'Test 3',
                          'img' => 'index-4.webp',
                        ],
                        [
                          'title' => 'Test 3',
                          'img' => 'index-5.webp',
                        ],
                      ];
                      ?>
                      <div class="swiper-wrapper s-news__swiper-events-wrapper">
                        <?php foreach ($events as $item): ?>
                          <div class="swiper-slide swiper-events-slide">
                            <div class="new-card position-relative hover-pic-wrap">
                              <a href="#" class="link-mask"></a>
                              <div class="new-card__pic-wrap overflow-hidden">
                                <img class="new-card__pic w-100 h-100 obj-cover hover-pic transition-smooth pic-def-bg"
                                  src="./assets/images/home/<?= $item['img'] ?>"
                                  loading="lazy"
                                  alt="<?= strip_tags($item['title']) ?>">
                              </div>
                              <h3 class="new-card__title">
                                <?= $item['title'] ?>
                              </h3>
                            </div>
                          </div>
                        <?php endforeach; ?>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-news__footer row justify-content-between align-items-end">
                <div class="s-news__footer-col s-news__footer-col--1 col-auto">
                  <h3 class="s-news__footer-col-title batch-item-js batch-item--static-js">Also Follow us on</h3>
                  <ul class="s-news__soc-list nav align-items-center">
                    <li class="s-news__soc-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-news__soc-list-link hover-pic-wrap d-flex align-items-center justify-content-center bg-none" href="#">
                        <img loading="lazy" class="s-news__soc-list-link-icon w-100 h-100 obj-contain hover-pic transition-def" src="./assets/images/icons/soc-icon-1.svg" alt="">
                      </a>
                    </li>
                    <li class="s-news__soc-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-news__soc-list-link hover-pic-wrap d-flex align-items-center justify-content-center bg-none" href="#">
                        <img loading="lazy" class="s-news__soc-list-link-icon w-100 h-100 obj-contain hover-pic transition-def" src="./assets/images/icons/soc-icon-2.svg" alt="">
                      </a>
                    </li>
                    <li class="s-news__soc-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-news__soc-list-link hover-pic-wrap d-flex align-items-center justify-content-center bg-none" href="#">
                        <img loading="lazy" class="s-news__soc-list-link-icon w-100 h-100 obj-contain hover-pic transition-def" src="./assets/images/icons/soc-icon-3.svg" alt="">
                      </a>
                    </li>
                    <li class="s-news__soc-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-news__soc-list-link hover-pic-wrap d-flex align-items-center justify-content-center bg-none" href="#">
                        <img loading="lazy" class="s-news__soc-list-link-icon w-100 h-100 obj-contain hover-pic transition-def" src="./assets/images/icons/soc-icon-4.svg" alt="">
                      </a>
                    </li>
                    <li class="s-news__soc-list-item batch-item-js batch-item--static-js">
                      <a target="_blank" class="s-news__soc-list-link hover-pic-wrap d-flex align-items-center justify-content-center bg-none" href="#">
                        <img loading="lazy" class="s-news__soc-list-link-icon w-100 h-100 obj-contain hover-pic transition-def" src="./assets/images/icons/soc-icon-5.svg" alt="">
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="s-news__footer-col s-news__footer-col--2 col-auto  batch-item-js batch-item--static-js">
                  <div class="s-news__swiper-btns-wrap position-relative">
                    <div class="s-news__swiper-btns s-news__swiper-news-btns is-active news-block__news-btns-js swiper-buttons d-flex">
                      <div class="swiper-button swiper-button-prev d-flex align-items-center justify-content-center">
                        <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#swiper-icon-prev"></use>
                        </svg>
                      </div>
                      <div class="swiper-button swiper-button-next d-flex align-items-center justify-content-center">
                        <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#swiper-icon-next"></use>
                        </svg>
                      </div>
                    </div>
                    <div class="s-news__swiper-btns position-absolute s-news__swiper-events-btns news-block__events-btns-js swiper-buttons d-flex">
                      <div class="swiper-button swiper-button-prev d-flex align-items-center justify-content-center">
                        <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#swiper-icon-prev"></use>
                        </svg>
                      </div>
                      <div class="swiper-button swiper-button-next d-flex align-items-center justify-content-center">
                        <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#swiper-icon-next"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section-padding-def s-slider-quote complex-sliders-block-2-js">
            <div class="container s-slider-quote__container">
              <div class="s-slider-quote__block mx-auto d-flex batch-item-js batch-item--static-js">
                <div class="s-slider-quote__block-col s-slider-quote__block-col--1 d-flex flex-column">
                  <div class="s-slider-quote__swiper slider-contents-2-js swiper overflow-visible">
                    <div class="swiper-wrapper s-slider-quote__swiper-wrapper">
                      <?php
                      $quotes = [
                        [
                          'text' => '<p>‘What I love about John XXIII 
                          is that it&#39;s not just 
                          about our grades. We learn to 
                          have empathy for others 
                          and make a difference. 
                          The service programs 
                          have shown me how I 
                          can actually help my 
                          community.’</p>',
                          'name' => 'Ally',
                          'pos' => 'Year 9 Student',
                        ],
                        [
                          'text' => '<p>‘There&#39;s always something fun happening at school! I play basketball, I&#39;m learning guitar and I love
our Friday assemblies and whole school events like John XXIII Day. The teachers and older students
are really caring.’</p>',
                          'name' => 'XX.',
                          'pos' => 'Primary Student',
                        ],
                      ];
                      ?>
                      <?php foreach ($quotes as $index => $quote):
                        $is_first = ($index === 0); ?>
                        <div class="swiper-slide s-slider-quote__swiper-slide">
                          <blockquote class="s-slider-quote__quote color-1 mb-0">
                            <div class="s-slider-quote__quote-txt-wrap-2 swiper-slide-anim-static swiper-slide-anim--1-static">
                              <div class="s-slider-quote__quote-txt-wrap<?= $is_first ? ' batch-item-js batch-item--text-js split-text-init-js split-text-lines-js' : '' ?>">
                                <?= $quote['text'] ?>
                              </div>
                            </div>
                            <div class="s-slider-quote__quote-cite-wrap-2 swiper-slide-anim-static swiper-slide-anim--2-static">
                              <div class="s-slider-quote__quote-cite-wrap<?= $is_first ? ' batch-item--static-js batch-item-js' : '' ?>">
                                <cite>
                                  <span class="s-slider-quote__quote-name fw-500 d-block">
                                    <?= $quote['name'] ?>
                                  </span> <span class="s-slider-quote__quote-pos d-block">
                                    <?= $quote['pos'] ?>
                                  </span> </cite>
                              </div>
                            </div>
                          </blockquote>
                        </div>
                      <?php endforeach; ?>
                    </div>
                  </div>
                  <div class="s-slider-quote__footer position-relative d-flex align-items-center justify-content-between">
                    <div class="top-line s-slider-quote__footer-line position-absolute batch-item-js batch-item--scale-x-js batch-item--scale-x-fast-js"></div>
                    <div class="s-slider-quote__footer-btn-wrap batch-item-js batch-item--static-js">
                      <a href="#" class="s-slider-quote__footer-btn color-1 fw-500 text-uppercase link-inner-wrap">
                        <span class="link-inner">More <span class="d-sm-inline d-none">community</span> Stories</span>
                        <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                    <div class="s-slider-quote__footer-swiper-btns color-1 swiper-buttons d-flex batch-item-js batch-item--static-js">
                      <div class="swiper-button swiper-button-prev d-flex align-items-center justify-content-center">
                        <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#swiper-icon-prev"></use>
                        </svg>
                      </div>
                      <div class="swiper-button swiper-button-next d-flex align-items-center justify-content-center">
                        <svg class="swiper-button__icon transition-def" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#swiper-icon-next"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="s-slider-quote__block-col s-slider-quote__block-col--2">
                  <div class="swiper slider-pics-2-js s-slider-quote__block-col-pic-swiper h-100">
                    <?php
                    $picture_quote = [
                      'index-32.webp',
                      'index-33.webp',
                    ];
                    ?>
                    <div class="swiper-wrapper s-slider-quote__block-col-pic-swiper-wrapper">
                      <?php foreach ($picture_quote as $index => $src): ?>
                        <div class="swiper-slide s-slider-quote__block-col-pic-swiper-slide">
                          <img data-swiper-parallax-scale="1.5"
                            class="w-100 h-100 obj-cover s-slider-quote__block-col-pic position-absolute def-position"
                            src="./assets/images/home/<?= $src ?>"
                            loading="lazy"
                            alt="">
                        </div>
                      <?php endforeach; ?>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section-padding-def s-soc-feed">
            <div class="container container-anim-js s-soc-feed__container">
              <div class="s-soc-feed__heading last-el-mb-0 mx-auto w-100 text-center">
                <h2 class="s-soc-feed__title h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Connect with JTC</h2>
                <div class="s-soc-feed__txt-wrap last-el-mb-0 body-3 batch-item--static-js batch-item-js">
                  <p>A Catholic, independent, co-educational college in the Ignatian tradition. Academic and personal
excellence thrive alongside a commitment to serve others and seek justice – these are the
aspirations of every John XXIII student.</p>
                </div>
                <div class="s-soc-feed__link-wrap">
                  <a href="#" class="s-soc-feed__link arrow-link arrow-link-js batch-item-js link-inner-wrap d-inline-flex align-items-center">
                    <span class="arrow-link__circle-wrap position-relative col-auto">
                      <svg class="arrow-link__circle" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="arrow-link__circle-right arrow-link__circle-part arrow-link__circle-part-js" d="M18.5 1 A17.5 17.5 0 0 1 18.5 36" />
                        <path class="arrow-link__circle-left arrow-link__circle-part arrow-link__circle-part-js" d="M18.5 1 A17.5 17.5 0 0 0 18.5 36" />
                      </svg>
                      <svg class="arrow-link__arrow position-absolute arrow-link__arrow-js" width="37" height="21" viewBox="0 0 37 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use href="#arrow-big-right"></use>
                      </svg>
                    </span> <span class="arrow-link__txt-wrap">
                      <span class="link-inner arrow-link__txt arrow-link__txt-js split-text-init-js split-text-chars-js">Follow us on instagram</span>
                    </span> </a>
                </div>
              </div>
              <div class="cards-swiper-js swiper overflow-visible s-soc-feed__swiper">
                <div class="swiper-wrapper s-soc-feed__swiper-wrapper">
                  <?php
                  $social_feed = [
                    [
                      'cover' => 'index-33.webp',
                      'gallery' => [
                        'index-1.webp',
                        'index-2.webp',
                        'index-3.webp',
                        'index-4.webp',
                      ]
                    ],
                    [
                      'cover' => 'index-34.webp',
                      'gallery' => [
                        'index-1.webp',
                        'index-2.webp',
                        'index-3.webp',
                        'index-4.webp',
                      ]
                    ],
                    [
                      'cover' => 'index-35.webp',
                      'gallery' => [
                        'index-1.webp',
                        'index-2.webp',
                        'index-3.webp',
                        'index-4.webp',
                      ]
                    ],
                    [
                      'cover' => 'index-36.webp',
                      'gallery' => [
                        'index-1.webp',
                        'index-2.webp',
                        'index-3.webp',
                        'index-4.webp',
                      ]
                    ],
                    [
                      'cover' => 'index-37.webp',
                      'gallery' => [
                        'index-1.webp',
                        'index-2.webp',
                        'index-3.webp',
                        'index-4.webp',
                      ]
                    ],
                  ];
                  ?>
                  <?php foreach ($social_feed as $i => $item): ?>
                    <div class="swiper-slide s-soc-feed__swiper-slide">
                      <div class="feed-item dark-theme d-inline-block position-relative hover-pic-wrap overflow-hidden batch-item-js batch-item--clip-js">
                        <a href="./assets/images/home/<?= $item['cover']; ?>" data-gall="feedGallery-<?= $i + 1; ?>" class="link-mask venobox-link"></a>
                        <div class="visually-hidden">
                          <?php foreach ($item['gallery'] as $img): ?>
                            <a href="./assets/images/home/<?= $img; ?>" data-gall="feedGallery-<?= $i + 1; ?>" class="venobox-link"></a>
                          <?php endforeach; ?>
                        </div>
                        <img loading="lazy" src="./assets/images/icons/gallery-icon.svg" class="feed-item__icon obj-contain position-absolute z-index-2" alt="icon">
                        <div class="feed-item__pic-wrap w-100 h-100  batch-scale-block-js">
                          <img loading="lazy" src="./assets/images/home/<?= $item['cover']; ?>" alt="pic" class="feed-item__pic pic-def-bg obj-cover hover-pic transition-smooth">
                        </div>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
          </section>
          <?php
          unset($banner_class, $banner_pic, $banner_title, $banner_description, $banner_buttons);
          $banner_pic = 'home/index-38.webp';
          $banner_title = 'Become a person for others';
          $banner_description = '<p>Join a community where academic excellence meets moral purpose. From Pre-Kindergarten to Year
12, students are challenged, supported and inspired to become people of competence, conscience
and compassion – ready to serve, lead and make a difference.</p>';
          $banner_buttons = [
            ['label' => 'Book a Tour', 'secondary' => true],
            ['label' => 'Enrol Today']
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