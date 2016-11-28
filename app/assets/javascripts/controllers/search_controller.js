/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('SearchController', ['$scope', 'AjaxService', '$translate', 'localizationSrv','$routeParams', '$timeout', function ($scope, AjaxService, $translate, localizationSrv, $routeParams, $timeout) {
  'use strict';
  var self = {};
   self.markers = [];
  var getCarousellData = function () {
    var onSucc = function (data) {
      $scope.assets_results = data;
      self.original_data = data;
      $scope.assetsIndex = 0;
      $scope.chosenAsset = $scope.assets_results[0];
      $scope.sortResult($scope.sort_option);
      var retrievedObject = localStorage.getItem('address');
      if (retrievedObject !== null) {
        window.exist_address =  JSON.parse(retrievedObject).address;
        document.getElementById('pac-input').value = window.exist_address;
        $scope.filterResults();
        return;
      };
      self.setMarkersOnMap();

    };
    var onErr = function (err) {
      console.log('error fetching data: ', err);
    };
    AjaxService.sendMsg('GET', '/carousel_assets', {}, onSucc, onErr);
  };

  self.setMarkersOnMap = function () {
    // Clear out the old markers.
    _.forEach($scope.markers, function(marker) {
      marker.setMap(null);
    });
    $scope.markers = [];
    _.forEach($scope.assets_results, function(value) {
      if (value.gps !== null && value.gps !== '') {
        var lat_lon_arr = value.gps.split(',');
        var myLatlng = new google.maps.LatLng(parseInt(lat_lon_arr[0]),parseInt(lat_lon_arr[1]));

        $scope.markers.push(new google.maps.Marker({
          map: window.map,
          // icon: icon,
          title: value.name,
          position: myLatlng
        }));
      }
    });
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
      return;
    }
    $scope.assets_results = _.orderBy($scope.assets_results, sort_option.toLowerCase(), ['desc']);
  };

  $scope.searchAddress = function () {
    var input = document.getElementById('pac-input');
    console.log('address= ', input.value);
  };

  self.searchAssetsByAddress = function () {
    var address = document.getElementById('pac-input').value.toLowerCase();
    var results = [];
    _.forEach(self.original_data, function(asset) {
      if (asset.address.toLowerCase().includes(address)) {
        results.push(asset);
      }
    });

    return results;
  };

  self.filterByPropertyType = function () {
    var property_type_checked = _.map(_.filter($scope.property_type_checkboxes, function (type) {
      return type.checked === true;
    }), 'name');
    if (property_type_checked.length > 0) {
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
      return results;
    }
    return self.original_data;
  };

  self.filterByMarketType = function () {
    var market_type_checked = _.map(_.filter($scope.market_type_checkboxes, function (type) {
      return type.checked === true;
    }), 'name');
    if (market_type_checked.length > 0) {
      var results = [];
      _.forEach(self.original_data, function (value, key) {
        if (_.includes(market_type_checked, value.market_type)) {
          results.push(value);
        }
      });
      return results;
    }
    return self.original_data;
  };


  self.filterByInvestmentType = function () {
    var investment_type_checked = _.map(_.filter($scope.investment_type_buttons, function (type) {
      return type.checked === true;
    }), 'name');
    if (investment_type_checked.length > 0) {
      var results = [];
      _.forEach(self.original_data, function (value, key) {
        if (_.includes(investment_type_checked, value.investment_type)) {
          results.push(value);
        }
      });
      return results;
    }
    return self.original_data;
  };

  $scope.filterResults = function () {
    $scope.assets_results = _.intersection(self.searchAssetsByAddress(), self.filterByInvestmentType(), self.filterByMarketType(), self.filterByPropertyType());
    $scope.sortResult($scope.sort_option);
    // window.fillInAddress();
    $timeout(function () {
      google.maps.event.trigger(window.searchBox, 'places_changed');
    },1000);
    self.setMarkersOnMap();
    if (window.exist_address !== '') {
      localStorage.removeItem('address');
      window.exist_address = '';
    }
   
  };

  window.clickOnMe = function () {
    $scope.assets_results = _.intersection(self.searchAssetsByAddress(), self.filterByInvestmentType(), self.filterByMarketType(), self.filterByPropertyType());
    $scope.sortResult($scope.sort_option);
    // window.fillInAddress();
    $timeout(function () {
      google.maps.event.trigger(window.searchBox, 'places_changed');
    },1000);
    self.setMarkersOnMap();
    if (window.exist_address !== '') {
      localStorage.removeItem('address');
      window.exist_address = '';
    }
  }



  $scope.init = function () {
    $scope.markers = [];
    // console.log(JSON.parse($routeParams.data));
    // console.log('window.test= ', window.location);

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

    $scope.sort_options_list = ["Rating", "Yield"];

    $scope.sort_option = $scope.sort_options_list[0];
    $scope.show_sort_dropdown_show = false;

    $scope.add_to_my_list = {
      checked: false
    };

  };

   self.ConvertDMSToDD = function(degrees, minutes, seconds, direction) {
    var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);
    if (direction == "S" || direction == "W") { dd = dd * -1; }
    return dd;
  }
  self.ParseDMS = function(input) {
      // var parts = input.split(/[^\d\w]+/);
      var parts = input.split(/[^\d\w^.]+/) // regex for dms
      var lat = self.ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
      var lng = self.ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
      console.log('[lat, lng]= ', [lat, lng]);
      return [lat, lng];
  }

  $scope.showSortDropDown = function () {
    $scope.show_sort_dropdown = !$scope.show_sort_dropdown;
  };

}]);