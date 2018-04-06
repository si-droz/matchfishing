(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http, matchesService) {
        var model = this;
        model.match = null;
        model.pairs = [];

        model.$routerOnActivate = function (next) {
            matchesService.getMatch($http, next.params.id).then(function (match) {
                model.match = match;
                model.pairs = matchesService.getPairs(match);                
            });
        };
    };

    module.component('matchDetail', {
        templateUrl: "/areas/public/components/matches/match-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'matchesService', controller]
    });
}());