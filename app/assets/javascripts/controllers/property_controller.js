angular.module('lndmrk').controller('PropertyController', ['$scope', 'AjaxService','$translate','localizationSrv','dataManagerService','$mdSidenav', function ($scope, AjaxService, $translate, localizationSrv, dataManagerService, $mdSidenav) {
  $scope.asset = dataManagerService.asset;

  var buildToggler = function (componentId) {
    console.log('click')
    return function() {
      $mdSidenav(componentId).toggle();
    }
  }

  $scope.toggleMenu = buildToggler('left');

}]);