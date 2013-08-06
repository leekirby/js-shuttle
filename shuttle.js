/*
 * To boldly go ...
 */

  function shuttle(){

    this.svg = true;
    this.fidelity = 'high';

    this.destinations = probe('destinations');
    this.environment = probe('environment');
    this.cargo = {};


    this.engage = function() {

      this.destinations.forEach(function(elementId, index, array) {

        var elementObject = document.getElementById(elementId);
        var elementIdRef = elementObject.getAttribute("data-shuttle-id");

        var nosvg = true;

        if(this.svg) {

          if(this.cargo.svg[elementIdRef] && this.cargo.svg[elementIdRef] != '') {
            elementObject.src = this.cargo.svg[elementIdRef];
            nosvg = false;
          }
        } 

        if(nosvg === true) {

          if(this.cargo[this.fidelity][elementIdRef]) {
            elementObject.src = this.cargo[this.fidelity][elementIdRef];
          }

        }

      });

    }


    this.reengage = function() {

      this.environment = probe('environment');
      this.engage();

    }



    this.payload = function(cargo) {

      /* Can be used to import cargo from external source or another function */
      this.cargo = cargo;

    }


    function probe(type) {

      switch(type) {

        case 'destinations':

          var elements = document.body.getElementsByTagName("*");
          var elementsCount = elements.length;

          var elementId = '';
          var elementShuttleId = '';

          var destinations = [];

          for (var i=0; i<elementsCount; i++) {

            if(elements[i].getAttribute("data-shuttle-id") != null){  

              elementShuttleId = elements[i].getAttribute("data-shuttle-id");
              elementShuttleId = "shuttle" + elementShuttleId.charAt(0).toUpperCase() + elementShuttleId.slice(1);

              elements[i].setAttribute("id", elementShuttleId);

              destinations.push(elementShuttleId);

            }

          }

          return destinations;
          break;

        case 'environment':

          var results = {};

          results.svg = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") ? true : false);
          results.svg = (document.documentElement.className === 'nosvg' ? false : results.svg);

          results.fidelity = (typeof(shuttleFidelityChecker) === 'function' ? shuttleFidelityChecker() : 'medium');

          this.svg = results.svg;
          this.fidelity = results.fidelity;

          return results;
          break;

        default:

          return false;

      }

    }

  }


  /* Optional Fidelity Checker */
  function shuttleFidelityChecker() {

    var fidelity = 'medium'; /* low, medium or high */

    /* Simple example of setting fidelity through viewport width */
    var viewportWidth = window.innerWidth;

    if(viewportWidth < 600) {
      fidelity = 'low';
    } else if(viewportWidth < 990) {
      fidelity = 'medium';
    } else {
      fidelity = 'high';
    }
    /* End of simple example */

    return fidelity;

  }


  /* The Cargo, split into SVG/low/medium/high images  */
  var cargo = {
    "svg": {
      "example": "image.svg"
    },
    "low": {
      "example": "imageLow.png"
    },
    "medium": {
      "example": "image.png"
    },
    "high": {
      "example": "imageHigh.png" 
    },
  };


  /* Make it so! */
  var Copernicus = new shuttle();

  window.onload = function() {
    Copernicus.payload(cargo);
    Copernicus.engage();
  }

  window.onresize = function(){
    Copernicus.reengage();
  };

