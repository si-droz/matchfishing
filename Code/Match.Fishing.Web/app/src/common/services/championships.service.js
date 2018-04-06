(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('championshipsService', function () {
        var service = this;

        service.getChampionship = function getChampionship($http, seasonId) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    var matches = response.data;
                    var championshipMatches = [];

                    matches.forEach(function (match) {
                        if (match.seasonId == seasonId) {
                            championshipMatches.push(match);
                        }
                    }, this);

                    var uniqueAnglers = getUniqueAnglers(championshipMatches);
                    var anglers = getAnglerDetails(uniqueAnglers, championshipMatches);

                    return anglers;
                });
        };

        service.getOverviewResults = function getOverviewResults($http, seasonId, matchesService) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    var matches = response.data;
                    var overviewResults = [];

                    matches.forEach(function (match) {
                        if (match.seasonId == seasonId && match.isTropheyMatch) {

                            var winner = '';
                            var winningWeight = '';
                            var runnerUp = '';
                            var runnerUpWeight = '';

                            match.matchEntries.forEach(function (matchEntry) {
                                if (match.isPairs === false) {
                                    if (matchEntry.position === 1) {
                                        winner = matchEntry.anglerName;
                                        winningWeight = matchEntry.weight;
                                    }
                                    if (matchEntry.position === 2) {
                                        runnerUp = matchEntry.anglerName;
                                        runnerUpWeight = matchEntry.weight;
                                    }
                                }
                                if (match.isPairs === true) {
                                    var pairs = matchesService.getPairs(match);
                                    var orderedPairs = pairs.sort(function (a, b) { return b.weight-a.weight });

                                    winner = orderedPairs[0].angler1 + ' ' + orderedPairs[0].angler2;
                                    winningWeight = orderedPairs[0].weight;

                                    runnerUp = orderedPairs[1].angler1 + ' ' + orderedPairs[1].angler2;
                                    runnerUpWeight = orderedPairs[1].weight;
                                }
                            }, this);

                            var overviewResult = {
                                matchName: match.trophyName,
                                isTropheyMatch: match.isTropheyMatch,
                                matchDate: match.date,
                                matchVenue: match.venue,
                                matchLake: match.lake,
                                winner: winner,
                                winnerWeight: winningWeight,
                                runnerUp: runnerUp,
                                runnerUpWeight: runnerUpWeight
                            };

                            overviewResults.push(overviewResult)
                        }
                    }, this);

                    return overviewResults;
                });
        }

        service.getUniqueSeasons = function getUniqueSeasons($http) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    var matches = response.data;
                    var uniqueSeasons = [];

                    for (var index = 0; index < matches.length; index++) {
                        var match = matches[index];

                        var season = {
                            id: match.seasonId,
                            season: match.season
                        }

                        if (!contains(uniqueSeasons, season)) {
                            uniqueSeasons.push(season);
                        }
                    }
                    return uniqueSeasons;
                });
        };

    });

    function contains(array, obj) {
        var i = array.length;
        while (i--) {
            if (array[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    function getUniqueAnglers(matches) {
        var uniqueAnglers = [];

        for (var matchIndex = 0; matchIndex < matches.length; matchIndex++) {
            var match = matches[matchIndex];
            for (var matchEntryIndex = 0; matchEntryIndex < match.matchEntries.length; matchEntryIndex++) {
                var matchEntry = match.matchEntries[matchEntryIndex];

                if (uniqueAnglers.indexOf(matchEntry.anglerName) === -1) {
                    uniqueAnglers.push(matchEntry.anglerName);
                }
            }
        }

        return uniqueAnglers;
    };

    function getAnglerDetails(uniqueAnglers, matches) {
        var anglers = [];
        for (var anglerIndex = 0; anglerIndex < uniqueAnglers.length; anglerIndex++) {
            var angler = {
                name: uniqueAnglers[anglerIndex],
                rounds: [],
                pointsTotal: 0,
                weightTotal: 0,
                matchCount: 0
            };

            for (var matchIndex = 0; matchIndex < matches.length; matchIndex++) {
                angler = getAnglerRounds(matches[matchIndex], matchIndex, angler)
            }

            anglers.push(angler);
        }

        return anglers;
    };

    function getAnglerRounds(match, matchIndex, angler) {
        var roundAdded = false;
        var round = {
            number: matchIndex,
            weight: 0,
            points: 0
        }

        for (var matchEntryIndex = 0; matchEntryIndex < match.matchEntries.length; matchEntryIndex++) {
            var matchEntry = match.matchEntries[matchEntryIndex];

            if (angler.name == matchEntry.anglerName) {
                round.weight = matchEntry.weight;
                round.points = matchEntry.points;
                angler.rounds.push(round);
                angler.pointsTotal += round.points;
                angler.weightTotal += round.weight;
                angler.matchCount += 1;
                roundAdded = true;
            }
        }

        if (!roundAdded) {
            angler.rounds.push(round);
        }

        return angler;
    };

}());