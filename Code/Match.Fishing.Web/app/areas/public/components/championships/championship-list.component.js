(function () {
    'use strict';
    var module = angular.module("matchFishing");

    function controller($http) {
        var model = this;

        model.$onInit = function () {
        };
    }

    module.component("championshipList", {
        templateUrl: "/areas/public/components/championships/championship-list.component.html",
        controllerAs: "model",
        controller: ['$http', controller]
    });
}());