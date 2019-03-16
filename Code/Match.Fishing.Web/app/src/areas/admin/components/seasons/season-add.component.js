(function () {
    'use strict';

    var module = angular.module('matchFishing');

    function controller($http, seasonsService) {
        var model = this;
        model.seasons = [];

        model.$onInit = function () {
            seasonsService.getUniqueSeasons($http).then(function (seasons) {
                model.seasons = seasons;
            });
        };
    };

    module.component('adminSeasonAdd', {
        templateUrl: '/areas/admin/components/seasons/season-add.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'seasonsService', controller]
    });
}());