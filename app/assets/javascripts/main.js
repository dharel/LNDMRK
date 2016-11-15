/*globals angular, document, JST, window */

var app = angular.module('lndmrk', []);

angular.element(document).ready(function () {
  'use strict';
  angular.bootstrap(document, ['lndmrk']);
});

app.config(['$compileProvider', '$httpProvider', function ($compileProvider, $httpProvider) {
  'use strict';
  $compileProvider.debugInfoEnabled(false);

  var csrf_token = document.getElementsByName('csrf-token')[0].content;
  $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrf_token;
  $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrf_token;
  $httpProvider.defaults.headers.patch['X-CSRF-Token'] = csrf_token;
}]);

app.run(function () {
  'use strict';
});
