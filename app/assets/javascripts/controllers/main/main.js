'use strict';


angular.module('qapiApp').controller('PlayCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {
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

