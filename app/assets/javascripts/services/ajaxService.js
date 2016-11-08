/*globals angular, FormData */

angular.module('lndmrk').service('AjaxService', function ($http) {
  'use strict';

  const ajaxService = {};

  /* istanbul ignore next */
  const ajaxHandler = (method, url, params, onSucc, onErr) => {
    const header = {
      method: method,
      url: url,
      params: params
    };
    $http(header)
      .success((data, status, headers, config) => onSucc(data, status, headers, config))
      .error((data, status, headers, config) =>  onErr(data, status, headers, config));
  }

  ajaxService.getPromise = (method, url, params) => {
    return $http({
      method: method,
      url: url,
      params: params,
    });
  };

  ajaxService.sendMsg = (method, url, params, onSucc, onErr) => {
    ajaxHandler(method, url, params, onSucc, onErr);
  };

  const ajaxHandlerMultipart = (url, params, onSucc, onErr) => {
    const uploadFileToUrl = (file, uploadUrl) => {
      const fd = new FormData();
        fd.append('data', JSON.stringify(file));
        $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).success(data => onSucc(data))
          .error(error => onErr(error));
      };
    uploadFileToUrl(params, url);
  }

  ajaxService.sendMultipartMsg = (url, params, onSucc, onErr) => {
    ajaxHandlerMultipart(url, params, onSucc, onErr);
  };

  return ajaxService;
});
