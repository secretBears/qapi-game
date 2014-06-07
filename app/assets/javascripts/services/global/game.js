'use strict';

angular.module('qapiApp').factory('Game', ['Restangular',
	function(Restangular){
    
    function Game() {
    };

    Game.prototype.create = function(attrs) {
      this.base.create.post({ game: attrs });
    };

    Game.prototype.all = function() {
    	return Restangular.all('games').getList().$object;
    };

    Game.prototype.one = function(id){
    	return Restangular.one('games', id).get().$object;
    };

    return Game;
}]);