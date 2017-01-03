angular.module('lndmrk').directive('carouselAssets', ['$timeout', function ($timeout) {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      asset: '=',
      pagination: '@'
    },
    template:
    "<div class='asset-block'>" +
      "<h3>{{i18nTransalteName(asset)}}</h3>" +
      "<div class='asset-box-shadow' ng-show='isAssetHovered(asset.id)'></div>" +
      "<div class='box-wrap' ng-mouseenter='hoverAsset(asset.id)' ng-mouseleave='unhoverAsset(asset.id)'>" +
        "<div class='light-blue-shadow'></div>" +
        "<div class='row'>" +
          "<div class='right-col'>" +
            "<div class='risk-letter' ng-class='assignRiskClass(asset.rating)'>{{asset.rating}}</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title' translate>price_per_m</div>" +
            "<div class='info-data'>${{asset.price}}K</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title' translate>income_per_m</div>" +
            "<div class='info-data'>${{asset.income}}</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title' translate>yield</div>" +
            "<div class='info-data'>{{asset.yield}}%</div>" +
          "</div>" +
          "<div class='image-placer'>" +
            "<img src='{{asset.image}}' class='img-in-carousel' alt='asset'>" +
            "<div class='property-datails'" +
                 "ng-class='{\"is-hovered\" : isAssetHovered(asset.id)," +
                 "\"income\" : assignTypeClass(asset.investment_type)=== \"income\", " +
                 "\"growth\" : assignTypeClass(asset.investment_type)=== \"growth\", " +
                 "\"income-growth\" : assignTypeClass(asset.investment_type)=== \"income-growth\"}'" +
                 " translate>property_details</div>" +
          "</div>" +
        "</div>" +
        "<div class='bottom-row'>" +
          "<div class='shadow'></div>" +
          "<div class='investment-type'" +
                "ng-class='assignTypeClass(asset.investment_type)' translate>" +
                "{{asset.investment_type}}</div>" +
        "</div>" +
        "<div class='image-border'></div>" +
      "</div>" +
    "</div>",
    link: function (scope, element, attrs) {
      scope.hovered_asset = '';

      scope.i18nTransalteName = function (asset) {
        var locale = localStorage.getItem('locale') || navigator.language;
        if (locale === 'he') {
          return asset.name_heb;
        } else {
          return asset.name;
        }
      }

      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        element.on('click', function (e) {
          e.preventDefault();
        });
      }

      scope.hoverAsset = function (asset_id) {
        scope.hovered_asset = asset_id;
      };

      scope.unhoverAsset = function (asset_id) {
        scope.hovered_asset = '';
      };

      scope.isAssetHovered = function (asset_id) {
        return asset_id === scope.hovered_asset;
      };


// str.substr(start [, length])
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
    }
  };
}]);