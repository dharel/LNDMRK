angular.module('lndmrk').controller('SearchController', ['$scope','AjaxService','googleMaps','$timeout','$routeParams', function ($scope, AjaxService, googleMaps, $timeout, $routeParams) {

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
      if ($routeParams.filter) { applyFilters(JSON.parse($routeParams.filter)); }
      googleMaps.setAssetMarkersOnMap(data);
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
      {name: 'growth', checked: true},
      {name: 'max_dividends_growth', checked: true},
    ];

    $scope.property_type_checkboxes = [
      {name: 'Residential', checked: true},
      {name: 'Private', checked: true},
      {name: 'Retail', checked: true},
      {name: 'Facilities', checked: true},
      {name: 'Commericial', checked: true},
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
    if (investment_type_checked.length > 0) {
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

  $scope.filterResults = function () {
    $scope.assets_results = _.intersection(
      searchAssetsByAddress(), 
      filterByInvestmentType(), 
      filterByMarketType(), 
      filterByPropertyType()
    );
    googleMaps.setAssetMarkersOnMap($scope.assets_results);
  };

  $scope.clearSearch = function () {
    R.forEach(value => value.checked = false)($scope.property_type_checkboxes);
    R.forEach(value => value.checked = false)($scope.market_type_checkboxes);
    R.forEach(value => value.checked = false)($scope.investment_type_buttons);
    $scope.searchForm.address = '';
    $scope.assets_results = $scope.original_data;
    googleMaps.setAssetMarkersOnMap($scope.assets_results);
    googleMaps.centerMap();
  };

  $scope.selectProperty = function (property) {
  };
}]);