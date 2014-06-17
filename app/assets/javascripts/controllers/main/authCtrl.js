
angular.module('qapiApp').controller('AuthCtrl', ['$scope', 'Player', '$location', '$rootScope',
	function($scope, Player, $location, $rootScope){
		$scope.player = Player;

		$scope.submitLogin = function(){
			$scope.player.login($scope.email, $scope.password).then(
				function(data){
					Player.setData(data);
					$rootScope.currentUser = data;
					$rootScope.userIsLoggedIn = true;
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
					Player.setData(data);
					$rootScope.currentUser = data;
					$rootScope.userIsLoggedIn = true;
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