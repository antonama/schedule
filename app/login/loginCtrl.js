scheduleApp.controller('LoginCtrl', function($scope, $state, auth, global) {

	$scope.login = function () {
		global.loading = true;
		auth.login($scope.username, $scope.password)
			.then(function (authenticated) {
				if (authenticated) {
					$scope.$emit("scLoginSuccess");
					$state.go("home");
				}
			}, function (err) {
				clearFields();
			}).finally(function () {
				global.loading = false;
			});
	};

	function clearFields () {
		$scope.password = null;
	};

});