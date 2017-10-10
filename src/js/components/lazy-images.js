// Lazy images component

import { fadeInCustom } from './fade-in-custom.js'

const lazyImages = () => {
  console.log('Lazy images initiated')

  // Test if image is in the viewport
  const isImageInViewport = (img) => {
    let rect = img.getBoundingClientRect()

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // lazyLoadImages function
  const lazyLoadImages = () => {
    let lazyImagesArray = document.querySelectorAll('img[data-src]')

    for (let i = 0; i < lazyImagesArray.length; i++) {
      if (isImageInViewport(lazyImagesArray[i])) {
        lazyImagesArray[i].setAttribute('src', lazyImagesArray[i].getAttribute('data-src'))

        lazyImagesArray[i].removeAttribute('data-src')

        lazyImagesArray[i].setAttribute('srcset', lazyImagesArray[i].getAttribute('data-srcset'))

        lazyImagesArray[i].removeAttribute('data-srcset')

        lazyImagesArray[i].setAttribute('data-loaded', true)

        fadeInCustom(lazyImagesArray[i])
      }
    }

    // Remove event listeners if all images are loaded
    if (lazyImagesArray.length === 0) {
      window.removeEventListener('DOMContentLoaded', lazyLoadImages)

      window.removeEventListener('load', lazyLoadImages)

      window.removeEventListener('resize', lazyLoadImages)

      window.removeEventListener('scroll', lazyLoadImages)
    }
  }

  // Add event listeners to images
  window.addEventListener('DOMContentLoaded', lazyLoadImages)

  window.addEventListener('load', lazyLoadImages)

  window.addEventListener('resize', lazyLoadImages)

  window.addEventListener('scroll', lazyLoadImages)
}

export { lazyImages }
