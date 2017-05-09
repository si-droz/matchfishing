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
            { path: "/angler/...", component: "anglers", name: "Anglers" },
            { path: "/match/...", component: "matches", name: "Matches" },
            { path: "/league/...", component: "leagues", name: "Leagues" },
            { path: "/championship/...", component: "championships", name: "Championships" },
            { path: "/overview/...", component: "overview", name: "Overview" },
            { path: "/**", redirectTo: ["Home"] }
        ],
        controllerAs: "model",
        controller: [controller]
    })
}());