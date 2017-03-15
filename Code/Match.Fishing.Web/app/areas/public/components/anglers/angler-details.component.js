(function () {
    'use strict';

    var module = angular.module('matchFishing')

    function fetchAngler($http, id) {
        return $http.get("/json/anglers.json")
            .then(function (response) {
                var anglers = response.data;
                var angler = null;

                for (var index = 0; index < anglers.length; index++) {
                    if (anglers[index].id == id) {
                        return anglers[index];
                    }
                }
                return angler;
            });
    };

    var controller = function ($http) {
        var model = this;
        model.angler = null;

        model.$routerOnActivate = function (next) {
            fetchAngler($http, next.params.id).then(function (angler) {
                model.angler = angler;
            });
        };
    };

    module.component('anglerDetail', {
        templateUrl: "/areas/public/components/anglers/angler-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: controller
    });
}());