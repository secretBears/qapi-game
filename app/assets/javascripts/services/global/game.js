'use strict';

angular.module('qapiApp').factory('Game', ['Restangular',
	function(Restangular){
    
    function Game() {
    };

    Game.prototype.create = function(attrs) {
      return Restangular.all('games').post({ game: attrs });
    };

    Game.prototype.all = function() {
    	return Restangular.all('games').getList();
    };

    Game.prototype.one = function(id){
    	return Restangular.one('games', id).get();
    };

    Game.prototype.update = function(game){
        return game.put();
    };

    Game.prototype.updateUsers = function(id, attrs) {
        return Restangular.one('games', id).customPUT({game: attrs}, "", {}, "");
    };

    Game.prototype.allQuestions = function(id) {
        return Restangular.one('games', id).all('questions').getList();
    };

    Game.prototype.getQuestion = function(id, questionNumber, coords){
        // 47.809490&13.055010
        return Restangular.one('games', id).one('questions', questionNumber).customGET("", {lat: "47.809490", lon: "13.055010"});
        //return Restangular.one('games', id).one('questions', questionNumber).customGET("", {lat: coords.latitude, lon: coords.latitude});
    };

    Game.prototype.setAnswer = function(gameid, questionid, answer){
        return Restangular.one('games', gameid).one('questions', questionid).all('answers').post({answer: {answer: answer }});
    };

    Game.prototype.getRunningGames = function(games){
        var count = 0;
        for(var i=0; i<games.length; i++){
            if(games[i].started && !games[i].finish){
                count++;
            }
        }
        return count;
    };

    return Game;
}]);