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
            controller  : 'loginController'
        })
});

loginApp.controller('loginController', ['$scope','$http', function($scope,$http){
    $scope.master = {};

    $scope.login = function(user) {
        $scope.master = angular.copy(user);
        $scope.message = 'Logging in';
        var pwHash = CryptoJS.SHA1(user.password);

        var loginUrl = 'http://localhost:3000/login?username=' + user.username + '&password=' + pwHash;

        $http({
            method: 'GET',
            url: loginUrl,

        }).then(function successCallback(response) {
            $scope.message = 'success';
        }, function errorCallback(response) {
            $scope.error();
        });
    };

    $scope.error = function() {
        $scope.user = angular.copy($scope.master);
        $scope.message = 'error';
    };
}]);