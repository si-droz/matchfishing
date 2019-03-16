(function () {
    'use strict';

    var module = angular.module('matchFishing');

    function controller($http, seasonsService, matchesService) {
        var model = this;
        model.matches = [];
        model.seasons = [];
        model.selectedSeason = '';

        model.$onInit = function () {
            matchesService.getMatches($http).then(function (matches) {
                model.matches = matches;
            });

            seasonsService.getUniqueSeasonNames($http).then(function (seasons) {
                model.seasons = seasons;
            });
        };

        model.onSelectSeason = function (season) {
            if (season === 'All') {
                season = '';
            }
            model.selectedSeason = season;
        };

        model.onSelectMatch = function (match) {
            model.$router.navigate(['AdminMatchEntryAdd', { matchId: match.id }]);
        };

        model.isSeasonSelected = function (season) {
            if (season === 'All') {
                season = '';
            }

            return (model.selectedSeason === season);
        }
    };

    module.component('adminMatchAdd', {
        templateUrl: '/areas/admin/components/matches/match-add.component.html',
        $routeConfig: [
            { path: '/add', component: 'adminMatchAdd', name: 'AdminMatchAdd', useAsDefault: 'true' },
            // { path: '/:matchId/entries', component: 'adminMatchEntryAdd', name: 'AdminMatchEntryAdd' }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'seasonsService', 'matchesService', controller]
    });
}());