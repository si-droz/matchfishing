(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('matchesService', function (EnvironmentConfig) {
        var service = this;

        const matchesUrl = `${EnvironmentConfig.serviceApi}/api/v1/matches`;

        service.getMatches = function getMatches($http) {
            return $http.get(matchesUrl)
                .then(function (response) {
                    return response.data;
                }).catch(function (data) {
                    console.debug(data);
                });
        };

        service.getMatch = function getMatch($http, id) {
            return $http.get(`${matchesUrl}/${id}`)
                .then(function (response) {
                    return response.data;                    
                }).catch(function (data) {
                    console.debug(data);
                });
        };

        service.postMatchEntry = function postMatchEntry($http, id) {

        }

        service.getMatchesForAngler = function getMatchesForAngler($http, anglerId) {           
            return $http.get(`${EnvironmentConfig.serviceApi}/api/v1/anglers/${anglerId}/matches`)
                .then(function (response) {
                    return response.data;                    
                }).catch(function (data) {
                    console.debug(data);
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