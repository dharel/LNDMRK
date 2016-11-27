/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('SearchController', ['$scope', 'AjaxService', '$translate', 'localizationSrv', function ($scope, AjaxService, $translate, localizationSrv) {
  'use strict';
  var self = {};
  var getCarousellData = function () {
    var onSucc = function (data) {
      $scope.assets_results = data;
      self.original_data = data;
      $scope.assetsIndex = 0;
      $scope.chosenAsset = $scope.assets_results[0];
    };
    var onErr = function (err) {
      console.log('error fetching data: ', err);
    };
    AjaxService.sendMsg('GET', '/carousel_assets', {}, onSucc, onErr);
  };

  $scope.sortResult = function (sort_option) {
    $scope.show_sort_dropdown_show = false;
    $scope.sort_option = sort_option;
    $scope.assets_results = _.sortBy($scope.assets_results, [function (asset) { return asset.name; }]);
  };

  self.filterByPropertyType = function () {
    var property_type_checked = _.map(_.filter($scope.property_type_checkboxes, function (type) {
      return type.checked === true;
    }), 'name');

    var results = [];
    _.forEach(self.original_data, function (value, key) {
      if (value.property_type !== null) {
        var splitted_property_name = value.property_type.split(',');
        var include = _.intersection(property_type_checked, splitted_property_name);
        if (include.length > 0) {
          results.push(value);
        }
      }
    });

    if (results.length === 0) {
      return self.original_data;
    }
    return results;
  };

  self.filterByMarketType = function () {
    var market_type_checked = _.map(_.filter($scope.market_type_checkboxes, function (type) {
      return type.checked === true;
    }), 'name');

    var results = [];
    _.forEach(self.original_data, function (value, key) {
      if (_.includes(market_type_checked, value.market_type)) {
        results.push(value);
      }
    });

    if (results.length === 0) {
      return self.original_data;
    }
    return results;
  };


  self.filterByInvestmentType = function () {
    var investment_type_checked = _.map(_.filter($scope.investment_type_buttons, function (type) {
      return type.checked === true;
    }), 'name');
    var results = [];
    _.forEach(self.original_data, function (value, key) {
      if (_.includes(investment_type_checked, value.investment_type)) {
        results.push(value);
      }
    });

    if (results.length === 0) {
      return self.original_data;
    }
    return results;
  };

  $scope.filterResults = function () {
    $scope.assets_results = _.intersection(self.filterByInvestmentType(), self.filterByMarketType(), self.filterByPropertyType());
    $scope.sortResult($scope.sort_option);
  };



  $scope.init = function () {
    getCarousellData();
    $scope.market_type_checkboxes = [
      {name: 'Prime', checked: false},
      {name: 'Fringe', checked: false},
      {name: 'Secondary', checked: false},
    ];

    $scope.investment_type_buttons = [
      {name: 'income', checked: false},
      {name: 'growth', checked: false},
      {name: 'income & growth', checked: false},
    ];

    $scope.search_properties_income_button = false;
    $scope.search_properties_growth_button = false;
    $scope.search_properties_income_growth_button = false;

    $scope.property_type_checkboxes = [
      {name: 'Residential', checked: false},
      {name: 'Private', checked: false},
      {name: 'Retail', checked: false},
      {name: 'Facilities', checked: false},
      {name: 'Commericial', checked: false},
      {name: 'Industrial', checked: false},
      {name: 'Agriculture', checked: false},
    ];

    $scope.sort_options_list = ["Select sort", "Name", "Price", "Field3", "Field4", "Field5", "Field6", "Field7"];

    $scope.sort_option = $scope.sort_options_list[0];

    $scope.show_sort_dropdown_show = false;

    $scope.add_to_my_list = {
      checked: false
    };
  };

  $scope.showSortDropDown = function () {
    $scope.show_sort_dropdown = !$scope.show_sort_dropdown;
  };

}]);