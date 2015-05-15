function MapsFactory ( options ) {
  switch(options.mapType){
    case "MapBox":
      this.mapClass = MapBox;
      break;
    case "GoogleMaps":
      this.mapClass = GoogleMaps;
      break;
    default:
      this.mapClass = MapBox;
  }

  return new this.mapClass( options );
};
