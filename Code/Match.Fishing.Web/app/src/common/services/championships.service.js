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

        service.getOverviewResults = function getOverviewResults($http, seasonId, matchesService, leaguesService) {
            return $http.get("/json/matches.json")
                .then(function (response) {
                    var matches = response.data;
                    var overviewResults = [];
                    var uniqueLeagueIds = [];

                    matches.forEach(function (match) {
                        if (match.seasonId == seasonId) {
                            if (match.isTrophyMatch) {

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
                                        var orderedPairs = pairs.sort(function (a, b) { return b.weight - a.weight });

                                        winner = orderedPairs[0].angler1 + ' ' + orderedPairs[0].angler2;
                                        winningWeight = orderedPairs[0].weight;

                                        runnerUp = orderedPairs[1].angler1 + ' ' + orderedPairs[1].angler2;
                                        runnerUpWeight = orderedPairs[1].weight;
                                    }
                                }, this);

                                var overviewResult = {
                                    matchName: match.trophyName,
                                    isTrophyMatch: match.isTrophyMatch,
                                    matchDate: match.date,
                                    matchVenue: match.venue,
                                    matchLake: match.lake,
                                    winner: winner,
                                    winnerWeight: winningWeight,
                                    runnerUp: runnerUp,
                                    runnerUpWeight: runnerUpWeight,
                                    sortOrder: 10
                                };

                                overviewResults.push(overviewResult);
                            } else {
                                var leagueId = match.leagueId;

                                if (!uniqueLeagueIds.includes(leagueId)) {
                                    uniqueLeagueIds.push(leagueId);
                                }
                            }
                        }
                    }, this);

                    uniqueLeagueIds.forEach(function (leagueId) {
                        leaguesService.getLeague($http, leagueId).then(function (league) {
                            leaguesService.getAnglersForLeague($http, league.id, league.countingRounds).then(function (anglers) {
                                var orderedAnglers = anglers.sort(function (a, b) { return b.adjustedPointsTotal - a.adjustedPointsTotal });

                                var overviewResult = {
                                    matchName: league.name,
                                    isTrophyMatch: false,
                                    matchDate: 'N/A',
                                    matchVenue: 'N/A',
                                    matchLake: 'N/A',
                                    winner: orderedAnglers[0].name,
                                    winnerPoints: orderedAnglers[0].adjustedPointsTotal,
                                    runnerUp: orderedAnglers[1].name,
                                    runnerUpPoints: orderedAnglers[1].adjustedPointsTotal,
                                    sortOrder: 3
                                };

                                overviewResults.push(overviewResult);
                            });
                        });
                    }, this);

                    var championshipAnglers = service.getChampionship($http, seasonId).then(function (anglers) {
                        var orderedAnglers = anglers.sort(function (a, b) { return b.pointsTotal - a.pointsTotal });

                        var overviewResult = {
                            matchName: "Championship",
                            isTrophyMatch: false,
                            matchDate: 'N/A',
                            matchVenue: 'N/A',
                            matchLake: 'N/A',
                            winner: orderedAnglers[0].name,
                            winnerPoints: orderedAnglers[0].pointsTotal,
                            runnerUp: orderedAnglers[1].name,
                            runnerUpPoints: orderedAnglers[1].pointsTotal,
                            sortOrder: 1
                        };

                        overviewResults.push(overviewResult);

                        var anglersForWoodenSpoon = [];
                        orderedAnglers.forEach(function (angler) {
                            if (angler.matchCount >= 5) {
                                anglersForWoodenSpoon.push(angler);
                            }
                        }, this);

                        var orderedAnglersForWoodenSpoon = anglersForWoodenSpoon.sort(function (a, b) { return (a.pointsTotal / a.matchCount) - (b.pointsTotal / b.matchCount) });
                        var averagePoints = orderedAnglersForWoodenSpoon[0].pointsTotal / orderedAnglersForWoodenSpoon[0].matchCount;
                        var overviewResult = {
                            matchName: "Wooden Spoon",
                            isTrophyMatch: false,
                            matchDate: 'N/A',
                            matchVenue: 'N/A',
                            matchLake: 'N/A',
                            winner: orderedAnglersForWoodenSpoon[0].name,
                            winnerPoints: averagePoints.toFixed(2),
                            sortOrder: 2
                        };

                        overviewResults.push(overviewResult);

                    });

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