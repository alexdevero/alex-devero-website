// Font Awesome loader component

const fontAwesomeLoader = () => {
  console.log('Font Awesome loader initiated')

  const mainStyleSheet = document.querySelector('.js-stylesheet-main')
  let stylesheetAwesome = document.createElement('link')

  stylesheetAwesome.rel = 'stylesheet'
  stylesheetAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
  stylesheetAwesome.classList.add('jsLoaded')

  mainStyleSheet.parentNode.insertBefore(stylesheetAwesome, mainStyleSheet.nextSibling)
}

export { fontAwesomeLoader }
