// Page transition component

const pageTransition = () => {
  console.log('Page transition initiated')

  // Page transitions for clicks on links
  let links = document.querySelectorAll('a')

  for (let i = 0, j = links.length; i < j; i++) {
    // Check if the link is internal - redirects to another html file or some section via ID
    links[i].setAttribute('data-href', (links[i].href.indexOf('.html') !== -1) && links[i].href.indexOf('#') <= 0)

    links[i].addEventListener('click', (e) => {
      let elTarget = e.target

      if (elTarget.getAttribute('data-href') === 'true') {
        e.preventDefault()

        // Go up in the nodelist until we find a node with .href (HTMLAnchorElement)
        while (elTarget && !elTarget.href) {
          elTarget = elTarget.parentNode
        }

        // Change current URL
        if (elTarget.getAttribute('data-href')) {
          e.preventDefault()

          const changePage = () => {
            let el = document.querySelector('html')

            history.pushState({state: 'new'}, elTarget.title, elTarget.href)

            // $('html').fadeOut(350)
            fadeOutCustom(el)

            setTimeout(() => {
              // location.replace(elTarget.href)
              window.location.href = elTarget.href
            }, 750)

            // location.replace(elTarget.href)
          }

          setTimeout(changePage, 100)

          // changePage()
        }

        // window.addEventListener('popstate', changePage)
      } else {
        setTimeout(() => {
          return true
        }, 750)
      }
    })
  }
}

export { pageTransition }
