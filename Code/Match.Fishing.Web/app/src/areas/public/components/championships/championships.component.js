(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http) {
        var model = this;        
    };

    module.component("championships", {
        templateUrl: '/areas/public/components/championships/championships.component.html',
        $routeConfig: [
            { path: "/list", component: "championshipList", name: "ChampionshipList", useAsDefault: "true" },
            { path: "/:id", component: "championshipDetail", name: "ChampionshipDetail" }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ["$http", controller]
    });
}());