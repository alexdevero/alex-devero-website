// Waypoints component

const waypoints = () => {

  console.log('Waypoints initiated');

  // Docs: http://imakewebthings.com/waypoints/

  // setTimeout function is used to let the dom be loaded.
  // Otherwise, icons have no width or height
  // and waypoint will fire all triggers immediatelly.
  setTimeout(() => {
    // Load default discovery icon
    const waypointOne = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-discovery-icon'),
      handler: () => {
        document.querySelector('.wp-discovery-icon').classList.add('animated', 'fadeInLeft');
      },
      offset: 'bottom-in-view'
    });

    // Load discovery text
    const waypointTwo = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-discovery-text'),
      handler: () => {
        document.querySelector('.wp-discovery-text').classList.add('animated', 'fadeInRight');
      },
      offset: 'bottom-in-view'
    });

    // Load planning icon for mobile
    const waypointThree = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-planning-icon-mobile'),
      handler: () => {
        document.querySelector('.wp-planning-icon-mobile').classList.add('animated', 'fadeInRight');
      },
      offset: 'bottom-in-view'
    });

    // Load planning icon for desktop
    const waypointFour = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-planning-icon-desktop'),
      handler: () => {
        document.querySelector('.wp-planning-icon-desktop').classList.add('animated', 'fadeInRight');
      },
      offset: 'bottom-in-view'
    });

    // Load planning text
    const waypointFive = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-planning-text'),
      handler: () => {
        document.querySelector('.wp-planning-text').classList.add('animated', 'fadeInLeft');
      },
      offset: 'bottom-in-view'
    });

    // Load default design icon
    const waypointSix = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-design-icon'),
      handler: () => {
        document.querySelector('.wp-design-icon').classList.add('animated', 'fadeInLeft');
      },
      offset: 'bottom-in-view'
    });

    // Load design text
    const waypointSeven = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-design-text'),
      handler: () => {
        document.querySelector('.wp-design-text').classList.add('animated', 'fadeInRight');
      },
      offset: 'bottom-in-view'
    });

    // Load building icon for mobile
    const waypointEight = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-building-icon-mobile'),
      handler: () => {
        document.querySelector('.wp-building-icon-mobile').classList.add('animated', 'fadeInRight');
      },
      offset: 'bottom-in-view'
    });

    // Load building icon for desktop
    const waypointNine = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-building-icon-desktop'),
      handler: () => {
        document.querySelector('.wp-building-icon-desktop').classList.add('animated', 'fadeInRight');
      },
      offset: 'bottom-in-view'
    });

    // Load building text
    const waypointTen = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-building-text'),
      handler: () => {
        document.querySelector('.wp-building-text').classList.add('animated', 'fadeInLeft');
      },
      offset: 'bottom-in-view'
    });

    // Load default evaluation icon
    const waypointEleven = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-evaluation-icon'),
      handler: () => {
        document.querySelector('.wp-evaluation-icon').classList.add('animated', 'fadeInLeft');
      },
      offset: 'bottom-in-view'
    });

    // Load evaluation text
    const waypointTwelve = new Waypoint({ // eslint-disable-line no-unused-vars
      element: document.querySelector('.wp-evaluation-text'),
      handler: () => {
        document.querySelector('.wp-evaluation-text').classList.add('animated', 'fadeInRight');
      },
      offset: 'bottom-in-view'
    });
  }, 1000);
};

export { waypoints };
