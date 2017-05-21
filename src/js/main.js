'use strict'; // eslint-disable-line strict

// Example import
// import { example } from './components/example.js';
// import { animateStylesheetLoader } from './components/animate-css-loader.js';
import { browserDetector } from './components/browser-detector.js';
import { contactForm } from './components/contact-form.js';
// import { customSlider } from './components/custom-slider.js';
import { fadeInCustom } from './components/fade-in-custom.js';
// import { fadeOutCustom } from './components/fade-out-custom.js';
import { fontAwesomeLoader } from './components/font-awesome-loader.js';
import { fontRalewayLoader } from './components/font-raleway-loader.js';
import { lazyImages } from './components/lazy-images.js';
// import { particles } from './components/particles.js';
import { pageTransition } from './components/page-transition.js';
import { typedjs } from './components/typedjs.js';
// import { waypoints } from './components/waypoints.js';

/**
 * @author Alex Devero <deveroalex@gmail.com>
 */

(() => {
  const app = {
    appAnchors: {
      contactForm: document.querySelectorAll('#contactForm'),
      // indexCanvas: document.querySelectorAll('#indexCanvas'),
      lazyImages: document.querySelectorAll('.lazy'),
      // mainStyleSheet: document.querySelector('.js-stylesheet-main'),
      modalMessage: document.querySelectorAll('.js-modal-overlay'),
      // particles: document.querySelectorAll('.js-particles'),
      portfolioItem: document.querySelectorAll('.work__item'),
      // slideableContent: document.querySelectorAll('.js-slideable'),
      typedJS: document.querySelectorAll('.js-typed')
      // waypoint: document.querySelectorAll('.wp')
    },
    appControllers: {
      // Animate stylesheet loader controller
      animateStylesheetLoaderController: () => {
        animateStylesheetLoader();
      },
      // Contact controller
      contactController: () => {
        contactForm();
      },
      customSliderController: () => {
        customSlider('.js-slideable', '.js-slideable-anchor');
      },
      // Font Awesome loader controller
      fontAwesomeLoaderController: () => {
        fontAwesomeLoader();
      },
      // Font Raleway loader controller
      fontRalewayLoaderController: () => {
        fontRalewayLoader();
      },
      // LazyImages controller
      lazyImagesController: () => {
        lazyImages();
      },
      // Page transition controller
      pageTransitionController: () => {
        pageTransition();
      },
      // ParticlesJS controller
      particlesController: () => {
        particles();
      },
      // TypedJS controller
      typedJSController: () => {
        typedjs();
      },
      // Waypoints controller
      waypointsController: () => {
        waypoints();
      }
    },
    appSwitches: () => {
      // Custom transitions for page loading and closing
      // info: https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions/
      if (true) {
        (() => {
          // Loading fonts and stylesheets
          window.onload = () => {
            // Load Font Awesome
            if (true) {
              app.appControllers.fontAwesomeLoaderController();
            }

            // Load Raleway font
            if (true) {
              app.appControllers.fontRalewayLoaderController()
            }

            /* if (document.URL.indexOf('process') > 0) {
              // Load Animate CSS
              app.appControllers.animateStylesheetLoaderController();
            } */

            // Cache html element
            let el = document.querySelector('html');
            // el.style.display = 'none';

            setTimeout(() => {
              // $('html').attr('id', 'loaded');
              el.setAttribute('id', 'loaded');

              // Fade in cached html element
              fadeInCustom(el);
            }, 250);

            // TypedJS
            if (app.appAnchors.typedJS.length > 0) {
              (() => {
                app.appControllers.typedJSController();
              })();
            }
          }

          // Detect history change (back or forward button)
          // and force the page to reload (with new url) and load new page
          /* window.onpopstate = () => {
            location.reload();
          } */

          // Page transitions for clicks on links
          // app.appControllers.pageTransitionController();
        })();
      }

      // Form controller
      if (app.appAnchors.contactForm.length > 0) {
        (() => {
          app.appControllers.contactController();
        })();
      }

      // Lazy images
      if (app.appAnchors.lazyImages.length > 0) {
        (() => {
          app.appControllers.lazyImagesController();
        })();
      }

      // Modal messages
      /* if (app.appAnchors.modalMessage.length > 0) {
        (() => {
          app.appControllers.modalMessagesController();
        })();
      } */

      // Particles
      /* if (app.appAnchors.particles.length > 0) {
        (() => {
          app.appControllers.particlesController();
        })();
      } */

      // Slideable content
      /* if (app.appAnchors.slideableContent.length > 0) {
        (() => {
          app.appControllers.customSliderController();
        })();
      } */

      // Waypoints
      /* if (app.appAnchors.waypoint.length > 0) {
        (() => {
          app.appControllers.waypointsController();
        })()
      } */
    },
    init: () => {
      document.querySelector('html').style.display = 'none';

      if (document.querySelectorAll('.no-js').length > 0) {
        if (!document.querySelector('.no-js').classList.contains('js')) {
          document.querySelector('.no-js').classList.add('js');
        }

        document.querySelector('.no-js').classList.remove('no-js');
      }

      browserDetector();

      if (document.querySelectorAll('.no-js-img').length > 0) {
        let imagesArray = document.querySelectorAll('.no-js-img');

        for (let i = 0; i < imagesArray.length; i++) {
          imagesArray[i].classList.remove('no-js-img');
        }
      }

      app.appSwitches();
    }
  };

  app.init();
})();
