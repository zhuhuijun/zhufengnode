/**
 * Created by Administrator on 15-10-19.
 */
var app = angular.module('shopApp', ['ngRoute', 'wareModule']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeCtrl'
        })
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'HomeCtrl'
        })
        .when('/users/reg', {
            templateUrl: 'pages/user/reg.html',
            controller: 'RegCtrl'
        })
        .when('/users/login', {
            templateUrl: 'pages/user/login.html',
            controller: 'LoginCtrl'
        })
        .when('/ware/admin/list', {
            templateUrl: 'pages/ware/admin/list.html',
            controller: 'WareCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
//所有模块加载完的第一个方法
app.run(function ($http, $rootScope, $location) {
    //判断是否登陆的方法
    $http({
        url: '/users/validate',
        method: 'POST'
    }).success(function (usertt) {
            $rootScope.me = usertt;//根上的用户
            $location.path('/home');
        }).error(function (data) {
            $location.path('/users/login');
        });
});

//directive
app.directive('addWares', function () {
    return{
        link: function (scope, element, attrs) {//作用域，元素，属性
            element.click(function () {

                scope.$apply(function () {
                    scope.ware = {};
                });
                $('#addDialog').modal(true);
            });
        }
    };
});
//文件预览
app.directive('fileModel', function () {
    return{
        link: function (scope, element, attrs) {
            element.bind('change', function (event) {
                scope.file = element[0].files[0];
                scope.getFile();
            });
        }
    };
});
app.factory('fileReader', function ($q) {
    //读取文件成功后触发
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };
    //读取失败后触发
    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };
    //获得文件读取器
    var getReader = function (deferred, scope) {
        var filereader = new FileReader();
        filereader.onload = onLoad(filereader, deferred, scope);
        filereader.onerror = onError(filereader, deferred, scope);
        return filereader;
    };
    //读取为dataUrl
    var readAsDataUrl = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };
    //最后的返回
    return{
        readAsDataUrl: readAsDataUrl
    };
});