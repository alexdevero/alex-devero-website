// Contact cards flipper

const contactFlipper = (e) => {
  const flipperAnchor = document.querySelector('.js-contact-flipper');
  const contactForm = document.querySelector('.contact-card--form');
  const contactQR = document.querySelector('.contact-card--qr');

  flipperAnchor.addEventListener('click', (e) => {
    e.preventDefault();

    const el = e.target;

    if (!el.classList.contains('qr-show')) {
      el.classList.add('qr-show');

      contactForm.classList.add('contact-card--hidden');
      contactQR.classList.remove('contact-card--hidden');
    } else {
      el.classList.remove('qr-show');

      contactForm.classList.remove('contact-card--hidden');
      contactQR.classList.add('contact-card--hidden');
    }
  })
}

export { contactFlipper };
