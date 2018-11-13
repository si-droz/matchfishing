(function () {
    'use strict';

    var module = angular.module('matchFishing');

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

        service.addMatchEntry = function addMatchEntry($http, entryToAdd) {
            return $http.post(`${EnvironmentConfig.serviceApi}/api/v1/matches/${entryToAdd.matchId}/entries`, entryToAdd)
                .then(function (response) {
                    return $http.get(`${EnvironmentConfig.serviceApi}/api/v1/matches/${response.config.data.matchId}/entries`)
                        .then(function (response) {
                            return response.data;
                        });
                });
        }

        service.getMatchesForAngler = function getMatchesForAngler($http, anglerId) {
            return $http.get(`${EnvironmentConfig.serviceApi}/api/v1/anglers/${anglerId}/matches`)
                .then(function (response) {
                    return response.data;
                }).catch(function (data) {
                    console.debug(data);
                });
        };

        service.getPairs = function getPairs($http, id) {
            return $http.get(`${EnvironmentConfig.serviceApi}/api/v1/matches/${id}/pairs`)
                .then(function (response) {
                    return response.data;
                }).catch(function (data) {
                    console.debug(data);
                });
        };
    });
}());