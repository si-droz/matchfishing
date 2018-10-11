(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.service('seasonsService', function (EnvironmentConfig) {
        var service = this;
        const seasonNamesUrl = `${EnvironmentConfig.serviceApi}/api/v1/season-names`;
        const seasonsUrl = `${EnvironmentConfig.serviceApi}/api/v1/seasons`;

        service.getUniqueSeasonNames = function getUniqueSeasons($http) {
            return $http.get(seasonNamesUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        service.getSeasonDescription = function getSeasonDescription($http, seasonId) {
            return $http.get(`${seasonNamesUrl}/${seasonId}`)
                .then(function (response) {
                    return response.data;
                });
        };

        service.getUniqueSeasons = function getUniqueSeasons($http) {
            return $http.get(seasonsUrl)
                .then(function (response) {
                    return response.data;
                });
        };
    });
}());