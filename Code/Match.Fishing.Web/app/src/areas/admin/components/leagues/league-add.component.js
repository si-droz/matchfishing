(function () {
    'use strict';
    
    var module = angular.module('matchFishing');    

    function controller($http, seasonsService, leaguesService) {
        var model = this;
        model.seasons = [];
        model.leagues = [];
        model.selectedSeason = '';

        model.$onInit = function () {
            leaguesService.getLeagues($http).then(function (leagues) {
                model.leagues = leagues;
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

        model.isSeasonSelected = function (season) {
            if (season === 'All') {
                season = '';
            }

            return (model.selectedSeason === season);
        };
    };

    module.component('adminLeagueAdd', {
        templateUrl: '/areas/admin/components/leagues/league-add.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'seasonsService', 'leaguesService', controller]
    });
}());