/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('MainController',
  ['$scope', '$location', 'AjaxService','$translate','localizationSrv','googleMaps',
  function ($scope, $location, AjaxService, $translate, localizationSrv, googleMaps) {
  'use strict';

  $scope.localizationSrv = localizationSrv;
  $scope.googleMaps = googleMaps;

  var getCarousellData = function () {
    var onSucc = function (data) {
      $scope.assets = data;
      $scope.assets_for_homeCarousel = $scope.assets.slice(0,7);
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
    $scope.mapFilters.address = document.getElementById('pac-input').value;
    localStorage.setItem('search',JSON.stringify($scope.mapFilters));
    $location.path('/search');
  };

  $scope.toggleLocalization = function (val) {
    localizationSrv.locale = val;
    localStorage.setItem('locale', val);
    $translate.use(val);
    if (val === 'he') {
      $scope.placeholder = 'חפש כתובת, עיר או מיקוד';
    } else {
      $scope.placeholder = 'Enter a location';      
    }
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

  $scope.searchPlaceholderText = function () {
    var txt;
    if(localizationSrv.locale === 'en') {
      txt = "Search address, city, state..";
    } else if(localizationSrv.locale === 'he') {
      txt = "חפש כתובת, עיר, או מדינה...";
    }
    return txt;
  };
}]);