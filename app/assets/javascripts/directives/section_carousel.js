angular.module('lndmrk').directive('sectionCarousel', ['$timeout','$window','$location','dataManagerService','localizationSrv', function ($timeout, $window, $location, dataManagerService, localizationSrv){
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
        "<div class='arrow-inner-wrap left' ng-click='onClickLeft()'" +
               "ng-class='{\"greyed\": isGreyed(\"left\") }'>" +
          "<div width='19' alt='next assets' class='carousel-arrow-l'></div>" +
        "</div>" +
      "</div>" +
      "<div class='carousel-arrow-wrap right'>" +
        "<div class='arrow-inner-wrap right' ng-click='onClickRight()'" +
             "ng-class='{\"greyed\": isGreyed(\"right\") }'>" +
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
    
      scope.firstShowed = 0;
      scope.xOffset = 0;
      scope.carouselDiv.style[scope.isHebrew() ? 'right' : 'left'] = scope.xOffset + 'px';
      var updateCss = function(val){
        scope.carouselDiv = document.getElementById("the-wrapper");
        scope.carouselDiv.style[scope.isHebrew() ? 'right' : 'left'] = scope.xOffset + 'px';
      };

      scope.prevAsset = function() {
        if(scope.isFirst() === false) {
          scope.xOffset = scope.xOffset + 241;
          updateCss(scope.xOffset);
          
          scope.firstShowed--;
        }
      };

      scope.nextAsset = function() {
        if(!scope.isLast()) {
          scope.xOffset = scope.xOffset - 241;
          updateCss(scope.xOffset);

          scope.firstShowed++;
        }
      };

      scope.isFirst = function(){
        return scope.firstShowed === 0;
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

      scope.onClickLeft = function(ev) {
        if(scope.isHebrew()){
          if(scope.isLast()){return;}
          scope.nextAsset();
        } else {
          if(scope.isFirst()){return;}
          scope.prevAsset();
        }
      };

      scope.onClickRight = function(ev) {
        if(scope.isHebrew()){
          if(scope.isFirst()){return;}
          scope.prevAsset();
        } else {
          if(scope.isLast()){return;}
          scope.nextAsset();
        }
      };

      scope.isGreyed = function(direction) {
        if(direction === 'right'){
          if(!scope.isHebrew()){return scope.isLast();} else {return scope.isFirst();}
        } else {
          if(!scope.isHebrew()){return scope.isFirst();} else {return scope.isLast();}
        }
      };
    }
  };
}]);