(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http, leaguesService) {
        var model = this;
        model.league = null;
        model.rounds = [];
        model.anglers = [];

        model.$routerOnActivate = function (next) {
            leaguesService.getLeague($http, next.params.id).then(function (league) {
                model.league = league;

                for (var index = 1; index <= league.noOfRounds; index++) {
                    model.rounds.push(index);
                }

                leaguesService.getAnglersForLeague($http, league.id, league.countingRounds).then(function (anglers) {
                    model.anglers = anglers;
                });
            });
        };
    };

    module.component('leagueDetail', {
        templateUrl: "/areas/public/components/leagues/league-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'leaguesService', controller]
    });
}());