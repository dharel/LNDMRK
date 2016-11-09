/*globals angular , window, unused, _  */
angular.module('lndmrk').controller('MainController', function ($scope, AjaxService) {
  'use strict';
    $scope.ng = 'angular is up';

    $scope.assets = [
    {name: 'azrieli towers, tlv', investment_type: 'income investment', risk:'b', price: '$10k', income: '$20', yeild: '7.1%'},
    {name: 'trump towers, nyc', investment_type: 'income investment', risk:'c', price: '$10k', income: '$20', yeild: '7.1%'},
    {name: 'land for investment', investment_type: 'growth investment', risk:'d', price: '$10k', income: '$20', yeild: '7.1%'},
    {name: 'ramat aviv mall, tlv', investment_type: 'income & growth investment', risk:'b', price: '$10k', income: '$20', yeild: '7.1%'},
    {name: 'land for investment', investment_type: 'growth investment', risk:'b', price: '$10k', income: '$20', yeild: '7.1%'}
    ];


});
