<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Visit | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/index.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
  <link rel="stylesheet" href="./assets/css/venobox.min.css">
  <link rel="stylesheet" href="./assets/css/main.css"> -->
</head>

<body class="visit-page">
  <div id="before-preloader-content" class="before-preloader-content">
    <?php
    include("header.php");
    ?>
    <div id="body-content-wrap" class="content-wrap body-content-wrap" data-scrollbar>
      <div id="body-content" class="body-content overflow-hidden position-relative">
        <main id="main">
          <?php
          $hero_class = 's-hero--secondary s-hero--fourth';
          $hero_pic = 'visit/visit-1.webp';
          $hero_title = 'Visit John XXIII';
          $hero_description = '<p>We would love to welcome you to our Mount Claremont campus.</p>';
          $hero_use_video_btn = true;
          include("sections/hero.php");
          ?>
          <section class="section-padding-def s-overview-items">
            <div class="container s-overview-items__container">
              <div class="row s-overview-items__row mx-0 justify-content-center">
                <?php
                $overview_items = [
                  [
                    'icon' => 'overview-icon-1.svg',
                    'title' => 'Private College Tours',
                    'text' => '<p>We offer guided campus tours and information sessions throughout the year for prospective
families and students.</p>',
                    'label' => 'View next available tours',
                  ],
                  [
                    'icon' => 'overview-icon-2.svg',
                    'title' => 'Prepare to Visit',
                    'text' => '<p>Helpful information before you arrive, including directions, parking, accessibility and more.</p>',
                    'label' => 'Map, Directions and Parking',
                  ],
                  [
                    'icon' => 'overview-icon-3.svg',
                    'title' => 'Take a Virtual Tour',
                    'text' => '<p>Unable to visit in person? Explore the College from your device, wherever you are.</p>',
                    'label' => 'Explore JTC From any device',
                  ],
                ];
                ?>
                <?php foreach ($overview_items as $item): ?>
                  <div class="s-overview-items__col batch-item-js batch-item--static-js col-lg-4 col-12 px-0">
                    <div class="overview-item position-relative h-100 d-flex flex-column align-items-start">
                      <img src="./assets/images/icons/<?= $item['icon'] ?>" alt="icon" class="overview-item__icon d-block obj-contain">
                      <h3 class="overview-item__title color-1 h5"><?= $item['title'] ?></h3>
                      <div class="overview-item__txt-wrap body-4 last-el-mb-0">
                        <?= $item['text'] ?>
                      </div>
                      <a class="overview-item__link mt-auto arrow-link-simple color-4 text-uppercase link-inner-wrap fw-500" target="_blank" href="#">
                        <span class="link-inner"><?= $item['label'] ?></span>
                        <svg class="btn__icon btn__icon--next transition-def" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#arrow-long-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          </section>
          <?php
          $base_width = 1420;
          $gallery_items = [
            ['src' => 'visit-2.webp', 'width' => 715, 'height' => 630],
            ['src' => 'visit-3.webp', 'width' => 262, 'height' => 315],
            ['src' => 'visit-4.webp', 'width' => 443, 'height' => 315],
            ['src' => 'visit-5.webp', 'width' => 443, 'height' => 315],
            ['src' => 'visit-6.webp', 'width' => 262, 'height' => 315],
          ];

          foreach ($gallery_items as &$item) {
            $percent = round(($item['width'] / $base_width) * 100, -1);
            $item['width_percent'] = max(10, $percent);

            if ($item['width_percent'] >= 50) {
              $item['size_class'] = 'big';
            } elseif ($item['width_percent'] >= 30) {
              $item['size_class'] = 'middle';
            } else {
              $item['size_class'] = 'small';
            }
          }
          ?>
          <div class="s-gallery position-relative grid-gallery-js">
            <div class="s-gallery__grid-sizer s-gallery__grid-sizer-js"></div>
            <?php foreach ($gallery_items as $gallery_item): ?>
              <div class="s-gallery__item s-gallery__grid-item-js <?= $gallery_item['size_class'] ?>"
                data-height="<?= $gallery_item['height'] ?>"
                data-width="<?= $gallery_item['width_percent'] ?>"
                style="--w:<?= $gallery_item['width'] ?>; --h:<?= $gallery_item['height'] ?>; --h-size:<?= $gallery_item['height'] ?>; --item_width:<?= $gallery_item['width_percent'] ?>%;">
                <img loading="lazy" class="s-gallery__item-pic position-absolute obj-cover pic-def-bg batch-item-js batch-item--static-js"
                  src="./assets/images/visit/<?= $gallery_item['src'] ?>" alt="pic">
              </div>
            <?php endforeach; ?>
          </div>
          <?php
          $simple_txt_class = 's-simple-txt--secondary s-simple-txt--third';
          $simple_txt_kicker = 'SEE IT FOR YOURSELF';
          $simple_txt_title = 'Discover what makes our campus distinctive';
          $simple_txt_description = ' <p>Set across 24.6 hectares in a calm, leafy corner of Mount Claremont, John XXIII College is a
campus made to be explored. Open green spaces and purpose-built learning environments
sit alongside one another naturally, creating a place that feels both generous and close-knit.</p>
              <p>On any day, you will find students studying outdoors, rehearsing, training on the fields,
gathering with friends, or pausing for reflection in the rhythm of community life. It is a place
with genuine warmth – purposeful, alive and best understood in person.</p>
           ';
          $simple_txt_buttons = [
            ['label' => 'Book a Tour', 'classes' => 'btn--md btn--third', 'icon' => false],
            ['label' => 'Upcoming Tours', 'classes' => 'btn--md btn--transparent', 'icon' => true]
          ];
          $simple_txt_items = [
            ['icon' => 'explore-icon-1.svg', 'title' => 'How to Find Us', 'text' => '<p>John XXIII College is located in Mt Claremont, Perth, on the traditional lands of the Whadjuk
Noongar people.</p>', 'link_text' => 'See map and location'],
            ['icon' => 'explore-icon-2.svg', 'title' => 'Transport and Parking Info', 'text' => '<p>See our recommended routes to the campus. Free visitor parking is available on campus.</p>', 'link_text' => 'View routes and parking areas'],
            ['icon' => 'explore-icon-3.svg', 'title' => 'Visitor Sign IN at Reception', 'text' => '<p>All visitors must sign in at main reception. Our friendly administration staff will help direct you
from there.</p>', 'link_text' => 'where to go once you arrive'],
          ];
          include("sections/simple-txt.php");
          ?>
          <?php
          include("sections/video-block.php");
          ?>
          <section class="section-padding-def s-faq">
            <div class="container s-faq__container">
              <div class="s-faq__heading last-el-mb-0">
                <h3 class="s-faq__kicker kicker-def color-2 batch-item-js batch-item--static-js">YOUR QUESTIONS ANSWERED</h3>
                <h2 class="s-faq__title h3 color-1 batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Frequently Asked Questions</h2>
              </div>
              <?php
              $faq_items = [
                [
                  'title' => 'Who can book a visit to John XXIII College?',
                  'content' => '<p>Campus tours and information sessions are open to any family considering John XXIII
College for their child. We welcome prospective families across all year levels, from Pre-
Kindergarten through Year 12.</p>'
                ],
                [
                  'title' => 'How do I book a campus tour?',
                  'content' => '<p>Tours can be booked online through our website. Simply select your preferred date and time
and complete the booking form. You will receive a confirmation email with everything you
need to know before you arrive.</p>'
                ],
                [
                  'title' => 'What happens during a campus visit?',
                  'content' => '<p>Our guided tours are led by members of our College community and include a walk through

key areas and facilities along with an opportunity to ask questions. Information sessions offer
a more detailed overview of our educational approach, programs, and the enrolment
process.</p>'
                ],
                [
                  'title' => 'Can my child attend the visit with me?',
                  'content' => '<p>Yes – we encourage families to bring their children along. Experiencing the campus firsthand
is often an important part of the decision for students and parents alike.</p>'
                ],
                [
                  'title' => 'Do you offer visits for both Primary and Secondary School?',
                  'content' => '<p>Yes. Our tours cover the full campus, and our Enrolments Team can tailor the experience to
focus on the year levels most relevant to your family.</p>'
                ],
                [
                  'title' => 'Where should visitors park when they arrive?',
                  'content' => '<p>Free visitor parking is available on campus. Directions and a campus map are available on
our website. We recommend allowing a little extra time to park during busy periods.</p>'
                ],
                [
                  'title' => 'What should we wear for a campus visit?',
                  'content' => '<p>There is no dress requirement for visitors. Please wear whatever is comfortable for a guided
walk of our campus.</p>'
                ],
                [
                  'title' => 'Can we visit if we live interstate or cannot attend in person?',
                  'content' => '<p>Yes. Our virtual tour is available on our website at any time, and our Enrolments Team is
happy to arrange call to walk you through the College experience and answer your questions
directly.</p>'
                ],
                [
                  'title' => 'Are there Open Days as well as private tours?',
                  'content' => '<p>Every campus visit at John XXIII College is a private, personalised tour arranged specifically
for your family. We find this gives prospective families a far richer experience than a large
open day – time to explore freely, ask questions, and get a genuine sense of who we are
and how we work.</p>'
                ],
                [
                  'title' => 'Who can I contact if I have questions before or after my visit?',
                  'content' => '<p>Our Enrolments Team is always happy to help. You can reach us by phone, email, or submit
an enquiry through our website. We aim to respond to all enquiries within two business days.</p>'
                ],
              ];
              ?>
              <div class="s-faq__items acc-items-js">
                <?php foreach ($faq_items as $index => $faq):
                  $is_first = ($index === 0);
                ?>
                  <div class="s-faq__item-wrap acc-item-wrap-js batch-item-js batch-item--static-js">
                    <div class="s-faq__item acc-item-js<?= $is_first ? ' open' : '' ?>">
                      <h3 class="s-faq__item-title h6 ls-2 transition-def cursor-pointer mb-0 position-relative acc-title-js">
                        <span class="s-faq__item-title-txt transition-def position-relative d-block"><?= $faq['title'] ?></span>
                        <span class="s-faq__item-icon transition-def position-absolute after-el before-el"></span>
                      </h3>
                      <div<?= $is_first ? ' style="display:block;"' : '' ?> class="s-faq__item-content-wrap acc-content-js">
                        <div class="s-faq__item-content ls-1 last-el-mb-0">
                          <?= $faq['content'] ?>
                        </div>
                    </div>
                  </div>
              </div>
            <?php endforeach; ?>
            </div>
            <div class="s-faq__btns d-flex flex-wrap">
              <div class="s-simple-txt__btn-wrap batch-item-js batch-item--static-js">
                <a href="#" class="btn s-simple-txt__btn btn--third">How to visit the College </a>
              </div>
              <div class="s-simple-txt__btn-wrap batch-item-js batch-item--static-js">
                <a href="#" class="btn s-simple-txt__btn btn--transparent">Upcoming Tours
                  <svg class="btn__icon btn__icon--next transition-def" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use href="#arrow-right"></use>
                  </svg>
                </a>
              </div>
            </div>
      </div>
      </section>
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
  <script src="assets/dist/visit.min.js"></script>
  <!-- <script src="assets/js/libraries.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/swiper.min.js"></script>
  <script src="assets/js/venobox.min.js"></script>
  <script src="assets/js/isotope.min.js"></script> -->
</body>

</html>