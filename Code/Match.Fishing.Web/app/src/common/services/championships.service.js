(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.service('championshipsService', function (EnvironmentConfig) {
        var service = this;
        const rootUrl = `${EnvironmentConfig.serviceApi}/api/v1/`;
        const championshipsUrl = `${rootUrl}championships`;

        service.getChampionship = function getChampionship($http, seasonId) {
            return $http.get(`${championshipsUrl}/${seasonId}/anglers`)
                .then(function (response) {
                    return response.data;
                });
        };

        service.getOverviewResults = function getOverviewResults($http, seasonId, matchesService, leaguesService) {
            return $http.get(`${rootUrl}seasons/${seasonId}/matches`)
                .then(function (response) {
                    var matches = response.data;
                    var overviewResults = [];
                    var uniqueLeagueIds = [];
                    var sortOrder = 10;

                    matches.forEach(function (match) {
                        if (match.isTrophyMatch) {
                            if (match.isPairs) {
                                getPairsResult(matchesService, match, overviewResults, sortOrder);                                
                            } else {
                                overviewResults.push(getTrophyResult(match, sortOrder));
                            }
                        } else {
                            if (!uniqueLeagueIds.includes(match.leagueId)) {
                                uniqueLeagueIds.push(match.leagueId);
                            }
                        }
                        sortOrder += 1;
                    }, this);

                    uniqueLeagueIds.forEach(function (leagueId) {
                        leaguesService.getLeague($http, leagueId).then(function (league) {
                            leaguesService.getAnglersForLeague($http, league.id, league.countingRounds).then(function (anglers) {
                                overviewResults.push(getLeagueResult(league, anglers));
                            });
                        });
                    }, this);

                    service.getChampionship($http, seasonId).then(function (anglers) {
                        var orderedAnglers = anglers.sort(function (a, b) { return b.pointsTotal - a.pointsTotal });
                        overviewResults.push(getChampionshipResult(orderedAnglers));
                        overviewResults.push(getWoodenSpoonResult(orderedAnglers));
                    });

                    return overviewResults;
                });

            function getPairsResult(matchesService, match, overviewResults, sortOrder) {
                var pairsMatchSortOrder = sortOrder;
                matchesService.getPairs($http, match.id).then(function (pairs) {
                    var delimiter = ' & ';
                    if (pairs[0].peg2 == null){
                        delimiter = ' ';
                    } 

                    var winner = pairs[0].angler1 + delimiter + pairs[0].angler2;
                    var overviewResult = {
                        matchName: match.trophyName,
                        isTrophyMatch: match.isTrophyMatch,
                        matchDate: match.date,
                        matchVenue: match.venue,
                        matchLake: match.lake,
                        winner: winner,
                        winnerWeight: pairs[0].weight,
                        runnerUp: pairs[1].angler1 + ' & ' + pairs[1].angler2,
                        runnerUpWeight: pairs[1].weight,
                        isWoodenSpoon: false,
                        sortOrder: pairsMatchSortOrder
                    };

                    overviewResults.push(overviewResult);
                });
            };

            function getTrophyResult(match, sortOrder) {
                var winner = '';
                var winningWeight = '';
                var runnerUp = '';
                var runnerUpWeight = '';
                var orderMatchEntries = match.matchEntries.sort(function (a, b) { return a.position - b.position });

                if (orderMatchEntries !== undefined && orderMatchEntries.length > 0) {
                    winner = orderMatchEntries[0].anglerName;
                    winningWeight = orderMatchEntries[0].weight;
                    runnerUp = orderMatchEntries[1].anglerName;
                    runnerUpWeight = orderMatchEntries[1].weight;
                }

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
                    isWoodenSpoon: false,
                    sortOrder: sortOrder
                };

                return overviewResult;
            };

            function getLeagueResult(league, anglers) {
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
                    isWoodenSpoon: false,
                    sortOrder: 3
                };
                return overviewResult;
            };

            function getChampionshipResult(orderedAnglers) {
                var overviewResult = {
                    matchName: 'Championship',
                    isTrophyMatch: false,
                    matchDate: 'N/A',
                    matchVenue: 'N/A',
                    matchLake: 'N/A',
                    winner: orderedAnglers[0].name,
                    winnerPoints: orderedAnglers[0].pointsTotal,
                    runnerUp: orderedAnglers[1].name,
                    runnerUpPoints: orderedAnglers[1].pointsTotal,
                    isWoodenSpoon: false,
                    sortOrder: 1
                };

                return overviewResult;
            };

            function getWoodenSpoonResult(orderedAnglers) {
                var anglersForWoodenSpoon = [];
                orderedAnglers.forEach(function (angler) {
                    if (angler.matchCount >= 5) {
                        anglersForWoodenSpoon.push(angler);
                    }
                }, this);

                var orderedAnglersForWoodenSpoon = anglersForWoodenSpoon.sort(function (a, b) { return (a.pointsTotal / a.matchCount) - (b.pointsTotal / b.matchCount) });
                var averagePoints = orderedAnglersForWoodenSpoon[0].pointsTotal / orderedAnglersForWoodenSpoon[0].matchCount;
                var overviewResult = {
                    matchName: 'Wooden Spoon',
                    isTrophyMatch: false,
                    matchDate: 'N/A',
                    matchVenue: 'N/A',
                    matchLake: 'N/A',
                    winner: orderedAnglersForWoodenSpoon[0].name,
                    winnerPoints: averagePoints.toFixed(2),
                    isWoodenSpoon: true,
                    sortOrder: 2
                };

                return overviewResult;
            };
        }
    });
}());