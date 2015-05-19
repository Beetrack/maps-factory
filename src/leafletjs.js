function Leafletjs( options ) {
  this.options = {};
  // some defaults
  this.options.div = options.div || "#maps";

  this.map = L.map('map', { center: [options.lat, options.lng], zoom: options.zoom });
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
}

Leafletjs.prototype.createMarker = function(options) {
  if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
    throw 'No latitude or longitude defined.';
  }

  var icon = L.icon({
    iconUrl: options.icon.image,
    iconSize:     options.icon.size,
    iconAnchor:   options.icon.anchor
    //popupAnchor:  options.icon.popupanchor
  });

  var marker = L.marker([options.lat, options.lng], {
  	title: options.infoWindow, 
  	icon: icon,
  	draggable: options.drag.active,
  	clickable: options.click.active
  })
 
  .bindPopup(options.infoWindow)
  .openPopup();

  return marker;
};

Leafletjs.prototype.addMarker = function(options) {
	
  var marker = this.createMarker(options);

  console.log("marker");
  console.log(marker);
  marker.addTo(this.map);

  return marker;
};

Leafletjs.prototype.removeMarker = function(marker) {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i] === marker) {
      this.markers[i].setMap(null);
      this.markers.splice(i, 1);

      if(this.markerClusterer) {
        this.markerClusterer.removeMarker(marker);
      }
      break;
    }
  }
  return marker;
};
