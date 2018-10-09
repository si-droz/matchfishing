(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.service('anglersService', function (EnvironmentConfig) {
        var service = this;
        const anglersUrl = '/json/anglers.json';

        service.getAnglers = function getAnglers($http) {
            return $http.get(anglersUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        service.getAngler = function getAngler($http, id) {
            return $http.get(anglersUrl)
                .then(function (response) {
                    var anglers = response.data;
                    var angler = null;

                    for (var index = 0; index < anglers.length; index++) {
                        if (anglers[index].id == id) {
                            return anglers[index];
                        }
                    }
                    return angler;
                });
        };

        service.getLetters = function getLetters() {
            return ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        };
    });
}());