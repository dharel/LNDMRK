angular.module('lndmrk').service('loadGoogleMapAPI', ['$window', '$q', 
  function ( $window, $q ) {
    var deferred = $q.defer();
    function loadScript() {  
      var script = document.createElement('script');
      script.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyBqoHgS5h-v08X3-YRRQvPQ4lU21b5Dqkw&libraries=places&callback=initMap';
      document.body.appendChild(script);
    }
    $window.initMap = function () {
      deferred.resolve();
    }

    loadScript();
    return deferred.promise;
}]);