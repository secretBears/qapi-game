
angular.module('qapiApp').controller('MainCtrl', ['$scope', 'User',
	function ($scope, User) {
		var user = new User();

		user.current().then(
			function(data){
				$scope.$parent.currentUser = data;
			}
		);
	}
]);