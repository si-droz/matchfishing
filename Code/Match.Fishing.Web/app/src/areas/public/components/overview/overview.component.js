(function () {
    'use strict';

    var module = angular.module("matchFishing");

    function controller($http) {
        var model = this;
    };

    module.component("overview", {
        templateUrl: "/areas/public/components/overview/overview.component.html",
        $routeConfig: [
            { path: "/list", component: "overviewList", name: "OverviewList", useAsDefault: "true" },
            { path: "/:id", component: "overviewDetail", name: "OverviewDetail" }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ["$http", controller]
    });

}());