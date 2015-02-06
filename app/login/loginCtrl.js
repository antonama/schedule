scheduleApp.controller('LoginCtrl', function($scope, $state, auth) {

	$scope.login = function () {
		auth.login($scope.username, $scope.password)
		.then(function (msg) {
			if (msg.authenticated) {
				$state.go("home");
			} else { 
				$scope.usernameError = msg.message.indexOf("username") != -1;
				$scope.passwordError = msg.message.indexOf("password") != -1;
			}
		});
	}

	$scope.clearErrors = function () {
		$scope.usernameError = null;
		$scope.passwordError = null;
	}

})