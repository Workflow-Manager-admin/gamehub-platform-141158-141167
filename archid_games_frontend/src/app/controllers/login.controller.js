(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .controller('LoginController', ['AuthService', '$location', function(AuthService, $location) {
    var vm = this;
    vm.form = { email: '', password: '' };
    vm.error = '';
    vm.loading = false;
    vm.user = AuthService.getUser();
    if (vm.user) {
      $location.path('/');
    }
    vm.handleSubmit = function() {
      vm.loading = true; vm.error = '';
      AuthService.login(vm.form.email, vm.form.password).then(function() {
        $location.path('/');
      })['catch'](function() {
        vm.error = 'Invalid email or password.';
      }).finally(function() {
        vm.loading = false;
      });
    };
  }]);
})();
