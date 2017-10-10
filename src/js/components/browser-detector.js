// Browser detector component

const browserDetector = () => {
  console.log('Browser detector initiated')

  const browserDetect = {
    init: () => {
      browserDetect.browser = browserDetect.searchString(browserDetect.dataBrowser) || 'Other'
      browserDetect.version = browserDetect.searchVersion(navigator.userAgent) || browserDetect.searchVersion(navigator.appVersion) || 'Unknown'

      const browserClass = browserDetect.browser + '-' + browserDetect.version

      // Add classes for browser and version to HTML element
      document.querySelector('html').classList.add(browserClass)
      // document.querySelector('html').classList.add(browserDetect.version)
    },
    searchString: (data) => {
      for (let i = 0; i < data.length; i++) {
        let dataString = data[i].string
        browserDetect.versionSearchString = data[i].subString

        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity
        }
      }
    },
    searchVersion: (dataString) => {
      const index = dataString.indexOf(browserDetect.versionSearchString)
      if (index === -1) {
        return
      }

      const rv = dataString.indexOf('rv:')
      if (browserDetect.versionSearchString === 'Trident' && rv !== -1) {
        return parseFloat(dataString.substring(rv + 3))
      } else {
        return parseFloat(dataString.substring(index + browserDetect.versionSearchString.length + 1))
      }
    },

    dataBrowser: [{
        string: navigator.userAgent,
        subString: 'Edge',
        identity: 'ms-edge'
      }, {
        string: navigator.userAgent,
        subString: 'MSIE',
        identity: 'ie'
      }, {
        string: navigator.userAgent,
        subString: 'Trident',
        identity: 'ie'
      }, {
        string: navigator.userAgent,
        subString: 'Firefox',
        identity: 'firefox'
      }, {
        string: navigator.userAgent,
        subString: 'Opera',
        identity: 'opera'
      }, {
        string: navigator.userAgent,
        subString: 'OPR',
        identity: 'opera'
      },

      {
        string: navigator.userAgent,
        subString: 'Chrome',
        identity: 'chrome'
      }, {
        string: navigator.userAgent,
        subString: 'Safari',
        identity: 'safari'
      }
    ]
  }

  browserDetect.init()
}

export { browserDetector }
