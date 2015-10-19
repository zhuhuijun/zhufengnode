/**
 * Created by Administrator on 15-10-19.
 */
var app = angular.module('shopApp');//加载模块的写法

app.controller('HomeCtrl', function ($scope) {
    $scope.title = "珠峰商城";
});
app.controller('NavBarCtrl', function ($scope, $http, $location, $rootScope) {
    $scope.logout = function () {
        $http({
            url: '/users/logout',
            method: 'POST'
        }).success(function (msg) {
                $rootScope.me = null;
                $location.path('/users/login');
            }).error(function (data) {
                $location.path('/users/login');
            });
    };
    $scope.isActive = function (path) {
        return path == $location.path();
    };
});
/*注册控制器**/
app.controller('RegCtrl', function ($scope, $http, $location) {
    $scope.title = "注册";
    $scope.save = function () {
        $http({
            url: '/users/reg',
            method: 'POST',
            data: $scope.user
        }).success(function (userff) {
                console.log(userff);
                $location.path('/users/login');

            }).error(function (data) {
                console.log(data);
                $location.path('/users/reg');
            });
    };
});
/*登录控制器**/
app.controller('LoginCtrl', function ($rootScope, $scope, $http, $location) {
    $scope.save = function () {
        $http({
            url: '/users/login',
            method: 'POST',
            data: $scope.user
        }).success(function (usertt) {
                $rootScope.me = usertt;//根上的用户
                $location.path('/home');
            }).error(function (data) {
                $location.path('/users/login');
            });
        return false;
    };
});
/***
 *后台商品列表的模块
 */
var wareModule = angular.module('wareModule', []);//这是模块的写法

wareModule.controller('WareCtrl', ['$scope', '$http', '$location', 'fileReader', 'WareService', function ($scope, $http, $location, fileReader, WareService) {
    $scope.pages = [1, 2, 3, 4];


    $scope.filter = function () {
    };
    $scope.ware = {};//添加时的对象
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope).then(function (result) {
            $scope.ware.imgsrc = result;
        });
    };
    //保存图片
    $scope.save = function () {
        var fd = new FormData();
        angular.forEach($scope.ware, function (val, key) {
            fd.append(key, val);
        });
        var options = {
            url: '/wares/add',
            method: 'POST',
            data: fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        };
        WareService.WareData.AddData($scope, options).then(function (dree) {
            $scope.wares.push(dree);
        }, function (dd) {
            console.info(dd);
        });
    };
    var options = {url: '/wares/list', method: 'GET'};
    WareService.WareData.GetData($scope, options).then(function (resuvv) {
        $scope.wares = resuvv;
    }, function (dd) {
        console.info(dd);
    });
}]);

