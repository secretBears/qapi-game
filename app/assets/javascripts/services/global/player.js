'use strict';

angular.module('qapiApp').factory('Player', ['$http', '$window', '$rootScope', 'Restangular',
	function($http, $window, $rootScope, Restangular){
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
				$window.location.href = '/#/';
			}.bind(this),
			function(){
				console.log('ERROR LOGIN');
			}.bind(this));
	};

	Player.prototype.isLogedIn = function(){
		if(this.email === ''){
			$window.location.href = '/#/login';
			return;
		}
		Restangular.one('users', this.id).get().then(
			function(data){
				console.log('user is logged in');
			},
			function(){
				$window.location.href = '/#/login';
			});
	};

	Player.prototype.logout = function(){
		Restangular.all('sessions').remove().then(
			function(data){
				console.log(data);
				alert("LOGOUT");
				$window.location.href = '/';
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