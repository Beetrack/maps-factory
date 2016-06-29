var parse_marker_options = function(obj) {
  var result = {
    lat: obj.lat,
    lng: obj.lng
  };
  if(!!obj.infoWindow){
    result.infoWindow = {
      content: obj.infoWindow
    };
  }
  if (!!obj.icon) {
    if (!!obj.icon.url) {
      result.icon = {
        url: obj.icon.url
      }
    }
    else if(!!obj.icon.path) {
      result.icon = obj.icon;
    }
    else {
      obj.icon.size = obj.icon.size || [50, 50];
      obj.icon.sprite_position = obj.icon.sprite_position || [0,0];
      obj.icon.anchor = obj.icon.anchor || [25, 25];
      result.icon = new google.maps.MarkerImage(
        obj.icon.image,
        new google.maps.Size( obj.icon.size[0], obj.icon.size[1]),
        new google.maps.Point( obj.icon.sprite_position[0], obj.icon.sprite_position[1]),
        new google.maps.Point( obj.icon.anchor[0], obj.icon.anchor[1])
      );
    }
  }

  if(!!obj.label)
    result.label = obj.label;

  if (!!obj.click) {
    result.clickable = obj.click.active;
    result.click = obj.click.callback;
  }
  if (!!obj.drag) {
    result.draggable = obj.drag.active;
    result.drag = obj.drag.callback;
  }
  return result
};
