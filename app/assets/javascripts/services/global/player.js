'use strict';

angular.module('qapiApp').factory('Player', ['$http', '$location', '$rootScope', 'Restangular', '$window',
	function($http, $location, $rootScope, Restangular, $window){
	var instance;

	var Player = function Player(config){
		config = config || {};
		this.email = config.email || '';
		this.id = config.id || null;
	};

	Player.prototype.setData = function(config){
		config = config || {};
		this.email = config.email || this.email;
		this.id = config.id || this.id;
	};

	Player.prototype.login = function(email, password){
		return Restangular.all('sessions').post({user:{email:email, password:password}});
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
		return Restangular.all('users').post({ 'user': newUser });
	};

	Player.prototype.allUsers = function(){
		return Restangular.all('users').getList();
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