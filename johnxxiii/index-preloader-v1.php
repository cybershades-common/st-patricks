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
  include("preloader-use-v1.php");
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
                <h1 id="s-hero__title" class="s-hero__title split-text-init-js split-text-lines-js">Grow, learn and love
                  <br> in the Ignatian tradition
                </h1>
                <div id="s-hero__txt-wrap" class="s-hero__txt-wrap ls-1 last-el-mb-0 split-text-init-js split-text-lines-js">
                  <p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish.
                    <br> From Pre-kindergarten to Year 12, we guide students to grow in competence, conscience and compassion.
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