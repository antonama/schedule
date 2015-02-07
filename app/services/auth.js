scheduleApp.factory("auth", function ($http) {
    return {

        login: function (username, password) {
            var params = {},
                method = "GET";

            if (username && password) {
                params.username = username;
                params.password = password;
                method = "POST";
            }

            return $http({
                method: method,
                url: "/login",
                data: params
            }).then(function (res) {
                return res.data.authenticated;
            })
        },

        checkUsername: function (username) {
            return $http.post("/checkUsername", {
                username: username
            }).then(function (res) {
                return res.data.error;
            });
        },

        register: function (username, password) {
            return $http.post("/register", {
                username: username,
                password: password
            }).then(function (res) {
                return res.data.authenticated;
            });
        },

        logout: function () {
            return $http.get("/logout").then(function () {
                location.reload();
            });
        }
    }
});