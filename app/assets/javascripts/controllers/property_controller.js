angular.module('lndmrk').controller('PropertyController', ['$scope', 'AjaxService','$translate','localizationSrv','dataManagerService', function ($scope, AjaxService, $translate, localizationSrv, dataManagerService) {
 var getShortInvestmentType = function() {
    if(!$scope.asset){ return; }
    if($scope.asset.investment_type === 'max_dividends'){
      $scope.asset.investment_type_short = 'income';
    } else if($scope.asset.investment_type === 'max_appreciation'){
      $scope.asset.investment_type_short = 'growth';
    } else if($scope.asset.investment_type === 'max_dividends_appreciation'){
      $scope.asset.investment_type_short = 'income and growth';
    }
  };
  
  $scope.init = function() {
    $scope.asset = dataManagerService.asset;
    getShortInvestmentType();

    var locale = localStorage.getItem('locale');
    $scope.toggleLocalization(locale || 'en');
  };

  $scope.getInvTypeClr = function (type) {
    if(!$scope.asset){ return; }
    if($scope.asset.investment_type === 'max_dividends'){
      return 'type-yello';
    } else if($scope.asset.investment_type === 'max_appreciation'){
      return 'type-purple';
    } else if($scope.asset.investment_type === 'max_dividends_appreciation'){
      return 'type-cyan';
    }
  };

  $scope.getRatingColor = function () {
    if(!$scope.asset.rating){return;}
    switch ($scope.asset.rating)
    {
      case 'A':
      case 'A+':
      case 'A-':
        return  'rank-a';
      case 'B':
      case 'B+':
      case 'B-':
        return 'rank-b';
      case 'C':
      case 'C+':
      case 'C-':
        return 'rank-c';
      case 'D':
      case 'D+':
      case 'D-':
        return 'rank-d';
      case 'E':
      case 'E+':
      case 'E-':
        return 'rank-e';
      default:
        return 'rank-a';
    }
  };

  $scope.toggleLocalization = function (val) {
    localizationSrv.locale = val;
    localStorage.setItem('locale', val);
    $translate.use(val);
  };

  // $scope.getAssetBanner = function () {
  //   var assetName = '';
  //   var image = 1;
  //   return '/investment_assets/' + assetName +'_' + image;
  // };
    $scope.banner_img_num = 0;

    


  var buildToggler = function (componentId) {
    console.log('click')
    return function() {
      $mdSidenav(componentId).toggle();
    }
  }

  $scope.toggleMenu = buildToggler('left');
}]);