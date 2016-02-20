/**
 * Created by Rishabh on 2/13/2016.
 */


var app = angular.module('app', ['ngRoute', 'signin', 'signup', 'user', 'ngStorage']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html'
        }).when('/home', {
            templateUrl: 'app/views/home.html'
        }).when('/signin', {
            templateUrl: 'app/views/signin.html',
            controller: 'SignCtrl',
            resolve: {
                status: function check($window, $location) {
                    if ($window.sessionStorage.token) {
                        $location.path('/user');
                    }
                }
            }
        }).when('/signup', {
            templateUrl: 'app/views/signup.html',
            controller: 'SignUp',
            resolve: {
                status: function check($window, $location) {
                    if ($window.sessionStorage.token) {
                        $location.path('/user');
                    }
                }
            }
        }).when('/user', {
            templateUrl: 'app/views/user.html',
            controller: 'UserCtrl',
            resolve: {
                status: function check($window, $location) {
                    if (!$window.sessionStorage.token) {
                        $location.path('/signin');
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
    /* if (!$window.sessionStorage.token && $window.sessionStorage.token == "") {
     $location.path('/signin');
     } else {
     $location.path('/user');
     }*/
});


app.controller('MainCtrl', function ($scope, $rootScope, $window, $localStorage, $location) {
    $scope.user = {};
    $scope.islogin = function () {
        if ($window.sessionStorage.token && $window.sessionStorage.username != "") {
            $scope.user.name = $window.sessionStorage.username;
            return true;
        }
    }

    $scope.islogout = function () {
        $window.sessionStorage.token = "";
        $window.sessionStorage.username = "";
        $location.path('/signin');
    }
});
