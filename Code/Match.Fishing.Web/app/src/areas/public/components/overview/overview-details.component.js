(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http, seasonsService) {
        var model = this;
        model.seasonDescription = null;
        model.results = [];

        model.$routerOnActivate = function (next) {
            seasonsService.getSeasonDescription($http, next.params.id).then(function (seasonDescription) {
                model.seasonDescription = seasonDescription;
            });
        };
    };

    module.component('overviewDetail', {
        templateUrl: "/areas/public/components/overview/overview-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'seasonsService', controller]
    });
}());