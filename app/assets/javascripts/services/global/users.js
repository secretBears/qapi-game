'use strict';

angular.module('qapiApp').factory('User', ['Restangular',
	function(Restangular){
    
    function User() {
    };

    User.prototype.all = function() {
    	return Restangular.all('users').getList();
    };

    User.prototype.one = function(id){
    	return Restangular.one('users', id).get();
    };

    User.prototype.update = function(user){
        return user.put();
    };

    User.prototype.delete = function(id){
        return Restangular.one('users', id).remove();
    };

    User.prototype.current = function(){
        return Restangular.all('users').customGET('current');
    };

    return User;
}]);