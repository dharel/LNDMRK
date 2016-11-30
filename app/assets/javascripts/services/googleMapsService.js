angular.module('lndmrk').service('googleMaps', [function () {
  
  var markers = [];

  var resetAssetMarkers = function () {
    R.forEach(marker => marker.setMap(null))(markers);
  }

  var setAssetMarkersOnMap = function (assets) {
    resetAssetMarkers();
    R.forEach(asset => {
      if (asset.gps !== null && asset.gps !== '') {
        var lat_lon_arr = asset.gps.split(',');
        var myLatlng = new google.maps.LatLng(parseInt(lat_lon_arr[0]),parseInt(lat_lon_arr[1]));
        var pinColor = "102447";
        var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(71, 71),
            new google.maps.Point(0,0),
            new google.maps.Point(17, 34));
        var marker = new google.maps.Marker({
          map: window.map,
          icon: icon,
          title: asset.name,
          position: myLatlng
        });
        markers.push(marker);
      }
    })(assets);
  }
  
  return {
    markers: markers,
    setAssetMarkersOnMap: setAssetMarkersOnMap,
    resetAssetMarkers: resetAssetMarkers
  }
}]);