/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('MainController', ['$scope', 'AjaxService', function ($scope, AjaxService) {
  'use strict';
  
  $scope.init = function() {

    var onSucc = function (data) {
      $scope.assets = data;
      $scope.assetsIndex = 0;
      $scope.chosenAsset = $scope.assets[0];
    };

    var onErr = function (err) {
      console.log('error fetching data: ', err);
    }

    AjaxService.sendMsg('GET', '/carousel_assets', {}, onSucc, onErr);

    $scope.mapFilters = {
      incomeGrowth: false,
      growth: false,
      income: false
    };

    $scope.localization = 'en';
  };

  $scope.toggleLocalization = function (val) {

    var onSucc = function (data) {
      $scope.localization = val;
    }

    var onErr = function (error) {
      console.log('toggle localization error: ', error)
    }

    AjaxService.sendMsg('POST', '/toggleLocale', val, onSucc, onErr);
  }

  $scope.toggleFilter = function (filter) {
    $scope.mapFilters[filter] = !$scope.mapFilters[filter];
  };

  $scope.getFilteredBg = function () {

    if ((!$scope.mapFilters.income && !$scope.mapFilters.growth && !$scope.mapFilters.incomeGrowth)
      || $scope.mapFilters.income && $scope.mapFilters.growth && $scope.mapFilters.incomeGrowth) {
      return {"background-image": "url('images/all_dots-01.png')"};
    } else {
      if ($scope.mapFilters.income && $scope.mapFilters.growth) {
        return {"background-image": "url('images/income_and_growth.png')"};
      } else if ($scope.mapFilters.income && $scope.mapFilters.incomeGrowth) {
        return {"background-image": "url('images/income_and_income&growth.png')"};
      } else if ($scope.mapFilters.growth && $scope.mapFilters.incomeGrowth) {
        return {"background-image": "url('images/growth_and_income&growth.png')"};
      } else if ($scope.mapFilters.income) {
        return {"background-image": "url('images/income_only.png')"};
      } else if ($scope.mapFilters.growth) {
        return {"background-image": "url('images/growth_only.png')"};
      } else if ($scope.mapFilters.incomeGrowth) {
        return {"background-image": "url('images/income&growth_only.png')"};
      }
    }
  };

}]);
