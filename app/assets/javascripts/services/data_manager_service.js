/*globals angular, FormData */
angular.module('lndmrk').service('dataManagerService', ['$http','$rootScope', function ($http,$rootScope) {
  'use strict';
  var dataManagerService = {};

  // $scope.cur_assetbox_id = "asset"+ $rootScope.assetpopup;

  // $scope.$watch('cur_assetbox_id', function(new_val){
  //   debugger;
  //   dataManagerService.popupPosition = document.getElementById(cur_assetbox_id).getBoundingClientRect();

  // }, true);


  return dataManagerService;
}]);