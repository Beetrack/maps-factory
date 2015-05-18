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
  return rm * c //Delta in meters
};

BaseMap.prototype.lineDistance = function(waypoints) {
  var distance = 0;
  for(var i = 0; i< waypoints.length - 1; i++){
    distance = distance +  this.distanceBetween(waypoints[i], waypoints[i + 1]);
  }
  return distance;
};


