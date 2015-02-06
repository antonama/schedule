scheduleApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login");

	$stateProvider.state("login", {
		url: "/login",
		templateUrl: "login/login.html"
	})
	.state("home", {
		url: "/home",
		template: "<div>Home</div>"
	})
	.state("register", {
		url: "/register",
		templateUrl: "login/register.html"
	})
})