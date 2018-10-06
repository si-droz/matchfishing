(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http, matchesService) {
        var model = this;        
        model.match = null;
        model.pairs = [];

        model.$routerOnActivate = function (next) {
            matchesService.getMatch($http, next.params.matchId).then(function (match) {
                model.match = match;
                model.pairs = matchesService.getPairs(match);                
            });
        };
    };

    module.component("adminMatchEntryAdd", {
        templateUrl: "/areas/admin/components/matchEntries/match-entry-add.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'matchesService', controller]
    });
}());