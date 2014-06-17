
angular.module('qapiApp').controller('MainCtrl', ['$scope', 'User', '$location', '$rootScope',
	function ($scope, User, $location, $rootScope) {
		var user = new User();

		user.current().then(
			function(data){
				$rootScope.currentUser = data;
				$rootScope.userIsLoggedIn = true;
			},
			function(){
				$location.path('/login');
			}
		);
	}
]);