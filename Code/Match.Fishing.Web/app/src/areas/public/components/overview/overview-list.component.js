(function () {
    'use strict';
    var module = angular.module('matchFishing');

    function controller($http, championshipsService) {
        var model = this;
        model.seasons = [];

        model.$onInit = function () {
            championshipsService.getUniqueSeasons($http).then(function (seasons) {
                model.seasons = seasons.splice(1);
            });
        };

        model.onSelectSeason = function (season) {
            model.$router.navigate(['OverviewDetail', { id: season.id }]);
        };
    }

    module.component('overviewList', {
        templateUrl: '/areas/public/components/overview/overview-list.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'championshipsService', controller]
    });
}());