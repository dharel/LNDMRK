angular.module('lndmrk').service('googleMaps', [ function () {
  var markers = [];
  var init = function () {
    window.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 2.811371, lng: 1.757813},
      zoom: 2,
      mapTypeId: 'roadmap'
    });
    window.map.setOptions({ minZoom: 2, maxZoom: 17 });
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    window.map.addListener('bounds_changed', function() {
      searchBox.setBounds(window.map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var pinColor = "102447";
        var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(71, 71),
            new google.maps.Point(0,0),
            new google.maps.Point(17, 34));

        markers.push(new google.maps.Marker({
          map: window.map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
          map.setZoom(17);
        }
      });
      window.map.fitBounds(bounds);
    });
  };

  var resetAssetMarkers = function () {
    R.forEach(function (marker) { marker.setMap(null); })(markers);
  };

  var setAssetMarkersOnMap = function (assets) {
    resetAssetMarkers();
    R.forEach(function (asset) {
      if (asset.address !== '') {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: asset.address}, function (places) {
          var LatLon = new google.maps.LatLng(places[0].geometry.location.lat(), places[0].geometry.location.lng());
          var pinColor = "102447";
          var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(71, 71),
            new google.maps.Point(0,0),
            new google.maps.Point(17, 34));
          var marker = new google.maps.Marker({
            map: window.map,
            icon: icon,
            title: asset.name,
            position: LatLon
          });
          markers.push(marker);
        });
      }
    })(assets);

    
  };

  var centerMap = function () {
    window.map.setOptions(
      { center: {lat: 2.811371, lng: 1.757813}, zoom: 2, mapTypeId: 'roadmap' }
    );
  };

  var manualSearch = function (location) {
    resetAssetMarkers();
    geocoder = new google.maps.Geocoder();
    var _places = null;
    geocoder.geocode({address: location}, function (places) {
      _places = places;
      var LatLon = new google.maps.LatLng(places[0].geometry.location.lat(), places[0].geometry.location.lng());
      var pinColor = "102447";
      var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(71, 71),
        new google.maps.Point(0,0),
        new google.maps.Point(17, 34));
      var marker = new google.maps.Marker({
        map: window.map,
        icon: icon,
        title: location,
        position: LatLon
      });
      markers.push(marker);
      if (_places) {
        var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(_places[0].geometry.location.lat(), _places[0].geometry.location.lng()));
        map.fitBounds(bounds);
        map.setZoom(15);
      }
    });
  };
  
  return {
    init: init,
    markers: markers,
    setAssetMarkersOnMap: setAssetMarkersOnMap,
    resetAssetMarkers: resetAssetMarkers,
    centerMap: centerMap,
    manualSearch: manualSearch
  };
}]);