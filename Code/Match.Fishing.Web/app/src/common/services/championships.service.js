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

                    return championshipMatches;
                });
        };

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
}());