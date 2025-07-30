(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .controller('LeaderboardController', ['ApiService', function(ApiService) {
    var vm = this;
    vm.loading = true;
    vm.leaders = [];
    ApiService.get('/leaderboard').then(function(data) {
      vm.leaders = data.leaderboard || [];
    })['catch'](function() {
      vm.leaders = [];
    }).finally(function() {
      vm.loading = false;
    });
  }]);
})();
