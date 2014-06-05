
angular.module('qapiApp').controller('AuthCtrl', ['$scope', 'Player',
	function($scope, Player){
		$scope.player = Player;

		$scope.submitLogin = function(){
			$scope.player.login($scope.email, $scope.password);
		};

		$scope.submitSignUp = function(){
			$scope.player.signUp($scope.email, $scope.password, $scope.confirmPassword);
		};
	}
]);