'use strict';

angular.module('qapiApp').controller('GameCtrl', ['$scope', 'Game', '$routeParams',
	function ($scope, Game, $routeParams) {
		/*$scope.game = Game;
		$scope.game.numberofquestions = $scope.game.numberofquestions || 0;
		$scope.game.rightQuestions = $scope.game.rightQuestions || 0;*/

		var game = new Game();
		$scope.games = game.all();

		if($routeParams.id){
			$scope.game = game.one($routeParams.id);
			console.log($scope.game);
		}
	}
  ]);
