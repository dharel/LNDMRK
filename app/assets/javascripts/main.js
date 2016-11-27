/*globals angular, document, JST, window */

var app = angular.module('lndmrk', ['ngRoute', 'pascalprecht.translate','ui.bootstrap']);

angular.element(document).ready(function () {
  'use strict';
  angular.bootstrap(document, ['lndmrk']);
});

app.config(['$compileProvider', '$httpProvider','$routeProvider','$translateProvider', function ($compileProvider, $httpProvider,$routeProvider, $translateProvider) {
  'use strict';
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

  $routeProvider.
    when('/', {
      templateUrl: '/home',
      controller: 'MainController'
    }).
    when('/dashboard', {
      templateUrl: '/dashboard',
      controller: 'DashboardController'
    }).otherwise('/')
    .when('/search', {
      templateUrl: '/search',
      controller: 'SearchController'
    }).otherwise('/');

}]);


app.run(['$templateCache', function ($templateCache) {
  'use strict';
  var address_autocomplete = 'address_autocomplete';
  $templateCache.put('address_autocomplete', JST[address_autocomplete]());
}]);

app.run(function () {
  'use strict';
});
