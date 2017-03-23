(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('seasonsService', function () {
        var service = this;

        service.getUniqueSeasons = function getUniqueSeasons($http) {
            return $http.get("/json/matches.json")
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
    });
}());