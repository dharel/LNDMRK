/*globals _, describe, unused , it, expect, beforeEach, angular, mock, module, $controller, document, window, mockController */

describe('homeCtl,', function () {
  'use strict';

  var controller, scope, module;

  beforeEach(function () {
    var mocked_controller = mockController('homeCtl');
    controller = mocked_controller.controller;
    scope = mocked_controller.scope;
    module = mocked_controller.module;
  });

  it("should be a valid module", function () {
    expect(controller).toBeDefined();
  });

});