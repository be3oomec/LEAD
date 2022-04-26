// Подключение
import Swup from 'swup';
import MicroModal from 'micromodal';
import {
  gsap,
  Power2
} from 'gsap';
import Swiper, {
  Navigation,
  Pagination,
  Parallax,
  Mousewheel,
  Controller,
  Scrollbar
} from 'swiper';
// Реализация табов
import GraphTabs from 'graph-tabs';
// Подключение плагина кастом-скролла
// import 'simplebar';

// ТАБЫ about page
const tabs = new GraphTabs('services');

// SWUP
const swup = new Swup();

// MICROMODAL
// MicroModal.init({
//   openTrigger: 'data-micromodal-open',
//   closeTrigger: 'data-micromodal-close',
//   disableFocus: true,
//   disableScroll: true,
//   awaitOpenAnimation: true,
//   awaitCloseAnimation: true,
// })

// GSAP
const tl = gsap.timeline({
  defaults: {
    ease: "power1.out"
  }
});

tl.to('.intro__img img', {
  y: '0%',
  duration: 1
});
tl.to('.slider', {
  y: '-100%',
  duration: 1.5,
  delay: 0.5
});
tl.to('.intro', {
  y: '-100%',
  duration: 1
}, '-=1');

tl.fromTo('nav', {
  opacity: 0
}, {
  opacity: 1,
  duration: 1
});
tl.fromTo('.page__pagination', {
  opacity: 0
}, {
  opacity: 1,
  duration: 1
}, '-=1');
tl.fromTo('.page__fullpage', {
  opacity: 0
}, {
  opacity: 1,
  duration: 1,
  delay: 0.5
}, '-=1');


// SWIPER
Swiper.use([Navigation, Pagination, Parallax, Mousewheel, Controller, Scrollbar]);

const portfolioSlider = new Swiper('.portfolio__slider', {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  mousewheel: true,
});


const wrapper = document.querySelector('.wrapper');

const pageSlider = new Swiper('.page', {
  wrapperClass: 'page__wrap',
  slideClass: 'page__fullpage',
  direction: "vertical",
  slidesPerView: 'auto',
  parallax: true,
  watchOverflow: true,
  speed: 800,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  mousewheel: {
    sensitivity: 1,
  },

  keyboard: {
    enable: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: "page__bullet",
    bulletActiveClass: "page__bullet--active",
  },

  scrollbar: {
    el: '.page__scroll',
    dragClass: 'page__drag-scroll',
    draggable: true,
  },

  init: false,

  on: {
    init: function () {
      menuSlider();
      setScrollType();
    },
    slideChange: function () {
      menuSliderRemove();
      menuLinks[pageSlider.realIndex].classList.add('nav__link--active');
    },
    resize: function () {
      setScrollType();
    }
  }
});

const menuLinks = document.querySelectorAll('.nav__link');

function menuSlider() {
  if (menuLinks.length > 0) {
    menuLinks[pageSlider.realIndex].classList.add('nav__link--active');
    for (let i = 0; i < menuLinks.length; i++) {
      const menuLink = menuLinks[i];
      menuLink.addEventListener('click', function (e) {
        pageSlider.slideTo(i, 800);
        menuLink.classList.add('nav__link--active');
        e.preventDefault();
      });
    }
  }
}

function menuSliderRemove() {
  let menuLinkActive = document.querySelector('.nav__link--active');
  if (menuLinkActive) {
    menuLinkActive.classList.remove('nav__link--active')
  }
}

function setScrollType() {
  if (wrapper.classList.contains('free')) {
    wrapper.classList.remove('free');
    pageSlider.params.freeMode = false;
  }

  for (let i = 0; i < pageSlider.slides.length; i++) {
    const pageSlide = pageSlider.slides[i];
    const pageSlideContent = pageSlide.querySelector('.fullpage__content')
    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight;
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('free');
        pageSlider.params.freeMode = true;
        break;
      }
    }
  }
}

pageSlider.init();


// Toggle theme
const themeBtn = document.querySelector('.nav__theme-input');
themeBtn.addEventListener('click', () => {
  let el = document.body;
  el.classList.toggle('light-mode');
});
