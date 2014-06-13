// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

//= require_self
//= require_tree ./services/global
//= require_tree ./services/main
//= require_tree ./filters/global
//= require_tree ./filters/main
//= require_tree ./controllers/global
//= require_tree ./controllers/main
//= require_tree ./directives/global
//= require_tree ./directives/main

'use strict';

angular
  .module('qapiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angular-loading-bar',
    'restangular'
  ])
  .config(['$routeProvider', 'cfpLoadingBarProvider', 'RestangularProvider',
    function ($routeProvider, cfpLoadingBarProvider, RestangularProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'assets/index.html',
          controller: 'MainCtrl'
        })
        .when('/login', {
          templateUrl: 'assets/login.html',
          controller: 'AuthCtrl'
        })
        .when('/sign_up', {
          templateUrl: 'assets/sign_up.html',
          controller: 'AuthCtrl'
        })
        .when('/play', {
          templateUrl: 'assets/play.html',
          controller: 'PlayCtrl'
        })
        .when('/about/', {
          templateUrl: 'assets/about.html',
          controller: 'MainCtrl'
        })
        .when('/finish/', {
          templateUrl: 'assets/finish.html',
          controller: 'FinishCtrl'
        })

        // ############ USER ############

        .when('/users/', {
          templateUrl: 'assets/users/index.html',
          controller: 'UserCtrl'
        })

        // ############ GAME ############

        .when('/games/', {
          templateUrl: 'assets/games/index.html',
          controller: 'GameCtrl'
        })
        .when('/games/:id', {
          templateUrl: 'assets/games/show.html',
          controller: 'GameCtrl'
        })
        .when('/games/new', {
          templateUrl: 'assets/games/new.html',
          controller: 'GameCtrl'
        })
        .when('/games/:id/edit', {
          templateUrl: 'assets/games/edit.html',
          controller: 'GameCtrl'
        })
        .when('/games/:id/play', {
          templateUrl: 'assets/games/play.html',
          controller: 'GameCtrl'
        })

        // ############ QUESTION ############

        .when('/games/:game_id/questions', {
          templateUrl: 'assets/questions/index.html',
          controller: 'QuestionCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      cfpLoadingBarProvider.includeBar = false;
      RestangularProvider.setBaseUrl('/api');
      var authToken = $('meta[name=\'csrf-token\']').attr('content');
      RestangularProvider.setDefaultHeaders({'X-CSRF-Token': authToken});
    }
  ])
  .run(['$rootScope', 'Player', function($rootScope, Player){

    //$rootScope.api = 'http://localhost:3000/api';
    $rootScope.menuhidden = true;
    $rootScope.username = 'Justin Bieber';
    $rootScope.isPlaying = false;
    $rootScope.player = Player;

    $rootScope.toggleMenu = function(){
      $rootScope.menuhidden = !$rootScope.menuhidden;
    };

    $rootScope.logout = $rootScope.player.logout.bind(Player);
  }]);

