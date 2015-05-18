function MapBox( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";

  L.mapbox.accessToken = options.token;
  this.map = L.mapbox.map('map', 'mapbox.streets').setView([options.lat, options.lng], options.zoom);
  this.myLayer = L.mapbox.featureLayer().addTo(this.map);
}

MapBox.prototype.createMarker = function(options) {
	
  if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
    throw 'latitude or longitude is not defined.';
  }

  L.marker
  marker = {
  	type: 'Feature',
  	geometry: {
  		type: 'Point',
  		coordinates: [ options.lat, options.lng ]
  	},
  	properties: {
  		title: 'numero agregado',
  		description: '1718 14th St NW, Washington, DC',
  		'marker-size': 'large',
  		'marker-color': '#BE9A6B',
  		'marker-symbol': 'cafe'
  	},
  }
  return marker;
};

MapBox.prototype.addMarker = function(options) {
  var marker = this.createMarker(options);
  this.myLayer.setGeoJSON(marker);
};
