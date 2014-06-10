'use strict';

angular.module('qapiApp').controller('GameCtrl', ['$scope', 'Game', '$routeParams', '$window',
	function ($scope, Game, $routeParams, $window) {
		/*$scope.game = Game;
		$scope.game.numberofquestions = $scope.game.numberofquestions || 0;
		$scope.game.rightQuestions = $scope.game.rightQuestions || 0;*/

		var game = new Game();
		$scope.games = game.all();

		$scope.newGame = function(){
			var createdGame = game.create({finish: false, started: false});
			createdGame.then(function(data){
				$window.location.href = '/#/games/'+data.id+'/edit';
			});
		};

		$scope.updatePlayer = function(email, add){
			$scope.error = null;
			var update = game.updateUsers($scope.game.id, {userEmail: email, add: add});
			update.then(function(data){
				$scope.game = data;
			},
			function(data){
				$scope.error = data.data.error;
			});
		};

		$scope.removePlayer = function(){
			$scope.updatePlayer(this.user.email, false);
		};

		$scope.addPlayer = function(){
			$scope.updatePlayer($scope.addUserEmail, true);
		};

		$scope.startGame = function(){
			$scope.game.started = true;
			var start = game.update($scope.game);
			start.then(function(){
				$window.location.href = "/#/games/"+$scope.game.id;
			});
		};

		if($routeParams.id){
			$scope.game = game.one($routeParams.id);
			$scope.questions = game.allQuestions($routeParams.id);
		}
	}
  ]);
