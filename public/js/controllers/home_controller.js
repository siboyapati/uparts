/**
 * Created by sboyapati on 2/5/16.
 */
app.controller('homeController', ['$scope', '$http','Cars', function ($scope, $http, Cars) {

	$scope.makeSelectDisable = true;
	$scope.modelSelectDisable = true;
	$scope.optionSelectDisable = true;


	$scope.getYear = function () {
		Cars.getYear()
			.success(function (payload) {
				$scope.mnfYear = payload;
			})
			.error(function (data, status) {
				console.error('Repos error', status, data);
			})
	}

	$scope.onCarMakeChange = function() {
		var make ={year: $scope.year , make:$scope.carMake};
		$scope.modelSelectDisable = false;
		Cars.getModel(make)
			.success(function(payload) {
				$scope.model = payload;
			})
			.error(function(data, status) {
				console.error('Repos error', status, data);
			})
	}

	$scope.onMnfYearChange = function() {
		var year = {year: $scope.year};
		$scope.makeSelectDisable = false;
		Cars.getMake(year)
			.success(function(payload) {
				$scope.makeSelectDisable = false;
				$scope.make = payload;
			})
			.error(function(data, status) {
				console.error('Repos error', status, data);
			})
	}
	$scope.getYear();
}]);

