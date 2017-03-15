(function () {
    'use strict';

    var module = angular.module('matchFishing')

    function fetchMatch($http, id) {
        return $http.get("/json/matches.json")
            .then(function (response) {
                var matches = response.data;
                var match = null;

                for (var index = 0; index < matches.length; index++) {
                    if (matches[index].id == id) {
                        return matches[index];
                    }
                }
                return match;
            });
    };

    var controller = function ($http) {
        var model = this;
        model.match = null;

        model.$routerOnActivate = function (next) {
            fetchMatch($http, next.params.id).then(function (match) {
                model.match = match;
            });
        };
    };

    module.component('matchDetail', {
        templateUrl: "/areas/public/components/matches/match-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: controller
    });
}());