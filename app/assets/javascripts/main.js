/*globals angular, document, JST, window */

var app = angular.module('lndmrk', ['ngRoute', 'pascalprecht.translate', 'ui.router', 'ui.bootstrap', 'ngMaterial']);

angular.element(document).ready(function () {
  'use strict';
  angular.bootstrap(document, ['lndmrk']);
});

app.config(['$compileProvider', '$httpProvider','$translateProvider', '$locationProvider', '$routeProvider', function ($compileProvider, $httpProvider, $translateProvider, $locationProvider, $routeProvider) {
  'use strict';
  $httpProvider.defaults.timeout = 5000;
  $compileProvider.debugInfoEnabled(false);

  var csrf_token = document.getElementsByName('csrf-token')[0].content;
  $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrf_token;
  $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrf_token;
  $httpProvider.defaults.headers.patch['X-CSRF-Token'] = csrf_token;

  //translations: 
  $translateProvider.useStaticFilesLoader({
    prefix: 'translations/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');

   $routeProvider.when('/', {
     templateUrl: '/home',
     controller: 'MainController'
   })
   .when('/dashboard', {
     templateUrl: '/dashboard',
     controller: 'DashboardController'
   })
   .when('/search', {
     templateUrl: '/search',
     controller: 'SearchController',
     reloadOnSearch: false
   })
   .when('/property', {
     templateUrl: '/property',
     controller: 'PropertyController',
     reloadOnSearch: false
   })
}]);

app.run(['$templateCache', '$anchorScroll', function ($templateCache, $anchorScroll) {
  'use strict';
   $anchorScroll.yOffset = 100;
  var address_autocomplete = 'address_autocomplete';
  $templateCache.put('address_autocomplete', JST[address_autocomplete]());
}]);