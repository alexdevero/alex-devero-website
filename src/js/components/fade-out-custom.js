// Fade out custom component

const fadeOutCustom = (element) => {
  console.log('Fade out custom initiated')

  let elementOpacity = 1 // initial opacity

  let timer = setInterval(() => {
    if (elementOpacity <= 0.1) {
      clearInterval(timer)

      element.style.display = 'none'
    }

    element.style.opacity = elementOpacity

    element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ')'

    elementOpacity -= elementOpacity * 0.1
  }, 15)
}

export { fadeOutCustom }
