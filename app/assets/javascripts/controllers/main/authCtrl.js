
angular.module('qapiApp').controller('AuthCtrl', ['$scope', 'Player', '$location',
	function($scope, Player, $location){
		$scope.player = Player;

		$scope.submitLogin = function(){
			$scope.player.login($scope.email, $scope.password).then(
				function(data){
					$location.path('/games');
				},
				function(){
					console.log('ERROR LOGIN');
				}
			);
		};

		$scope.submitSignUp = function(){
			$scope.player.signUp($scope.email, $scope.password, $scope.confirmPassword).then(
				function(data){
					$location.path('/');
				},
				function(error){
					console.log(error);
				}
			);
		};
	}
]);