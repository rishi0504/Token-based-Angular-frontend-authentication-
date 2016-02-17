/**
 * Created by Rishabh on 2/13/2016.
 */

var url = "http://localhost:9000/";
var mod = angular.module('signin');

mod.controller("SignCtrl", function ($scope, $window, $localStorage,$location, $http) {
    $scope.message = "";
    $scope.signIn = function () {
        var userdata = $.param({
            "username": $scope.username, "password": $scope.password
        });
        $http({
            method: 'POST',
            url: url + 'api/signin',
            data: userdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $window.sessionStorage.token = data.token;
            $window.sessionStorage.username = data.user.username;
            $localStorage.statusdata = data.status;
            $location.path('/user');
        }).error(function (data, status, headers, config) {
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.username;
            $localStorage.statusdata = 0;
            $scope.message = 'Error: Invalid user or password';
        })
    }
});
















