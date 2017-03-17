(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('matchesService', function () {
        var service = this;

        service.fetchMatches = function fetchMatches($http) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    return response.data;
                });
        };
    });
}());