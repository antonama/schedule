scheduleApp.controller('HomeCtrl', function($scope, $state, schedule, auth, global) {
	$scope.logout = function () {
        global.loading = true;
		auth.logout().then(function () {
			$state.go("login");
		});
	}

	$scope.date = moment().format("dddd, D MMMM");

	schedule.get().then(function (schedule) {
		$scope.schedule = schedule;
	});
	$scope.days = [
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница"
	]
})