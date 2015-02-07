scheduleApp.controller('RegisterCtrl', function($scope, auth, global) {
	$scope.register = function () {
		global.loading = true;
		auth.register().then(function () {
			global.loading = false;
		})
	}

	$scope.checkUsername = function () {
		$scope.usernameIsChecking = true;
		auth.checkUsername().then(function (usernameIsNotAvailable) {
			$scope.usernameIsChecking = false;
			$scope.usernameIsNotAvailable = usernameIsNotAvailable;
		});
	}
	
});