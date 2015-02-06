scheduleApp.factory("auth", function ($http) {
    return {

        login: function (username, password) {
            return $http.post("/login", {
                username: username,
                password: password
            }).then(function (userInfo) {
                return userInfo.data;
            });
        },

        checkUsername: function (username) {
            return $http.post("/checkUsername", {
                username: username
            }).then(function (userInfo) {
                return userInfo.data;
            });
        },

        register: function (username, password) {
            return $http.post("/register", {
                username: username,
                password: password
            }).then(function (userInfo) {
                return userInfo.data;
            });
        }
    }
});