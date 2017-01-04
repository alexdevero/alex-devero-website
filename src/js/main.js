/**
 * @author Alex Devero <deveroalex@gmail.com>
 */

(() => {
  'use strict';
  const app = {
    settings: {
      contactForm: document.querySelectorAll('#contactForm'),
      indexCanvas: document.querySelectorAll('#indexCanvas'),
      lazyImages: document.querySelectorAll('.lazy'),
      modalMessage: document.querySelectorAll('.js-modal-overlay'),
      portfolioItem: document.querySelectorAll('.work__item'),
      slideableContent: document.querySelectorAll('.js-slideable'),
      waypoint: document.querySelectorAll('.wp')
    },
    controllers: {
      // Animate stylesheet loader controller
      animateStylesheetLoader: () => {
        let stylesheetAnimateCSS = document.createElement('link'),
            mainStyleSheet = document.querySelector('.js-stylesheet-main');
        stylesheetAnimateCSS.rel = 'stylesheet';
        stylesheetAnimateCSS.href = 'css/animate.css';
        stylesheetAnimateCSS.classList.add('jsLoaded');
        mainStyleSheet.appendChild(stylesheetAnimateCSS);
      },
      // Contact controller
      contact: (e) => {
        $('#contactForm').submit((e) => {
          e.preventDefault();

          if (document.getElementById('subject').value.length === 0) {
            if (window.location.href.split('com/')[1] == 'contact.html') {
              alert('Please select \'What are you looking for\'.');
            } else {
              alert('Prosím zvolte \'Druh projektu\'.');
            }

            $('#subject').trigger('focus');
          } else {

            let $this = e.target;

            $.ajax({
              type: 'POST',
              url: 'contact.php',
              data: $($this).serialize()
            }).done((response) => {
              e.preventDefault();

              app.controllers.modalMessages('success');

              /*if (window.location.href.split('com/')[1] == 'contact.html') {
                app.controllers.modalMessages('failure');
                alert('Thank you very much for contacting. I will reply in two days.');
              } else {
                alert('Děkuji Vám za kontaktování. Do dvou dnů se Vám ozvu.');
              }*/

              // Clear the form.
              $($this)[0].reset();
            }).fail((data) => {
              e.preventDefault();

              app.controllers.modalMessages('failure');

              /*if (window.location.href.split('com/')[1] == 'contact.html') {
                alert('Oops! There was a problem with your submission. Please complete the form and try again.');
              } else {
                alert('Během odesílání zprávy došlo k problému. Prosím zkuste to znovu.');
              }*/
            });
          }
        });
      },
      customSlider: () => {
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
      fadeInCustom: (element) => {
        let elementOpacity = 0.1;// initial opacity

        element.style.display = 'block';

        let timer = setInterval(function () {
          if (elementOpacity >= 1){
            clearInterval(timer);
          }

          element.style.opacity = elementOpacity;

          element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ")";

          elementOpacity += elementOpacity * 0.1;
        }, 15);
      },
      // FadeOut controller
      fadeOutCustom: (element) => {
        let elementOpacity = 1;// initial opacity

        let timer = setInterval(function () {
          if (elementOpacity <= 0.1){
            clearInterval(timer);

            element.style.display = 'none';
          }

          element.style.opacity = elementOpacity;

          element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ")";

          elementOpacity -= elementOpacity * 0.1;
        }, 15);
      },
      // Font Awesome loader controller
      fontAwesomeLoader: () => {
        let stylesheetAwesome = document.createElement('link'),
            mainStyleSheet = document.querySelector('.js-stylesheet-main');
        stylesheetAwesome.rel = 'stylesheet';
        stylesheetAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        stylesheetAwesome.classList.add('jsLoaded');
        mainStyleSheet.parentNode.appendChild(stylesheetAwesome);
      },
      // Font Open Sans loader controller
      fontOpenSansLoader: () => {
        let stylesheetOpenSans = document.createElement('link'),
            mainStyleSheet = document.querySelector('.js-stylesheet-main');
        stylesheetOpenSans.rel = 'stylesheet';
        stylesheetOpenSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800';
        stylesheetOpenSans.classList.add('jsLoaded');
        mainStyleSheet.parentNode.appendChild(stylesheetOpenSans);
      },
      // Font Raleway loader controller
      fontRalewayLoader: () => {
        let stylesheetRaleway = document.createElement('link'),
            mainStyleSheet = document.querySelector('.js-stylesheet-main');
        stylesheetRaleway.rel = 'stylesheet';
        stylesheetRaleway.href = 'https://fonts.googleapis.com/css?family=Raleway:200,300,400,600,700';
        stylesheetRaleway.classList.add('jsLoaded');
        mainStyleSheet.parentNode.appendChild(stylesheetRaleway);
      },
      // LazyImages controller
      lazyImages: () => {
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

              app.controllers.fadeInCustom(lazyImagesArray[i]);
            }
          }

          // Remove event listeners if all images are loaded
          if (lazyImagesArray.length == 0) {
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
      modalMessages: ($messageType) => {
        let modalOverlay = document.querySelector('.js-modal-overlay'),
            modalButton = modalOverlay.querySelectorAll('.js-modal-button'),
            messageFailure = modalOverlay.querySelector('.js-modal-message-failure'),
            messageInfo = modalOverlay.querySelector('.js-modal-message-info'),
            messageSuccess = modalOverlay.querySelector('.js-modal-message-success');

        // Close modal and hide message by clicking on the button
        for (let i = 0, j = modalButton.length; i < j; i++) {
          modalButton[i].addEventListener('click', (e) => {
            e.target.parentNode.classList.remove('modal-message-visible');

            app.controllers.fadeOutCustom(modalOverlay);
          });
        }

        if ($messageType === 'failure') {
          // Failure message
          const messageFailureLoader = () => {
            // Show modal message
            messageFailure.classList.add('modal-message-visible');

            // Show modal overlay
            app.controllers.fadeInCustom(modalOverlay);
          }

          // Initiate message loader function
          messageFailureLoader();
        } else if ($messageType === 'info') {
          // Info message
          const messageInfoLoader = () => {
            // Show modal message
            messageInfo.classList.add('modal-message-visible');

            // Show modal overlay
            app.controllers.fadeInCustom(modalOverlay);
          }

          // Initiate message loader function
          messageInfoLoader();
        } else if ($messageType === 'success') {
          // Success message
          const messageSuccessLoader = () => {
            // Show modal message
            messageSuccess.classList.add('modal-message-visible');

            // Show modal overlay
            app.controllers.fadeInCustom(modalOverlay);
          }

          // Initiate message loader function
          messageSuccessLoader();
        }
      },
      // Page transition controller
      pageTransition: () => {
        // Page transitions for clicks on links
        let links = document.querySelectorAll('a');

        for (let i = 0, j = links.length; i<j; i++) {
          // Check if the link is internal - redirects to another html file or some section via ID
          links[i].setAttribute('data-href', (links[i].href.indexOf('.html') != -1) && links[i].href.indexOf('#') <= 0);

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

                  //$('html').fadeOut(350);
                  app.controllers.fadeOutCustom(el);

                  setTimeout(() => {
                    //location.replace(elTarget.href);
                    window.location.href = elTarget.href;
                  },750);

                  //location.replace(elTarget.href);
                }

                setTimeout(changePage, 100);

                //changePage();

                return;
              }

              //window.addEventListener('popstate', changePage);
            } else {
              setTimeout(() => {
                return true;
              },750);
            }
          });
        }
      },
      // Waypoints controller
      waypoints: () => {
        // setTimeout function is used to let the dom be loaded.
        // Otherwise, icons have no width or height
        // and waypoint will fire all triggers immediatelly.
        setTimeout(() => {
          // Load default discovery icon
          const waypointOne = new Waypoint({
            element: document.querySelector('.wp-discovery-icon'),
            handler: (direction) => {
              document.querySelector('.wp-discovery-icon').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load discovery text
          const waypointTwo = new Waypoint({
            element: document.querySelector('.wp-discovery-text'),
            handler: (direction) => {
              document.querySelector('.wp-discovery-text').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning icon for mobile
          const waypointThree = new Waypoint({
            element: document.querySelector('.wp-planning-icon-mobile'),
            handler: (direction) => {
              document.querySelector('.wp-planning-icon-mobile').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning icon for desktop
          const waypointFour = new Waypoint({
            element: document.querySelector('.wp-planning-icon-desktop'),
            handler: (direction) => {
              document.querySelector('.wp-planning-icon-desktop').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning text
          const waypointFive = new Waypoint({
            element: document.querySelector('.wp-planning-text'),
            handler: (direction) => {
              document.querySelector('.wp-planning-text').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load default design icon
          const waypointSix = new Waypoint({
            element: document.querySelector('.wp-design-icon'),
            handler: (direction) => {
              document.querySelector('.wp-design-icon').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load design text
          const waypointSeven = new Waypoint({
            element: document.querySelector('.wp-design-text'),
            handler: (direction) => {
              document.querySelector('.wp-design-text').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building icon for mobile
          const waypointEight = new Waypoint({
            element: document.querySelector('.wp-building-icon-mobile'),
            handler: (direction) => {
              document.querySelector('.wp-building-icon-mobile').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building icon for desktop
          const waypointNine = new Waypoint({
            element: document.querySelector('.wp-building-icon-desktop'),
            handler: (direction) => {
              document.querySelector('.wp-building-icon-desktop').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building text
          const waypointTen = new Waypoint({
            element: document.querySelector('.wp-building-text'),
            handler: (direction) => {
              document.querySelector('.wp-building-text').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load default evaluation icon
          const waypointEleven = new Waypoint({
            element: document.querySelector('.wp-evaluation-icon'),
            handler: (direction) => {
              document.querySelector('.wp-evaluation-icon').classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load evaluation text
          const waypointTwelve = new Waypoint({
            element: document.querySelector('.wp-evaluation-text'),
            handler: (direction) => {
              document.querySelector('.wp-evaluation-text').classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });
        }, 1000);
      }
    },
    switches: () => {
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
              app.controllers.fontAwesomeLoader();
            }

            // Load Open Sans font
            if (true) {
              app.controllers.fontOpenSansLoader();
            }

            // Load Raleway font
            if (true) {
              app.controllers.fontRalewayLoader()
            };

            if (document.URL.indexOf('process') > 0) {
              // Load Animate CSS
              app.controllers.animateStylesheetLoader();
            }

            // Cache html element
            let el = document.querySelector('html');
            //el.style.display = 'none';

            setTimeout(() => {
              //$('html').attr('id', 'loaded');
              el.setAttribute('id', 'loaded');

              // Fade in cached html element
              app.controllers.fadeInCustom(el);
            }, 350);
          }

          // Detect history change (back or forward button)
          // and force the page to reload (with new url) and load new page
          /*window.onpopstate = () => {
            location.reload();
          }*/

          // Page transitions for clicks on links
          //app.controllers.pageTransition();
        })();
      }

      /**
       * Form controller
       */
      if (app.settings.contactForm.length > 0) {
        (() => {
          app.controllers.contact();
        })();
      }

      /**
       * Lazy images
       */
      if (app.settings.lazyImages.length > 0) {
        (() => {
          app.controllers.lazyImages();
        })();
      }

      /**
       * Modal messages
       */
      if (app.settings.modalMessage.length > 0) {
        (() => {
          app.controllers.modalMessages();
        })();
      }

      /**
       * Slideable content
       */
       if (app.settings.slideableContent.length > 0) {
        (() => {
          app.controllers.customSlider();
        })();
       }

      /**
       * Waypoints
       * info: http://imakewebthings.com/waypoints/
       */
      if (app.settings.waypoint.length > 0) {
        (() => {
          app.controllers.waypoints();
        })()
      }
    },
    init: () => {
      //document.querySelector('html').style.display = 'none';

      if (document.querySelectorAll('.no-js').length > 0) {
        document.querySelector('.no-js').classList.remove('no-js');
      }

      if (document.querySelectorAll('.no-js-img').length > 0) {
        let imagesArray = document.querySelectorAll('.no-js-img');

        for (let i = 0; i < imagesArray.length; i++) {
          imagesArray[i].classList.remove('no-js-img');
        }
      }

      //app.controllers = app.controllerss;

      app.switches();
    }
  };

  app.init();
})();
