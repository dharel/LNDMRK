angular.module('lndmrk').directive('bannerCarousel', ['$timeout','$window','localizationSrv', function ($timeout,$window,localizationSrv) {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      asset: '='
    },
    template:
    "<section class='banner-carousel'>" +

      "<div class='b-carousel-arrow-wrap prev'>" +
        "<div class='arrow prev'></div>" +
      "</div>" +
      "<div class='b-carousel-arrow-wrap next'>" +
        "<div class='arrow next'></div>" +
      "</div>" +

      "<div class='b-carousel-full-wrap' id='the-wrapper'>" +
        "<div ng-repeat='image in asset.banner_images' class='image-crop'>" +
          "<img src='{{image}}' alt='asset.name'>" +
        "</div>" +
      "</div>" +

      "<div class='color-gradient' ng-class='getPropertyTypeClr(asset.investment_type)'></div>" +

      "<div class='titles'>" +
        "<h1 ng-if='localizationSrv.locale === \"en\"'>{{asset.name}}</h1>" +
        "<h1 ng-if='localizationSrv.locale === \"he\"'>{{asset.name_heb}}</h1>" +
        "<h2>{{asset.address}}</h2>" +
      "</div>" +

    "</section>",
    link: function (scope, element, attrs) {
      // currently we have no assets for pagination,so we removed the ng-click='prevAsset()' / 'nextAsset()'
      // and the ng-class='isLast() ? \"greyed\" : \"\"'
      scope.localizationSrv = localizationSrv;
      var carouselDiv = document.getElementById("the-wrapper");
      scope.w_width = window.innerWidth;

      scope.firstShowed = 0;
      scope.xOffset = 0;
      carouselDiv.style.left = 0 + 'px';
      var updateCss = function(){
        carouselDiv.style.left = scope.xOffset + 'px';
      };

      scope.prevAsset = function() {
        if(scope.xOffset !== 0) {
          scope.xOffset = scope.xOffset + scope.w_width;
          updateCss();

          scope.firstShowed--;
        }
      };

      scope.nextAsset = function() {
        if(scope.isLast() === false) {
          scope.xOffset = scope.xOffset - scope.w_width;
          updateCss();

          scope.firstShowed++;
        }
      };

      scope.isFirst = function(){
        return scope.firstShowed === 0;
      };

      scope.isLast = function(){
        return scope.firstShowed === scope.asset.banner_images.length-1;
      };

      scope.getPropertyTypeClr = function (type) {
        switch (type) {
          case 'max_dividends':
            return 'type-yello';
          case 'max_appreciation':
            return 'type-purple';
          case 'max_dividends_appreciation':
            return 'type-cyan';
          default:
            return 'type-yello';
        }
      };
    }
  };
}]);