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

    $scope.mapFilters = {
      incomeGrowth: false,
      growth: false,
      income: false
    };

  };

  $scope.toggleFilter = function (filter) {
    $scope.mapFilters[filter] = !$scope.mapFilters[filter];
    
  };

});
