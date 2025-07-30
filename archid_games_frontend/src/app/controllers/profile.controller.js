(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .controller('ProfileController', ['ApiService', 'AuthService', '$location', '$scope', 
    function(ApiService, AuthService, $location, $scope) {
      var vm = this;
      vm.loading = true;
      vm.scores = [];
      vm.profile = null;
      vm.edit = false;
      vm.form = { name: "", email: "" };
      vm.message = "";
      vm.token = AuthService.getToken();
      vm.user = AuthService.getUser();

      if (!vm.user) {
        $location.path('/login');
        return;
      }
      ApiService.get('/profile', vm.token).then(function(data) {
        vm.profile = data.user;
        vm.form = {
          name: data.user.name,
          email: data.user.email
        };
        vm.scores = data.scores || [];
      })['catch'](function() {
        vm.profile = vm.user;
      }).finally(function() {
        vm.loading = false;
      });

      vm.handleEdit = function() { vm.edit = true; };
      vm.handleSave = function() {
        ApiService.put('/profile', vm.form, vm.token).then(function() {
          vm.message = "Profile updated!";
          vm.profile.name = vm.form.name;
          vm.profile.email = vm.form.email;
          vm.edit = false;
        })['catch'](function() {
          vm.message = "Failed to update profile.";
        });
      };
      vm.cancel = function() { vm.edit = false; };
    }
  ]);
})();
