// Modal messages component

import { fadeOutCustom } from './fade-out-custom.js';
import { fadeInCustom } from './fade-in-custom.js';

const modalMessages = ($messageType) => {
  console.log('Modal messages initiated');

  const modalOverlay = document.querySelector('.js-modal-overlay');
  const modalButton = modalOverlay.querySelectorAll('.js-modal-button');
  const messageFailure = modalOverlay.querySelector('.js-modal-message-failure');
  const messageInfo = modalOverlay.querySelector('.js-modal-message-info');
  const messageSuccess = modalOverlay.querySelector('.js-modal-message-success');

  // Close modal and hide message by clicking on the button
  for (let i = 0, j = modalButton.length; i < j; i++) {
    modalButton[i].addEventListener('click', (e) => {
      e.target.parentNode.classList.remove('modal-message-visible');

      fadeOutCustom(modalOverlay);
    });
  }

  if ($messageType === 'failure') {
    // Failure message
    const messageFailureLoader = () => {
      // Show modal message
      messageFailure.classList.add('modal-message-visible');

      // Show modal overlay
      fadeInCustom(modalOverlay);
    }

    // Initiate message loader function
    messageFailureLoader();
  } else if ($messageType === 'info') {
    // Info message
    const messageInfoLoader = () => {
      // Show modal message
      messageInfo.classList.add('modal-message-visible');

      // Show modal overlay
      fadeInCustom(modalOverlay);
    }

    // Initiate message loader function
    messageInfoLoader();
  } else if ($messageType === 'success') {
    // Success message
    const messageSuccessLoader = () => {
      // Show modal message
      messageSuccess.classList.add('modal-message-visible');

      // Show modal overlay
      fadeInCustom(modalOverlay);
    }

    // Initiate message loader function
    messageSuccessLoader();
  }
};

export { modalMessages };
