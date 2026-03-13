<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Form Page | John XXIII College </title>
  <?php
  include("favicon.php");
  include("fonts.php");
  ?>
  <link rel="stylesheet" href="assets/dist/form-page.min.css">
  <!-- <link rel="stylesheet" href="./assets/css/swiper.css">
  <link rel="stylesheet" href="./assets/css/choices.min.css">
  <link rel="stylesheet" href="./assets/css/main.css"> -->
</head>

<body class="form-page">
  <div id="before-preloader-content" class="before-preloader-content">
    <?php
    include("header.php");
    ?>
    <div id="body-content-wrap" class="content-wrap body-content-wrap" data-scrollbar>
      <div id="body-content" class="body-content overflow-hidden position-relative">
        <main id="main">
          <section class="s-form dark-theme position-relative z-index-1">
            <div class="overlay s-form__overlay after-el after-el--full before-el before-el--full z-index-0">
              <img class="w-100 h-100 obj-cover s-form__overlay-pic" loading="lazy" src="./assets/images/form-page.webp" alt="">
            </div>
            <div class="container container-anim-js s-form__container position-relative z-index-1">
              <div class="s-form__heading text-center last-el-mb-0">
                <h1 class="s-form__title batch-hero-item-js batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">Large form page headline running over two lines</h1>
                <div class="s-form__txt-wrap mx-auto w-100 body-2 color-1 last-el-mb-0 batch-hero-item-js batch-item-js batch-item--text-js split-text-init-js split-text-lines-js">
                  <p>Short description explaining in more detail what the form is for and what is the benefit of submitting it, what will happen next. Should run over two lines of text. </p>
                </div>
                <div class="s-form__btns d-flex flex-wrap justify-content-center">
                  <div class="s-simple-txt__btn-wrap  batch-hero-item-js batch-item-js batch-item--static-js">
                    <a href="#" class="btn s-simple-txt__btn btn--secondary">Primary Action</a>
                  </div>
                  <div class="s-simple-txt__btn-wrap  batch-hero-item-js batch-item-js batch-item--static-js">
                    <a href="#" class="btn s-simple-txt__btn color-1">Secondary Action</a>
                  </div>
                </div>
              </div>
              <div class="s-form__block mx-auto w-100 light-theme">
                <div class="s-form__block-heading">
                  <h2 class="s-form__title h3  batch-hero-item-js batch-item-js batch-item--static-js">Send a Message</h2>
                  <div class="s-form__txt-wrap ls-1 last-el-mb-0  batch-hero-item-js batch-item-js batch-item--static-js last-el-mb-0">
                    <p>Please enter your details into the fields below, we will respond to your enquiry within 2 working days. An asterisk (*) indicates required fields.</p>
                  </div>
                </div>
                <form class="s-form__block-row row">
                  <div class="s-form__block-item s-form__col col-md-6 col-12  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="fn">FIRST NAME<sup>*</sup></label>
                    <div class="input-wrap position-relative">
                      <input required id="fn" placeholder="John" type="text">
                    </div>
                  </div>
                  <div class="s-form__block-item s-form__col col-md-6 col-12  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="sn">SURNAME<sup>*</sup></label>
                    <div class="input-wrap position-relative">
                      <input required id="sn" placeholder="Smith" type="text">
                    </div>
                  </div>
                  <div class="s-form__block-item s-form__col col-md-6 col-12  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="email">EMAIL<sup>*</sup></label>
                    <div class="input-wrap position-relative">
                      <input required id="email" placeholder="Example Name" type="email">
                    </div>
                  </div>
                  <div class="s-form__block-item s-form__col col-md-6 col-12  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="tel">PREFERRED CONTACT NUMBER</label>
                    <div class="input-wrap position-relative">
                      <input id="tel" placeholder="Example Name" type="tel">
                    </div>
                  </div>
                  <div class="s-form__block-item select-wrap-js s-form__col col-12  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="type-1">Relationship with the College</label>
                    <div class="input-wrap position-relative">
                      <select name="type-1" id="type-1">
                        <option value="value-1">Value 1</option>
                        <option value="value-2">Value 2</option>
                        <option value="value-3">Value 3</option>
                      </select>
                      <div class="input-placeholder position-absolute">Select Type</div>
                    </div>
                  </div>
                  <div class="s-form__block-item select-wrap-js s-form__col col-12  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="type-2">Who would you like to contact<sup>*</sup></label>
                    <div class="input-wrap position-relative">
                      <select required name="type-2" id="type-2">
                        <option value="value-1">Value 1</option>
                        <option value="value-2">Value 2</option>
                        <option value="value-3">Value 3</option>
                      </select>
                      <div class="input-placeholder position-absolute">Select Type</div>
                    </div>
                  </div>
                  <div class="s-form__block-item select-wrap-js s-form__col col-12  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="type-3">Are you enquiring about?</label>
                    <div class="input-wrap position-relative">
                      <select name="type-3" id="type-3">
                        <option selected value="value-1">Enrolment</option>
                        <option value="value-2">Value 2</option>
                        <option value="value-3">Value 3</option>
                      </select>
                      <div class="input-placeholder position-absolute">Select Type</div>
                    </div>
                  </div>
                  <div class="s-form__block-item s-form__col  batch-hero-item-js batch-item-js batch-item--static-js">
                    <label for="additional">What is your question?<sup>*</sup></label>
                    <div class="input-wrap position-relative">
                      <textarea required name="additional" id="additional" placeholder="Type your question, comment or feedback here..."></textarea>
                    </div>
                  </div>
                  <div class="s-form__block-item s-form__block-item--btn-wrap s-form__col s-form__btn-wrap batch-hero-item-js batch-item-js batch-item--static-js">
                    <button class="btn btn--secondary text-normal s-form__block-btn fw-400" type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        <!--      --><?php
                      //      include("footer.php");
                      //      
                      ?>
      </div>
    </div>
    <?php
    include("modal.php");
    ?>
  </div>
  <script src="assets/dist/form-page.min.js"></script>
  <!-- <script src="assets/js/libraries.js"></script>
<script src="assets/js/choices.min.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/swiper.min.js"></script> -->
</body>

</html>