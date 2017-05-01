'use strict'; // eslint-disable-line strict

// Example import
import { foo } from './components/example.js';

/**
 * @author Alex Devero <deveroalex@gmail.com>
 */

(() => {
  const app = {
    appAnchors: {
      contactForm: document.querySelectorAll('#contactForm'),
      indexCanvas: document.querySelectorAll('#indexCanvas'),
      lazyImages: document.querySelectorAll('.lazy'),
      mainStyleSheet: document.querySelector('.js-stylesheet-main'),
      modalMessage: document.querySelectorAll('.js-modal-overlay'),
      particles: document.querySelectorAll('.js-particles'),
      portfolioItem: document.querySelectorAll('.work__item'),
      slideableContent: document.querySelectorAll('.js-slideable'),
      typedJS: document.querySelectorAll('.js-typed'),
      waypoint: document.querySelectorAll('.wp')
    },
    appControllers: {
      // Animate stylesheet loader controller
      animateStylesheetLoaderController: () => {
        let stylesheetAnimateCSS = document.createElement('link');

        stylesheetAnimateCSS.rel = 'stylesheet';
        stylesheetAnimateCSS.href = 'css/animate.css';
        stylesheetAnimateCSS.classList.add('jsLoaded');

        app.appAnchors.mainStyleSheet.parentNode.insertBefore(stylesheetAnimateCSS, app.appAnchors.mainStyleSheet.nextSibling);
      },
      // Contact controller
      contactController: () => {
        $('#contactForm').submit((e) => {
          e.preventDefault();

          const $this = e.target;

          $.ajax({
            data: $($this).serialize(),
            type: 'POST',
            url: 'contact.php'
          }).done(() => {
            e.preventDefault();

            app.appControllers.modalMessagesController('success');

            // Clear the form.
            $($this)[0].reset();
          }).fail(() => {
            e.preventDefault();

            app.appControllers.modalMessagesController('failure');
          });
        });
      },
      customSliderController: () => {
        (() => {
          let content = document.querySelectorAll('.js-slideable')[0];
          let anchor = document.querySelectorAll('.js-slideable-anchor')[0];

          content.style.display = 'block';

          content.style.maxHeight = '0';

          content.style.opacity = '0';

          content.style.overflow = 'hidden';

          content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 1, 1)';

          content.classList.add('slideClosed');

          const customSlideDown = (element) => {
            element.style.maxHeight = '10000px';

            element.style.opacity = '1';

            if (element.classList.contains('slideClosed')) {
              element.classList.remove('slideClosed');
            }

            element.classList.add('slideOpened')
          }

          const customSlideUp = (element) => {
            element.style.maxHeight = '0';

            const slideTimer = (seconds, callback) => {
              let counter = 0;

              let time = window.setInterval(function() {
                counter++;

                if (counter >= seconds) {
                  callback();

                  window.clearInterval(time);
                }
              }, 10);
            };

            slideTimer(1, () => {
              element.style.opacity = '0';
            });

            if (element.classList.contains('slideOpened')) {
              element.classList.remove('slideOpened');
            }

            element.classList.add('slideClosed')
          }

          anchor.addEventListener('click', (e) => {
            e.preventDefault();

            if (content.classList.contains('slideClosed')) {
              customSlideDown(content);
            } else {
              customSlideUp(content);
            }
          });
        })()
      },
      // FadeIn controller
      fadeInCustomController: (element) => {
        let elementOpacity = 0.1;// initial opacity

        element.style.display = 'block';

        let timer = setInterval(function () {
          if (elementOpacity >= 1){
            clearInterval(timer);
          }

          element.style.opacity = elementOpacity;

          element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ')';

          elementOpacity += elementOpacity * 0.1;
        }, 15);
      },
      // FadeOut controller
      fadeOutCustomController: (element) => {
        let elementOpacity = 1;// initial opacity

        let timer = setInterval(function () {
          if (elementOpacity <= 0.1){
            clearInterval(timer);

            element.style.display = 'none';
          }

          element.style.opacity = elementOpacity;

          element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ')';

          elementOpacity -= elementOpacity * 0.1;
        }, 15);
      },
      // Font Awesome loader controller
      fontAwesomeLoaderController: () => {
        let stylesheetAwesome = document.createElement('link');

        stylesheetAwesome.rel = 'stylesheet';
        stylesheetAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        stylesheetAwesome.classList.add('jsLoaded');

        app.appAnchors.mainStyleSheet.parentNode.insertBefore(stylesheetAwesome, app.appAnchors.mainStyleSheet.nextSibling);
      },
      // Font Raleway loader controller
      fontRalewayLoaderController: () => {
        let stylesheetRaleway = document.createElement('link');

        stylesheetRaleway.rel = 'stylesheet';
        stylesheetRaleway.href = 'https://fonts.googleapis.com/css?family=Raleway:200,300,400,600,700';
        stylesheetRaleway.classList.add('jsLoaded');

        app.appAnchors.mainStyleSheet.parentNode.insertBefore(stylesheetRaleway, app.appAnchors.mainStyleSheet.nextSibling);
      },
      // LazyImages controller
      lazyImagesController: () => {
        // Test if image is in the viewport
        const isImageInViewport = (img) => {
          let rect = img.getBoundingClientRect();

          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        }

        // lazyLoadImages function
        const lazyLoadImages = () => {
          let lazyImagesArray = document.querySelectorAll('img[data-src]');

          for (let i = 0; i < lazyImagesArray.length; i++) {
            if (isImageInViewport(lazyImagesArray[i])) {
              lazyImagesArray[i].setAttribute('src', lazyImagesArray[i].getAttribute('data-src'));

              lazyImagesArray[i].removeAttribute('data-src');

              lazyImagesArray[i].setAttribute('srcset', lazyImagesArray[i].getAttribute('data-srcset'));

              lazyImagesArray[i].removeAttribute('data-srcset');

              lazyImagesArray[i].setAttribute('data-loaded', true);

              app.appControllers.fadeInCustomController(lazyImagesArray[i]);
            }
          }

          // Remove event listeners if all images are loaded
          if (lazyImagesArray.length === 0) {
            window.removeEventListener('DOMContentLoaded', lazyLoadImages);

            window.removeEventListener('load', lazyLoadImages);

            window.removeEventListener('resize', lazyLoadImages);

            window.removeEventListener('scroll', lazyLoadImages);
          }
        }

        // Add event listeners to images
        window.addEventListener('DOMContentLoaded', lazyLoadImages);

        window.addEventListener('load', lazyLoadImages);

        window.addEventListener('resize', lazyLoadImages);

        window.addEventListener('scroll', lazyLoadImages);
      },
      // Modal Messages
      modalMessagesController: ($messageType) => {
        const modalOverlay = document.querySelector('.js-modal-overlay');
        const modalButton = modalOverlay.querySelectorAll('.js-modal-button');
        const messageFailure = modalOverlay.querySelector('.js-modal-message-failure');
        const messageInfo = modalOverlay.querySelector('.js-modal-message-info');
        const messageSuccess = modalOverlay.querySelector('.js-modal-message-success');

        // Close modal and hide message by clicking on the button
        for (let i = 0, j = modalButton.length; i < j; i++) {
          modalButton[i].addEventListener('click', (e) => {
            e.target.parentNode.classList.remove('modal-message-visible');

            app.appControllers.fadeOutCustomController(modalOverlay);
          });
        }

        if ($messageType === 'failure') {
          // Failure message
          const messageFailureLoader = () => {
            // Show modal message
            messageFailure.classList.add('modal-message-visible');

            // Show modal overlay
            app.appControllers.fadeInCustomController(modalOverlay);
          }

          // Initiate message loader function
          messageFailureLoader();
        } else if ($messageType === 'info') {
          // Info message
          const messageInfoLoader = () => {
            // Show modal message
            messageInfo.classList.add('modal-message-visible');

            // Show modal overlay
            app.appControllers.fadeInCustomController(modalOverlay);
          }

          // Initiate message loader function
          messageInfoLoader();
        } else if ($messageType === 'success') {
          // Success message
          const messageSuccessLoader = () => {
            // Show modal message
            messageSuccess.classList.add('modal-message-visible');

            // Show modal overlay
            app.appControllers.fadeInCustomController(modalOverlay);
          }

          // Initiate message loader function
          messageSuccessLoader();
        }
      },
      // Page transition controller
      pageTransitionController: () => {
        // Page transitions for clicks on links
        let links = document.querySelectorAll('a');

        for (let i = 0, j = links.length; i<j; i++) {
          // Check if the link is internal - redirects to another html file or some section via ID
          links[i].setAttribute('data-href', (links[i].href.indexOf('.html') !== -1) && links[i].href.indexOf('#') <= 0);

          links[i].addEventListener('click', (e) => {
            let elTarget = e.target;

            if (elTarget.getAttribute('data-href') === 'true') {
              e.preventDefault();

              // Go up in the nodelist until we find a node with .href (HTMLAnchorElement)
              while (elTarget && !elTarget.href) {
                elTarget = elTarget.parentNode;
              }

              // Change current URL
              if (elTarget.getAttribute('data-href')) {
                e.preventDefault();

                const changePage = () => {
                  let el = document.querySelector('html');

                  history.pushState({state: 'new'}, elTarget.title, elTarget.href);

                  // $('html').fadeOut(350);
                  app.appControllers.fadeOutCustomController(el);

                  setTimeout(() => {
                    // location.replace(elTarget.href);
                    window.location.href = elTarget.href;
                  }, 750);

                  // location.replace(elTarget.href);
                }

                setTimeout(changePage, 100);

                // changePage();
              }

              // window.addEventListener('popstate', changePage);
            } else {
              setTimeout(() => {
                return true;
              }, 750);
            }
          });
        }
      },
      particlesController: () => {
        // Docs:https://github.com/marcbruederlin/particles.js

        Particles.init({
          color: '#212121',
          connectParticles: true,
          maxParticles: 72,
          minDistance: 120,
          opacity: .5,
          responsive: [
            {
              breakpoint: 992,
              options: {
                maxParticles: 72,
                minDistance: 100
              }
            },
            {
              breakpoint: 768,
              options: {
                maxParticles: 52,
                minDistance: 90
              }
            },
            {
              breakpoint: 480,
              options: {
                maxParticles: 32,
                minDistance: 80
              }
            }
          ],
          selector: '.js-particles',
          sizeVariations: 4,
          speed: 0.85
        });
      },
      typedJSController: () => {
        (() => {
          // Controller for Typed.js
          // docs: https://github.com/mattboldt/typed.js

          if (document.querySelectorAll('.js-typed-en').length !== 0) {
            setTimeout(() => {
              Typed.new('.js-typed-h1', {
                contentType: 'text',
                loop: false, // loop on or off (true or false)
                loopCount: false, // number of loops, false = infinite
                showCursor: false, // disable typing cursor
                strings: ['Alex Devero'],
                typeSpeed: 90, // typing speed
                callback: () => { // call when done callback function
                  setTimeout(() => {
                    Typed.new('.js-typed-h2', {
                      contentType: 'html',
                      loop: false, // loop on or off (true or false)
                      loopCount: false, // number of loops, false = infinite
                      showCursor: false, // disable typing cursor
                      strings: ['<span>Czech Designer &plus; Developer &plus; Entrepreneur</span>'],
                      typeSpeed: 35, // typing speed
                      callback: () => { // call when done callback function
                        setTimeout(() => {
                          Typed.new('.js-typed-h3', {
                            contentType: 'html',
                            loop: false, // loop on or off (true or false)
                            loopCount: false, // number of loops, false = infinite
                            showCursor: false, // disable typing cursor
                            strings: ['UI/UX/Web Design &amp; Web Development'],
                            typeSpeed: 35, // typing speed
                            callback: () => {
                              setTimeout(() => {
                                app.appControllers.fadeInCustomController(document.querySelector('.intro__btn-container'));
                              }, 100);
                            }
                          });
                        }, 100);
                      }
                    });
                  }, 100);
                }
              });
            }, 900);
          } else {
            setTimeout(() => {
              Typed.new('.js-typed-h1', {
                contentType: 'text',
                loop: false, // loop on or off (true or false)
                loopCount: false, // number of loops, false = infinite
                showCursor: false, // disable typing cursor
                strings: ['Alex Devero'],
                typeSpeed: 90, // typing speed
                callback: () => { // call when done callback function
                  setTimeout(() => {
                    Typed.new('.js-typed-h2', {
                      contentType: 'html',
                      loop: false, // loop on or off (true or false)
                      loopCount: false, // number of loops, false = infinite
                      showCursor: false, // disable typing cursor
                      strings: ['<span>Český Designér &plus; Developer &plus; Podnikatel.</span>'],
                      typeSpeed: 35, // typing speed
                      callback: () => { // call when done callback function
                        setTimeout(() => {
                          Typed.new('.js-typed-h3', {
                            contentType: 'html',
                            loop: false, // loop on or off (true or false)
                            loopCount: false, // number of loops, false = infinite
                            showCursor: false, // disable typing cursor
                            strings: ['UI/UX/Web Design &amp; Web Development'],
                            typeSpeed: 35, // typing speed
                            callback: () => {
                              setTimeout(() => {
                                app.appControllers.fadeInCustomController(document.querySelector('.intro__btn-container'));
                              }, 100);
                            }
                          });
                        }, 100);
                      }
                    });
                  }, 100);
                }
              });
            }, 900);
          }
        })();
      },
      // Waypoints controller
      waypointsController: () => {
        // setTimeout function is used to let the dom be loaded.
        // Otherwise, icons have no width or height
        // and waypoint will fire all triggers immediatelly.
        setTimeout(() => {
          // Load default discovery icon
          const waypointOne = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-discovery-icon'),
            handler: () => {
              document.querySelector('.wp-discovery-icon').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load discovery text
          const waypointTwo = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-discovery-text'),
            handler: () => {
              document.querySelector('.wp-discovery-text').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning icon for mobile
          const waypointThree = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-planning-icon-mobile'),
            handler: () => {
              document.querySelector('.wp-planning-icon-mobile').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning icon for desktop
          const waypointFour = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-planning-icon-desktop'),
            handler: () => {
              document.querySelector('.wp-planning-icon-desktop').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning text
          const waypointFive = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-planning-text'),
            handler: () => {
              document.querySelector('.wp-planning-text').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load default design icon
          const waypointSix = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-design-icon'),
            handler: () => {
              document.querySelector('.wp-design-icon').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load design text
          const waypointSeven = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-design-text'),
            handler: () => {
              document.querySelector('.wp-design-text').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building icon for mobile
          const waypointEight = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-building-icon-mobile'),
            handler: () => {
              document.querySelector('.wp-building-icon-mobile').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building icon for desktop
          const waypointNine = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-building-icon-desktop'),
            handler: () => {
              document.querySelector('.wp-building-icon-desktop').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building text
          const waypointTen = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-building-text'),
            handler: () => {
              document.querySelector('.wp-building-text').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load default evaluation icon
          const waypointEleven = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-evaluation-icon'),
            handler: () => {
              document.querySelector('.wp-evaluation-icon').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load evaluation text
          const waypointTwelve = new Waypoint({ // eslint-disable-line no-unused-vars
            element: document.querySelector('.wp-evaluation-text'),
            handler: () => {
              document.querySelector('.wp-evaluation-text').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });
        }, 1000);
      }
    },
    appSwitches: () => {
      /**
       * Custom transitions for page loading and closing
       * info: https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions/
       */
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

            if (document.URL.indexOf('process') > 0) {
              // Load Animate CSS
              app.appControllers.animateStylesheetLoaderController();
            }

            // Cache html element
            let el = document.querySelector('html');
            // el.style.display = 'none';

            setTimeout(() => {
              // $('html').attr('id', 'loaded');
              el.setAttribute('id', 'loaded');

              // Fade in cached html element
              app.appControllers.fadeInCustomController(el);
            }, 250);

            //
            // TypedJS
            //
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

      /**
       * Form controller
       */
      if (app.appAnchors.contactForm.length > 0) {
        (() => {
          app.appControllers.contactController();
        })();
      }

      /**
       * Lazy images
       */
      if (app.appAnchors.lazyImages.length > 0) {
        (() => {
          app.appControllers.lazyImagesController();
        })();
      }

      /**
       * Modal messages
       */
      if (app.appAnchors.modalMessage.length > 0) {
        (() => {
          app.appControllers.modalMessagesController();
        })();
      }

      /**
       * Particles
       */
      if (app.appAnchors.particles.length > 0) {
        (() => {
          app.appControllers.particlesController();
        })();
      }

      /**
       * Slideable content
       */
      if (app.appAnchors.slideableContent.length > 0) {
        (() => {
          app.appControllers.customSliderController();
        })();
      }

      /**
       * Waypoints
       * info: http://imakewebthings.com/waypoints/
       */
      if (app.appAnchors.waypoint.length > 0) {
        (() => {
          app.appControllers.waypointsController();
        })()
      }
    },
    init: () => {
      document.querySelector('html').style.display = 'none';

      if (document.querySelectorAll('.no-js').length > 0) {
        document.querySelector('.no-js').classList.remove('no-js');
      }

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
