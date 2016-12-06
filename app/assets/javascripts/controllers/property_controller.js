angular.module('lndmrk').controller('PropertyController', ['$scope', 'AjaxService','$translate','localizationSrv','dataManagerService', function ($scope, AjaxService, $translate, localizationSrv, dataManagerService) {
$scope.asset = dataManagerService.asset;

}]);