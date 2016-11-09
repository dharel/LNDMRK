angular.module('lndmrk').directive('carouselAssets', ['$timeout', function ($timeout){
  'use strict';
  console.log('loaded directive');

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
      "<h4>{{asset.investment_type}}</h4>" +
      
      "<div class='box-wrap'>" +
        "<div class='right-col'>" +
          "<div class='risk-letter'>{{asset.risk}}</div>" +
          "<div class='info-title'>Price per m&sup2;</div>" +
          "<div class='info-data'>{{asset.price}}</div>" +
          "<div class='info-title'>Income per m&sup2;</div>" +
          "<div class='info-data'>{{asset.income}}</div>" +
          "<div class='info-title'>Yeild</div>" +
          "<div class='info-data'>{{asset.yeild}}</div>" +
        "</div>" +

        "<div class='image-placer'>" +
          "<img src='{{assets-block.bigImage}}' width='110' alt='asset'>" +
          "<div class='invest'><span>invest</span></div>" +
        "</div>" +
      "</div>" +
      "</a>" +
    "</div>",
    link: function (scope, element, attrs) {
      if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
        element.on('click', function(e){
            e.preventDefault();
        });
      }
    }
  };
}]);