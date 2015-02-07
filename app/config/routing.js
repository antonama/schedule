scheduleApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login");

	$stateProvider.state("login", {
		url: "/login",
		templateUrl: "login/login.html"
	})
	.state("home", {
		url: "/home",
		template: "<a href='javascript:void(0)' ng-click=logout()>Logout</a>",
		controller: function ($scope, $state, auth, global) {
			$scope.logout = function () {
                global.loading = true;
				auth.logout().then(function () {
					$state.go("login");
				});
			}
		}
	})
	.state("register", {
		url: "/register",
		templateUrl: "login/register.html"
	})

});

scheduleApp.run(function ($rootScope, $state, auth, global) {
	var unsubscribe = $rootScope.$on("$stateChangeStart", function (event, toState) {
		if (toState.name != "register") {
			auth.login().then(function (authenticated) {
				if (authenticated) {
					var stateToEnter = toState.name == "login" ? "home" : toState.name;
					$state.go(stateToEnter);
					unsubscribe();
				} else { 
					$state.go("login");
				}
			});
		}
		global.loading = false;		
	});

	$rootScope.global = global;
});