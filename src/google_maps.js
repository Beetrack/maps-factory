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
  console.log(getElementById(this.options.div));
  this.map = new google.maps.Map(getElementById(this.options.div), this.mapOptions);

}
