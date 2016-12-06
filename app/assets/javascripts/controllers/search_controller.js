angular.module('lndmrk').controller('SearchController', ['$scope','AjaxService','googleMaps','$timeout','$routeParams','$route','$rootScope' ,function ($scope, AjaxService, googleMaps, $timeout, $routeParams, $route, $rootScope) {
  
  $scope.googleMaps = googleMaps;

  var applyFilters = function (filters) {
    $scope.searchForm.address = filters.address;
    $scope.investment_type_buttons[0].checked = filters.max_dividends;
    $scope.investment_type_buttons[1].checked = filters.growth;
    $scope.investment_type_buttons[2].checked = filters.max_dividends_growth;
    if (filters.address !== '') {
      googleMaps.manualSearch(filters.address);
    }
    $scope.filterResults();
  };

  var getCarousellData = function () {
    var onSucc = function (data) {
      $scope.assets_results = data;
      $scope.original_data = data;
      $scope.assetsIndex = 0;
      $scope.chosenAsset = $scope.assets_results[0];
      $scope.sortResult($scope.sort_option);
      googleMaps.init($scope.assets_results);
      if (localStorage.getItem('search')) { 
        applyFilters(JSON.parse(localStorage.getItem('search')));
        localStorage.removeItem('search');
        return;
      } else {
         $scope.filterResults();
      }
    };
    var onErr = function (err) {
      console.log('error fetching data: ', err);
    };
    AjaxService.sendMsg('GET', '/carousel_assets', {}, onSucc, onErr);
  }

  $scope.init = function () {
    $scope.market_type_checkboxes = [
      {name: 'Prime', checked: true},
      {name: 'Fringe', checked: true},
      {name: 'Secondary', checked: true},
    ];

    $scope.investment_type_buttons = [
      {name: 'max_dividends', checked: true},
      {name: 'max_appreciation', checked: true},
      {name: 'max_dividends_appreciation', checked: true},
    ];

    $scope.property_type_checkboxes = [
      {name: 'Residential', checked: true},
      {name: 'Private', checked: true},
      {name: 'Retail', checked: true},
      {name: 'Facilities', checked: true},
      {name: 'Commercial', checked: true},
      {name: 'Industrial', checked: true},
      {name: 'Agriculture', checked: true},
    ];  
    $scope.sort_options_list = ["Rating", "Yield"];
    $scope.sort_option = $scope.sort_options_list[0];

    var elem = document.getElementById('sort');
    angular.element(elem).on('scroll', function () {
      $timeout(function () {
        if ($scope.show_sort_dropdown_show) {
          $scope.show_sort_dropdown_show = false;
        }
      });
    });
    $scope.searchForm = { address: '' };
    getCarousellData();
  };

  $scope.sortResult = function (sort_option) {
    $scope.show_sort_dropdown_show = false;
    $scope.sort_option = sort_option;
    if (sort_option === 'Rating') {
      var sort = {
          'A+' : 1,
          'A' : 2,
          'A-' : 3,
          'B+' : 4,
          'B' : 5,
          'B-' : 6,
          'C+' : 7,
          'C' : 8,
          'C-' : 9,
        };
      $scope.assets_results = _.sortBy($scope.assets_results, function (asset) {
        return sort[asset.rating];
      });
    }
    $scope.assets_results = _.orderBy($scope.assets_results, sort_option.toLowerCase(), ['desc']);
  };

  var searchAssetsByAddress = function () {
    var results = [];
    R.forEach(function(asset) {
      if (asset.address.toLowerCase().includes($scope.searchForm.address.toLowerCase())) {
        results.push(asset);
      }
    })($scope.original_data);
    return results;
  };

  var filterByInvestmentType = function () {
    var investment_type_checked = _.map(_.filter($scope.investment_type_buttons, function (type) {
      return type.checked === true;
    }), 'name');
    if (investment_type_checked.length >= 0 && investment_type_checked.length < 3) {
      var results = [];
      _.forEach($scope.original_data, function (value) {
        if (_.includes(investment_type_checked, value.investment_type)) {
          results.push(value);
        }
      });
      return results;
    }
    return $scope.original_data;
  };

  var filterByMarketType = function () {
    var market_type_checked = _.map(_.filter($scope.market_type_checkboxes, function (type) {
      return type.checked === true;
    }), 'name');
    if (market_type_checked.length > 0) {
      var results = [];
      _.forEach($scope.original_data, function (value, key) {
        if (_.includes(market_type_checked, value.market_type)) {
          results.push(value);
        }
      });
      return results;
    }
    return $scope.original_data;
  };

  var filterByPropertyType = function () {
    var property_type_checked = _.map(_.filter($scope.property_type_checkboxes, function (type) {
      return type.checked === true;
    }), 'name');
    if (property_type_checked.length > 0) {
      var results = [];
      _.forEach($scope.original_data, function (value, key) {
        if (value.property_type !== null) {
          var splitted_property_name = value.property_type.split(',');
          var include = _.intersection(property_type_checked, splitted_property_name);
          if (include.length > 0) {
            results.push(value);
          }
        }
      });
      return results;
    }
    return $scope.original_data;
  };

  var searchAssetsInBounds = function (markers) {
    var results = [];
    R.forEach(function(marker) {
      var asset = R.find(R.propEq('name', marker.title))($scope.original_data);
      results.push(asset);
    })(markers);
    return results;
  };

  $scope.filterResults = function () {
    $scope.assets_results = _.intersection(
      $scope.assetsInFOV,      
      filterByInvestmentType(), 
      filterByMarketType(), 
      filterByPropertyType()
    );
    googleMaps.setAssetMarkersOnMap($scope.assets_results);
  };

  $scope.clearSearch = function () {
    R.forEach(function (value) {value.checked = true;})($scope.property_type_checkboxes);
    R.forEach(function (value) {value.checked = true;})($scope.market_type_checkboxes);
    R.forEach(function (value) {value.checked = true;})($scope.investment_type_buttons);
    $scope.searchForm.address = '';
    $scope.assets_results = $scope.original_data;
    googleMaps.setAssetMarkersOnMap($scope.assets_results);
    googleMaps.centerMap();
  };

  $scope.selectProperty = function (property) {
  };

  var onSucc_change_watchlist = function (id, status) {
    var asset = R.find(R.propEq('id', id))($scope.assets_results);
    asset.user_watched = status;
    function a () {}
    return a;
  };
  var onErr_change_watchlist = function (err) {
    console.log('error fetching data: ', err);
  };

  $scope.addToWatchlist = function (asset_id) {
    AjaxService.sendMsg('POST', '/asset_add_to_watchlist', {asset_id: asset_id}, onSucc_change_watchlist(asset_id, true), onErr_change_watchlist);
  };

  $scope.removeFromWatchlist = function (asset_id) {
    AjaxService.sendMsg('POST', '/asset_remove_from_watchlist', {asset_id: asset_id}, onSucc_change_watchlist(asset_id, false), onErr_change_watchlist);
  };

  $rootScope.$on('bounds_changed', function (event , markersInFOV) {
    if (!$scope.original_data) return;
      $scope.assetsInFOV = searchAssetsInBounds(markersInFOV);
      $scope.filterResults();
      $scope.$apply();
  });
}]);