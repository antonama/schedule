scheduleApp.controller('LoginCtrl', function($scope, $state, auth) {

	$scope.login = function () {
		auth.login($scope.username, $scope.password)
		.then(function (msg) {
			if (msg.authenticated) {
				$state.go("home");
			} else { 
				console.log("error");
			}
		});
	};

	$scope.clearErrors = function () {
		$scope.usernameError = null;
		$scope.passwordError = null;
	};

	auth.login('a','b');
});