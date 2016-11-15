angular.module('lndmrk').factory('carouselAssetsFetch', ['$http', function($http){
  'use strict';

  function getData(callback){
    $http({method: 'GET',
      url: '/carousel_assets',
      cache:true}).success(callback);
  }

  return {
    getAssets: getData
  };

}]);
