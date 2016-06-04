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
          var //chineseCaracters = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑',
              chineseCharacters = '\u4E00\u4E10\u4E20\u4E30\u4E40\u4E50\u4E60\u4E70\u4E80\u4E90\u4EA0\u4EB0\u4EC0\u4ED0\u4EE0\u4EF0\u4F00\u4F10\u4F20\u4F30\u4F40\u4F50\u4F60\u4F70\u4F80\u4F90\u4FA0\u4FB0\u4FC0\u4FD0\u4FE0\u4FF0',
              runicCharacters = '\u16A0\u16A1\u16A2\u16A3\u16A4\u16A5\u16A6\u16A7\u16A8\u16A9\u16AA\u16AB\u16AC\u16AD\u16AE\u16AF\u16B0\u16B1\u16B2\u16B3\u16B4\u16B4\u16B5\u16B6\u16B7\u16B8\u16B9\u16BA\u16BB\u16BC\u16BD\u16BE\u16BF\u16C0\u16C1\u16C2\u16C3\u16C4\u16C5\u16C6\u16C7\u16C8\u16C9\u16CA\u16CB\u16CC\u16CD\u16CE\u16CF\u16D0\u16D1\u16D2\u16D3\u16D4\u16D5\u16D6\u16D7\u16D8\u16D9\u16DA\u16DB\u16DC\u16DE\u16DF\u16E0\u16E1\u16E2\u16E3\u16E4\u16E5\u16E6\u16E7\u16E8\u16E9\u16EA\u16EB\u16EC\u16ED\u16EE\u16EF\u16F0',
              latinCharacters = 'ABCDEFGHIKLMNOPQRSTVXYZ',
              greekCharacters = '\u0370\u0371\u0372\u0373\u0374\u0375\u0376\u0377\u0378\u0379\u037a\u037b\u037c\u037d\u037e\u037f\u0380\u0381\u0382\u0383\u0384\u0385\u0386\u0387\u0388\u0389\u038a\u038b\u038c\u038d\u038e\u038f\u0390\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a2\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9\u03aa\u03ab\u03ac\u03ad\u03ae\u03af\u03b0\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9\u03ca\u03cb\u03cc\u03cd\u03ce\u03cf\u03d0\u03d1\u03d2\u03d3\u03d4\u03d5\u03d6\u03d7\u03d8\u03d9\u03da\u03db\u03dc\u03dd\u03de\u03df\u03e0\u03e1\u03e2\u03e3\u03e4\u03e5\u03e6\u03e7\u03e8\u03e9\u03ea\u03eb\u03ec\u03ed\u03ee\u03ef\u03f0\u03f1\u03f2\u03f3\u03f4\u03f5\u03f6\u03f7\u03f8\u03f9\u03fa\u03fb\u03fc\u03fd\u03fe\u03ff',
              latinNumbers = '1234567890',
              katakanaCharacters = '\u30a0\u30a1\u30a2\u30a3\u30a4\u30a5\u30a6\u30a7\u30a8\u30a9\u30aa\u30ab\u30ac\u30ad\u30ae\u30af\u30b0\u30b1\u30b2\u30b3\u30b4\u30b5\u30b6\u30b7\u30b8\u30b9\u30ba\u30bb\u30bc\u30bd\u30be\u30bf\u30c0\u30c1\u30c2\u30c3\u30c4\u30c5\u30c6\u30c7\u30c8\u30c9\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d0\u30d1\u30d2\u30d3\u30d4\u30d5\u30d6\u30d7\u30d8\u30d9\u30da\u30db\u30dc\u30dd\u30de\u30df\u30e0\u30e1\u30e2\u30e3\u30e4\u30e5\u30e6\u30e7\u30e8\u30e9\u30ea\u30eb\u30ec\u30ed\u30ee\u30ef\u30f0\u30f1\u30f2\u30f3\u30f4\u30f5\u30f6\u30f7\u30f8\u30f9\u30fa\u30fb\u30fc\u30fd\u30fe\u30ff';

          var characters = chineseCharacters + runicCharacters + greekCharacters + katakanaCharacters + latinCharacters;

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

          setInterval(draw, 95);
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
