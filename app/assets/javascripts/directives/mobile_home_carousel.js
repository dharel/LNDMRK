angular.module('lndmrk').directive('mobileHomeCarousel',
  ['$timeout','$window','$location','dataManagerService', 'localizationSrv', '$swipe',
  function ($timeout, $window, $location, dataManagerService, localizationSrv, $swipe){
  'use strict';

  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  return {
    restrict: 'E',
    scope: {
      assets: '=',
      pagination: '@'
    },
    template: iOS ? JST['carousel_ios']() : JST['carousel'](),
    controller: function($scope) {
    },
    link: function (scope, element, attrs) {
      scope.carouselDiv = document.getElementById("the-wrapper");

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
        if(!scope.isFirst()) {
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
        if(scope.isHebrew()){
          if(scope.isFirst()){return;}
          scope.prevAsset();
        } else {
          if(scope.isLast()){return;}
          scope.nextAsset();
        }

      };

      scope.onSwipeRight = function(ev) {
        if(scope.isHebrew()){
          if(scope.isLast()){return;}
          scope.nextAsset();
        } else {
          if(scope.isFirst()){return;}
          scope.prevAsset();
        }
      };
    }
  };
}]);