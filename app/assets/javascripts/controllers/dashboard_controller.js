angular.module('lndmrk').controller('DashboardController', ['$scope', 'AjaxService','$translate','localizationSrv', function ($scope, AjaxService, $translate, localizationSrv) {
  
  $scope.localizationSrv = localizationSrv;
  $scope.init = function () {
    $scope.expanded = {
      isOpen: false,
      id: null
    };

    $scope.onSucc_all_assets = function (data) {
      // debugger;
      $scope.data = data;

      $scope.owned_data = data.owned_assets;
      $scope.watched_data = data.watched_assets;
      // $scope.data[0].class = 'income';
      // $scope.data[1].class = 'income-growth';
      // $scope.data[2].class = 'growth';
    };
    $scope.onErr_all_assets = function (err) {
      console.log('error fetching data: ', err);
    };

    $scope.onSucc_owned_assets = function (data) {
      $scope.owned_data = data;

      $scope.owned_data[0].class = 'income';
      $scope.owned_data[1].class = 'income-growth';
      $scope.owned_data[2].class = 'growth';
    };
    $scope.onErr_owned_assets = function (err) {
      console.log('error fetching data: ', err);
    };

    $scope.onSucc_watched_assets = function (data) {
      $scope.getDashboardOwnedAssets();
      // $scope.watched_data = data;
    };
    $scope.onErr_watched_assets = function (err) {
      console.log('error fetching data: ', err);
    };

    $scope.getDashboardAssets = function() {
      AjaxService.sendMsg('GET', '/parsed_assets', {}, $scope.onSucc_all_assets, $scope.onErr_all_assets);
    };
    // $scope.getDashboardOwnedAssets = function() {
    //   AjaxService.sendMsg('GET', '/parsed_owned_assets', {}, onSucc_owned_assets, onErr_owned_assets);
    // };
    // $scope.getDashboardWatchedAssets = function() {
    //   AjaxService.sendMsg('GET', '/parsed_watched_assets', {}, $scope.onSucc_watched_assets, $scope.onErr_watched_assets);
    // };
    $scope.getDashboardAssets();

    $scope.removeFromWatchlist = function (asset_id) {
      AjaxService.sendMsg('POST', '/asset_remove_from_watchlist', {asset_id: asset_id}, $scope.onSucc_watched_assets, $scope.onErr_watched_assets);
    };

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
    if (!$scope.data) return;
    var sum = 0;
    R.forEach(function (property) {
      sum += $scope.sumProperty(type, property.assets);
    })($scope.data);

    return sum.toFixed(2);
  };

  $scope.toggleExpanded = function (property) {
    $scope.expanded.isOpen = !$scope.expanded.isOpen;
    $scope.expanded.id = $scope.expanded.id !== property.id ? property.id : null;
  };  
}]);