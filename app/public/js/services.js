/**
 * Created by Administrator on 15-10-19.
 */
var app = angular.module("shopApp");
app.service('WareService', function ($http, $q) {
    var _name;
    this.setName = function (name) {
        _name = name;
        console.log(name);
    };
    this.getName = function () {
        return _name;
    };

    var GetDataFromServer = function (scope, paras, deferred) {
        $http(paras).success(function (datalist) {
            deferred.resolve(datalist);

        }).error(function (datamsg) {
                deferred.reject(datamsg);
            });
    };

    this.WareData = {
        GetData: function (scope, options) {
            var deferred = $q.defer();
            GetDataFromServer(scope, options, deferred);
            return deferred.promise;
        },
        AddData: function (scope, options) {
            var deferred = $q.defer();
            $http(options).success(function (warenew) {
                deferred.resolve(warenew);
            }).error(function (msgdd) {
                    deferred.reject(msgdd);
                });
            return deferred.promise;
        }
    }
});

