function MapsFactory ( options ) {
  switch(options.mapType){
    case "MapBox":
      this.mapClass = MapBox;
      break;
    case "GoogleMaps":
      this.mapClass = GoogleMaps;
      break;
      case "Lefletjs":
      this.mapClass = Lefletjs;
      break;
    default:
      this.mapClass = Lefletjs;
  }

  return new this.mapClass( options );
};

MapsFactory.prototype.distanceBetween = function(waypoint1, waypoint2) {
  var rm = 6371*1000; //radius in meters
  var rad_per_deg = Math.PI/180;
  var lat1 = waypoint1[0]*rad_per_deg;
  var lng1 = waypoint1[1]*rad_per_deg;
  var lat2 = waypoint2[0]*rad_per_deg;
  var lng2 = waypoint2[1]*rad_per_deg;
  var dlat = lat2 - lat1;
  var dlng = lng2 - lng1;
  var a = (dlat/2)*2 + Math.cos(lat1) * Math.cos(lat2) * (dlng/2)*2;
  var c = 2 * Math.asin(Math.sqrt(a));
  return rm * c //Delta in meters
};

MapsFactory.prototype.lineDistance = function(waypoints) {
  var distance = 0;
  for(var i = 0; i< waypoints.length - 1; i++){
    distance+= this.distanceBetween(waypoint[i], waypoint[i + 1];
  }
  return distance;
};

