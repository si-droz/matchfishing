(function () {
    'use strict';

    var module = angular.module('matchFishing');

    function controller($http, matchesService, anglersService) {
        var model = this;
        model.match = null;
        model.entryToAdd = null;
        model.pairs = [];
        model.anglers = [];

        model.$routerOnActivate = function (next) {
            anglersService.getAnglers($http).then(function (anglers) {
                model.anglers = anglers;
                
                matchesService.getMatch($http, next.params.matchId).then(function (match) {
                    model.match = match;
                    model.entryToAdd = {
                        'matchId': match.id,
                        'selectedAngler' : null
                    };
                    matchesService.getPairs($http, next.params.matchId).then(function (pairs) {
                        model.pairs = pairs;
                    });

                });
            })
        };

        model.addMatchEntry = function (entryToAdd, form) {
            var isValid = entryToAdd.peg > 0 &&
                entryToAdd.selectedAngler != null &&
                entryToAdd.pounds >= 0 &&
                entryToAdd.ounces >= 0 &&
                entryToAdd.ounces < 16;

            if (!isValid) return;

            entryToAdd.anglerId = entryToAdd.selectedAngler.id;
            entryToAdd.anglerName = entryToAdd.selectedAngler.forename + ' ' + entryToAdd.selectedAngler.surname

            var matchEntry = {
                "peg": entryToAdd.peg,
                "anglerName": entryToAdd.anglerName,
                "weight": entryToAdd.pounds + (entryToAdd.ounces / 16),
                "points": 0
            }
            model.match.matchEntries.push(matchEntry)

            model.entryToAdd = {
                "matchId": model.match.id
            }

            form.$setUntouched();
            form.$setPristine();

            matchesService.addMatchEntry($http, entryToAdd).then(function (response) {

            });
        };
    };

    module.component('adminMatchEntryAdd', {
        templateUrl: '/areas/admin/components/matchEntries/match-entry-add.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'matchesService', 'anglersService', controller]
    });
}());