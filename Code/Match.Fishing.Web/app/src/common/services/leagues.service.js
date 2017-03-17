(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('leaguesService', function () {
        var service = this;

        service.fetchLeagues = function fetchUniqueLeagues($http) {
            return $http.get("/json/leagues.json")
                .then(function (response) {
                    return response.data;
                });
        };
    });
}());