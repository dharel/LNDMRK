angular.module('lndmrk').directive('bannerCarousel', ['$timeout','$window', function ($timeout,$window) {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      asset: '='
    },
    template:
    "<section class='banner-carousel'>" +

      "<div class='b-carousel-arrow-wrap prev' ng-click='prevAsset()'>" +
        "<div class='arrow prev' ng-class='isFirst() ? \"greyed\" : \"\"'></div>" +
      "</div>" +
      "<div class='b-carousel-arrow-wrap next' ng-click='nextAsset()'>" +
        "<div class='arrow next' ng-class='isLast() ? \"greyed\" : \"\"'></div>" +
      "</div>" +

      "<div class='b-carousel-full-wrap' id='the-wrapper'>" +
        "<div ng-repeat='image in asset.banner_images' class='image-crop'>" +
          "<img src='{{image}}' alt='asset.name'>" +
        "</div>" +
      "</div>" +

      "<div class='color-gradient' ng-class='getPropertyTypeClr(asset.investment_type)'></div>" +

      "<div class='titles'>" +
        "<h1>{{asset.name}}</h1>" +
        "<h2>{{asset.address}}</h2>" +
      "</div>" +

    "</section>",
    link: function (scope, element, attrs) {

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