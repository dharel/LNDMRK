/*globals angular, document, JST, window */

var app = angular.module('lndmrk', ['pascalprecht.translate','ui.bootstrap']);

angular.element(document).ready(function () {
  'use strict';
  angular.bootstrap(document, ['lndmrk']);
});

app.config(['$compileProvider', '$httpProvider','$translateProvider', function ($compileProvider, $httpProvider, $translateProvider) {
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
}]);

app.run(function () {
  'use strict';
});
