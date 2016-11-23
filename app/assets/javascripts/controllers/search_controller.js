/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('SearchController', ['$scope', 'AjaxService','$translate','localizationSrv', function ($scope, AjaxService, $translate, localizationSrv) {
  'use strict';
  $scope.init = function () {
    $scope.market_type_checkboxes = [
      {name: 'Prime', checked: false},
      {name: 'Fringe', checked: false},
      {name: 'Secondary', checked: false},
    ];

    $scope.property_type_checkboxes = [
      {name: 'Residential', checked: false},
      {name: 'Private', checked: false},
      {name: 'Retail', checked: false},
      {name: 'Facilities', checked: false},
      {name: 'Commericial', checked: false},
      {name: 'Industrial', checked: false},
      {name: 'Agriculture', checked: false},
    ];

  };

}]);