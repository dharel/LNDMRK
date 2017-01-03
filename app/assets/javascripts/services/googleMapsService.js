angular.module('lndmrk').service('googleMaps', ['$location','$anchorScroll','$rootScope','$document','$compile','dataManagerService', function ($location, $anchorScroll, $rootScope, $document, $compile, dataManagerService) {
  var initialMarkers = [], markers = [], markersInFOV = [];

  var createMarker = function (asset, pinColor) {
    var lat = Number(asset.gps.split(',')[0]);
    var lng = Number(asset.gps.split(',')[1]);        
    var LatLon = new google.maps.LatLng(lat, lng);
    var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(71, 71), 
      new google.maps.Point(0,0),
      new google.maps.Point(17, 34));

    var content = 
      '<div class="info-window">'+
        '<div class="border ' + asset.investment_type + '"></div>'+
          '<div class="content">'+
            '<div class="title">'+ (localStorage.locale === 'en' ? asset.name : asset.name_heb) +'</div>'+
            '<div class="address">'+ asset.address +'</div>'+
            '<div class="button" id="btn" translate>property_details</div>'+
          '</div>'+
          '<div class="details">'+
            '<div class="yield">' +
              '<div class="title" translate>yield</div>' + 
              '<div class="data">' + asset.yield +'%</div>'+
            '</div>'+
            '<div class="divider"></div>'+
            '<div class="rating">' +
              '<div class="title" translate>Rating</div>' + 
              '<div class="data">'+ asset.rating +'</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';

    var infoWindow = new google.maps.InfoWindow({
      content: '',
      pixelOffset: new google.maps.Size(-25, 0),
      disableAutoPan: true
    });
    
    var marker = new google.maps.Marker({
      map: window.map,
      icon: icon,
      title: asset.name,
      position: LatLon
    });

    google.maps.event.addListener(marker, 'click', (function(marker, content, scope) {
      return function() {
          infoWindow.setContent(content);
          if (!infoWindow.isOpen) {
            infoWindow.open(window.map, this);
            infoWindow.isOpen = true;
          } else {
            infoWindow.close();
            infoWindow.isOpen = false;
          }
      };
    })(marker, $compile(content)($rootScope)[0]), $rootScope);

    google.maps.event.addListener(infoWindow,'domready',function(){
      $('#btn').click(function() {
        localStorage.saveAsset = JSON.stringify(asset);
        dataManagerService.asset = asset;
        $location.path('/property');
        $rootScope.$apply();
      });
    });
    markers.push(marker);
    return marker;
  }

  var initMarkers = function (assets) {
    R.forEach(function (asset) {
      if (asset.gps !== '') {
        createMarker(asset, "214a91")
      }
    })(assets);
  };

  var initMobile = function () {
    $(document).on({
        'DOMNodeInserted': function() {
          $('.pac-item').click(function (e) {
            document.getElementById('pac-input').value = _.words(e.target.parentElement.innerText).join(' ');
            $('.pac-container').hide();
            document.getElementById('pac-input').blur();
          });
        }
    }, '.pac-container');
  };

  var initSearchBox = function () {
    $document.ready(function () {
      var input = document.getElementById('pac-input'); 
      var searchBox = new google.maps.places.Autocomplete(input);
    })
  }

  var init = function (assets) {
    var input = document.getElementById('pac-input'); 
    var searchBox = new google.maps.places.SearchBox(input);

    var map = document.getElementById('map');
    if (window.map) {
      window.map = null;
    }

    if (map) {
      window.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 2.811371, lng: 1.757813},
        zoom: 2,
        mapTypeId: 'roadmap'
      });

      window.map.setOptions({ minZoom: 2, maxZoom: 17 });

      window.map.addListener('bounds_changed', function() {
        searchBox.setBounds(window.map.getBounds());
        markersInFOV = [];
        R.forEach(function (marker) {
          if (window.map.getBounds().contains(marker.getPosition())){
            markersInFOV.push(marker);
          }
        })(initialMarkers);
        $rootScope.$broadcast('bounds_changed', markersInFOV);
      });
      
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
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
            window.map.setZoom(17);
          }
        });
        window.map.fitBounds(bounds);
      });
    }


    if (!assets) return;
    initMarkers(assets);
    initialMarkers = markers;
  };

  var initStreetView = function (asset) {
    if (!asset.gps || asset.gps === '') return;
    var lat = Number(asset.gps.split(',')[0]);
    var lng = Number(asset.gps.split(',')[1]);
    var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street-map'), {
      position: {lat: lat, lng: lng},
      pov: {heading: 165, pitch: 0},
      motionTracking: false
    });
  };

  var initSimpleMap = function (asset) {
    if (!asset.gps || asset.gps === '') return;
    var lat = Number(asset.gps.split(',')[0]);
    var lng = Number(asset.gps.split(',')[1]);
    var simple = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 17,
      mapTypeId: 'roadmap'
    });
    createSimpleMapMarker(simple, asset, '102447');
  };

  var createSimpleMapMarker = function (map, asset, pinColor) {
    var lat = Number(asset.gps.split(',')[0]);
    var lng = Number(asset.gps.split(',')[1]);
    var LatLon = new google.maps.LatLng(lat, lng);
    var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(71, 71),
      new google.maps.Point(0,0),
      new google.maps.Point(17, 34));
    var marker = new google.maps.Marker({
      map: map,
      icon: icon,
      title: asset.name,
      position: LatLon
    });
  };

  var resetAssetMarkers = function () {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  };

  var setAssetMarkersOnMap = function (assets) {
    resetAssetMarkers();
    initMarkers(assets);
  };

  var centerMap = function () {
    window.map.setOptions(
      { center: { lat: 2.811371, lng: 1.757813 }, zoom: 2, mapTypeId: 'roadmap' }
    );
  };

  var manualSearch = function (location) {
    resetAssetMarkers();
    geocoder = new google.maps.Geocoder();
    var _places = null;
    geocoder.geocode({address: location}, function (places) {
      if (places) {
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
        var map = document.getElementById('map');
        if (_places && map) {
          var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(_places[0].geometry.location.lat(), _places[0].geometry.location.lng()));
          window.map.fitBounds(bounds);
          window.map.setZoom(15);
        }
      }
    });
  };

  var hoverOverAsset = function (asset) {
    setTimeout(function () {
      var index = R.findIndex(R.propEq('title', asset.name))(initialMarkers);
      initialMarkers[index] = createMarker(asset,"FE7569");
    });
  }

  var unhoverOverAsset = function (asset) {
    setTimeout(function () {
      var index = R.findIndex(R.propEq('title', asset.name))(initialMarkers);
      initialMarkers[index] = createMarker(asset,"214a91");
    });
  }
  
  return {
    init: init,
    initMobile: initMobile,
    markers: markers,
    setAssetMarkersOnMap: setAssetMarkersOnMap,
    resetAssetMarkers: resetAssetMarkers,
    centerMap: centerMap,
    manualSearch: manualSearch,
    hoverOverAsset: hoverOverAsset,
    unhoverOverAsset: unhoverOverAsset,
    initStreetView: initStreetView,
    initSimpleMap: initSimpleMap,
    initSearchBox: initSearchBox
  };
}]);