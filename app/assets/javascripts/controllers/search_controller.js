/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('SearchController', ['$scope', 'AjaxService','$translate','localizationSrv', function ($scope, AjaxService, $translate, localizationSrv) {
  'use strict';
  $scope.init = function () {
    $scope.market_type_checkbox_prime = {
      checked: false
    };

    $scope.market_type_checkbox_fringe = {
      checked: false
    };

    $scope.market_type_checkbox_secondary = {
      checked: false
    };

  };

}]);