(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http, matchesService) {
        var model = this;
        model.match = null;
        model.pairs = null;

        model.$routerOnActivate = function (next) {
            matchesService.getMatch($http, next.params.id).then(function (match) {
                model.match = match;
                matchesService.getPairs($http, next.params.id).then(function(pairs){
                    model.pairs = pairs;
                });                
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