function Leafletjs( options ) {
  this.options = {};
  this.markers = [];
  this.polylines = [];
  this.circles = [];
  // some defaults
  this.options.div = options.div || "map";
  this.options.div = this.options.div.replace('#', '');
  this.options.zoom = options.zoom || 8;
  this.options.lat = options.lat || 0;
  this.options.lng = options.lng || 0;

  this.map = L.map(this.options.div, { center: [this.options.lat, this.options.lng], zoom: this.options.zoom });
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.map);
}

//static methods of basemap
Leafletjs.prototype = new BaseMap();

Leafletjs.prototype.createMarker = function(options) {
  lat = parseFloat(options.lat);
  lng = parseFloat(options.lng);

  if (lat == undefined && lng == undefined) {
    throw 'No latitude or longitude defined.';
  }

  if (!!options.click) {
    options.clickable = options.click.active;
    options.click = options.click.callback;
  }
  if (!!options.drag) {
    options.draggable = options.drag.active;
    options.drag = options.drag.callback;
  }

  var marker;

  if (!!options.icon) {
    var background_image = "background-image: url(" +  options.icon.image +");";
    var background_position = "background-position: " + ( -1 * options.icon.sprite_position[0] ) + "px " + ( -1 * options.icon.sprite_position[1] ) + "px;";

    var icon = L.divIcon({
      className: 'none',
      iconSize: options.icon.size,
      iconAnchor: options.icon.anchor,
      popupAnchor: options.icon.popup_anchor,
      html: "<div style=\"" + background_image + background_position + "background-repeat: no-repeat;width: 100%;height: 100%;\"></div>"
    });

    marker = L.marker([lat, lng], {
      title: options.infoWindow,
      icon: icon,
      draggable: options.draggable,
      clickable: options.clickable
    });
  }
  else {
      marker = L.marker([lat, lng], {
        title: options.infoWindow,
        draggable: options.draggable,
        clickable: options.clickable
      });
    }

    marker.openPopup();
    if(!!options.infoWindow){
      marker.bindPopup(options.infoWindow)
    }

    if(!!options.click){
      marker.on('click',function (e) {
        options.click.apply(this);
      });
    }

    if(!!options.drag){
      marker.on('dragend',function (e) {
        options.drag.apply(this,[{position: {lat: this.getLatLng().lat, lng: this.getLatLng().lng}}]);
      });
    }

  return marker;
};

Leafletjs.prototype.hideInfoWindows = function() {
  for (var i = 0, marker; marker = this.markers[i]; i++){
    marker.closePopup();
  }
};

Leafletjs.prototype.showInfoWindows = function(marker) {
  if (!!marker) {
    this.hideInfoWindows();
    marker.openPopup();
  }
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

Leafletjs.prototype.removeMarkers = function(){
  var markers_d = this.markers.slice(0);
  for (var i = 0; i < markers_d.length; i++) {
    this.markers.splice(i, 1);
    this.map.removeLayer(markers_d[i]);
  }
}

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
  if(array.length > 0){
    this.map.fitBounds(array);
  }
  else{
    this.fitBoundsWithMarkers(this.markers);
  }
};

Leafletjs.prototype.fitBoundsWithMarkers = function(markers) {
  var bounds = [];
  for (var index in markers) {
    var latlng = markers[index].getLatLng();
    bounds.push([latlng.lat, latlng.lng]);
  }
  this.map.fitBounds(bounds);
};

