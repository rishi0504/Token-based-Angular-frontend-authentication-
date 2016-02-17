/**
 * Created by Rishabh on 2/14/2016.
 */

var url = "http://localhost:9000/";
var user = angular.module('user');


user.factory('authInterceptor', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['x-access-token'] = "" + $window.sessionStorage.token;
                config.headers['username'] = "" + $window.sessionStorage.username;
            }
            return config;
        },
        response: function (response) {
            return response;
        },
        responseError: function (response) {
            return response;
        }
    }
});

user.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});


user.controller("UserCtrl", function ($scope, $http, $window, $rootScope) {
    $scope.userdata = {};
    $http.get('http://localhost:9000/user/getdetail').success(function (response) {
        $scope.userdata.name = response[0]['name'];
        $scope.userdata.email = response[0]['email'];
        $rootScope.userdata = $scope.userdata;
    }).error(function (problem) {
        alert(problem);
    });
});
