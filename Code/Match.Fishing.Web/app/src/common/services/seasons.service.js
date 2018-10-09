(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.service('seasonsService', function (EnvironmentConfig) {
        var service = this;
        const matchesUrl = `${EnvironmentConfig.serviceApi}/api/v1/matches`;

        service.getUniqueSeasons = function getUniqueSeasons($http) {
            return $http.get(matchesUrl)
                .then(function (response) {
                    var matches = response.data;
                    var uniqueSeasons = ['All'];

                    for (var index = 0; index < matches.length; index++) {
                        if (uniqueSeasons.indexOf(matches[index].season) === -1) {
                            uniqueSeasons.push(matches[index].season);
                        }
                    }
                    return uniqueSeasons;
                });
        };

        service.getSeasonDescription = function getSeasonDescription($http, seasonId) {
            return $http.get(matchesUrl)
                .then(function (response) {
                    var matches = response.data;
                    var seasonDescription = 'season id ' + seasonId + ' not found';

                    for (var index = 0; index < matches.length; index++) {
                        var match = matches[index];
                        if (match.seasonId == seasonId) {
                            seasonDescription = match.season;
                            break;
                        }
                    }

                    return seasonDescription;
                });
        };
    });
}());