function Leafletjs( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";

  var map = L.map('map', { center: [options.lat, options.lng], zoom: options.zoom });
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

