scheduleApp.controller('LoginCtrl', function($scope, $state, auth, global) {

	$scope.login = function () {
		global.loading = true;
		auth.login($scope.username, $scope.password)
			.then(function (authenticated) {
				$state.go("home");
			}, function (err) {
				clearFields();
			});
	};

	function clearFields () {
		$scope.password = null;
	};
});