scheduleApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login");

	$stateProvider.state("login", {
		url: "/login",
		templateUrl: "login/login.html"
	})
	.state("home", {
		url: "/home",
		templateUrl: "home/home.html"
	})
	.state("register", {
		url: "/register",
		templateUrl: "login/register.html"
	})

});

scheduleApp.run(function ($rootScope, $state, auth, global) {

	function authenticateUser (event, toState) {
		if (toState.name != "register" && toState.name != "login") {
			event.preventDefault();

			global.loading = true;
			auth.login().then(function (authenticated) {
				if (authenticated) {
					$rootScope.$emit("scLoginSuccess");
					$state.go(toState.name);
				} else { 
					$state.go("login");
				}
			}).finally(function () {
				global.loading = false;
			});
		}
	}

	var unsubscribe = $rootScope.$on("$stateChangeStart", authenticateUser);

	// we need to handle user authorization both in here and login page - this is for synchronization
	var unsubscribeOnLoginSuccess = $rootScope.$on("scLoginSuccess", function () {
		unsubscribe();
		unsubscribeOnLoginSuccess();

		// do not allow user to go to login or register states when he is already logged in
		$rootScope.$on("$stateChangeStart", function (event, toState) {
			if (toState.name == "register" || toState.name == "login") {
				event.preventDefault();
			}
		})
	})

	$rootScope.global = global;
});