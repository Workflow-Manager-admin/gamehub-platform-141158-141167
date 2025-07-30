(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .controller('AppController', ['AuthService', '$location', function(AuthService, $location) {
    var app = this;
    app.user = AuthService.getUser();
    app.isActive = function(route) {
      // Return true if current path starts with the route (for nav highlighting)
      return $location.path().indexOf(route) === 0;
    };
    app.logout = function() {
      AuthService.logout();
      app.user = null;
      window.location.hash = "#!/login";
    };
    AuthService.onAuthChange(function(user) {
      app.user = user;
    });
  }]);
})();
