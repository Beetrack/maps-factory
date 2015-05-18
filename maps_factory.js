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
  this.options.div = options.div || "#map";
  //init
  if (!(typeof window.google === 'object' && window.google.maps)) {
    throw 'Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.'
  }
  this.options.zoom = options.zoom || 8;
  this.options.lat = options.lat || 0;
  this.options.lng = options.lng || 0;

  this.mapOptions = {
    zoom: this.options.zoom,
    center: new google.maps.LatLng(this.options.lat, this.options.lng)
  };
  console.log(getElementById(this.options.div));
  this.map = new google.maps.Map(getElementById(this.options.div), this.mapOptions);

}

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
