(function () {
    'use strict';
    
    var module = angular.module('matchFishing');    

    function controller($http, matchesService) {
        var model = this;        
        model.match = null;
        model.entryToAdd = null;
        model.pairs = [];

        model.$routerOnActivate = function (next) {
            matchesService.getMatch($http, next.params.matchId).then(function (match) {
                model.match = match;
                model.entryToAdd = {
                    "matchId": match.id
                };
                matchesService.getPairs($http, next.params.matchId).then(function(pairs){
                    model.pairs = pairs;
                });
            });
        };

        model.addMatchEntry = function(entryToAdd){
            matchesService.addMatchEntry($http, entryToAdd).then(function(response) {
                
            });
        };
    };

    module.component('adminMatchEntryAdd', {
        templateUrl: '/areas/admin/components/matchEntries/match-entry-add.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'matchesService', controller]
    });
}());