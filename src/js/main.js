(function() {
	'use strict';
	var app = {
		settings: {
			contactForm: $('#adContact'),
			lazyImages: document.getElementsByClassName('lazy')
		},
		controllers: function() {
			/**
			 * Form controller
			 */
			if (this.settings.contactForm.length > 0) {
				(function(e) {
					$('#contactForm').submit(function(e) {
						e.preventDefault();

						if (document.getElementById('subject').value == 'subjectBlank') {
							alert('Please select \'What are you looking for\'.');
						}

						var $this = $(this);

						$.ajax({
							type: 'POST',
							url: $($this).attr('action'),
							data: $($this).serialize()
						}).done(function(response) {
							e.preventDefault();
							alert('Thanks!');

							// Clear the form.
							$(this).reset();
						}).fail(function(data) {
							e.preventDefault();
							alert('Oops!');
						});
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
