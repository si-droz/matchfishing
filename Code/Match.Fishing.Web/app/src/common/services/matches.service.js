(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('matchesService', function () {
        var service = this;

        service.getMatches = function getMatches($http) {
            return $http.get("http://localhost:61573/api/v1/matches")
                .then(function (response) {
                    return response.data;
                }).catch(function (data) {
                    console.debug(data);
                });
        };

        service.getMatch = function getMatch($http, id) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    var matches = response.data;
                    var match = null;

                    for (var index = 0; index < matches.length; index++) {
                        if (matches[index].id == id) {
                            return matches[index];
                        }
                    }
                    return match;
                });
        };

        service.postMatchEntry = function postMatchEntry($http, id){
            
        }

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

        service.getPairs = function getPairs(match) {
            var pairs = []
            if (match.isPairs) {                
                for (var index = 0; index < match.matchEntries.length; index++) {
                    var matchEntry = match.matchEntries[index];

                    var toAdd = true;
                    pairs.forEach(function (pair) {
                        if (pair.peg1 == matchEntry.peg || pair.peg2 == matchEntry.peg) {
                            toAdd = false;
                        }
                    }, this);

                    if (toAdd) {
                        var matchEntryPair = [];

                        matchEntryPair.push(matchEntry);

                        match.matchEntries.forEach(function (me) {
                            if (matchEntry.pairedWithPeg == me.peg) {
                                matchEntryPair.push(me);
                            }
                        }, this);

                        var pair = {
                            peg1: matchEntryPair[0].peg,
                            peg2: matchEntryPair[1].peg,
                            angler1: matchEntryPair[0].anglerName,
                            angler2: matchEntryPair[1].anglerName,
                            weight: matchEntryPair[0].weight + matchEntryPair[1].weight
                        }

                        if (pair.peg1 == pair.peg2) {
                            pair.peg2 = null
                            pair.angler2 = '(weight doubled)'
                        }

                        pairs.push(pair);
                    }
                }                
            }
            return pairs;
        };
    });
}());