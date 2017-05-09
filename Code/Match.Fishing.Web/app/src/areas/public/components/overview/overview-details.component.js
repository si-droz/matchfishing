(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http) {
        var model = this;       
    };

    module.component('overviewDetail', {
        templateUrl: "/areas/public/components/overview/overview-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', controller]
    });
}());