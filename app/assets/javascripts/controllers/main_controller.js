/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('MainController', function ($scope, AjaxService, carouselAssetsFetch) {
  'use strict';
  
  $scope.carouselAssetsFetch = carouselAssetsFetch;
  $scope.init = function() {
    $scope.carouselAssetsFetch.getAssets(function (data) {    
      $scope.assets = data;
      $scope.assetsIndex = 0;
      $scope.chosenAsset = $scope.assets[0];
    });
  };

});
