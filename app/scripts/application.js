
define(['angular'], function(angular){
	
  // Add your initialization code here
  console.log("Init Angular");
  angular
	  .module('qapi-game', [
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
	        .when('/users/', {
	          templateUrl: 'assets/users/index.html',
	          controller: 'UserCtrl'
	        })
	        .when('/games/', {
	          templateUrl: 'assets/games/index.html',
	          controller: 'GameCtrl'
	        })
	        .when('/games/:id', {
	          templateUrl: 'assets/games/show.html',
	          controller: 'GameCtrl'
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

	  	console.log("GRUNTZ");

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

});