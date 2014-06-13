'use strict';

angular.module('qapiApp').controller('GameCtrl', ['$scope', 'Game', '$routeParams', '$window',
	function ($scope, Game, $routeParams, $window) {
		/*$scope.game = Game;
		$scope.game.numberofquestions = $scope.game.numberofquestions || 0;
		$scope.game.rightQuestions = $scope.game.rightQuestions || 0;*/
		$scope.numberofquestions = 10;
		$scope.questions = [];
		$scope.finished = false;
		$scope.play = {};
		$scope.selectedAnswer = -1;
		$scope.indexOfRightAnswer = -1;
		$scope.refreshPage = false;

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
				$window.location.href = "/#/games/"+$scope.game.id+"/play";
			});
		};

		$scope.giveAnswer = function(questionId, answer, index){
			$scope.selectedAnswer = index;
			$scope.questions[$scope.getNumberOfNextQuestion()].answer = answer;
			game.setAnswer($scope.game.id, questionId, answer).then(function(){
				$scope.selectedAnswer = -1;
				$scope.indexOfRightAnswer = -1;
				$scope.getQuestion();
			});
		};

		$scope.getQuestion = function(){
			$scope.play.question = {};
			navigator.geolocation.getCurrentPosition(function(pos){
				var nextQuestion = $scope.getNumberOfNextQuestion();
				game.getQuestion($scope.game.id, nextQuestion, pos.coords).then(function(data){
					$scope.questions.push(data);
					$scope.play.question = data;
				},
				function(data){
					if(data.data.info == 'finished'){
						game.allQuestions($routeParams.id).then(function(data){
							$scope.questions = data;
						});
						$scope.finished = true;
					}
					$scope.refreshPage = true;
				});
			},
			function(){
				console.log("PLEASE ENABLE COORDS");
			});
		};

		$scope.getNumberOfNextQuestion = function(){
			var count = 0;
			for(; count<$scope.questions.length; count++){
				if(!$scope.questions[count].answer)
					break;
			}
			return count;
		};

		$scope.numberOfRightQuestions = function(){
			var count = 0;
			for(var i=0; i<$scope.questions.length; i++){
				if($scope.questions[i].isRight)
					count ++;
			}
			return count;
		};

		$scope.reload = $window.location.reload;

		if($routeParams.id){
			var gameReq = game.one($routeParams.id).then(function(data){
				$scope.game = data;
			});

			var questionReq = game.allQuestions($routeParams.id).then(function(data){
				$scope.questions = data;
			});

			Promise.all([gameReq, questionReq]).then(function(){
				if($window.location.href.match("/play")){
					$scope.getQuestion();
				}
			});

		}
	}
])
.directive('playContainer', function() {
    return {
        templateUrl: 'assets/games/directives/play.html'
    };
})
.directive('finishContainer', function() {
    return {
        templateUrl: 'assets/games/directives/finish.html'
    };
});
