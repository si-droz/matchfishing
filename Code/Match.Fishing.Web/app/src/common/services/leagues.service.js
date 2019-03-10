(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.service('leaguesService', function (EnvironmentConfig) {
        var service = this;
        const matchesUrl = `${EnvironmentConfig.serviceApi}/api/v1/matches`;
        const leaguesUrl = `${EnvironmentConfig.serviceApi}/api/v1/leagues`;
        const leaguesCurrentSeasonUrl = `${EnvironmentConfig.serviceApi}/api/v1/leagues/current-season`;

        service.getLeagues = function getUniqueLeagues($http) {
            return $http.get(leaguesUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        service.getLeague = function getLeague($http, id) {
            return $http.get(`${leaguesUrl}/${id}`)
                .then(function (response) {
                    return response.data;
                });
        };

        // this is woefully inefficient - It will eventually be replaced with web API calls 
        service.getAnglersForLeague = function getAnglersForLeague($http, leagueId, topMatchCount) {
            return $http.get(matchesUrl)
                .then(function (response) {
                    var matches = response.data;
                    var leagueMatches = getLeagueMatches(matches, leagueId);
                    var uniqueAnglers = getUniqueAnglers(leagueMatches);
                    var anglers = getAnglerDetails(uniqueAnglers, leagueMatches, topMatchCount);

                    return anglers;
                });
        };

        service.getLeaguesForCurrentSeason = function getLeaguesForCurrentSeason($http) {
            return $http.get(leaguesCurrentSeasonUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        function getLeagueMatches(matches, leagueId) {
            var leagueMatches = [];
            for (var matchIndex = 0; matchIndex < matches.length; matchIndex++) {
                var match = matches[matchIndex];
                if (match.leagueId == leagueId) {
                    leagueMatches.push(matches[matchIndex]);
                }
            }

            return leagueMatches;
        };

        function getUniqueAnglers(leagueMatches) {
            var uniqueAnglers = [];

            for (var matchIndex = 0; matchIndex < leagueMatches.length; matchIndex++) {
                var match = leagueMatches[matchIndex];
                for (var matchEntryIndex = 0; matchEntryIndex < match.matchEntries.length; matchEntryIndex++) {
                    var matchEntry = match.matchEntries[matchEntryIndex];

                    if (uniqueAnglers.indexOf(matchEntry.anglerName) === -1) {
                        uniqueAnglers.push(matchEntry.anglerName);
                    }
                }
            }

            return uniqueAnglers;
        };

        function getAnglerDetails(uniqueAnglers, leagueMatches, topMatchCount) {
            var anglers = [];
            for (var anglerIndex = 0; anglerIndex < uniqueAnglers.length; anglerIndex++) {
                var angler = {
                    name: uniqueAnglers[anglerIndex],
                    rounds: [],
                    pointsTotal: 0,
                    weightTotal: 0,
                    adjustedPointsTotal: 0,
                    adjustedWeightTotal: 0
                };

                for (var matchIndex = 0; matchIndex < leagueMatches.length; matchIndex++) {
                    angler = getAnglerRounds(leagueMatches[matchIndex], matchIndex, angler)
                }

                anglers.push(angler);
            }

            for (var anglerIndex = 0; anglerIndex < anglers.length; anglerIndex++) {
                var angler = anglers[anglerIndex];
                var rounds = angler.rounds;
                var topRounds = getTopRounds(angler, rounds, topMatchCount);
            }

            return anglers;
        };

        function getAnglerRounds(match, matchIndex, angler) {
            var roundAdded = false;
            var round = {
                number: matchIndex,
                weight: 0,
                points: 0,
                isCounted: true
            }

            for (var matchEntryIndex = 0; matchEntryIndex < match.matchEntries.length; matchEntryIndex++) {
                var matchEntry = match.matchEntries[matchEntryIndex];

                if (angler.name == matchEntry.anglerName) {
                    round.weight = matchEntry.weight;
                    round.points = matchEntry.points;
                    angler.rounds.push(round);
                    angler.pointsTotal += round.points;
                    angler.weightTotal += round.weight;
                    roundAdded = true;
                }
            }

            if (!roundAdded) {
                angler.rounds.push(round);
            }

            return angler;
        };

        function getTopRounds(angler, rounds, topMatchCount) {
            rounds.sort(function (a, b) {
                if(b.points !== a.points){
                    return b.points - a.points;
                }
                return b.weight - a.weight;
            });

            var topRounds = rounds;
            if (rounds.length > topMatchCount) {
                topRounds = rounds.slice(0, topMatchCount);
                var worseCount = rounds.length - topMatchCount;
                var worseMatches = rounds.slice(-worseCount);

                worseMatches.forEach(function (worseMatch) {
                    worseMatch.isCounted = false;
                }, this);
            }

            for (var topRoundIndex = 0; topRoundIndex < topRounds.length; topRoundIndex++) {
                var round = topRounds[topRoundIndex];
                angler.adjustedPointsTotal += round.points;
                angler.adjustedWeightTotal += round.weight;
            }

            rounds.sort(function (a, b) {
                return a.number - b.number;
            });

            return topRounds;
        };
    });
}());