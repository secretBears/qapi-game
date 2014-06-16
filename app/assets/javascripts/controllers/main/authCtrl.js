
angular.module('qapiApp').controller('AuthCtrl', ['$scope', 'Player', '$location',
	function($scope, Player, $location){
		$scope.player = Player;

		$scope.submitLogin = function(){
			$scope.player.login($scope.email, $scope.password).then(
				function(data){
					Player.setData(data);
					$scope.$parent.currentUser = data;
					$location.path('/games');
				},
				function(data){
					$scope.error = data.data.error;
				}
			);
		};

		$scope.submitSignUp = function(){
			$scope.player.signUp($scope.email, $scope.password, $scope.confirmPassword).then(
				function(data){
					$scope.$parent.currentUser = {};
					$location.path('/');
				},
				function(error){
					var errorArray = [];
					var errors = error.data.errors;
					for(key in errors){
						error = errors[key];
						$scope.error = key + ' ' + error[0];
						return;
					}
				}
			);
		};
	}
]);