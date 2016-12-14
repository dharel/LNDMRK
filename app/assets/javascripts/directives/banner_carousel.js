angular.module('lndmrk').directive('bannerCarousel', ['$timeout', function ($timeout) {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      asset: '='
    },
    template:
    "<section class='banner-carousel'>" +
      "<div class='carousel-arrow-wrap left'>" +
        "<div class='arrow-inner-wrap left' ng-click='prevAsset()'" +
               "ng-class='isFirst() ? \"greyed\" : \"\"'>" +
          "<div width='19' alt='next assets' class='carousel-arrow-l'></div>" +
        "</div>" +
      "</div>" +
      "<div class='carousel-arrow-wrap right'>" +
        "<div class='arrow-inner-wrap right' ng-click='nextAsset()'" +
             "ng-class='isLast() ? \"greyed\" : \"\"'>" +
          "<div width='19' alt='next assets' class='carousel-arrow-r'></div>" +
        "</div>" +
      "</div>" +
        
        "<div class='carousel-show' id='list-outer'>" +
          "<div class='carousel-outer-wrap' id='list-inner' ng-style='calcedWidth'>" +
            "<div class='carousel-inner-wrap' id='the-wrapper'>" +
              "<div ng-repeat='image in asset.banner_images' class='bg-image'></div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        "<div class='color-gradient' ng-class='getInvTypeClr(asset.investment_type)'></div>" +

      "<div class='titles'>" +
        "<h1>{{asset.name}}</h1>" +
        "<h2>{{asset.address}}</h2>" +
      "</div>" +
    "</section>",
    // "<section class='property-hero'>" +
    //   "<div class='background-img' ng-class='getAssetBanner()'></div>" +
    //   "<div class='color-gradient' ng-class='getInvTypeClr(asset.investment_type)'></div>" +
    //   "<div class='titles'>" +
    //     "<h1>{{asset.name}}</h1>" +
    //     "<h2>{{asset.address}}</h2>" +
    //   "</div>" +
    //   "<button class='asset-image next'><div class='arrow next'></div></button>" +
    //   "<button class='asset-image prev'><div class='arrow prev'></div></button>" +
    // "</section>",
    link: function (scope, element, attrs) {
      var outerList = document.getElementById("list-outer"),
      innerList = document.getElementById("list-inner"),
      carouselDiv = document.getElementById("the-wrapper"),
      w = angular.element($window);

      scope.firstShowed = 0;
      scope.xOffset = 0;
      carouselDiv.style.left = 0 + 'px';
      var updateCss = function(){
        carouselDiv.style.left = scope.xOffset + 'px';
      };

      scope.prevAsset = function() {
        if(scope.xOffset !== 0) {
          scope.xOffset = scope.xOffset + 241;
          updateCss();

          scope.firstShowed--;
        }
      };

      scope.nextAsset = function() {
        if(scope.isLast() === false) {
          scope.xOffset = scope.xOffset - 241;
          updateCss();

          scope.firstShowed++;
        }
      };

      scope.isFirst = function(){
        return scope.xOffset === 0;
      };

      scope.isLast = function(){
        return scope.firstShowed == 5;
      };

      // scope.innerLimit = 1105;

      // var calcWidth = function(currentOuter){
      //   var outer = currentOuter;
      //   scope.innerWidth = currentOuter - 30;
      //   scope.calcedWidth = {width: scope.innerWidth + 'px'};
      // };
    }
  };
}]);