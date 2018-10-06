(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller() {
        var model = this;
    };

    module.component("adminMatches", {
        templateUrl: "/areas/admin/components/matches/matches.component.html",
        $routeConfig: [
            { path: "/list", component: "adminMatchList", name: "AdminMatchList", useAsDefault: "true" },
            { path: "/:matchId/entries", component: "adminMatchEntryAdd", name: "AdminMatchEntryAdd" }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: [controller]
    });
}());