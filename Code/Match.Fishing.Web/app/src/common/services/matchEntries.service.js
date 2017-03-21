(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('matchEntriesService', function () {
        var service = this;

        service.fetchMatchEnteries = function fetchMatchEnteries($http) {
            return $http.get("/json/matchEntries.json")
                .then(function (response) {
                    return response.data;
                });
        };

        service.fetchMatchesForAngler = function fetchMatchesForAngler($http, anglerId) {
            return $http.get("/json/matchEntries.json")
                .then(function (response) {
                    var matches = response.data;
                    var filteredMatches = [];

                    for (var index = 0; index < matches.length; index++) {
                        if (matches[index].anglerId === anglerId) {
                            filteredMatches.push(matches[index]);
                        }
                    }

                    return filteredMatches;
                });
        };
    });
}());