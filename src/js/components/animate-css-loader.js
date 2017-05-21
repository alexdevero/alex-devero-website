// Animate CSS loader component

const animateStylesheetLoader = () => {
  console.log('Animate CSS loader initiated');

  const mainStyleSheet = document.querySelector('.js-stylesheet-main');
  let stylesheetAnimateCSS = document.createElement('link');

  stylesheetAnimateCSS.rel = 'stylesheet';
  stylesheetAnimateCSS.href = 'css/animate.css';
  stylesheetAnimateCSS.classList.add('jsLoaded');

  mainStyleSheet.parentNode.insertBefore(stylesheetAnimateCSS, mainStyleSheet.nextSibling);
}

export { animateStylesheetLoader };
