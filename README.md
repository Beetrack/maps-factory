# maps-factory
### Start with MapsFactory
```javascript
//init MapsFactory
var map = new MapsFactory({
  div: "#map_id",
  lat: 45.2,
  lng: 54.3,
  zoom: 13,
  mapType: "Leafletjs" //or GoogleMaps
  });

```
### addMarkers

```javascript
//return marker object
map.addMarker({
   lat: <latitude (required)>,
   lng: <longitude (required)>,
   infoWindow: <info window content>,
   label: <label text>,
   icon: {
           image: <url path>,
           size: [<width>, <height>],
           sprite_position: [<width>, <height>],
           anchor: [<width>, <height>],
           popup_anchor: [<width>, <height>]
   },
   click: {
             active: <clickable>,
             callback: <click function>
   },
   drag: {
           active: <draggable>,
           callback: <drag end function ( obj = { position: {lat: <float>, lng: <float> } } )>
   }
 });

```

### removeMarker
```javascript
//input same marker object of addMarker
map.removeMarker(marker);
```
### removeMarkers
```javascript
map.removeMarkers();
```
### hideInfoWindows
```javascript
map.hideInfoWindows();
```

### showInfoWindows
```javascript
map.showInfoWindows(marker);
```

### geocode
```javascript
map.geocode( {
   input: <html input>,
   callback: <geocode end function ( { result: {lat: <float>, lng: <float>, name: <string> } } , status: "OK" | "ERROR" )>
   search_input: <(optional) html input>
   drag : {
    active: true | false,
    callback: <drag end function { position: {lat: <float>, lng: <float> } } >
   },
   position: {
     lat: lat,
     lng: lng
   }
 }
);
```

### addCircle
```javascript
map.addCircle( {
 {
   lat: <latitude (required)>,
   lng: <longitude (required)>,
   radius: <circle radius (require)>,
   strokeColor: <stroke color>,
   strokeOpacity: <strike opacity>,
   strokeWeight: <stroke line weight>,
   fillColor: <fill color>,
   fillOpacity: <fill opacity>
 }
);
```
### fitBounds
```javascript
map.fitBounds( [40.712, -74.227], [40.774, -74.125]);
```

### fitBoundsWithMarkers
```javascript
map.fitBoundsWithMarkers( [<markers objects>]);
```


### drawPolyline

### removePolylines
