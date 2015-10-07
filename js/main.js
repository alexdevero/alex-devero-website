$(function() {
  ///
  // Navigation controllers
  ///
  $(document).on("click", ".js-icon-home", function(e) {
    $(this).toggleClass("js-icon-home").toggleClass("js-icon-home--open");
    $(".js-nav__content").animate({right: 0});
    $(".js-portfolio__showcase").fadeToggle();
  });
  $(document).on("click", ".js-icon-home--open", function(e) {
    $(this).toggleClass("js-icon-home").toggleClass("js-icon-home--open");
    $(".js-nav__content").animate({right: "-100%"});
    $(".js-portfolio__showcase").fadeToggle();
  });
  ///
  // Form handling
  ///
  $(".js-robot-check").on("click", function() {
    $(".js-robot-check").attr("checked", false).prop("checked", true);
    $(this).attr("checked", true).prop("checked", true);
  });
  $(document).on("submit", "#contact-form", function(e) {
    if ($("#radioRobot").attr("checked")) {
      alert("Robots are not allowed!");
      return false;
    } else {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "contact.php",
        data: $("#contact-form").serialize(),
        complete: function() {
          alert("Your message has been sent. Thank you!");
          $("#contact-form")[0].reset();
          $("#radioRobot").attr("checked", true).prop("checked", true);
          $("#radioHuman").attr("checked", false).prop("checked", false);
        }
      });
    }
  });
  // Google Maps Scripts
  // When the window has finished loading create our google map below
  google.maps.event.addDomListener(window, 'load', init);
  function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 15,

      // The latitude and longitude to center the map (always required)
      center: new google.maps.LatLng(50.078807, 14.4263349), // Prague

      // Disables the default Google Maps UI components
      disableDefaultUI: true,
      scrollwheel: false,
      draggable: false,

      // How you would like to style the map. 
      // This is where you would paste any style found on Snazzy Maps.
      styles: [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#000000"
        }, {
          "lightness": 40
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#000000"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "landscape",
        "elementType": "labels.icon",
        "stylers": [{
          "saturation": "-100"
        }, {
          "lightness": "-54"
        }]
      }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }, {
          "lightness": "0"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
          "saturation": "-89"
        }, {
          "lightness": "-55"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "on"
        }, {
          "saturation": "-100"
        }, {
          "lightness": "-51"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }]
      }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker-white.png';
    var myLatLng = new google.maps.LatLng(50.078807, 14.4263349);
    var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
    });
  }
});
