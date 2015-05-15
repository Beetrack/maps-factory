function MapBox( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";
 
}
function GoogleMaps( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";
 
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