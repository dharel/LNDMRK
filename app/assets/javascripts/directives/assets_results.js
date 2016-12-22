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
      "<div class='box-wrap' ng-mouseenter='hoverAsset(asset.id)' ng-mouseleave='unhoverAsset(asset.id)' ng-click='selectAsset(asset)'>" +

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
             "{{isInMyChecklist()}}</div>" +
      "</div>" +
    "</div>" +
    "<div class='separate-properties'></div>",
    link: function (scope, element, attrs) {
      scope.hovered_asset = '';

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