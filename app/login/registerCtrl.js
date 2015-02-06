scheduleApp.controller('RegisterCtrl', function($scope, $timeout, auth) {
	$scope.register = function () {
		$scope.registerInProgress = true;
		auth.register().then(function () {
			$scope.registerInProgress = false;
		})
	}

	$scope.checkUsername = function () {
		$scope.usernameIsChecking = true;
		$scope.noSuchUsername = false;	
		auth.checkUsername().then(function (usernameIsNotAvailable) {
			$scope.usernameIsChecking = false;
			$scope.usernameIsNotAvailable = usernameIsNotAvailable;
		});
	}
	
});