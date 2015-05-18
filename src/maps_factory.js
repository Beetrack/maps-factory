function MapsFactory ( options ) {
  switch(options.mapType){
    case "MapBox":
      this.mapClass = MapBox;
      break;
    case "GoogleMaps":
      this.mapClass = GoogleMaps;
      break;
      case "Leafletjs":
      this.mapClass = Leafletjs;
      break;
    default:
      this.mapClass = Leafletjs;
  }

  return new this.mapClass( options );
};


