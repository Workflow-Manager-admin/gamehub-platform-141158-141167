(function() {
  'use strict';
  // PUBLIC_INTERFACE
  angular.module('archidGamesApp')
  .controller('GameDetailsController', ['ApiService', '$routeParams', 'AuthService', function(ApiService, $routeParams, AuthService) {
    var vm = this;
    vm.loading = true;
    vm.game = null;
    vm.score = '';
    vm.playResult = null;
    vm.user = AuthService.getUser();
    vm.token = AuthService.getToken();

    ApiService.get('/games/' + $routeParams.id).then(function(data) {
      vm.game = data.game;
    })['catch'](function() {
      vm.game = null;
    }).finally(function() {
      vm.loading = false;
    });

    vm.handlePlay = function() {
      vm.playResult = null;
      if (!vm.user) {
        vm.playResult = { error: 'You must be logged in to submit a score.' };
        return;
      }
      ApiService.post('/games/' + vm.game.id + '/play', { score: parseFloat(vm.score) }, vm.token).then(function(result) {
        vm.playResult = { success: result.message || 'Score submitted!' };
        vm.score = '';
      })['catch'](function() {
        vm.playResult = { error: 'Failed to submit score.' };
      });
    };
  }]);
})();
