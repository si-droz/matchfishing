(function () {
    'use strict';

    var module = angular.module('matchFishing')

    var controller = function ($http, seasonsService, matchesService, anglersService) {
        var model = this;
        model.angler = null;
        model.seasons = [];
        model.matches = [];
        model.selectedSeason = '';

        model.$routerOnActivate = function (next) {
            anglersService.getAngler($http, next.params.id).then(function (angler) {
                model.angler = angler;

                seasonsService.getUniqueSeasonNames($http).then(function (seasons) {
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
    };

    module.component('anglerDetail', {
        templateUrl: '/areas/public/components/anglers/angler-details.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'seasonsService', 'matchesService', 'anglersService', controller]
    });
}());