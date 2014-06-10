'use strict';

angular.module('qapiApp').factory('Game', ['Restangular',
	function(Restangular){
    
    function Game() {
    };

    Game.prototype.create = function(attrs) {
      return Restangular.all('games').post({ game: attrs });
    };

    Game.prototype.all = function() {
    	return Restangular.all('games').getList().$object;
    };

    Game.prototype.one = function(id){
    	return Restangular.one('games', id).get().$object;
    };

    Game.prototype.update = function(game){
        return game.put();
    };

    Game.prototype.updateUsers = function(id, attrs) {
        return Restangular.one('games', id).customPUT({game: attrs}, "", {}, "");
    };

    Game.prototype.allQuestions = function(id) {
        return Restangular.one('games', id).all('questions').getList().$object;
    };

    return Game;
}]);