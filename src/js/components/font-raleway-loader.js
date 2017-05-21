// Font Raleway loader component

const fontRalewayLoader = () => {
  console.log('Font Raleway loader initiated');

  const mainStyleSheet = document.querySelector('.js-stylesheet-main');
  let stylesheetRaleway = document.createElement('link');

  stylesheetRaleway.rel = 'stylesheet';
  stylesheetRaleway.href = 'https://fonts.googleapis.com/css?family=Raleway:200,300,400,600,700';
  stylesheetRaleway.classList.add('jsLoaded');

  mainStyleSheet.parentNode.insertBefore(stylesheetRaleway, mainStyleSheet.nextSibling);
};

export { fontRalewayLoader };
