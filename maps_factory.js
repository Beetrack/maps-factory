var getElementById = function(id, context) {
  var element,
  id = id.replace('#', '');

  if ('jQuery' in window && context) {
    element = $('#' + id, context)[0];
  } else {
    element = document.getElementById(id);
  };

  return element;
};

function MapBox( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";
 
}
function GoogleMaps( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";

  //init
  if (!(typeof window.google === 'object' && window.google.maps)) {
    throw 'Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.'
  }
  this.options.zoom = options.zoom || 8;
  this.options.lat = options.lat || -34.397;
  this.options.lng = options.lng || 150.644;

  this.mapOptions = {
    zoom: this.options.zoom,
    center: new google.maps.LatLng(this.options.lat, this.options.lng)
  };

  this.map = new google.maps.Map(getElementById(this.options.div), this.mapOptions);
}

GoogleMaps.prototype.createMarker = function(options) {
  if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
    throw 'No latitude or longitude defined.';
  }
  var position = options.position;
  if ( !position ) {
    position = new google.maps.LatLng(options.lat, options.lng);
  }

  var marker = new google.maps.Marker({
      position: position,
      draggable: options.draggable,
      title: options.title
  });
  return marker;
};

GoogleMaps.prototype.addMarker = function(options) {
  var marker;
  if(options.hasOwnProperty('gm_accessors_')) {
    // Native google.maps.Marker object
    marker = options;
  }
  else {
    marker = this.createMarker(options);
  }
  marker.setMap(this.map);

  if(this.markerClusterer) {
    this.markerClusterer.addMarker(marker);
  }

  this.markers.push(marker);
  return marker;
};
function MapsFactory ( options ) {
  switch(options.mapType){
    case "MapBox":
      this.mapClass = MapBox;
      break;
    case "GoogleMaps":
      this.mapClass = GoogleMaps;
      break;
    default:
      this.mapClass = MapBox;
  }

  return new this.mapClass( options );
};
