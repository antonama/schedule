scheduleApp.controller('RegisterCtrl', function($scope, $state, auth, global) {
	$scope.register = function () {
		global.loading = true;
		auth.register($scope.username, $scope.password).then(function (authenticated) {
			if (authenticated) {
				$state.go("home");
			}
			global.loading = false;
		})
	}

	$scope.checkUsername = function () {
		if ($scope.username) {
			$scope.usernameIsChecking = true;
			auth.checkUsername($scope.username).then(function (err) {
				$scope.usernameIsChecking = false;
				$scope.usernameIsNotAvailable = err;
			});
		}
	}
	
});