/*globals angular, document, JST, window */

var app = angular.module('lndmrk', [], ['$httpProvider', function ($httpProvider) {
    'use strict';
    var csrf_token = document.getElementsByName('csrf-token')[0].content;
    $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrf_token;
    $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrf_token;
    $httpProvider.defaults.headers.patch['X-CSRF-Token'] = csrf_token;
  }]);

angular.element(document).ready(function () {
  'use strict';
  angular.bootstrap(document, ['lndmrk']);
});

app.config(['$compileProvider', function ($compileProvider) {
  'use strict';
  $compileProvider.debugInfoEnabled(false);
}]);


angular.module('lndmrk').run(function () {
  'use strict';
});
