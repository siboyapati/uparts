angular.module('carsService', [])
	.factory('Cars', ['$http',function($http) {
		return {

			getYear : function() {
				return $http.get('/api/year');
			},
			getMake : function(year) {
				return $http.post('/api/make',year);
			},
			getModel : function(make) {
				return $http.post('/api/models',make);
			},
			getOption : function(options) {
				return $http.post('/api/options',options);
			},
		}
	}]);