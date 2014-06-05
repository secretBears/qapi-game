'use strict';

angular.module('qapiApp').factory('QapiRestangular', ['Restangular',
	function(Restangular){
	var instance;

	var QapiRestangular = function QapiRestangular(config){
		this.config = config || {};
	};

	QapiRestangular.prototype.setConfig = function(config){
		this.config = config;
	};

	QapiRestangular.prototype.getRestangular = function(){
		return Restangular.withConfig(function(RestangularConfigurer) {
	    RestangularConfigurer.setDefaultRequestParams(this.config);
	  }.bind(this));
	};

	if(!instance){
		instance = new QapiRestangular();
	}

	return instance;
}]);