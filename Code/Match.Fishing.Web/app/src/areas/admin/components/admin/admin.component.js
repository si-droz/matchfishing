(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http) {
        var model = this;        
    };

    module.component("admin", {
        templateUrl: '/areas/admin/components/admin/admin.component.html',
        $routeConfig: [
            { path: "/tasks", component: "adminTasks", name: "AdminTasks", useAsDefault: "true" },
            { path: "/anglers", component: "anglers", name: "AdminAnglers" },
            { path: "/anglers/add", component: "anglerAdd", name: "AdminAnglerAdd" },
            { path: "/seasons", component: "seasons", name: "AdminSeasons" },
            { path: "/seasons/add", component: "seasonAdd", name: "AdminSeasonAdd" },
            { path: "/leagues", component: "leagues", name: "AdminLeagues" },
            { path: "/leagues/add", component: "leagueAdd", name: "AdminLeagueAdd" },
            { path: "/matches", component: "matches", name: "AdminMatches" },
            { path: "/matches/add", component: "matchAdd", name: "AdminMatchAdd" },
            { path: "/matchEntries", component: "matchEntries", name: "AdminMatchEntries" },
            { path: "/matchEntries/add", component: "matchEntryAdd", name: "AdminMatchEntryAdd" }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ["$http", controller]
    });
}());