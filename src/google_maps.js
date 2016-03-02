function GoogleMaps( options ) {
  this.options = {};
  this.markers = [];
  this.polylines = [];
  this.circles = [];
  // some defaults
  this.options.div = options.div || "#maps";

  //init
  if (!(typeof window.google === 'object' && window.google.maps)) {
    throw 'Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.'
  }
  this.options.zoom = options.zoom || 8;
  this.options.lat = options.lat || 0;
  this.options.lng = options.lng || 0;
  this.options.styles = options.styles || false;

  this.mapOptions = {
    zoom: this.options.zoom,
    center: new google.maps.LatLng(this.options.lat, this.options.lng),
    styles: this.options.styles
  };

  this.map = new google.maps.Map(getElementById(this.options.div), this.mapOptions);
}
//static methods of basemap
GoogleMaps.prototype = new BaseMap();

GoogleMaps.prototype.createMarker = function(options) {
  if (options.lat == undefined && options.lng == undefined) {
    throw 'No latitude or longitude defined.';
  }
  options = parse_marker_options(options);
  var self = this,
      base_options = {
        position: new google.maps.LatLng(options.lat, options.lng),
        map: null
      },
      marker_options = extend_object(base_options, options);

  delete marker_options.lat;
  delete marker_options.lng;

  var marker = new google.maps.Marker(marker_options);

  if (options.infoWindow) {
    marker.infoWindow = new google.maps.InfoWindow(options.infoWindow);
  }

  google.maps.event.addListener(marker, 'click', function() {
    if (options.click) {
      options.click.apply(this, [this]);
    }

    if (marker.infoWindow) {
      self.hideInfoWindows();
      marker.infoWindow.open(self.map, marker);
    }
  });

  google.maps.event.addListener(marker, 'dragend', function() {
    if (options.drag) {
      options.drag.apply(this, [{position: {lat: this.position.lat(), lng: this.position.lng()} }]);
    }
  });
  return marker;
};

GoogleMaps.prototype.hideInfoWindows = function() {
  for (var i = 0, marker; marker = this.markers[i]; i++){
    if (marker.infoWindow) {
      marker.infoWindow.close();
    }
  }
};

GoogleMaps.prototype.showInfoWindows = function(marker, contentString) {
  var _this = this;
  if (!!marker) {
    if(!!contentString){
      if(!marker.infoWindow)
        marker.infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

      _this.hideInfoWindows();
      marker.infoWindow.open(_this.map, marker);
    }else{
      _this.hideInfoWindows();
      marker.infoWindow.open(_this.map, marker);
    }
  }
};

GoogleMaps.prototype.addMarker = function(options) {
  var marker = this.createMarker(options);
  marker.setMap(this.map);
  this.markers.push(marker);
  return marker;
};

GoogleMaps.prototype.removeMarker = function(marker) {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i] === marker) {
      this.markers[i].setMap(null);
      this.markers.splice(i, 1);
      break;
    }
  }
  return marker;
};

GoogleMaps.prototype.removeMarkers = function(){
  var markers = this.markers.slice(0);
  for (var i = 0; i < markers.length; i++) {
    this.removeMarker(markers[i]);
  }
}

GoogleMaps.prototype.drawPolyline = function(options) {
  var path = [],
  points = options.path;

  if (points.length) {
    if (points[0][0] === undefined) {
      path = points;
    }
    else {
      for (var i = 0, latlng; latlng = points[i]; i++) {
        path.push(new google.maps.LatLng(latlng[0], latlng[1]));
      }
    }
  }

  var polyline_options = {
    map: this.map,
    path: path,
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight,
    geodesic: options.geodesic,
    clickable: true,
    editable: false,
    visible: true
  };

  if (options.hasOwnProperty("clickable")) {
    polyline_options.clickable = options.clickable;
  }

  if (options.hasOwnProperty("editable")) {
    polyline_options.editable = options.editable;
  }

  if (options.hasOwnProperty("icons")) {
    polyline_options.icons = options.icons;
  }

  if (options.hasOwnProperty("zIndex")) {
    polyline_options.zIndex = options.zIndex;
  }

  var polyline = new google.maps.Polyline(polyline_options);

  this.polylines.push(polyline);

  return polyline;
};

GoogleMaps.prototype.removePolyline = function(polyline) {
  for (var i = 0; i < this.polylines.length; i++) {
    if (this.polylines[i] === polyline) {
      this.polylines.splice(i, 1);
      polyline.setMap(null);
      break;
    }
  }
  return polyline;
};

GoogleMaps.prototype.removePolylines = function(){
  var polylines_d = this.polylines.slice(0);
  for (var i = 0; i < polylines_d.length; i++) {
    this.removePolyline(polylines_d[i]);
  }
};

GoogleMaps.prototype.geocode = function(options) {
  var self = this;
  if (!options.callback || !options.input) {
    return;
  }
  var callback = options.callback;
  var autocomplete = new google.maps.places.Autocomplete(options.input, {types: ['geocode']});
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      callback(null, 'ERROR');
      return;
    }
    self.removeMarkers();
    self.addMarker({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      drag: options.drag
    });
    self.fitBounds();
    callback({result: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), name: place.formatted_address} }, 'OK');
  });

  if (!!options.position) {
    self.addMarker({
      lat: options.position.lat,
      lng: options.position.lng,
      drag: options.drag
    });
    self.fitBounds();
  }

  options.input.addEventListener("keydown", function(e) {
    if(e.keyCode == 13) { // enter key was pressed
      e.preventDefault();
      return false;
    }
  });
};

GoogleMaps.prototype.addCircle = function(options) {
  if (options.lat == undefined && options.lng == undefined && options.radius == undefined) {
    throw 'No latitude, longitude or radius defined.';
  }
  var base_options = {
    center: new google.maps.LatLng(options.lat, options.lng),
    map: null
  };
  var circle_options = extend_object(base_options, options);
  delete circle_options.lat;
  delete circle_options.lng;
  var circle = new google.maps.Circle(circle_options);
  circle.setMap(this.map);
  
  this.circles.push(circle);

  return circle;
};

GoogleMaps.prototype.removeCircles = function(){
  var circles = this.circles.slice(0);
  for (var i = 0; i < circles.length; i++) {
    circles[i].setMap(null);
  }
}

GoogleMaps.prototype.setCenter = function(lat, lng, callback) {
  this.map.panTo(new google.maps.LatLng(lat, lng));

  if (callback) {
    callback();
  }
};

GoogleMaps.prototype.fitBounds = function(array) {
  var bounds = new google.maps.LatLngBounds();
  if(!!array){
    for (var index in array) {
      var waypoint = new google.maps.LatLng(array[index][0],array[index][1]);
      bounds.extend(waypoint);
    }
  }
  else{
    for (var index in this.markers) {
      bounds.extend(this.markers[index].getPosition());
    }

  }
  if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
    var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
    var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
    bounds.extend(extendPoint1);
    bounds.extend(extendPoint2);
  }

  this.map.fitBounds(bounds);
};

GoogleMaps.prototype.fitBoundsWithMarkers = function(markers) {
  var bounds = [];
  if (!markers || markers.length == 0) {
    return;
  }
  for (var i = markers.length - 1; i >= 0; i--) {
    bounds.push( [markers[i].getPosition().lat(), markers[i].getPosition().lng()] );
  }
  this.fitBounds(bounds);
};