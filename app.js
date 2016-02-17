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
            controller: 'SignCtrl',
            resolve: {
                status: function check($window, $location) {
                    if ($window.sessionStorage.token && $window.sessionStorage.token != "" ) {
                        if ($location.path('/signin')){
                            $location.path('/user');
                        }
                    }
                }
            }
        }).when('/user', {
            templateUrl: 'app/views/user.html',
            controller: 'UserCtrl',
            resolve: {
                status: function check($window, $location) {
                    if (!$window.sessionStorage.token && $window.sessionStorage.token == "") {
                        if ($location.path('/user')){
                            $location.path('/signin');
                        }
                    }
                }
            }
        }).when('/setting', {
            templateUrl: 'app/views/setting.html'
        }).otherwise({
            redirectTo: '/'
        });

});

app.run(function ($window, $location) {
    if (!$window.sessionStorage.token && $window.sessionStorage.token == "") {
        $location.path('/signin');
    } else {
        $location.path('/user');
    }
});


app.controller('MainCtrl', function ($scope, $rootScope, $window, $localStorage, $location) {
    $scope.user = {};
    $scope.islogin = function () {
        if ($window.sessionStorage.token != "" && $window.sessionStorage.username != "") {
            if ($localStorage.statusdata == 200) {
                $scope.user.name = $window.sessionStorage.username;
                return true;
            }
        }
    }


    $scope.islogout = function () {
        $localStorage.statusdata = 0;
        $window.sessionStorage.token = "";
        $window.sessionStorage.username = "";
        $location.path('/signin');
    }
});
