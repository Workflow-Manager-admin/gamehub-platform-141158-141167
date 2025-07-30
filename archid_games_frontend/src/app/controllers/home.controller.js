(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .controller('HomeController', ['ApiService', function(ApiService) {
    var vm = this;
    vm.loading = true;
    vm.games = [];

    ApiService.get('/games').then(function(data) {
      vm.games = data.games || [];
    })['catch'](function() {
      vm.games = [];
    }).finally(function() {
      vm.loading = false;
    });
  }]);
})();
