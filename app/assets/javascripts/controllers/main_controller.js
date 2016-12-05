/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('MainController', ['$scope', '$location', 'AjaxService','$translate','localizationSrv', function ($scope, $location, AjaxService, $translate, localizationSrv) {
  'use strict';

  $scope.localizationSrv = localizationSrv;

  var getCarousellData = function () {
    var onSucc = function (data) {
      $scope.assets = data;
      $scope.assetsIndex = 0;
      $scope.chosenAsset = $scope.assets[0];
    };
    var onErr = function (err) {
      console.log('error fetching data: ', err);
    }
    AjaxService.sendMsg('GET', '/carousel_assets', {}, onSucc, onErr);
  }
  
  $scope.init = function() {
    $scope.address= '';
    getCarousellData();
    $scope.mapFilters = {
      max_dividends_growth: false,
      growth: false,
      max_dividends: false,
      address: ''
    };
    var locale = localStorage.getItem('locale') || navigator.language;
    if (locale === 'he') {
      $scope.toggleLocalization('he');
    } else {
      $scope.toggleLocalization('en');
    }
  };

  $scope.searchForAsset = function () {
    localStorage.setItem('search',JSON.stringify($scope.mapFilters));
    $location.path('/search');
  };

  $scope.toggleLocalization = function (val) {
    localizationSrv.locale = val;
    localStorage.setItem('locale', val);
    $translate.use(val);
  };

  $scope.toggleFilter = function (filter) {
    $scope.mapFilters[filter] = !$scope.mapFilters[filter];
  };

  $scope.getFilteredBg = function () {
    if ((!$scope.mapFilters.max_dividends && !$scope.mapFilters.growth && !$scope.mapFilters.max_dividends_growth)
      || $scope.mapFilters.max_dividends && $scope.mapFilters.growth && $scope.mapFilters.max_dividends_growth) {
      return {"background-image": "url('images/all_dots-01.png')"};
    } else {
      if ($scope.mapFilters.max_dividends && $scope.mapFilters.growth) {
        return {"background-image": "url('images/income_and_growth.png')"};
      } else if ($scope.mapFilters.max_dividends && $scope.mapFilters.max_dividends_growth) {
        return {"background-image": "url('images/income_and_income&growth.png')"};
      } else if ($scope.mapFilters.growth && $scope.mapFilters.max_dividends_growth) {
        return {"background-image": "url('images/growth_and_income&growth.png')"};
      } else if ($scope.mapFilters.max_dividends) {
        return {"background-image": "url('images/income_only.png')"};
      } else if ($scope.mapFilters.growth) {
        return {"background-image": "url('images/growth_only.png')"};
      } else if ($scope.mapFilters.max_dividends_growth) {
        return {"background-image": "url('images/income&growth_only.png')"};
      }
    }
  };
}]);