(function () {
  'use strict';
  angular.module('archidGamesApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/games', {
        templateUrl: 'app/views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/games/:id', {
        templateUrl: 'app/views/game-details.html',
        controller: 'GameDetailsController',
        controllerAs: 'vm'
      })
      .when('/leaderboard', {
        templateUrl: 'app/views/leaderboard.html',
        controller: 'LeaderboardController',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/signup', {
        templateUrl: 'app/views/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .otherwise({
        templateUrl: 'app/views/404.html'
      });
  }]);
})();
