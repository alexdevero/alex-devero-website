// TypedJS component

import { fadeInCustom } from './fade-in-custom.js'

const typedjs = () => {
  console.log('TypedJS initiated')

  // Docs: https://github.com/mattboldt/typed.js
  // yarn add typed.js

  document.querySelector('html').style.overflow = 'hidden'

  if (document.querySelectorAll('.js-typed-en').length !== 0) {
    setTimeout(() => {
      Typed.new('.js-typed-h1', {
        contentType: 'text',
        loop: false, // loop on or off (true or false)
        loopCount: false, // number of loops, false = infinite
        showCursor: false, // disable typing cursor
        strings: ['Alex Devero'],
        typeSpeed: 90, // typing speed
        callback: () => { // call when done callback function
          setTimeout(() => {
            Typed.new('.js-typed-h2', {
              contentType: 'html',
              loop: false, // loop on or off (true or false)
              loopCount: false, // number of loops, false = infinite
              showCursor: false, // disable typing cursor
              strings: ['<span>Czech Designer &#43; Developer &#43; Entrepreneur</span>'],
              typeSpeed: 35, // typing speed
              callback: () => { // call when done callback function
                setTimeout(() => {
                  Typed.new('.js-typed-h3', {
                    contentType: 'html',
                    loop: false, // loop on or off (true or false)
                    loopCount: false, // number of loops, false = infinite
                    showCursor: false, // disable typing cursor
                    strings: ['UI/UX/Web Design &amp; Web Development'],
                    typeSpeed: 35, // typing speed
                    callback: () => {
                      document.querySelector('html').style.overflow = 'initial'

                      setTimeout(() => {
                        fadeInCustom(document.querySelector('.intro__btn-container'))

                        setTimeout(() => {
                          document.querySelector('.js-typed-h1').classList.add('glitch')
                        }, 750)
                      }, 100)
                    }
                  })
                }, 100)
              }
            })
          }, 100)
        }
      })
    }, 900)
  } else {
    setTimeout(() => {
      Typed.new('.js-typed-h1', {
        contentType: 'text',
        loop: false, // loop on or off (true or false)
        loopCount: false, // number of loops, false = infinite
        showCursor: false, // disable typing cursor
        strings: ['Alex Devero'],
        typeSpeed: 90, // typing speed
        callback: () => { // call when done callback function
          setTimeout(() => {
            Typed.new('.js-typed-h2', {
              contentType: 'html',
              loop: false, // loop on or off (true or false)
              loopCount: false, // number of loops, false = infinite
              showCursor: false, // disable typing cursor
              strings: ['<span>Český Designér &plus; Developer &plus; Podnikatel.</span>'],
              typeSpeed: 35, // typing speed
              callback: () => { // call when done callback function
                setTimeout(() => {
                  Typed.new('.js-typed-h3', {
                    contentType: 'html',
                    loop: false, // loop on or off (true or false)
                    loopCount: false, // number of loops, false = infinite
                    showCursor: false, // disable typing cursor
                    strings: ['UI/UX/Web Design &amp; Web Development'],
                    typeSpeed: 35, // typing speed
                    callback: () => {
                      setTimeout(() => {
                        fadeInCustom(document.querySelector('.intro__btn-container'))

                        setTimeout(() => {
                          document.querySelector('.js-typed-h1').classList.add('glitch')
                        }, 750)
                      }, 100)
                    }
                  })
                }, 100)
              }
            })
          }, 100)
        }
      })
    }, 900)
  }
}

export { typedjs }
