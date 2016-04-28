(function() {
	'use strict';
	var app = {
		settings: {
			contactForm: document.getElementById('contactForm'),
			lazyImages: document.getElementsByClassName('lazy')
		},
		controllers: function() {
			/**
			 * Form controller
			 */
			if (this.settings.contactForm.length > 0) {
				(function() {
					console.log('running');
					/*$('#formButton').on('click', function(e) {
						e.preventDefault();

						alert('clicked');

						var form = $('#contactForm');

						if (document.getElementById('subject').value == 'subjectBlank') {
							alert('Please select \'What are you looking for\'.');
						}
					});*/
					$('#contactForm').submit(function(e) {
						e.preventDefault();

						if (document.getElementById('subject').value == 'subjectBlank') {
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
