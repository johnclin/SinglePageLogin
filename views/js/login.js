/**
 * Created by John Lin on 10/13/2015.
 */
var loginApp = angular.module('loginApp', ['ngRoute']);

loginApp.config(function($routeProvider) {
    $routeProvider
        // route for the login page
        .when('/', {
            templateUrl : '../login.html',
            controller  : 'loginController'
        })

        // route for the employee page
        .when('/employee', {
            templateUrl : 'employee.html',
            controller  : 'employeeController'
        })
});

loginApp.controller('loginController', ['$scope','$http','$location', function($scope,$http,$location){
    $scope.master = {};
    $scope.master.isLoggedIn = 0;
    console.log($scope.master.isLoggedIn);

    if($scope.isLoggedIn){
        $location.path('/employee');
    }

    $scope.login = function(user) {
        $scope.master = angular.copy(user);
        $scope.errorMessage = 'Logging in';
        var pwHash = CryptoJS.SHA1(user.password);
        var jsonReq = {username: user.username, password: pwHash.toString()};

        $http({
            method: 'POST',
            data: jsonReq,
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.errorMessage = response.data.message;
            if (response.data.code == 100){
                $scope.isLoggedIn = 1;
                console.log($scope.master.isLoggedIn);
                $location.path('/employee');

            }
        }, function errorCallback(response) {
            $scope.error();
        });
    };

    $scope.error = function() {
        $scope.user = angular.copy($scope.master);
        $scope.errorMessage = 'error';
    };
}]);

loginApp.controller('employeeController', ['$scope','$http','$location', function($scope,$http,$location){
    //console.log($scope.master.isLoggedIn);
    //if(!$scope.isLoggedIn){
    $http({
        method: 'GET',
        url: 'http://localhost:3000/employeeList'
    }).then(function successCallback(response) {
        console.log(response.data);
        $scope.employeeData = response.data;
    }, function errorCallback(response) {
        $scope.error();
    });

    //}
}]);