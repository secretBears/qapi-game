'use strict';

angular.module('qapiApp').controller('GameCtrl', ['$scope', 'Game', '$routeParams', '$window', '$timeout', 'Player',
	function ($scope, Game, $routeParams, $window, $timeout, Player) {
		/*$scope.game = Game;
		$scope.game.numberofquestions = $scope.game.numberofquestions || 0;
		$scope.game.rightQuestions = $scope.game.rightQuestions || 0;*/
		$scope.numberofquestions = 10;
		$scope.questions = [];
		$scope.showFinish = false;
		$scope.showPlay = false;
		$scope.play = {};
		$scope.selectedAnswer = -1;
		$scope.indexOfRightAnswer = -1;
		$scope.errorMessage = null;

		Player.allUsers().then(
			function(data){
				var userNames = [];
				for(var i=0; i<data.length; i++){
					userNames.push(data[i].email);
				}

				$( "#games_user_email" ).autocomplete({
		      source: userNames,
		      minLength: 3,
		      select: function( event, ui ) {
		      	$scope.addUserEmail = ui.item.value;
		      }
		    });
			}
		);


		var game = new Game();
		game.all().then(
			function(data){
				$scope.games = data;
			},
			function(){
				$window.location.href = "/#/login";
			}
		);

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

		$scope.getIndexOfAnswer = function(rightAnswer){
			var answers = $scope.play.question.answers;
			for(var i=0; i<answers.length; i++){
				if(answers[i].answer === rightAnswer.answer)
					return i;
			}
			return -1;
		};

		$scope.giveAnswer = function(questionId, answer, index){
			$scope.selectedAnswer = index;
			$scope.questions[$scope.getNumberOfNextQuestion()].answer = answer;
			game.setAnswer($scope.game.id, questionId, answer).then(
				function(data){

					$scope.indexOfRightAnswer = $scope.getIndexOfAnswer(data.rightAnswer);

					$timeout(function(){
						$scope.selectedAnswer = -1;
						$scope.indexOfRightAnswer = -1;
						$scope.getQuestion();
					}, 2000);
				},
				function(error){
					console.log(error);
				}
			);
		};

		$scope.getQuestion = function(){
			$scope.play.question = {};
			navigator.geolocation.getCurrentPosition(function(pos){
				var nextQuestion = $scope.getNumberOfNextQuestion();
				game.getQuestion($scope.game.id, nextQuestion, pos.coords).then(
					// SUCCESS
					function(data){
						if(data.info){
							game.allQuestions($routeParams.id).then(function(data){
								$scope.questions = data;
							});
							$scope.showFinish = true;
							$scope.showPlay = false;
						}
						else{
							$scope.questions.push(data);
							$scope.play.question = data;
							$scope.showPlay = true;
							$scope.showFinish = false;
						}
					},
					// ERROR
					function(data){
						$scope.errorMessage = data.data.info;
					}
				);
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

		$scope.retry = function(){
			$scope.errorMessage = null;
			$scope.getQuestion();
		};

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
        templateUrl: 'templates/games/directives/play.html'
    };
})
.directive('finishContainer', function() {
    return {
        templateUrl: 'templates/games/directives/finish.html'
    };
});
