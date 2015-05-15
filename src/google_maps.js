function GoogleMaps( options ) {
  this.options = {};
  this.markers = [];
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