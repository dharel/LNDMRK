angular.module('lndmrk').directive('sectionCarousel', ['$timeout','$window','$location','dataManagerService', function ($timeout, $window, $location, dataManagerService){
  'use strict';

  return {
    restrict: 'E',
    scope: {
      assets: '=',
      pagination: '@'
    },

    template:
    "<section class='assets-carousel'>" +
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
            "<carousel-assets ng-repeat='asset in assets'" +
                             "asset='asset'" +
                             "pagination='pagination'" +
                             "id='myCarousel'" +
                             "ng-click='toggleObject($index)'" +
                             "ng-class='{ chosen: chosenAsset === asset }'></carousel-assets>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>",
    link: function (scope, element, attrs) {
      var outerList = document.getElementById("list-outer"),
      innerList = document.getElementById("list-inner"),
      carouselDiv = document.getElementById("the-wrapper"),
      w = angular.element($window);

      scope.toggleObject = function (index) {
        scope.assetsIndex = index;
        scope.chosenAsset = scope.assets[scope.assetsIndex];
        dataManagerService.asset = scope.chosenAsset;
        $location.path('/property');
      };

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
        return scope.firstShowed == 2;
      };

      scope.innerLimit = 1105;

      var calcWidth = function(currentOuter){
        var outer = currentOuter;
        scope.innerWidth = currentOuter - 30;
        scope.calcedWidth = {width: scope.innerWidth + 'px'};
      };
    }
  };
}]);