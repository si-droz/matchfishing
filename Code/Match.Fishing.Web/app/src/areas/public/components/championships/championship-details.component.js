(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http, championshipsService, seasonsService) {
        var model = this;
        model.season = null;
        model.anglers = [];
        model.rounds = [];

        model.$routerOnActivate = function (next) {
            championshipsService.getChampionship($http, next.params.id).then(function (anglers) {
                model.anglers = anglers;
                model.rounds = anglers[0].rounds;
                
                var seasonId = next.params.id;

                seasonsService.getSeasonDescription($http, seasonId).then(function (seasonDescription) {
                    model.season = {
                        id: seasonId,
                        description: seasonDescription
                    };
                });
            });
        };
    };

    module.component('championshipDetail', {
        templateUrl: '/areas/public/components/championships/championship-details.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'championshipsService', 'seasonsService', controller]
    });
}());