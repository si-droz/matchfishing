(function () {
    'use strict';

    var module = angular.module("matchFishing");

    function controller() {
        var model = this;

        model.$onInit = function () {
        };
    }

    module.component("overview", {
        templateUrl: "/areas/public/components/overview/overview.component.html",
        controllerAs: "model",
        controller: [controller]
    });

}());