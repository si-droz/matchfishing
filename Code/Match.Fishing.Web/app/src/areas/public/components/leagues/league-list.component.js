(function () {
    'use strict';
    var module = angular.module("matchFishing");

    function controller($http, seasonsService, leaguesService) {
        var model = this;
        model.seasons = [];
        model.leagues = [];
        model.selectedSeason = '';

        model.$onInit = function () {
            leaguesService.getLeagues($http).then(function (leagues) {
                model.leagues = leagues;
            });

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

        model.onSelectLeague = function (league) {
            model.$router.navigate(['LeagueDetail', { id: league.id }]);
        };

        model.isSeasonSelected = function (season) {
            if (season === 'All') {
                season = '';
            }

            return (model.selectedSeason === season);
        };
    }

    module.component("leagueList", {
        templateUrl: "/areas/public/components/leagues/league-list.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', 'seasonsService', 'leaguesService', controller]
    });
}());