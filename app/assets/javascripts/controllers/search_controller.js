angular.module('lndmrk').controller('SearchController', ['$scope','AjaxService','googleMaps','$timeout','$location','$rootScope' , 'dataManagerService', '$translate', 'localizationSrv',
  function ($scope, AjaxService, googleMaps, $timeout, $location, $rootScope, dataManagerService, $translate, localizationSrv) {
  
  $scope.googleMaps = googleMaps;
  $scope.localizationSrv = localizationSrv;

  var applyFilters = function (filters) {
    $scope.searchForm.address = filters.address;
    if (!filters.max_dividends && !filters.growth && !filters.max_dividends_growth) {
      if (filters.address !== '') {
        googleMaps.manualSearch(filters.address);
      }
      $scope.filterResults();
      return;
    }
    
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
      $scope.sortResult('Rating');
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
      {name: 'Primary', checked: true},
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
      {name: 'Hotel', checked: true},
      {name: 'Office', checked: true}
      
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
    $scope.mobileVisiblePanel = 'map';
    $scope.modal = {
      open: false,
      asset: null,
      type: null
    }
  };

  $scope.sortResult = function (sort_option) {
    $scope.show_sort_dropdown_show = false;
    $scope.sort_option = sort_option;
    if (sort_option === 'Rating') {
      var sort = {
          'A+' : 9,
          'A' : 8,
          'A-' : 7,
          'B+' : 6,
          'B' : 5,
          'B-' : 4,
          'C+' : 3,
          'C' : 2,
          'C-' : 1,
          'D' : 0
        };
      $scope.assets_results = R.sort(function (a, b) {return sort[b.rating] - sort[a.rating]})($scope.assets_results);
    } else {
      $scope.assets_results = _.orderBy($scope.assets_results, sort_option.toLowerCase(), ['desc']);
    }
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
    if (investment_type_checked.length >= 0 && investment_type_checked.length < investment_type_checked.length + 1) {
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
    if (market_type_checked.length >= 0 && market_type_checked.length < market_type_checked.length + 1) {
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
    if (property_type_checked.length >= 0 && property_type_checked.length < property_type_checked.length + 1) {
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
    dataManagerService.asset = property;
    $location.path('/property');
  };

  var onSucc_change_watchlist = function (id, status) {
    var asset = R.find(R.propEq('id', id))($scope.assets_results);
    asset.user_watched = status;
    function a (e) { }
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

  $scope.toggleLocalization = function (val) {
    localizationSrv.locale = val;
    localStorage.setItem('locale', val);
    $translate.use(val);
  };

  // buy / sell popup
  $scope.isHebrew = function () {
    return localizationSrv.locale === "he";
  };

  $scope.openPopup = function (asset, popup_type) {
    if($scope.popup_current_action) {return;}

    if(popup_type === 'buy') {
      $scope.popup_current_action = 'buy';
      $scope.submit_text = "popup_buy";
    } else if(popup_type === 'sell') {
      $scope.popup_current_action = 'sell';
      $scope.submit_text = "popup_sell";
    }
    $scope.chosen_asset = asset;

  };

  $scope.$root.$on('over-box',function(ev,data){
    $scope.popupTopPos= data.top - 52;
    if(localizationSrv.locale === "he"){
      $scope.popupLeftPos= data.left + 212;
    } else {
      $scope.popupLeftPos= data.left - 372;
    }
  });

  $scope.closePopup = function () {
    $scope.popup_current_action = null;
    $scope.chosen_asset = null;
  };

  $scope.submitChosenAsset = function (currenty_action, asset_id, value) {
    if($scope.popup_current_action === 'buy') {
      $scope.buyChosenAsset(asset_id, value);
    } else if($scope.popup_current_action === 'sell') {
      $scope.sellChosenAsset(asset_id, value);
    }
  };

  var onSucc_buy_asset = function (id, status) {
    var asset = R.find(R.propEq('id', id))($scope.assets_results);
    asset.user_owned = status;
    $scope.modal.open = true;
    $scope.modal.type = 'buy';
    $scope.modal.asset = asset;
    function a (e) { }
    return a;
  };
  var onErr_buy_asset = function (err) {
    console.log('error fetching data: ', err);
  };
  var onSucc_sell_asset = function (id, status) {
    var asset = R.find(R.propEq('id', id))($scope.assets_results);
    asset.user_owned = status;
    $scope.modal.open = true;
    $scope.modal.type = 'sell';
    $scope.modal.asset = asset;
    function a (e) { }
    return a;
  };
  var onErr_sell_asset = function (err) {
    console.log('error fetching data: ', err);
  };

  $scope.closeModal = function () {
    $scope.modal.open = false;
    $scope.modal.type = null;
    $scope.modal.asset = null;
  };

  $scope.buyChosenAsset = function (asset_id, value) {
    if(value === 0) {return;}
    AjaxService.sendMsg('POST', '/asset_buy', {id: asset_id, value: value}, onSucc_buy_asset(asset_id, true), onErr_change_watchlist);
    $scope.popup_current_action = null;
    // $scope.chosen_asset = null;
  };

  $scope.sellChosenAsset = function (asset_id, value) {
    AjaxService.sendMsg('POST', '/asset_sell', {id: asset_id, value: value}, onSucc_sell_asset(asset_id, false), onErr_sell_asset);
    $scope.popup_current_action = null;
    // $scope.chosen_asset = null;
  };

  $scope.addMeters = function () {
    if($scope.chosen_asset.value === $scope.chosen_asset.total) {return;}
    $scope.chosen_asset.value += 1;
  };

  $scope.subMeters = function () {
    if($scope.chosen_asset.value === $scope.chosen_asset.orig_val) {return;}
    $scope.chosen_asset.value -= 1;
  };

  $scope.asset_calced_price = function () {
    return Math.round($scope.chosen_asset.price * $scope.chosen_asset.value * 100) / 100 ;
  };
}]);