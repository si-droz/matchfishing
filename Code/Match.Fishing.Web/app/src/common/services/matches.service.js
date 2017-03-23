(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('matchesService', function () {
        var service = this;

        service.getMatches = function getMatches($http) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    return response.data;
                });
        };

        service.getMatchesForAngler = function getMatchesForAngler($http, anglerId) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    var matches = response.data;
                    var filteredMatches = [];
                    var filteredMatchEntries = [];

                    for (var index = 0; index < matches.length; index++) {
                        filteredMatchEntries = [];
                        if (matches[index].matchEntries !== undefined && matches[index].matchEntries !== null) {
                            for (var matchEntryIndex = 0; matchEntryIndex < matches[index].matchEntries.length; matchEntryIndex++) {
                                if (matches[index].matchEntries[matchEntryIndex].anglerId === anglerId) {
                                    filteredMatchEntries.push(matches[index].matchEntries[matchEntryIndex]);
                                }
                            }
                            if (filteredMatchEntries.length > 0) {
                                matches[index].matchEntries = filteredMatchEntries;
                                filteredMatches.push(matches[index]);
                            }
                        }
                    }

                    return filteredMatches;
                });
        };
    });
}());