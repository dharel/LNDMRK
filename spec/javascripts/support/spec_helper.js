/*globals document, window, angular, $ */

(function () {
  'use strict';
  var meta = document.createElement("META");
  meta.setAttribute('name', 'csrf-token');
  meta.setAttribute('content', 'csrf');

  window.JST = {
  };

  document.head.appendChild(meta);

  window.mockController = function (controller_name) {
    var scope, controller, module;

    module = angular.mock.module('app');
    angular.mock.inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller(controller_name, {
        $scope: scope,
        $element : angular.element('<div></div>')
      });
    });
    return {
      module: module,
      controller: controller,
      scope: scope,
    };
  };

}());
