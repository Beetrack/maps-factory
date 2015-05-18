function MapBox( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";

  L.mapbox.accessToken = options.token;
  this.map = L.mapbox.map('map', 'mapbox.streets').setView([options.lat, options.lng], options.zoom);
}
