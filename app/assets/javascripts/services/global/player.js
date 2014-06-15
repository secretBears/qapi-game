'use strict';

angular.module('qapiApp').factory('Player', ['$http', '$location', '$rootScope', 'Restangular', '$window',
	function($http, $location, $rootScope, Restangular, $window){
	var instance;

	var Player = function Player(config){
		config = config || {};
		this.email = config.email || '';
		this.id = config.id || null;
	};

	Player.prototype.login = function(email, password){
		Restangular.all('sessions').post({user:{email:email, password:password}}).then(
			function(data){
				this.email = data.email;
				this.id = data.id;
				$location.path('/games');
			}.bind(this),
			function(){
				console.log('ERROR LOGIN');
			}.bind(this));
	};

	Player.prototype.isLogedIn = function(){
		if(this.email === ''){
			$location.path('/login');
			return;
		}
		Restangular.one('users', this.id).get().then(
			function(data){
				console.log('user is logged in');
			},
			function(){
				$location.path('/login');
			});
	};

	Player.prototype.logout = function(){
		Restangular.all('sessions').remove().then(
			function(data){
				$window.location.reload();
				this.resetData();
			}.bind(this),
			function(){
				console.log('ERROR Logout');
			}.bind(this));
	};

	Player.prototype.signUp = function(email, password, confirmPassword){
		var newUser = {
			'email': email,
			'password': password,
			'password_confirmation': confirmPassword
		};
		Restangular.all('users').post({ 'user': newUser });
	};

	Player.prototype.resetData = function(){
		this.email = '';
		this.id = null;
	};
	

	if(!instance){
		instance = new Player();
	}

	return instance;
}]);