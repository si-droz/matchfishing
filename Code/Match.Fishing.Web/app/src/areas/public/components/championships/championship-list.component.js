(function () {
    'use strict';
    var module = angular.module('matchFishing');

    function controller($http, seasonsService, championshipsService) {
        var model = this;
        model.championships = []

        model.$onInit = function () {
            seasonsService.getUniqueSeasons($http).then(function (seasons) {
                seasons.forEach(function (season) {
                    championshipsService.getChampionship($http, season.id).then(function (anglers) {
                        var rounds = [];
                        if (anglers.length > 0) {
                            rounds = anglers[0].rounds;
                        }

                        var championship = {
                            'seasonId': season.id,
                            'season': season.season,
                            'anglerCount': anglers.length,
                            'rounds': rounds
                        };

                        model.championships.push(championship);
                    });
                }, this);
            });
        };

        model.onSelectSeason = function (championship) {
            model.$router.navigate(['ChampionshipDetail', { id: championship.seasonId }]);
        };
    }

    module.component('championshipList', {
        templateUrl: '/areas/public/components/championships/championship-list.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'seasonsService', 'championshipsService', controller]
    });
}());