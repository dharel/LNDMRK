angular.module('lndmrk').directive('sectionCarousel', ['$timeout', function ($timeout){
  'use strict';

  return {
    restrict: 'E',
    scope: {
      assets: '=',
      pagination: '@'
    },

    template: 
    "<section class='assets-carousel'>" +
      "<div width='19' alt='next assets' class='carousel-arrow-l' ng-click='prevAsset()'" +
           "ng-class='isFirst() ? \"greyed\" : \"\"'></div>" +
      "<div width='19' alt='next assets' class='carousel-arrow-r' ng-click='nextAsset()'" +
           "ng-class='isLast() ? \"greyed\" : \"\"'></div>" +
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
      carouselDiv = document.getElementById("the-wrapper");

      scope.toggleObject = function (index) {  
        scope.assetsIndex = index;
        scope.chosenAsset = scope.assets[scope.assetsIndex];
      };

      scope.firstShowed = 0;
      scope.xOffset = 0;
      var updateCss = function(){
        carouselDiv.style.left = scope.xOffset + 'px';
      };

      scope.prevAsset = function() {
        if(scope.xOffset !== 0) {
          scope.xOffset = scope.xOffset + 141;
          console.log("xOffset to left is: ", scope.xOffset);
          updateCss();

          scope.firstShowed--;
        }
      };

      scope.nextAsset = function() {
        if(scope.isLast() === false) {
          scope.xOffset = scope.xOffset - 141;
          console.log("xOffset to left is: ", scope.xOffset);
          updateCss();

          scope.firstShowed++;
        }
      };

      scope.isFirst = function(){
        return scope.xOffset === 0;
      };

      scope.isLast = function(){
        var n;
        switch(scope.employeeLimit) {
          case 13:
          n = 16;
          break;
          case 12:
          n = 17;
          break;
          case 11:
          n = 18;
          break;
          case 10:
          n = 19;
          break;
          case 9:
          n = 20;
          break;
          case 8:
          n = 21;
          break;
          default:
          n = 21;    
        }
        return scope.firstShowed == n;
      };

      //====================================responsive width of inner-wrapper in the carousel
      scope.innerLimit = 1105;

      var calcWidth = function(currentOuter){
        var outer = currentOuter;
         //console.log("now the outer width is: ",outer);

         if(outer > 1810) {
          scope.innerWidth = 1810;
          scope.employeeLimit = 13;
        } else if(outer <= 1810 && outer > 1669) {
          scope.innerWidth = 1669;
          scope.employeeLimit = 12;
        } else if(outer <= 1669 && outer > 1528) {
          scope.innerWidth = 1528;
          scope.employeeLimit = 11;
        } else if(outer <= 1528 && outer > 1387) {
          scope.innerWidth = 1387;
          scope.employeeLimit = 10;
        } else if(outer <= 1387 && outer > 1246) {
          scope.innerWidth = 1246;
          scope.employeeLimit = 9;
        } else {
          scope.innerWidth = 1105;
          scope.employeeLimit = 8;
        }
        console.log("now the inner width should be: ",scope.innerWidth);
        scope.calcedWidth = {width: scope.innerWidth + 'px'};
      };

      //=====watch the carousel's-widths and make number of showed employees responsive to it
      scope.windowWidth = window.innerWidth;

      var watchWidths = function () {   
        scope.$watch('windowWidth', function() {      
          scope.outerWidth = outerList.offsetWidth;    
          console.log("watching carousel's-width: ", scope.outerWidth);        
          calcWidth(scope.outerWidth);
        });
      };
      watchWidths();

      w.bind('resize',function(){
        scope.$apply(watchWidths);
      });
    }
  };
}]);