(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.service('seasonsService', function (EnvironmentConfig) {
        var service = this;
        const seasonsUrl = `${EnvironmentConfig.serviceApi}/api/v1/seasons`;

        service.getUniqueSeasons = function getUniqueSeasons($http) {
            return $http.get(seasonsUrl)
                .then(function (response) {
                    return response.data;                    
                });
        };

        service.getSeasonDescription = function getSeasonDescription($http, seasonId) {
            return $http.get(`${seasonsUrl}/${seasonId}`)
                .then(function (response) {
                    return response.data;                    
                });
        };
    });
}());