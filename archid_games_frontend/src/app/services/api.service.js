/**
 * AngularJS Service for API communication
 */
(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .factory('ApiService', ['$http', function($http) {
    var API_BASE = window.API_BASE || "http://localhost:8000/api";
    var get = function(path, token) {
      return $http.get(API_BASE + path, {
        headers: token ? { Authorization: 'Bearer ' + token } : {},
        withCredentials: true
      }).then(function(resp) { return resp.data; });
    };
    var post = function(path, data, token) {
      return $http.post(API_BASE + path, data, {
        headers: token ? { Authorization: 'Bearer ' + token } : {},
        withCredentials: true
      }).then(function(resp) { return resp.data; });
    };
    var put = function(path, data, token) {
      return $http.put(API_BASE + path, data, {
        headers: token ? { Authorization: 'Bearer ' + token } : {},
        withCredentials: true
      }).then(function(resp) { return resp.data; });
    };
    return {
      get: get,
      post: post,
      put: put
    };
  }]);
})();
