(function () {
    'use strict';

    var module = angular.module('matchFishing')

    function fetchLeague($http, id) {
        return $http.get("/json/leagues.json")
            .then(function (response) {
                var leagues = response.data;
                var league = null;

                for (var index = 0; index < leagues.length; index++) {
                    if (leagues[index].id == id) {
                        return leagues[index];
                    }
                }
                return league;
            });
    };

    var controller = function ($http) {
        var model = this;
        model.league = null;
        model.rounds = [];



        model.$routerOnActivate = function (next) {
            fetchLeague($http, next.params.id).then(function (league) {
                model.league = league;

                for (var index = 1; index <= league.noOfRounds; index++) {
                    model.rounds.push(index);
                }
            });
        };
    };

    module.component('leagueDetail', {
        templateUrl: "/areas/public/components/leagues/league-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: controller
    });
}());