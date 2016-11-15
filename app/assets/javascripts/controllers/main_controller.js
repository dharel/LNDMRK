/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('MainController', ['$scope', 'AjaxService', 'carouselAssetsFetch', function ($scope, AjaxService, carouselAssetsFetch) {
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

  $scope.getFilteredBg = function () {

    if ((!$scope.mapFilters.income && !$scope.mapFilters.growth && !$scope.mapFilters.incomeGrowth)
      || $scope.mapFilters.income && $scope.mapFilters.growth && $scope.mapFilters.incomeGrowth) {
      return {"background-image": "url('map_filters/all-01.png')"};
    } else {
      if ($scope.mapFilters.income && $scope.mapFilters.growth) {
        return {"background-image": "url('map_filters/income&growth-01.png')"};
      } else if ($scope.mapFilters.income && $scope.mapFilters.incomeGrowth) {
        return {"background-image": "url('map_filters/income&income+and_growth-01.png')"};
      } else if ($scope.mapFilters.growth && $scope.mapFilters.incomeGrowth) {
        return {"background-image": ""};
      } else if ($scope.mapFilters.income) {
        return {"background-image": "url('map_filters/income_only-01.png')"};
      } else if ($scope.mapFilters.growth) {
        return {"background-image": "url('map_filters/growth_only-01.png')"};
      } else if ($scope.mapFilters.incomeGrowth) {
        return {"background-image": "url('map_filters/income_and_growth_only-01.png')"};
      }
    }
  };

}]);
