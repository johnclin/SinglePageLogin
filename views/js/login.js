/**
 * Created by John Lin on 10/13/2015.
 */
var loginApp = angular.module('loginApp', ['ngRoute']);

loginApp.config(function($routeProvider) {
    $routeProvider
        // route for the login page
        .when('/', {
            templateUrl : 'login.html',
            controller  : 'loginController'
        })

        .when('/login', {
            templateUrl : 'login.html',
            controller  : 'loginController'
        })

        // route for the employee page
        .when('/employee', {
            templateUrl : 'employee.html',
            controller  : 'employeeController'
        })
});

loginApp.controller('loginController', ['$scope','$http','$location','$window', function($scope,$http,$location,$window){


    if($window.sessionStorage.token == -1){
        $scope.errorMessage = "You have been logged out";
        $window.sessionStorage.clear();
    }

    $scope.login = function(user) {
        if(/^[a-zA-Z0-9-_]+$/.test(user.username) && /^[a-zA-Z0-9-_]+$/.test(user.password)){
            var pwHash = CryptoJS.SHA1(user.password);
            var jsonReq = {username: user.username, password: pwHash.toString()};

            $http({
                method: 'POST',
                data: jsonReq,
                url: 'http://ec2-52-24-72-40.us-west-2.compute.amazonaws.com:3000/login',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                if (response.data.code == 100){
                    $window.sessionStorage.token = response.data.token;
                    $location.path('/employee');
                }else{
                    $scope.errorMessage = response.data.message;
                }
            }, function errorCallback(response) {
                $scope.error();
            });
        }else{
            $scope.errorMessage = "Usernames and Passwords are alphanumeric only";
        }


    };

}]);

loginApp.controller('employeeController', ['$scope','$http','$location','$window', function($scope,$http,$location,$window){
    $http({
        method: 'GET',
        url: 'http://ec2-52-24-72-40.us-west-2.compute.amazonaws.com:3000/api/employeeList',
        headers: {'Authorization': 'Bearer '+$window.sessionStorage.token}
    }).then(function successCallback(response) {

        $scope.employeeData = response.data;
    }, function errorCallback(response) {
        $scope.errorMessage = 'You are not logged in, please log in before proceeding.';
        $location.path('/login');
    });

    $scope.logout = function(){
        $window.sessionStorage.token = -1;
        $location.path('/login');
    }
}]);