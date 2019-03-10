(function () {
    'use strict';
    var module = angular.module('matchFishing');

    function controller($http, leaguesService, championshipsService) {
        var model = this;
        model.season = "";
        model.league1Name = "";
        model.league1Anglers = [];
        model.league2Name = "";
        model.league2Anglers = [];
        model.championshipAnglers = [];

        model.$onInit = function () {
            $("#imageCarousel").carousel({
                interval: 5000
            }).on('slide.bs.carousel', function (e) {
                var nextH = $(e.relatedTarget).height();
                $(this).find('div.active').parent().animate({ height: nextH }, 500);
            });

            leaguesService.getLeaguesForCurrentSeason($http).then(function (leagues) {
                var league1 = leagues[0];
                var league2 = leagues[1];

                model.season = league1.season;
                model.league1Name = league1.name;
                model.league2Name = league2.name;

                leaguesService.getAnglersForLeague($http, league1.id, league1.countingRounds).then(function (anglers) {
                    model.league1Anglers = anglers;
                });

                leaguesService.getAnglersForLeague($http, league2.id, league2.countingRounds).then(function (anglers) {
                    model.league2Anglers = anglers;
                });

                championshipsService.getChampionship($http, league1.seasonId).then(function (anglers) {
                    model.championshipAnglers = anglers;
                });
            });
        };
    }

    module.component('home', {
        templateUrl: '/areas/public/components/home/home.component.html',
        controllerAs: 'model',
        controller: ['$http', 'leaguesService', 'championshipsService', controller]
    });
}());