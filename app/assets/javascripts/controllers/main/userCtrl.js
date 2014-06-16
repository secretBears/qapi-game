
angular.module('qapiApp').controller('UserCtrl', ['$scope', 'User', '$location', '$routeParams',
	function($scope, User, $location, $routeParams){

		var userService = new User();

		userService.all().then(
			function(data){
				$scope.users = data;
			},
			function(){
				$location.path("/");
			}
		);

		if($routeParams.id){
			var id = $routeParams.id;
			userService.one(id).then(
				function(data){
					$scope.user = data;
				}
			);

			var allowFunctions = function(){
				if($scope.currentUser.id == id){

					$scope.submitEditUser = function(){
						userService.update($scope.user);
					};

					$scope.deleteUser = function(){
						if(confirm("Do you really want to delete this User?")){
							userService.delete(id).then(
								function(){
									$location.path("/");
								}
							);
						}
					};
				}
				else if($location.$$url.match("edit")){
					$location.path("users/"+id);
				}
			}


			$scope.currentUser = -1;

			userService.current().then(
				function(data){
					$scope.currentUser = data;
					allowFunctions();
				}
			);
		}
	}
]);
