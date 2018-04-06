(function () {
    'use strict';

    var module = angular.module('matchFishing');

    var controller = function ($http, championshipsService, seasonsService, matchesService) {
        var model = this;
        model.seasonDescription = null;
        model.overviewResults = [];

        model.$routerOnActivate = function (next) {
            seasonsService.getSeasonDescription($http, next.params.id).then(function (seasonDescription) {
                model.seasonDescription = seasonDescription;
            });

            championshipsService.getOverviewResults($http, next.params.id, matchesService).then(function (overviewResults) {
                model.overviewResults = overviewResults;
            });
        };
    };

    module.component('overviewDetail', {
        templateUrl: "/areas/public/components/overview/overview-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'championshipsService', 'seasonsService', 'matchesService', controller]
    });
}());