(function () {
    'use strict';
    var module = angular.module("matchFishing");

    function controller($http, seasonsService) {
        var model = this;
        model.seasons = [];
        model.selectedSeason = '';

        model.$onInit = function () {
            seasonsService.getUniqueSeasons($http).then(function (seasons) {
                model.seasons = seasons;
            });
        };

        model.onSelectSeason = function (season) {
            if (season === 'All') {
                season = '';
            }
            model.selectedSeason = season;
        };

        model.isSeasonSelected = function (season) {
            if (season === 'All') {
                season = '';
            }

            return (model.selectedSeason === season);
        };
    }

    module.component("overviewList", {
        templateUrl: "/areas/public/components/overview/overview-list.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'seasonsService', controller]
    });
}());