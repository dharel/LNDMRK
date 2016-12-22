angular.module('lndmrk').directive('positionreport', [function () {
  'use strict';

  return {
    restrict: 'EA',
    link: function (scope, element, attrs) {
      
      element.bind("mouseenter", function(){
        console.log(element[0].getBoundingClientRect());
        scope.$root.$broadcast('over-box',element[0].getBoundingClientRect());
      });

    }
  };
}]);