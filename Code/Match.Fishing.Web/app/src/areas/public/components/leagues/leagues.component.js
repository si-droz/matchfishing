(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http) {
        var model = this;        
    };

    module.component("leagues", {
        templateUrl: '/areas/public/components/leagues/leagues.component.html',
        $routeConfig: [
            { path: "/list", component: "leagueList", name: "LeagueList", useAsDefault: "true" },
            { path: "/:id", component: "leagueDetail", name: "LeagueDetail" }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ["$http", controller]
    });
}());