'use strict';

var authenticateUser = function(player){
	player.isLogedIn();
};

angular.module('qapiApp').controller('PlayCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {
		authenticateUser($scope.$parent.player);
		$scope.game = Game;
		$scope.game.reset();
		$scope.game.init();
	}
  ]);

angular.module('qapiApp').controller('FinishCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {

		$scope.game = Game;
	}
  ]);

angular.module('qapiApp').controller('MainCtrl', ['$scope',
	function ($scope) {
		authenticateUser($scope.$parent.player);
	}
]);

angular.module('qapiApp').controller('UserCtrl', ['$scope', 'QapiRestangular',
	function($scope, QapiRestangular){
		authenticateUser($scope.$parent.player);

		var Restangular = QapiRestangular.getRestangular();

		$scope.users = Restangular.all('users').getList().$object;
	}
]);
