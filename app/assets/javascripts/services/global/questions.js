'use strict';

angular.module('qapiApp').factory('Questions', ['Restangular',
	function(Restangular){
    
    function Questions() {
    };

    Questions.prototype.create = function(attrs) {
      this.base.create.post({ game: attrs });
    };

    Questions.prototype.all = function() {
    	return Restangular.all('games').getList().$object;
    };

    Questions.prototype.one = function(id){
    	return Restangular.one('games', id).get().$object;
    };

    return Questions;
}]);