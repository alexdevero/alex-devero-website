/**
 * @author Alex Devero <deveroalex@gmail.com>
 */

(function() {
  'use strict';
  var app = {
    settings: {
      contactForm: document.querySelectorAll('#contactForm'),
      indexCanvas: document.querySelectorAll('#indexCanvas'),
      lazyImages: document.getElementsByClassName('lazy'),
      portfolioItem: document.querySelectorAll('.work__item'),
      slideableContent: document.querySelectorAll('.js-slideable'),
      waypoint: document.querySelectorAll('.wp')
    },
    controllers: {
      // Animate stylesheet loader controller
      animateStylesheetLoader: function() {
        var stylesheetAnimateCSS = document.createElement('link');
        stylesheetAnimateCSS.rel = 'stylesheet';
        stylesheetAnimateCSS.href = 'css/animate.css';
        stylesheetAnimateCSS.classList.add('jsLoaded');
        document.getElementsByTagName('head')[0].appendChild(stylesheetAnimateCSS);
      },
      // Contact controller
      contact: function(e) {
        $('#contactForm').submit(function(e) {
          e.preventDefault();

          if (document.getElementById('subject').value.length === 0) {
            if (window.location.href.split('com/')[1] == 'contact.html') {
              alert('Please select \'What are you looking for\'.');
            } else {
              alert('Prosím zvolte \'Druh projektu\'.');
            }

            $('#subject').trigger('focus');
          } else {

            var $this = $(this);

            $.ajax({
              type: 'POST',
              url: 'contact.php',
              data: $($this).serialize()
            }).done(function(response) {
              e.preventDefault();

              if (window.location.href.split('com/')[1] == 'contact.html') {
                alert('Thank you very much for contacting. I will reply in two days.');
              } else {
                alert('Děkuji Vám za kontaktování. Do dvou dnů se Vám ozvu.');
              }

              // Clear the form.
              $($this)[0].reset();
            }).fail(function(data) {
              e.preventDefault();

              if (window.location.href.split('com/')[1] == 'contact.html') {
                alert('Oops! There was a problem with your submission. Please complete the form and try again.');
              } else {
                alert('Během odesílání zprávy došlo k problému. Prosím zkuste to znovu.');
              }
            });
          }
        });
      },
      customSlider: function() {
        (function() {
          var content = document.querySelectorAll('.js-slideable')[0],
              anchor = document.querySelectorAll('.js-slideable-anchor')[0];

          content.style.display = 'block';

          content.style.maxHeight = '0';

          content.style.opacity = '0';

          content.style.overflow = 'hidden';

          content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 1, 1)';

          content.classList.add('slideClosed');

          function customSlideDown(element) {
            element.style.maxHeight = '10000px';

            element.style.opacity = '1';

            if (element.classList.contains('slideClosed')) {
              element.classList.remove('slideClosed');
            }

            element.classList.add('slideOpened')
          }

          function customSlideUp(element) {
            element.style.maxHeight = '0';

            function slideTimer(seconds, callback) {
              var counter = 0,
                  time = window.setInterval(function() {
                    counter++;

                    if (counter >= seconds) {
                      callback();

                      window.clearInterval(time);
                    }
                  }, 10);
            };

            slideTimer(1, function() {
              element.style.opacity = '0';
            });

            if (element.classList.contains('slideOpened')) {
              element.classList.remove('slideOpened');
            }

            element.classList.add('slideClosed')
          }

          anchor.addEventListener('click', function(e) {
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
      fadeInCustom: function(element) {
        var elementOpacity = 0.1;// initial opacity

        element.style.display = 'block';

        var timer = setInterval(function () {
          if (elementOpacity >= 1){
            clearInterval(timer);
          }

          element.style.opacity = elementOpacity;

          element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ")";

          elementOpacity += elementOpacity * 0.1;
        }, 15);
      },
      // FadeOut controller
      fadeOutCustom: function(element) {
        var elementOpacity = 1;// initial opacity

        var timer = setInterval(function () {
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
      fontAwesomeLoader: function() {
        var stylesheetAwesome = document.createElement('link');
        stylesheetAwesome.rel = 'stylesheet';
        stylesheetAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css';
        stylesheetAwesome.classList.add('jsLoaded');
        document.getElementsByTagName('head')[0].appendChild(stylesheetAwesome);
      },
      // Font Open Sans loader controller
      fontOpenSansLoader: function() {
        var stylesheetOpenSans = document.createElement('link');
        stylesheetOpenSans.rel = 'stylesheet';
        stylesheetOpenSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800';
        stylesheetOpenSans.classList.add('jsLoaded');
        document.getElementsByTagName('head')[0].appendChild(stylesheetOpenSans);
      },
      // Font Raleway loader controller
      fontRalewayLoader: function() {
        var stylesheetRaleway = document.createElement('link');
        stylesheetRaleway.rel = 'stylesheet';
        stylesheetRaleway.href = 'https://fonts.googleapis.com/css?family=Raleway:200,300,400,600,700';
        stylesheetRaleway.classList.add('jsLoaded');
        document.getElementsByTagName('head')[0].appendChild(stylesheetRaleway);
      },
      // LazyImages controller
      lazyImages: function() {
        // Test if image is in the viewport
        function isImageInViewport(img) {
          var rect = img.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        }

        // Add event listeners to images
        window.addEventListener('DOMContentLoaded', lazyLoadImages);
        window.addEventListener('load', lazyLoadImages);
        window.addEventListener('resize', lazyLoadImages);
        window.addEventListener('scroll', lazyLoadImages);

        // lazyLoadImages function
        function lazyLoadImages() {
          var lazyImagesArray = document.querySelectorAll('img[data-src]');
          for (var i = 0; i < lazyImagesArray.length; i++) {
            if (isImageInViewport(lazyImagesArray[i])) {
              lazyImagesArray[i].setAttribute('src', lazyImagesArray[i].getAttribute('data-src'));
              lazyImagesArray[i].removeAttribute('data-src');
              lazyImagesArray[i].setAttribute('data-loaded', true);
              window.mainController.fadeInCustom(lazyImagesArray[i]);
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
      },
      pageTransition: function() {
        // Page transitions for clicks on links
        var links = document.querySelectorAll('a');

        for (var i = 0, j = links.length; i<j; i++) {
          // Check if the link is internal - redirects to another html file or some section via ID
          links[i].setAttribute('data-href', (links[i].href.indexOf('.html') != -1) && links[i].href.indexOf('#') <= 0);

          links[i].addEventListener('click', function(e) {
            var elTarget = e.target;

            if (elTarget.getAttribute('data-href') === 'true') {
              e.preventDefault();

              // Go up in the nodelist until we find a node with .href (HTMLAnchorElement)
              while (elTarget && !elTarget.href) {
                elTarget = elTarget.parentNode;
              }

              // Change current URL
              if (elTarget) {
                e.preventDefault();

                setTimeout(changePage, 100);

                function changePage() {
                  var el = document.querySelector('html');

                  history.pushState(null, elTarget.title, elTarget.href);

                  //$('html').fadeOut(350);
                  window.mainController.fadeOutCustom(el);

                  setTimeout(function() {
                    location.replace(elTarget.href);
                  },750);

                  //location.replace(elTarget.href);
                }

                //changePage();

                return;
              }

              //window.addEventListener('popstate', changePage);
            } else {
              setTimeout(function() {
                return true;
              },750);
            }
          });
        }
      },
      // Waypoints controller
      waypoints: function() {
        // setTimeout function is used to let the dom be loaded.
        // Otherwise, icons have no width or height
        // and waypoint will fire all triggers immediatelly.
        setTimeout(function() {
          // Load default discovery icon
          var waypointOne = new Waypoint({
            element: document.querySelectorAll('.wp-discovery-icon')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load discovery text
          var waypointTwo = new Waypoint({
            element: document.querySelectorAll('.wp-discovery-text')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning icon for mobile
          var waypointThree = new Waypoint({
            element: document.querySelectorAll('.wp-planning-icon-mobile')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning icon for desktop
          var waypointFour = new Waypoint({
            element: document.querySelectorAll('.wp-planning-icon-desktop')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load planning text
          var waypointFive = new Waypoint({
            element: document.querySelectorAll('.wp-planning-text')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load default design icon
          var waypointSix = new Waypoint({
            element: document.querySelectorAll('.wp-design-icon')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load design text
          var waypointSeven = new Waypoint({
            element: document.querySelectorAll('.wp-design-text')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building icon for mobile
          var waypointEight = new Waypoint({
            element: document.querySelectorAll('.wp-building-icon-mobile')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building icon for desktop
          var waypointNine = new Waypoint({
            element: document.querySelectorAll('.wp-building-icon-desktop')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });

          // Load building text
          var waypointTen = new Waypoint({
            element: document.querySelectorAll('.wp-building-text')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load default evaluation icon
          var waypointEleven = new Waypoint({
            element: document.querySelectorAll('.wp-evaluation-icon')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInLeft');
            },
            offset: 'bottom-in-view'
          });

          // Load evaluation text
          var waypointTwelve = new Waypoint({
            element: document.querySelectorAll('.wp-evaluation-text')[0],
            handler: function(direction) {
              this.element.classList.add('animated', 'fadeInRight');
            },
            offset: 'bottom-in-view'
          });
        }, 1000);
      }
    },
    switches: function() {
      /**
       * Custom transitions for page loading and closing
       * info: https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions/
       */
      if (true) {
        (function() {
          // Loading fonts and stylesheets
          window.onload = function() {
            // Load Font Awesome
            if (true) {
              window.mainController.fontAwesomeLoader();
            }

            // Load Open Sans font
            if (true) {
              window.mainController.fontOpenSansLoader();
            }

            // Load Raleway font
            if (true) {
              window.mainController.fontRalewayLoader()
            };

            if (document.URL.indexOf('process') > 0) {
              // Load Animate CSS
              window.mainController.animateStylesheetLoader();
            }

            // Cache html element
            var el = document.querySelector('html');
            //el.style.display = 'none';

            setTimeout(function() {
              //$('html').attr('id', 'loaded');
              el.setAttribute('id', 'loaded');

              // Fade in cached html element
              window.mainController.fadeInCustom(el);
            }, 350);
          }

          // Page transitions for clicks on links
          window.mainController.pageTransition();
        })();
      }

      /**
       * Form controller
       */
      if (this.settings.contactForm.length > 0) {
        (function() {
          window.mainController.contact();
        })();
      }

      /**
       * Lazy images
       */
      if (this.settings.lazyImages.length > 0) {
        (function() {
          window.mainController.lazyImages();
        })();
      }

      /**
       * Slideable content
       */
       if (this.settings.slideableContent.length > 0) {
        (function() {
          window.mainController.customSlider();
        })();
       }

      /**
       * Waypoints
       * info: http://imakewebthings.com/waypoints/
       */
      if (this.settings.waypoint.length > 0) {
        (function() {
          window.mainController.waypoints();
        })()
      }
    },
    init: function() {
      //document.querySelector('html').style.display = 'none';

      if (document.getElementsByClassName('no-js').length > 0) {
        document.getElementsByClassName('no-js')[0].classList.remove('no-js');
      }

      if (document.querySelectorAll('.no-js-img').length > 0) {
        var imagesArray = document.querySelectorAll('.no-js-img');

        for (var i = 0; i < imagesArray.length; i++) {
          imagesArray[i].classList.remove('no-js-img');
        }
      }

      window.mainController = app.controllers;

      app.switches();
    }
  };

  app.init();
})();
