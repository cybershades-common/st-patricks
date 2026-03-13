<footer class="footer">
  <div class="container footer__container">
    <div class="row footer__row justify-content-between">
      <div class="col-auto footer__col footer__col--1">
        <div class="footer__block">
          <h3 class="footer__block-title kicker-def color-1">Reception</h3>
          <?php
          $contacts = [
            [
              'text' => '25 John XXIII Ave,<br>Mount Claremont WA 6010',
              'href' => '#'
            ],
            [
              'text' => '08 9383 0400',
              'href' => 'tel:0893830400'
            ],
            [
              'text' => 'jtc@johnxxiii.edu.au',
              'href' => 'mailto:jtc@johnxxiii.edu.au'
            ],
          ];
          ?>
          <ul class="list-unstyled footer__block-list">
            <?php foreach ($contacts as $item): ?>
              <li class="footer__block-item">
                <a href="<?= $item['href'] ?>" class="link-inner-wrap footer__block-link">
                  <span class="link-inner"><?= $item['text'] ?></span> </a>
              </li>
            <?php endforeach; ?>
          </ul>
          <?php
          $links = [
            'Full Contact Details',
            'Map and Directions',
          ];
          ?>
          <ul class="list-unstyled footer__block-main-list color-1">
            <?php foreach ($links as $text): ?>
              <li class="footer__block-main-item">
                <a href="#" class="link-inner-wrap footer__block-main-link">
        <span class="link-inner footer__block-link-main-txt">
          <?= $text ?>
        </span>
                  <svg class="footer__block-link-main-icon btn__icon btn__icon--next transition-def"
                       width="14" height="14" viewBox="0 0 20 20"
                       fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use href="#arrow-right"></use>
                  </svg>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
      <div class="col-auto footer__col footer__col--2 text-center">
        <a href="#" class="footer__logo-link d-inline-block bg-none">
          <img loading="lazy" class="footer__logo" width="145" height="204" src="./assets/images/logos/ver-logo.svg" alt=""> </a>
        <div class="footer__btns d-flex flex-wrap justify-content-center">
          <div class="footer__btn-wrap">
            <a href="#" class="btn footer__btn btn--md btn--third">Book a Tour</a>
          </div>
          <div class="footer__btn-wrap">
            <a href="#" class="btn footer__btn btn--md btn--transparent">Enrol Now
              <svg class="btn__icon btn__icon--next transition-def"
                   width="14" height="14" viewBox="0 0 20 20"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <use href="#arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="footer__line footer__line--secondary d-md-none"></div>
      </div>
      <div class="col-auto footer__col footer__col--3">
        <div class="footer__block">
          <h3 class="footer__block-title kicker-def color-1">Quick Links</h3>
          <?php
          $contacts = [
            [
              'text' => 'Book a Tour',
              'href' => '#'
            ],
            [
              'text' => 'Enrol Now',
              'href' => '#'
            ],
            [
              'text' => 'Bursaries',
              'href' => '#'
            ],
            [
              'text' => 'Employment',
              'href' => '#'
            ],
            [
              'text' => 'Parents',
              'href' => '#'
            ],
            [
              'text' => 'Support',
              'href' => '#'
            ],
            [
              'text' => 'Contact',
              'href' => '#'
            ],
          ];
          ?>
          <ul class="list-unstyled footer__block-list footer__block-list--secondary">
            <?php foreach ($contacts as $item): ?>
              <li class="footer__block-item">
                <a href="<?= $item['href'] ?>" class="link-inner-wrap footer__block-link">
                  <span class="link-inner"><?= $item['text'] ?></span> </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </div>
    <div class="row footer__row-2 justify-content-between align-items-center">
      <div class="col-auto footer__col-2 footer__col-2--1">
        <div class="footer__col-2-txt-wrap last-el-mb-0">
          <p>John XXIII College offers a warm, enriching environment where the mind and heart can flourish. From Pre-kindergarten to Year 12, we guide students to grow in competence, conscience and compassion.</p>
        </div>
      </div>
      <div class="col-auto footer__col-2 footer__col-2--2 text-center">
        <?php
        $socials__footer = [
          'soc-icon-1.svg',
          'soc-icon-2.svg',
          'soc-icon-3.svg',
          'soc-icon-4.svg',
          'soc-icon-5.svg',
        ];
        ?>
        <ul class="footer__soc-list nav justify-content-center align-items-center">
          <?php foreach ($socials__footer as $icon): ?>
            <li class="footer__soc-list-item">
              <a target="_blank" class="footer__soc-list-link hover-pic-wrap d-flex align-items-center justify-content-center bg-none" href="#">
                <img
                    loading="lazy"
                    class="footer__soc-list-link-icon w-100 h-100 obj-contain hover-pic transition-def"
                    src="./assets/images/icons/<?= $icon ?>"
                    alt=""
                > </a>
            </li>
          <?php endforeach; ?>
        </ul>
        <div class="footer__line footer__line--secondary d-xl-none"></div>
        <ul class="footer__copy-list d-xl-flex d-none nav justify-content-center">
          <li>© 2026 John XXIII College</li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Policies</span> </a>
          </li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Terms</span> </a>
          </li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Feedback</span> </a>
          </li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Design</span> </a>
          </li>
        </ul>
      </div>
      <div class="col-auto footer__col-2 footer__col-2--3">
        <ul class="nav footer__logos-list align-items-center">
          <li class="footer__logos-item">
            <img loading="lazy" width="81" height="71" src="./assets/images/logos/Logo_Loreto.webp" alt=""></li>
          <li class="footer__logos-item">
            <img loading="lazy" width="92" height="92" src="./assets/images/logos/CEWA-Logo-Square_white_bg.webp" alt=""></li>
          <li class="footer__logos-item"><img loading="lazy" width="71" height="92" src="./assets/images/logos/jacsa_logo.webp" alt="">
          </li>
        </ul>
      </div>
      <div class="col-12 footer__col-2 footer__col-2--4 d-xl-none">
        <ul class="footer__copy-list nav justify-content-center">
          <li>© 2026 John XXIII College</li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Policies</span> </a>
          </li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Terms</span> </a>
          </li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Feedback</span> </a>
          </li>
          <li>
            <a href="#" class="link-inner-wrap footer__block-link"> <span class="link-inner">Design</span> </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__line"></div>
    <div class="footer__txt-wrap last-el-mb-0 text-center">
      <p>John XXIII College acknowledges the Whadjuk people of the Noongar nation who are the traditional custodians of this land upon which we live, learn and work.
        <br> We acknowledge the continued deep spiritual connection and relationship of the Aboriginal peoples to this country and commit to the ongoing journey of reconciliation.
      </p>
    </div>
    <h2 class="footer__title text-center fw-500 text-uppercase d-flex justify-content-center">
      <span class="footer__title-txt d-block">SEEK JUSTICE</span>
    </h2>
  </div>
</footer>