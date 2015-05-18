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
