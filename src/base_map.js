function BaseMap(){
}
BaseMap.prototype.distanceBetween = function(waypoint1, waypoint2) {
  var rm = 6371*1000; //radius in meters
  var rad_per_deg = Math.PI/180;
  var lat1 = waypoint1[0]*rad_per_deg;
  var lng1 = waypoint1[1]*rad_per_deg;
  var lat2 = waypoint2[0]*rad_per_deg;
  var lng2 = waypoint2[1]*rad_per_deg;
  var dlat = lat2 - lat1;
  var dlng = lng2 - lng1;
  var a = Math.pow((dlat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow((dlng/2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  return rm * c; //Delta in meters
};

BaseMap.prototype.lineDistance = function(waypoints) {
  var distance = 0;
  for(var i = 0; i< waypoints.length - 1; i++){
    distance = distance +  this.distanceBetween(waypoints[i], waypoints[i + 1]);
  }
  return distance;
};

// Add a marker to the map.
// Options:
// {
//   lat: <latitude (required)>,
//   lng: <longitude (required)>,
//   infoWindow: <info window content>,
//   label: <label text>,
//   icon: {
//           image: <url path>,
//           size: [<width>, <height>],
//           sprite_position: [<width>, <height>],
//           anchor: [<width>, <height>],
//           popupanchor: [<width>, <height>]
//   },
//   click: {
//             active: <clickable>,
//             callback: <click function>
//   },
//   drag: {
//           active: <draggable>,
//           callback: <drag end function ( obj = { position: {lat: <float>, lng: <float> } } )>
//   }
// }
BaseMap.prototype.addMarker = function(options) {
  throw 'Method undefined';
};

// Remove a marker from the map.
// Marker: Map marker object
BaseMap.prototype.removeMarker = function(marker) {
  throw 'Method undefined';
};

// Remove all markers from the map.
BaseMap.prototype.removeMarkers = function() {
  throw 'Method undefined';
};

// Close all info windows
BaseMap.prototype.hideInfoWindows = function() {
  throw 'Method undefined';
};

// Close all info windows and open only the info window
// of the given marker
BaseMap.prototype.showInfoWindows = function(marker) {
  throw 'Method undefined';
};

// Add a circle to the map
// Options:
// {
//   lat: <latitude (required)>,
//   lng: <longitude (required)>,
//   radius: <circle radius (require)>,
//   strokeColor: <stroke color>,
//   strokeOpacity: <strike opacity>,
//   strokeWeight: <stroke line weight>,
//   fillColor: <fill color>,
//   fillOpacity: <fill opacity>
// }
BaseMap.prototype.addCircle= function(options) {
  throw 'Method undefined';
};

// Add a drawPolyline to the map
// Options:
//   {
//     path: <bounds (required)>,
//     strokeColor: <stroke color>,
//     strokeOpacity: <stroke opacity>,
//     strokeWeight:  <stroke weight>,
//     fillColor: <fill color>,
//     fillOpacity: <fill opacity>
//   }

BaseMap.prototype.drawPolyline= function(options) {
  throw 'Method undefined';
};

// Center map based on the markers given
BaseMap.prototype.fitBoundsWithMarkers = function(markers) {
  throw 'Method undefined';
};
