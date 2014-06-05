'use strict';

angular.module('qapiApp').factory('Player', ['$http', '$window', '$rootScope', 'QapiRestangular',
	function($http, $window, $rootScope, QapiRestangular){
	var instance;
	var Restangular = QapiRestangular.getRestangular();;

	var Player = function Player(config){
		config = config || {};
		this.email = config.email || '';
		this.token = config.token || '';
		this.id = config.id || null;
	};

	Player.prototype.login = function(email, password){
		Restangular.all('users').all('login').post({user:{email:email, password:password}}).then(
			function(data){
				this.email = data.user.email;
				this.token = data.user.token;
				this.id = data.user.id;
				$window.location.href = '/#/';
			}.bind(this),
			function(){
				console.log('ERROR LOGIN');
			}.bind(this));
	};

	Player.prototype.isLogedIn = function(){
		if(this.email === '' || this.token === ''){
			$window.location.href = '/#/login';
			return;
		}
		Restangular.one('users', this.id).get().then(
			function(data){
				console.log(data);
			},
			function(){
				$window.location.href = '/#/login';
			});
	};

	Player.prototype.logout = function(){
		Restangular.all('users').all('logout').remove().then(
			function(){
				$window.location.href = '/#/login';
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
		this.token = '';
		this.id = null;
	};
	

	if(!instance){
		instance = new Player();
	}

	return instance;
}]);