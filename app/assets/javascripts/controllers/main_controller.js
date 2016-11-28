/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('MainController', ['$scope', 'AjaxService','$translate','localizationSrv', function ($scope, AjaxService, $translate, localizationSrv) {
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
      incomeGrowth: false,
      growth: false,
      income: false,
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
    // window.search = document.getElementById('home-pac-input').value;
    // // console.log('window.search= ', window.search);
    // // window.location.href = '/search';
    // $state.go('search');
  };
  $scope.stringifyData = function () {
    return JSON.stringify($scope.mapFilters);
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
