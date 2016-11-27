/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('SearchController', ['$scope', 'AjaxService', '$translate', 'localizationSrv', function ($scope, AjaxService, $translate, localizationSrv) {
  'use strict';
  var self = {};
  var getCarousellData = function () {
    var onSucc = function (data) {
      $scope.assets_results = data;
      self.original_data = data;
      console.log('$scope.assets_results= ', $scope.assets_results);
      // $scope.assets_reaults = $scope.assets_reaults[0];
      // $scope.assets_reaults = [];
      // $scope.assets_reaults.push(data[0]);
      // $scope.assets_reaults.push(data[1]);
      // $scope.assets_reaults.push(data[2]);
      // $scope.assets_reaults.push(data[3]);
      // $scope.assets_reaults.push(data[4]);
      // $scope.assets_reaults.push(data[5]);
      // $scope.assets_reaults.push(data[6]);
      // $scope.assets_reaults.push(data[7]);
      $scope.assetsIndex = 0;
      $scope.chosenAsset = $scope.assets_results[0];
    };
    var onErr = function (err) {
      console.log('error fetching data: ', err);
    };
    AjaxService.sendMsg('GET', '/carousel_assets', {}, onSucc, onErr);
  };

  $scope.sortResult = function (sort_option) {
    // console.log('sort_option= ', sort_option);
    $scope.show_sort_dropdown_show = false;
    $scope.sort_option = sort_option;
    $scope.assets_results = _.sortBy($scope.assets_results, [function (asset) { return asset.name; }]);
  };



  $scope.init = function () {
    getCarousellData();
    $scope.market_type_checkboxes = [
      {name: 'Prime', checked: false},
      {name: 'Fringe', checked: false},
      {name: 'Secondary', checked: false},
    ];

    $scope.filterByInvestmentType = function (investment_type, state) {
      if (investment_type === 'income') {
        if (state) {
          self.income = _.filter(self.original_data, function (asset) { return asset.investment_type === 'income'; });
        } else {
          self.income = [];
        }
      }
      if (investment_type === 'growth') {
        if (state) {
          self.growth = _.filter(self.original_data, function (asset) { return asset.investment_type === 'growth'; });
        } else {
          self.growth = [];
        }
      }
      if (investment_type === 'income&growth') {
        if (state) {
          self.income_growth = _.filter(self.original_data, function (asset) { return asset.investment_type === 'income & growth'; });
        } else {
          self.income_growth = [];
        }
      }

      var results = _.union(self.income, self.growth, self.income_growth);
      if (results.length === 0) {
        $scope.assets_results = self.original_data;
      } else {
        $scope.assets_results = results;
      }
    };

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