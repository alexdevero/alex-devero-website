(function() {
  'use strict';
  var app = {
    settings: {
      contactForm: $(".js-contact-form"),
      googleMap: $(".js-map"),
      iconHome: $(".js-icon-home"),
      lazyImages: $(".lazy"),
      preloader: $(".js-preloader"),
      heroArrow: $(".hero__arrow"),
      chart: $('.js-chart')
    },
    controllers: function() {
      /**
       * Navigation controller
       */
      if (this.settings.iconHome.length > 0) {
        (function() {
          $(document).on("click", ".js-icon-home", function(e) {
            $(this).toggleClass("js-icon-home").toggleClass("js-icon-home--open");
            $(".js-nav__content").animate({
              right: 0
            });
            $(".js-portfolio__showcase").fadeToggle();
          });
          $(document).on("click", ".js-icon-home--open", function(e) {
            $(this).toggleClass("js-icon-home").toggleClass("js-icon-home--open");
            $(".js-nav__content").animate({
              right: "-100%"
            });
            $(".js-portfolio__showcase").fadeToggle();
          });
        })();
      };

      /**
       *
       */
      if (this.settings.heroArrow.length > 0) {
        (function() {
          $(document).on("click", ".hero__arrow", function(e) {
            e.preventDefault();
            $("html, body").animate({
              scrollTop: $("" + $(this).attr("href") + "").offset().top
            }, 750);
          });
        })();
      }

      /**
       * Preloader
       * Info: https://ihatetomatoes.net/create-custom-preloading-screen/
       */
      if (this.settings.preloader.length > 0) {
        (function() {
          var number = 4000;
          setTimeout(function() {
            $("body").toggleClass("loaded");
          }, number);
        })();
      }

      /**
       * ThreeJS - cube
       * Info: http://threejs.org/
       * Tutorial: http://www.awwwards.com/creating-3d-cube-a-practical-guide-to-three-js-with-live-demo.html
       */
      if (window.innerWidth > 550) {
        (function() {
          function webglAvailable() {
            try {
              var canvas = document.createElement( 'canvas' );
              return !!( window.WebGLRenderingContext && (
                canvas.getContext( 'webgl' ) ||
                canvas.getContext( 'experimental-webgl' ) )
              );
            } catch ( e ) {
              return false;
            }
          }

          var scene = new THREE.Scene();
          var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
          var canvas = document.getElementById('canvasCube');
          var renderer;
          if ( webglAvailable() ) {
            renderer = new THREE.WebGLRenderer({canvas: canvas});
          } else {
            renderer = new THREE.CanvasRenderer({canvas: canvas});
          }
          //var renderer = new THREE.WebGLRenderer({canvas: canvas});
          canvas.width  = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
          renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
          //renderer.setSize(window.innerWidth, window.innerHeight);
          //document.body.appendChild(renderer.domElement);
          //document.getElementById('sec__main').appendChild(renderer.domElement);
    
          var geometry = new THREE.BoxGeometry(620, 620, 620, 10, 10, 10);
          var geometry1 = new THREE.DodecahedronGeometry(480);
          var material = new THREE.MeshBasicMaterial({
            color: 0xfffff,
            wireframe: true
          });
          var cube = new THREE.Mesh(geometry1, material);
          scene.add(cube);
    
          camera.position.z = 1000;
    
          function render() {
            requestAnimationFrame(render);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
          };
          render();
        })();
      }

      /**
       * Form controller
       */
      if (this.settings.contactForm.length > 0) {
        (function() {
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
        })();
      };

      /**
       * Lazy images
       */
      if (this.settings.lazyImages.length > 0) {
        (function() {
          $(".lazy").lazyload({
            effect: "fadeIn"
          });
        })();
      }

      /**
      * Chart Graphs
      * Info: http://www.chartjs.org/
      */
      if (this.settings.chart.length > 0 ) {
        //
        // Radar Chart - Design Skills
        //
        var windowWidth = $(window).width(),
            chartRadar = $(".js-chart");

        // Resize the graph according to screen resolution
        if (windowWidth > 440) {
          $(chartRadar).attr({
            'width': 420,
            'height': 420
          });
        } else {
          $(chartRadar).attr({
            'width': 300,
            'height': 300
          });
        }

        // Get context of the canvas
        var contextRadarDesign = document.getElementById("chartDesign").getContext("2d"),
            dataRadarDesign = {
              labels: ['Graphic Design', 'Information Architecture', 'Interaction Design', 'User Interface', 'User Experience', 'Visual Design', 'Web Design'],
              datasets: [{
                label: 'Design Skills',
                fillColor: 'rgba(186,135,71,0.1)',
                strokeColor: 'rgba(186,135,71,1)',
                pointColor: 'rgba(186,135,71,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(186,135,71,1)',
                data: [60, 64, 73, 74, 71, 63, 85]
              }]
            },
            newRadarChartDesign = new Chart(contextRadarDesign).Radar(dataRadarDesign);

        //
        // Radar Chart - Web Development Skills
        //
        // Get context of the canvas
        var contextRadarWeb = document.getElementById("chartWeb").getContext("2d"),
            dataRadarWeb = {
              labels: ['CSS', 'HTML', 'JavaScript', 'jQuery', 'CoffeeScript', 'Bootstrap', 'Foundation', 'PHP', 'Ruby on Rails', 'WordPress'],
              datasets: [{
                label: 'Design Skills',
                fillColor: 'rgba(186,135,71,0.1)',
                strokeColor: 'rgba(186,135,71,1)',
                pointColor: 'rgba(186,135,71,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(186,135,71,1)',
                data: [89, 86, 72, 78, 54, 72, 81, 15, 32, 9]
              }]
            },
            newRadarChartWeb = new Chart(contextRadarWeb).Radar(dataRadarWeb);

        //
        // Radar Chart - Branding
        //
        // Get context of the canvas
        var contextRadarBranding = document.getElementById("chartBranding").getContext("2d"),
            dataRadarBranding = {
              labels: ['Brand Identity', 'Brand Management', 'Marketing', 'Market Research', 'Style Guides', 'Copywriting'],
              datasets: [{
                label: 'Design Skills',
                fillColor: 'rgba(186,135,71,0.1)',
                strokeColor: 'rgba(186,135,71,1)',
                pointColor: 'rgba(186,135,71,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(186,135,71,1)',
                data: [72, 61, 71, 69, 75, 62]
              }]
            },
            newRadarChartBranding = new Chart(contextRadarBranding).Radar(dataRadarBranding);

        //
        // Radar Chart - Digital Strategy
        //
        // Get context of the canvas
        var contextRadarStrategy = document.getElementById("chartStrategy").getContext("2d"),
            dataRadarStrategy = {
              labels: ['Analytics', 'Brand Strategy', 'Content Marketing', 'Mobile', 'SEO', 'Social Media'],
              datasets: [{
                label: 'Design Skills',
                fillColor: 'rgba(186,135,71,0.1)',
                strokeColor: 'rgba(186,135,71,1)',
                pointColor: 'rgba(186,135,71,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(186,135,71,1)',
                data: [89, 63, 43, 79, 91, 93]
              }]
            },
            newRadarChartStrategy = new Chart(contextRadarStrategy).Radar(dataRadarStrategy);

        //
        // Radar Chart - Soft Skills
        //
        // Get context of the canvas
        var contextRadarSoft = document.getElementById("chartSoft").getContext("2d"),
            dataRadarSoft = {
              labels: ['Cognitive Science', 'Psychology', 'Philosophy', 'Sociology', 'Usability', 'Writing'],
              datasets: [{
                label: 'Design Skills',
                fillColor: 'rgba(186,135,71,0.1)',
                strokeColor: 'rgba(186,135,71,1)',
                pointColor: 'rgba(186,135,71,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(186,135,71,1)',
                data: [60, 84, 83, 79, 76, 71]
              }]
            },
            newRadarChartSoft = new Chart(contextRadarSoft).Radar(dataRadarSoft);

        //
        // Radar Chart - Tools
        //
        // Get context of the canvas
        var contextRadarTools = document.getElementById("chartTools").getContext("2d"),
            dataRadarTools = {
              labels: ['Filezilla', 'Git', 'Adobe Illustrator', 'Adobe InDesign', 'Notepad', 'Adobe Photoshop', 'Sublime Text'],
              datasets: [{
                label: 'Design Skills',
                fillColor: 'rgba(186,135,71,0.1)',
                strokeColor: 'rgba(186,135,71,1)',
                pointColor: 'rgba(186,135,71,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(186,135,71,1)',
                data: [80, 89, 63, 43, 91, 76, 90]
              }]
            },
            newRadarChartTools = new Chart(contextRadarTools).Radar(dataRadarTools);
      }

      /**
       * Google Maps Scripts
       * When the window has finished loading create our google map below
       */
      if (this.settings.googleMap.length > 0) {
        (function() {
          google.maps.event.addDomListener(window, 'load', init);
          function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
              // How zoomed in you want the map to start at (always required)
              zoom: 6,
              // The latitude and longitude to center the map (always required) - Prague - (50.078807, 14.4263349)
              center: new google.maps.LatLng(50.078807, 14.4263349),
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
            var image = 'images/icons/icon--map-marker-6511--gold.png';
            var myLatLng = new google.maps.LatLng/*(49.8584759, 12.926904)*/(50.078807, 14.4263349);
            var beachMarker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              icon: image
            });
          }
        })();
      };
    },
    init: function() {
      $(".no-js").removeClass("no-js");
      $(".no-js-img").removeClass("no-js-img");
      app.controllers();
    }
  };
  app.init();
})($);
