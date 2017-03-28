(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http, championshipsService) {
        var model = this;
        model.championshipMatches = null;
        model.season = null;
        model.anglers = [];

        model.$routerOnActivate = function (next) {
            championshipsService.getChampionship($http, next.params.id).then(function (championshipMatches) {
                model.championshipMatches = championshipMatches;
                model.season = {
                    id: championshipMatches[0].seasonId,
                    description: championshipMatches[0].season
                };
            });
        };
    };

    module.component('championshipDetail', {
        templateUrl: "/areas/public/components/championships/championship-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'championshipsService', controller]
    });
}());