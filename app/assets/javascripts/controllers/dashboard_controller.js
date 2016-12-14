angular.module('lndmrk').controller('DashboardController', ['$scope', 'AjaxService','$translate','localizationSrv','$mdSidenav','dataManagerService','$location', function ($scope, AjaxService, $translate, localizationSrv, $mdSidenav, dataManagerService, $location) {
  
  $scope.localizationSrv = localizationSrv;

  var buildToggler = function (componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    }
  }

  $scope.toggleMenu = buildToggler('left');

  $scope.init = function () {
    $scope.expanded = {
      isOpen: false,
      id: null
    };
    
    //watchlist data: first table is 'owned_data', second is 'watched_data'
    var onSucc_owned_assets = function (data) {
      $scope.owned_data = data;
      $scope.owned_data[0].class = 'income';
      $scope.owned_data[1].class = 'growth';
      $scope.owned_data[2].class = 'income-growth';
    };
    var onErr_owned_assets = function (err) {
      console.log('error fetching data: ', err);
    };

    var onSucc_watched_assets = function (data) {
      $scope.watched_data = data;
    };
    var onErr_watched_assets = function (err) {
      console.log('error fetching data: ', err);
    };

    $scope.getDashboardOwnedAssets = function() {
      AjaxService.sendMsg('GET', '/parsed_owned_assets', {}, onSucc_owned_assets, onErr_owned_assets);
    };
    $scope.getDashboardWatchedAssets = function() {
      AjaxService.sendMsg('GET', '/parsed_watched_assets', {}, onSucc_watched_assets, onErr_watched_assets);
    };

    $scope.removeFromWatchlist = function (asset_id) {
      AjaxService.sendMsg('POST', '/asset_remove_from_watchlist', {asset_id: asset_id}, onSucc_watched_assets, onErr_watched_assets);
    };

    $scope.getDashboardOwnedAssets();
    $scope.getDashboardWatchedAssets();
    // end of watchlist data

    var locale = localStorage.getItem('locale');
    $scope.toggleLocalization(locale || 'en');
  };

  $scope.analyzingToolData = [
    {
      id: 0,
      name: 'seth nichols',
      return: 6,
      risk: 'c',
      value: 5000,
    },
    {
      id: 1,
      name: 'robin elliott',
      return: 8,
      risk: 'd',
      value: 13000
    },
    {
      id: 2,
      name: 'guy gardner',
      return: 4.6,
      risk: 'b',
      value: 9000
    }
  ];

  $scope.toggleLocalization = function (val) {
    localizationSrv.locale = val;
    localStorage.setItem('locale', val);
    $translate.use(val);
  };

  $scope.sumProperty = function (type, collection) {
    return R.sum(R.pluck(type)(collection));
  };

  $scope.calcAvarage = function (type, collection) {
    return (R.sum(R.pluck(type)(collection)) / collection.length).toFixed(2);
  };

  $scope.sumAll = function (type) {
    if (!$scope.owned_data) return;
    var sum = 0;
    R.forEach(function (property) {
      sum += $scope.sumProperty(type, property.assets);
    })($scope.owned_data);

    return sum.toFixed(2);
  };

  $scope.toggleExpanded = function (property) {
    $scope.expanded.isOpen = !$scope.expanded.isOpen;
    $scope.expanded.id = $scope.expanded.id !== property.id ? property.id : null;
  };

  $scope.calc_bottom = function (index) {
    var should_be_from_top = false;
    if($scope.watched_data.length > 2){ should_be_from_top = index > $scope.watched_data.length - 3; }
    return should_be_from_top;
  };

  $scope.selectAsset = function (asset){
    dataManagerService.asset = asset;
    $location.path('/property');
  };
}]);