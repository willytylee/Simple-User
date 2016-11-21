var app = angular.module('testApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http){
	$rootScope.authenticated = false;
	$rootScope.current_user = "";

	$rootScope.signout = function(){
		$http.get('/auth/signout');

		$rootScope.authenticated = false;
		$rootScope.current_user = "";	
		window.localStorage['login'] = 0;
		window.localStorage['username'] = "";	
	}
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.factory('userService', function($resource){
	return $resource('/api/users');
})

app.controller('mainController', function($scope, userService, $location, $rootScope){

	if (window.localStorage['login'] == 1){
		$rootScope.authenticated = true;
		$rootScope.current_user = window.localStorage['username'];
	}else{
		$location.path('/login');
	}

	$scope.edit = function(user){
		var user_info = {};
		user_info.username = $rootScope.current_user;
		user_info.ori_password = user.ori_password;
		user_info.password = user.password;
		if (user.password != user.confirm_password){
			$scope.message = "Incorrect Confirm Password";
		}else{
			userService.save(user_info, function(data){
				$scope.message = data.message;
			});
		}	
	}
});

app.controller('authController', function($scope, $rootScope, $location, $http){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if (data.state == "failure"){
				$scope.error_message = data.message;
			}else{
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;

				window.localStorage['login'] = 1;
				window.localStorage['username'] = data.user.username;

				$location.path('/');
			}
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			if (data.state == "failure"){
				$scope.error_message = data.message;
			}else{
				alert(data.message);
				$location.path('/login');
			}
		})
	};
});