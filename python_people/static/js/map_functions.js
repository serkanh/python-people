/*
cadu - oct 2011

// Sample custom marker code created with Google Map Custom Marker Maker
// http://www.powerhut.co.uk/googlemaps/custom_markers.php

*/
function init_mapa(map, points, pygs){
  var image_f = new google.maps.MarkerImage(static_path + 'img/python_logo_f.png', new google.maps.Size(21, 20), new google.maps.Point(0, 0), new google.maps.Point(11, 20));
  var image_m = new google.maps.MarkerImage(static_path + 'img/python_logo_m.png', new google.maps.Size(21, 20), new google.maps.Point(0, 0), new google.maps.Point(11, 20));
  var image_other = new google.maps.MarkerImage(static_path + 'img/python_logo_other.png', new google.maps.Size(21, 20), new google.maps.Point(0, 0), new google.maps.Point(11, 20));
  var shadow = new google.maps.MarkerImage(static_path + 'img/python_logo_shadow.png', new google.maps.Size(35, 20), new google.maps.Point(0, 0), new google.maps.Point(11, 20));
  var shape = {
    coord: [20, 0, 20, 1, 20, 2, 20, 3, 20, 4, 20, 5, 20, 6, 20, 7, 20, 8, 20, 9, 20, 10, 20, 11, 20, 12, 20, 13, 20, 14, 20, 15, 19, 16, 17, 17, 15, 18, 12, 19, 8, 19, 5, 18, 3, 17, 1, 16, 0, 15, 0, 14, 0, 13, 0, 12, 0, 11, 0, 10, 0, 9, 0, 8, 0, 7, 0, 6, 0, 5, 0, 4, 0, 3, 0, 2, 0, 1, 0, 0, 20, 0],
    type: 'poly'
  };
  var markers = new Array();
  var image_pyg = new google.maps.MarkerImage(static_path + 'img/python_logo_user_grupy.png', new google.maps.Size(34, 22), new google.maps.Point(0, 0), new google.maps.Point(17, 22));
  var shadow_pyg = new google.maps.MarkerImage(static_path + 'img/python_logo_user_grupy_shadow.png', new google.maps.Size(48, 22), new google.maps.Point(0, 0), new google.maps.Point(17, 22));
  var shape_pyg = {
    coord: [21, 0, 22, 1, 33, 2, 33, 3, 33, 4, 33, 5, 33, 6, 33, 7, 33, 8, 33, 9, 33, 10, 33, 11, 33, 12, 33, 13, 33, 14, 33, 15, 33, 16, 33, 17, 33, 18, 33, 19, 22, 20, 21, 21, 12, 21, 10, 20, 0, 19, 0, 18, 0, 17, 0, 16, 0, 15, 0, 14, 0, 13, 0, 12, 0, 11, 0, 10, 0, 9, 0, 8, 0, 7, 0, 6, 0, 5, 0, 4, 0, 3, 0, 2, 11, 1, 12, 0, 21, 0],
    type: 'poly'
  };
  

  //include Python User Markers
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var myLatLng = new google.maps.LatLng(point.x, point.y);
    switch (point.gender) {
      case 1:
        var image = image_m;
        break;
      case 2:
        var image = image_f;
        break;
      case 3:
        var image = image_other;
        break;
      default:
        var image = image_other;
        break;
    }
    
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      shadow: shadow,
      shape: shape,
      html: point.name + "</br> <a href=/people/profile/" + point.user_id + ">user profile</a>"
    });
    
    google.maps.event.addListener(marker, 'click', function(){
      var infoWindow = new google.maps.InfoWindow;
      infoWindow.setContent(this.html);
      infoWindow.open(map, this);
      google.maps.event.addListener(map, 'click', function(){
        infoWindow.close();
      });
    });
  };
  
  //include Python Groups Markers
  for (var j = 0; j < pygs.length; j++) {
    var pyg = pygs[j];
    var myLatLng = new google.maps.LatLng(pyg.x, pyg.y);
    var image = image_pyg;
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image_pyg,
      shadow: shadow_pyg,
      shape: shape_pyg,
      html: pyg.name + "</br> <a href=/people/python_group/detail/" + pyg.pyg_id + ">Python Group Profile</a>"
    });
    
    google.maps.event.addListener(marker, 'click', function(){
      var infoWindow = new google.maps.InfoWindow;
      infoWindow.setContent(this.html);
      infoWindow.open(map, this);
      google.maps.event.addListener(map, 'click', function(){
        infoWindow.close();
        
      });
    });
    
  }//--End init function---
}
  function codeAddress(map){
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(10);
      }  else{
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  function wktToGoogleLanLng(value){
    strLatLong = value;
    lat_lon = strLatLong.replace("POINT (","").replace(")","");
    latLng = new google.maps.LatLng( parseFloat(lat_lon.split(" ")[0]), parseFloat(lat_lon.split(" ")[1]) );
  return (latLng);}
    
  function setZoomToLatLng(map, latLng, zoomLevel){
    if ( zoomLevel === undefined ){
      zoomLevel = 12;
    }
    map.setCenter(latLng); //google latLng object
    map.setZoom(zoomLevel);
    x=map.getBounds();
   
  }
    
function getMapBBox(map){
  mapBounds = map.getBounds();
  sw = mapBounds.getSouthWest(); //ex.:Q { Na=-33.49176179479448, Oa=-107.3701171875, toString=function(), more...}
  ne = mapBounds.getNorthEast(); //ex.:  Q { Na=-5.250487390446263, Oa=11.3701171875, toString=function(), more...}
  
  return [sw, ne];
}

function setUserLocation(){
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      setZoomToLatLng(map, initialLocation, 8);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  // Try Google Gears Geolocation
  } else if (google.gears) {
    browserSupportFlag = true;
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
      setZoomToLatLng(map, initialLocation, 8);
    }, function() {
      handleNoGeoLocation(browserSupportFlag);
    });
  // Browser doesn't support Geolocation
  } else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
  
  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      initialLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      initialLocation = siberia;
    }
    map.setCenter(initialLocation);
  }

}