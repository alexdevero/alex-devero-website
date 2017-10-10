// Custom slider component

const customSlider = (sliderAnchor, sliderContent) => {
  console.log('Custom slider initiated')

  let content = document.querySelectorAll(sliderAnchor)[0]
  let anchor = document.querySelectorAll(sliderContent)[0]

  content.style.display = 'block'

  content.style.maxHeight = '0'

  content.style.opacity = '0'

  content.style.overflow = 'hidden'

  content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 1, 1)'

  content.classList.add('slideClosed')

  const customSlideDown = (element) => {
    element.style.maxHeight = '10000px'

    element.style.opacity = '1'

    if (element.classList.contains('slideClosed')) {
      element.classList.remove('slideClosed')
    }

    element.classList.add('slideOpened')
  }

  const customSlideUp = (element) => {
    element.style.maxHeight = '0'

    const slideTimer = (seconds, callback) => {
      let counter = 0

      let time = window.setInterval(function () {
        counter++

        if (counter >= seconds) {
          callback()

          window.clearInterval(time)
        }
      }, 10)
    }

    slideTimer(1, () => {
      element.style.opacity = '0'
    })

    if (element.classList.contains('slideOpened')) {
      element.classList.remove('slideOpened')
    }

    element.classList.add('slideClosed')
  }

  anchor.addEventListener('click', (e) => {
    e.preventDefault()

    if (content.classList.contains('slideClosed')) {
      customSlideDown(content)
    } else {
      customSlideUp(content)
    }
  })
}

export { customSlider }
