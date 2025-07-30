(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .controller('SignupController', ['AuthService', '$location', function(AuthService, $location) {
    var vm = this;
    vm.form = { name: '', email: '', password: '' };
    vm.error = '';
    vm.loading = false;
    vm.user = AuthService.getUser();
    if (vm.user) {
      $location.path('/');
    }
    vm.handleSubmit = function() {
      vm.loading = true; vm.error = '';
      AuthService.signup(vm.form.name, vm.form.email, vm.form.password).then(function() {
        $location.path('/');
      })['catch'](function() {
        vm.error = "Sign up failed. Try again.";
      }).finally(function() {
        vm.loading = false;
      });
    };
  }]);
})();
