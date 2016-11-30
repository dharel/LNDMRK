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
      "<a href='#'>" +
      "<h3>{{asset.name}}</h3>" +
      "<div class='asset-box-shadow' ng-show='isAssetHovered(asset.id)'></div>" +
      "<div class='box-wrap' ng-mouseenter='hoverAsset(asset.id)' ng-mouseleave='unhoverAsset(asset.id)'>" +
        "<div class='light-blue-shadow'></div>" +
        "<div class='row'>" +
          "<div class='right-col'>" +
            "<div class='risk-letter' ng-class='assignRiskClass(asset.rating)'>{{asset.rating}}</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title'>Price per m&sup2;</div>" +
            "<div class='info-data'>${{asset.price}}K</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title'>Income per m&sup2;</div>" +
            "<div class='info-data'>${{asset.income}}</div>" +
            "<div class='partition'></div>" +
            "<div class='info-title'>Yeild</div>" +
            "<div class='info-data'>{{asset.yield}}%</div>" +
          "</div>" +
          "<div class='image-placer'>" +
            "<img src='{{asset.image}}' width='126' alt='asset'>" +
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
                "ng-class='assignTypeClass(asset.investment_type)'>" +
                "{{asset.investment_type}} investment</div>" +
        "</div>" +
        "<div class='image-border'></div>" +
      "</div>" +
      "</a>" +
    "</div>",
    link: function (scope, element, attrs) {
      scope.hovered_asset = '';

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

      scope.assignRiskClass = function (risk_letter) {
        switch (risk_letter) {
          case 'a':
            return 'risk-a';
          case 'b':
            return 'risk-b';
          case 'c':
            return 'risk-c';
          case 'd':
            return 'risk-d';
          default:
            return 'risk-a';
        }
      };

      scope.assignTypeClass = function(investment_type) {
        switch (investment_type) {
          case 'income':
            return 'income';
          case 'growth':
            return 'growth';
          case 'income & growth':
            return 'income-growth';
          default:
            return 'income';
        }
      };
    }
  };
}]);