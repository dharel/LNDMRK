/*global angular, _, asset_path, window, document, $ */
angular.module('lndmrk').directive('addressAutocomplete', [ 'dataManagerService', function (dataManagerService) {
  'use strict';
  return {
    restrict: 'E',
    scope: {
    },
    template: "address_autocomplete",
    link: function (scope) {
      scope.dataManagerService = dataManagerService;

      // scope.deleteZipErrorMessage = function () {
      //   scope.dataManagerService.zip_code_error = false;
      //   scope.dataManagerService.address_error = false;
      //   window.place = null;
      // };

      // scope.removeExistAddress = function () {
      //   scope.dataManagerService.removePrevioursAddressDetails();
      //   document.getElementById('autocomplete').value = "";
      // };
    }
  };
}]);