(function() {
  'use strict';
  var app = {
    settings: {
      indexCanvas: document.querySelectorAll('#indexCanvas'),
      lazyImages: document.getElementsByClassName('lazy'),
      contactForm: document.querySelectorAll('#contactForm')
    },
    controllers: function() {
      /**
        * Index Canvas
        */
      if (this.settings.indexCanvas.length > 0) {
        (function() {
          console.log('Canvas');

          var canvas = document.getElementById('indexCanvas');
          var ctx = canvas.getContext('2d');

          // Making the canvas full screen
          canvas.height = window.innerHeight;
          canvas.width = window.innerWidth;

          // Chinese and other characters - taken from the unicode charset
          var characters = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑1234567890ABCDEFGHIKLMNOPQRSTVXYZ';

          // Converting the string into an array of single characters
          var text = characters.split('');

          var fontSize = 16;
          var columns = canvas.width/fontSize; //number of columns for the rain

          // Array of drops - one per column
          var drops = [];

          // x below is the x coordinate
          // 1 = y co-ordinate of the drop(same for every drop initially)
          for (var x = 0; x < columns; x++) {
            drops[x] = 1;
          }

          // Drawing the characters
          function draw() {
            // Black BG for the canvas
            // Translucent BG to show trail
            ctx.fillStyle = 'rgba(255,255,255,.025)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(50,50,50,.25)'; //green text
            ctx.font = fontSize + 'px arial';

            // Looping over drops
            for (var i = 0; i < drops.length; i++) {
              // Random character to print
              var textPrint = text[Math.floor(Math.random()*text.length)];

              // x = i*fontSize, y = value of drops[i]*fontSize
              ctx.fillText(textPrint, i*fontSize, drops[i]*fontSize);

              // Sending the drop back to the top randomly after it has crossed the screen
              // Adding a randomness to the reset to make the drops scattered on the Y axis
              if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
              }

              // Incrementing Y coordinate
              drops[i]++;
            }
          }

          setInterval(draw, 55);
        })();
      }

      /**
       * Form controller
       */
      if (this.settings.contactForm.length > 0) {
        (function() {
          console.log('running');
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
        })();
      }

      /**
       * Lazy images
       */
      if (this.settings.lazyImages.length > 0) {
        (function() {
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
        })();
      }
    },
    init: function() {
      if (document.getElementsByClassName('no-js').length > 0) {
        document.getElementsByClassName('no-js')[0].classList.remove('no-js');
      }

      if (document.querySelectorAll('.no-js-img').length > 0) {
        var imagesArray = document.querySelectorAll('.no-js-img');
        for (var i = 0; i < imagesArray.length; i++) {
          imagesArray[i].classList.remove('no-js-img');
        }
      }

      app.controllers();
    }
  };

  app.init();
})();
