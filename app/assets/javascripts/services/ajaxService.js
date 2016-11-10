/*globals angular, FormData */

angular.module('lndmrk').service('AjaxService', function ($http) {
  'use strict';

  var ajaxService = {};

  /* istanbul ignore next */
  var ajaxHandler = function (method, url, params, onSucc, onErr) {
    var header = {
      method: method,
      url: url,
      params: params
    };
    $http(header)
      .success(function (data, status, headers, config) { onSucc(data, status, headers, config) })
      .error(function (data, status, headers, config) { onErr(data, status, headers, config) });
  }

  ajaxService.getPromise = function (method, url, params) {
    return $http({
      method: method,
      url: url,
      params: params,
    });
  };

  ajaxService.sendMsg = function (method, url, params, onSucc, onErr) {
    ajaxHandler(method, url, params, onSucc, onErr);
  };

  var ajaxHandlerMultipart = function (url, params, onSucc, onErr) {
    var uploadFileToUrl = function (file, uploadUrl) {
      var fd = new FormData();
        fd.append('data', JSON.stringify(file));
        $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).success(function (data) { onSucc(data) })
          .error(function (error)  {onErr(error) });
      };
    uploadFileToUrl(params, url);
  }

  ajaxService.sendMultipartMsg = function (url, params, onSucc, onErr) {
    ajaxHandlerMultipart(url, params, onSucc, onErr);
  };

  return ajaxService;
});
