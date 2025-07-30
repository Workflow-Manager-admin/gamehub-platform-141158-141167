(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .factory('AuthService', ['ApiService', '$window', function(ApiService, $window) {
    var tokenKey = 'archid_auth_token';
    var user = null;
    var listeners = [];

    function notify() {
      listeners.forEach(function(fn) { fn(user); });
    }

    function getToken() {
      return $window.localStorage.getItem(tokenKey);
    }
    function setUser(val) {
      user = val;
      notify();
    }
    function getUser() { return user; }
    function onAuthChange(cb) {
      listeners.push(cb);
    }

    // Try to restore user session
    if (getToken()) {
      ApiService.get('/auth/me', getToken()).then(function(data) {
        setUser(data.user);
      })['catch'](function() {
        setUser(null);
        $window.localStorage.removeItem(tokenKey);
      });
    }

    // PUBLIC_INTERFACE
    return {
      login: function(email, password) {
        return ApiService.post('/auth/login', { email: email, password: password }).then(function(data) {
          $window.localStorage.setItem(tokenKey, data.token);
          setUser(data.user);
          return data.user;
        });
      },
      signup: function(name, email, password) {
        return ApiService.post('/auth/signup', { name: name, email: email, password: password }).then(function(data) {
          $window.localStorage.setItem(tokenKey, data.token);
          setUser(data.user);
          return data.user;
        });
      },
      logout: function() {
        $window.localStorage.removeItem(tokenKey);
        setUser(null);
      },
      getUser: getUser,
      getToken: getToken,
      onAuthChange: onAuthChange
    };
  }]);
})();
