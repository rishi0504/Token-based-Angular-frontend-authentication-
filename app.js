/**
 * Created by Rishabh on 2/13/2016.
 */


var app = angular.module('app', ['ngRoute', 'signin', 'user', 'ngStorage']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html'
        }).when('/signin', {
            templateUrl: 'app/views/signin.html',
            controller: 'SignCtrl'
        }).when('/user', {
            templateUrl: 'app/views/user.html',
            controller: 'UserCtrl'
        }).when('/setting', {
            templateUrl: 'app/views/setting.html'
        }).otherwise({
            redirectTo: '/'
        });

});


app.controller('MainCtrl', function ($scope, $window, $localStorage, $location) {
    $scope.islogin = function () {
        if ($window.sessionStorage.token != "") {
            if ($localStorage.statusdata == 200) {
                return true;
            }
        }
    }
    $scope.islogout = function () {
        $localStorage.statusdata = 0;
        $window.sessionStorage.token = "";
        $location.path('/signin');
    }
});
