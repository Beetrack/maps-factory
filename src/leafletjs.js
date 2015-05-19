function Leafletjs( options ) {
  this.options = {};
  this.markers = [];
  this.polylines = [];
  this.circles = [];
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
    iconAnchor:   options.icon.anchor,
    popupAnchor:  options.icon.popup_anchor
  });

  if (!!options.click) {
    options.clickable = options.click.active;
    options.click = options.click.callback;
  }
  if (!!options.drag) {
    options.draggable = options.drag.active;
    options.drag = options.drag.callback;
  }

  var marker = L.marker([options.lat, options.lng], {
  	title: options.infoWindow, 
  	icon: icon,
  	draggable: options.draggable,
  	clickable: options.clickable
  })
 
  .bindPopup(options.infoWindow)
  .openPopup();

  return marker;
};

Leafletjs.prototype.addMarker = function(options) {
	
  var marker = this.createMarker(options);
  this.map.addLayer(marker);
  this.markers.push(marker);
  return marker;
};

Leafletjs.prototype.removeMarker = function(marker) {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i] === marker) {
      this.markers.splice(i, 1);
      this.map.removeLayer(marker);
      break;
    }
  }
  return marker;
};

Leafletjs.prototype.addCircle = function(options) {
  if (options.lat == undefined && options.lng == undefined && options.radius == undefined) {
    throw 'No latitude, longitude or radius defined.';
  }

  var circle = L.circle([options.lat, options.lng], options.radius, {
    color: options.strokeColor,
    opacity: options.strokeOpacity,
    weight: options.strokeWeight,
    fillColor: options.fillColor,
    fillOpacity: options.fillOpacity
  }).addTo(this.map);
  
  this.circles.push(circle);

  return circle;
};

Leafletjs.prototype.drawPolyline = function(options) {
  var path = [],
  points = options.path;

  var polyline = L.polyline(points, 
  	{
  		color: options.strokeColor,
  		opacity: options.strokeOpacity,
      weight:  options.strokeWeight,
      fillColor: options.fillColor,
      fillOpacity: options.fillOpacity
  	});

	polyline.addTo(this.map);
  this.polylines.push(polyline);
  return polyline;
};

Leafletjs.prototype.fitBounds = function(array) {
  this.map.fitBounds(array);
};