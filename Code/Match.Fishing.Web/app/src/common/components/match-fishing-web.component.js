(function () {
    'use strict';

    var module = angular.module("matchFishing");

    function controller() {
        var model = this;
        model.isCollapsed = true;
    };

    module.component("matchFishingWeb", {
        templateUrl: "/common/components/match-fishing-web.component.html",
        $routeConfig: [
            { path: "/home", component: "home", name: "Home" },
            { path: "/anglers/...", component: "anglers", name: "Anglers" },
            { path: "/matches/...", component: "matches", name: "Matches" },
            { path: "/leagues/...", component: "leagues", name: "Leagues" },
            { path: "/championships/...", component: "championships", name: "Championships" },
            { path: "/overview/...", component: "overview", name: "Overview" },
            { path: "/admin/...", component: "admin", name: "Admin" },
            { path: "/**", redirectTo: ["Home"] }
        ],
        controllerAs: "model",
        controller: [controller]
    })
}());