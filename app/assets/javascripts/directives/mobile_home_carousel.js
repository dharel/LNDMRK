angular.module('lndmrk').directive('mobileHomeCarousel',
  ['$timeout','$window','$location','dataManagerService', 'localizationSrv', '$swipe',
  function ($timeout, $window, $location, dataManagerService, localizationSrv, $swipe){
  'use strict';

  return {
    restrict: 'E',
    scope: {
      assets: '=',
      pagination: '@'
    },

    template:
    "<section class='mobile-assets-carousel'>" +
      "<div class='moving-wrap' id='the-wrapper'" +
                     "ng-swipe-left='onSwipeLeft()' ng-swipe-right='onSwipeRight()'>" +
        "<carousel-assets ng-repeat='asset in assets'" +
                         "asset='asset'" +
                         "pagination='pagination'" +
                         "id='myCarousel'" +
                         "ng-click='toggleObject($index)'" +
                         "ng-class='{ chosen: chosenAsset === asset }'></carousel-assets>" +
      "</div>" +
    "</section>",
    controller: function($scope) {
      $scope.carouselDiv = document.getElementById("the-wrapper");
    },
    link: function (scope, element, attrs) {
      // var carouselDiv = document.getElementById("the-wrapper"),
      var w = angular.element($window);

      scope.localizationSrv = localizationSrv;

      scope.$watch('localizationSrv.locale', function (newval, oldval){
        if (newval !== oldval) {
          updateCss(scope.xOffset);
        }
      }, true);
      scope.isHebrew = function () {
        return localizationSrv.locale === "he";
      };

      scope.toggleObject = function (index) {
        scope.assetsIndex = index;
        scope.chosenAsset = scope.assets[scope.assetsIndex];
        dataManagerService.asset = scope.chosenAsset;
        $location.path('/property');
      };

      scope.assetFocused = 0;
      scope.xOffset = 65;
      scope.carouselDiv.style[scope.isHebrew() ? 'right' : 'left'] = scope.xOffset + 'px';
      var updateCss = function(val){
        scope.carouselDiv = document.getElementById("the-wrapper");
        scope.carouselDiv.style[scope.isHebrew() ? 'right' : 'left'] = scope.xOffset + 'px';
      };

      scope.prevAsset = function() {
        if(scope.isFirst() === false) {
          scope.xOffset = scope.xOffset + 241;
          updateCss(scope.xOffset);
          
          scope.assetFocused--;
        }
      };

      scope.nextAsset = function() {
        if(scope.isLast() === false) {
          scope.xOffset = scope.xOffset - 241;
          updateCss(scope.xOffset);

          scope.assetFocused++;
        }
      };

      scope.isFirst = function(){
        return scope.assetFocused === 0;
      };

      scope.isLast = function(){
        return scope.assetFocused == 6;
      };

      scope.innerLimit = 1105;

      var calcWidth = function(currentOuter){
        var outer = currentOuter;
        scope.innerWidth = currentOuter - 30;
        scope.calcedWidth = {width: scope.innerWidth + 'px'};
      };



      scope.onSwipeLeft = function(ev) {
        if(scope.isLast()){return;}
        scope.nextAsset();
      };

      scope.onSwipeRight = function(ev) {
        if(scope.isFirst()){return;}
        scope.prevAsset();
      };
    }
  };
}]);