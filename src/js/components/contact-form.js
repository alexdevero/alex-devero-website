// Contact form component

import { modalMessages } from './modal-messages.js';

const contactForm = (e) => {
  console.log('Contact form initiated');

  $('#contactForm').submit((e) => {
    e.preventDefault();

    const $this = e.target;

    $.ajax({
      data: $($this).serialize(),
      type: 'POST',
      url: 'contact.php'
    }).done(() => {
      e.preventDefault();

      modalMessages('success');

      // Clear the form.
      $($this)[0].reset();
    }).fail(() => {
      e.preventDefault();

      modalMessages('failure');
    });
  });
}

export { contactForm };
