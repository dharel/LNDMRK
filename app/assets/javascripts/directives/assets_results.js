angular.module('lndmrk').directive('assetsResults', ['$timeout', 'AjaxService','dataManagerService','$location', 'localizationSrv','$translate', '$rootScope',
  function ($timeout, AjaxService, dataManagerService, $location, localizationSrv, $translate, $rootScope) {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      asset: '=',
      pagination: '@',
      addtowatchlist: '&',
      removefromwatchlist: '&',
      openPopup: '&'
    },
    template:

    "<div class='results-asset-block'>" +
  

      "<div class='asset-name'>{{asset.name}}</div>" +
      // "<div class='asset-box-shadow' ng-show='isAssetHovered(asset.id)'></div>" +
      "<div class='box-wrap' ng-mouseenter='hoverAsset(asset.id)' ng-mouseleave='unhoverAsset(asset.id)' ng-click='selectAsset(asset)'>" +

        // "<div class='light-blue-shadow'></div>" +
        "<div class='row'>" +
          "<div class='right-col'>" +
            "<div class='risk-letter' ng-class='assignRiskClass(asset.rating[0].toLowerCase())'>{{asset.rating}}</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title'>Price per m&sup2;</div>" +
            "<div class='info-data'>${{asset.price}}K</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title'>Income per m&sup2;</div>" +
            "<div class='info-data'>${{asset.income}}</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title'>Yield</div>" +
            "<div class='info-data'>{{asset.yield}}%</div>" +
          "</div>" +
          "<div class='image-placer'>" +
            "<img src='{{asset.image}}' class='img-in-carousel' alt='asset'>" +
            "<div class='investment-type'" +
              "ng-class='assignTypeClass(asset.investment_type)' translate>" +
              "{{asset.investment_type}}</div>" +
            "<div class='property-datails'" +
                 "ng-class='{\"is-hovered\" : isAssetHovered(asset.id)," +
                 "\"income\" : assignTypeClass(asset.investment_type)=== \"income\", " +
                 "\"growth\" : assignTypeClass(asset.investment_type)=== \"growth\", " +
                 "\"income-growth\" : assignTypeClass(asset.investment_type)=== \"income-growth\"}'" +
                 " translate>property_details</div>" +
          "</div>" +
        "</div>" +
        "<div class='image-border'></div>" +
      "</div>" +
      "<div class='bottom-row' id='popup_anchor'   positionreport>" +
        "<div class='property-button buy' ng-click='openRelevantPopup(asset, \"buy\")'" +
             "ng-class='{\"hebrew\": isHebrew()}' translate>popup_buy</div>" +
        
        "<div class='property-button sell' ng-click='openRelevantPopup(asset, \"sell\")'" +
             "ng-class='{\"hebrew\": isHebrew()}' ng-if='asset.user_owned' translate>popup_sell</div>" +
        
        "<div class='property-button wtch' ng-click='changeMyWatchlist($event, asset.id)'" +
             "ng-if='!asset.user_owned' ng-class='{\"hebrew\": isHebrew(), \"watched\":asset.user_watched}' translate>"+
             // "<span class='checkmark' ng-if='asset.user_watched'></span>" +
             "{{isInMyChecklist()}}</div>" +
      
              // supposed to be here, prob to see all
              // "<div ng-if='popup_current_action && asset=== chosen_asset'" +
              //        "class='buy-popup' ng-class='{\"hebrew\": isHebrew()}'>" +
              //     "<form name='buy-popup' ng-submit='submitChosenAsset(popup_type, asset.id, asset.value)'>" +
              //       "<div class='first-row'>" +
              //         "<label><span translate>popup_meters</span>" +
              //           "<div class='input-wrap'>" +
              //             "<div class='spinners'>" +
              //               "<div ng-click='addMeters()' class='up'></div>" +
              //               "<div ng-click='subMeters()' class='down'></div>" +
              //             "</div>" +
              //             "<input required type='number'" +
              //                    "class='buy-input'" +
              //                    "ng-model='asset.value'" +
              //                    "min='0' max='{{asset.total - asset.value}}' integer/>" +
              //           "</div>" +
              //         "</label>" +
              //         "<div class='price-per-m' ng-class='{\"hebrew\": isHebrew()}'>" +
              //           "<h2 translate>popup_price_per_meter</h2>" +
              //           "<div class='price-box'>{{asset.price | currency}}</div>" +
              //         "</div>" +
              //         "<div class='equal-sign'>=</div>" +
              //         "<div class='total-amount'>" +
              //           "<h2 translate>popup_total</h2>" +
              //           "<div class='box'>${{asset_calced_price()}}</div>" +
              //         "</div>" +
              //       "</div>" +
              //       "<button type='submit' class='submit' ng-class='{\"hebrew\": isHebrew()}' translate>{{submit_text}}</button>" +
              //     "</form>" +
              //   "</div>" +
      "</div>" +
      // "<div class='add-to-my-list-checkbox-container'>" +
      //   "<div class='my-list-checkbox' ng-click='changeMyWatchlist($event, asset.id)'>" +
      //     "<span ng-show='asset.user_watched'><i id='add-to-my-list-checkbox' class='fa fa-check'></i></span>" +
      //   "</div>" +
      //   "<span class='my-list-checkbox-text' ng-click='changeMyWatchlist($event, asset.id)' >ADD TO MY LIST</span>" +
      // "</div>" +
    "</div>" +
    "<div class='separate-properties'></div>",
    link: function (scope, element, attrs) {
      scope.hovered_asset = '';
      // scope.popup_type = null;

      scope.isHebrew = function () {
        return localizationSrv.locale === "he";
      };

      scope.isInMyChecklist = function () {
        var txt = "";
        if(!scope.asset.user_watched) {
          txt = "add_to_watchlist";
        } else if(scope.asset.user_watched) {
          txt = "in_my_watchlist";
        }
        return txt;
      };

      scope.openRelevantPopup = function (asset, popup_type) {
        scope.openPopup({
          asset: scope.asset,
          popup_type: popup_type,
        });
      };

      // scope.$root.$on('over-box',function(ev,data){
      //   // alert(data.left);
      //   offset_top: event.screenY,
      //   offset_left: data.left
      // });
      // ================================================
      // buy / sell popup
      // scope.isHebrew = function () {
      //   return localizationSrv.locale === "he";
      // };

      // scope.openRelevantPopup = function (asset, popup_type, event) {
      //   if(scope.popup_current_action) {return;}

      //   if(popup_type === 'buy') {
      //     scope.popup_current_action = 'buy';
      //     scope.submit_text = "popup_buy";
      //   } else if(popup_type === 'sell') {
      //     scope.popup_current_action = 'sell';
      //     scope.submit_text = "popup_sell";
      //   }
      //   scope.chosen_asset = asset;

      //   scope.popupTopPos = 300;
      //   scope.popupLeftPos = 400;

      // scope.closePopup = function () {
      //   scope.popup_current_action = null;
      //   scope.chosen_asset = null;
      // };

      // scope.submitChosenAsset = function (currenty_action, asset_id, value) {
      //   if(scope.popup_current_action === 'buy') {
      //     scope.buyChosenAsset(asset_id, value);
      //   } else if(scope.popup_current_action === 'sell') {
      //     scope.sellChosenAsset(asset_id, value);
      //   }
      // };

      // var onSucc_buy_asset = function (id, status) {
      //   var asset = R.find(R.propEq('id', id))(scope.assets_results);
      //   asset.user_owned = status;
      //   function a (e) { }
      //   return a;
      // };
      // var onErr_buy_asset = function (err) {
      //   console.log('error fetching data: ', err);
      // };
      // var onSucc_sell_asset = function (id, status) {
      //   var asset = R.find(R.propEq('id', id))(scope.assets_results);
      //   asset.user_owned = status;
      //   function a (e) { }
      //   return a;
      // };
      // var onErr_sell_asset = function (err) {
      //   console.log('error fetching data: ', err);
      // };

      // scope.buyChosenAsset = function (asset_id, value) {
      //   if(value === 0) {return;}
      //   AjaxService.sendMsg('POST', '/asset_buy', {id: asset_id, value: value}, onSucc_buy_asset(asset_id, true), onErr_change_watchlist);
      //   scope.popup_current_action = null;
      //   scope.chosen_asset = null;
      // };

      // scope.sellChosenAsset = function (asset_id, value) {
      //   AjaxService.sendMsg('POST', '/asset_sell', {id: asset_id, value: value}, onSucc_sell_asset(asset_id, false), onErr_sell_asset);
      //   scope.popup_current_action = null;
      //   scope.chosen_asset = null;
      // };

      // scope.addMeters = function () {
      //   if(scope.chosen_asset.value === scope.chosen_asset.total) {return;}
      //   scope.chosen_asset.value += 1;
      // };

      // scope.subMeters = function () {
      //   if(scope.chosen_asset.value === scope.chosen_asset.orig_val) {return;}
      //   scope.chosen_asset.value -= 1;
      // };

      // scope.asset_calced_price = function () {
      //   return Math.round(scope.chosen_asset.price * scope.chosen_asset.value * 100) / 100 ;
      // };

      // ================================================

      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        element.on('click', function (e) {
          e.preventDefault();
        });
      }

      scope.selectAsset = function (asset) {
        dataManagerService.asset = asset;
        $location.path('/property');
      };

      scope.hoverAsset = function (asset_id) {
        scope.hovered_asset = asset_id;
      };

      scope.unhoverAsset = function (asset_id) {
        scope.hovered_asset = '';
      };

      scope.isAssetHovered = function (asset_id) {
        return asset_id === scope.hovered_asset;
      };

      scope.assignRiskClass = function (risk_letter) {
        switch (risk_letter[0]) {
          case 'A':
            return 'risk-a';
          case 'B':
            return 'risk-b';
          case 'C':
            return 'risk-c';
          case 'D':
            return 'risk-d';
          default:
            return 'risk-a';
        }
      };

      scope.assignTypeClass = function(investment_type) {
        switch (investment_type) {
          case 'max_dividends':
            return 'income';
          case 'max_appreciation':
            return 'growth';
          case 'max_dividends_appreciation':
            return 'income-growth';
          default:
            return 'max_dividends';
        }
      };
      
      scope.changeMyWatchlist = function (event, asset_id) {

        event.preventDefault();
        if(scope.asset.user_watched) {
          scope.removefromwatchlist({'asset_id': asset_id});
        } else {
          scope.addtowatchlist({'asset_id': asset_id});
        }
      };
    }
  };
}]);