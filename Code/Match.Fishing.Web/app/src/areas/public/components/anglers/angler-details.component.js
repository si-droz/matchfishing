(function () {
    'use strict';

    var module = angular.module('matchFishing')

    function fetchAngler($http, id) {
        return $http.get("/json/anglers.json")
            .then(function (response) {
                var anglers = response.data;
                var angler = null;

                for (var index = 0; index < anglers.length; index++) {
                    if (anglers[index].id == id) {
                        return anglers[index];
                    }
                }
                return angler;
            });
    };

    var controller = function ($http, seasonsService, matchesService) {
        var model = this;
        model.angler = null;
        model.seasons = [];
        model.matches = [];
        model.selectedSeason = '';

        model.$routerOnActivate = function (next) {
            fetchAngler($http, next.params.id).then(function (angler) {
                model.angler = angler;

                seasonsService.getUniqueSeasons($http).then(function (seasons) {
                    model.seasons = seasons;
                });

                matchesService.getMatchesForAngler($http, next.params.id).then(function (matches) {
                    model.matches = matches;
                });
            });
        };

        model.onSelectSeason = function (season) {
            if (season === 'All') {
                season = '';
            }
            model.selectedSeason = season;
        };

        model.isSeasonSelected = function (season) {
            if (season === 'All') {
                season = '';
            }

            return (model.selectedSeason === season);
        }

        module.filter('matchFilter', function (helperService) {

            return function (items, seasonSearch) {
                var filtered = [];

                angular.forEach(items, function (item) {
                    if (helperService.startsWith(item.season, seasonSearch)) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        });

    };

    module.component('anglerDetail', {
        templateUrl: "/areas/public/components/anglers/angler-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: controller
    });
}());