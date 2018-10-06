(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http, matchesService) {
        var model = this;
        
        model.$onInit = function () {
            matchesService.getMatches($http).then(function (matches) {
                model.matches = matches;
            });
        };

        model.onSelectMatch = function (match) {
            model.$router.navigate(['AdminMatchEntryAdd', { matchId: match.id }]);
        };

    };

    module.component("adminMatchList", {
        templateUrl: "/areas/admin/components/matches/match-list.component.html",        
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http','matchesService', controller]
    });
}());