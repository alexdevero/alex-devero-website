// Fade in custom component

const fadeInCustom = (element) => {
  console.log('Fade in custom initiated')

  let elementOpacity = 0.1 // initial opacity

  element.style.display = 'block'

  let timer = setInterval(() => {
    if (elementOpacity >= 1) {
      clearInterval(timer)
    }

    element.style.opacity = elementOpacity

    element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ')'

    elementOpacity += elementOpacity * 0.1
  }, 15)
}

export { fadeInCustom }
