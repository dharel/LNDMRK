angular.module('lndmrk').service('loadGoogleMapAPI', ['$window', '$q', 
  function ( $window, $q ) {
    var deferred = $q.defer();
    function loadScript() {  
    }
    $window.initMap = function () {
      deferred.resolve();
    }

    loadScript();
    return deferred.promise;
}]);