scheduleApp.factory("schedule", function ($http) {
	function transpose(M) {  
	   var T = [];  
	   for(var i in M)  
	      for (var j in M[i])  
	         (T[j] = T[j] || [])[i] = M[i][j];  
	   return T;  
	} 

	return {
		get: function () {
			return $http.get("home/scheduleMock.json").then(function (res) {
				return transpose(res.data);	
			});
		}
	}
})