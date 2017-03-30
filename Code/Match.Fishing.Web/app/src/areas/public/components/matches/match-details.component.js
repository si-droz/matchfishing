(function () {
    'use strict';

    var module = angular.module('matchFishing');

    function getMatch($http, id) {
        return $http.get("/json/matches.json")
            .then(function (response) {
                var matches = response.data;
                var match = null;

                for (var index = 0; index < matches.length; index++) {
                    if (matches[index].id == id) {
                        return matches[index];
                    }
                }
                return match;
            });
    };

    var controller = function ($http) {
        var model = this;
        model.match = null;
        model.pairs = [];

        model.$routerOnActivate = function (next) {
            getMatch($http, next.params.id).then(function (match) {
                model.match = match;

                if (model.match.isPairs) {
                    var pairs = []
                    for (var index = 0; index < match.matchEntries.length; index++) {
                        var matchEntry = match.matchEntries[index];

                        var toAdd = true;
                        pairs.forEach(function (pair) {
                            if (pair.peg1 == matchEntry.peg || pair.peg2 == matchEntry.peg) {
                                toAdd = false;
                            }
                        }, this);

                        if (toAdd) {
                            var matchEntryPair = [];

                            matchEntryPair.push(matchEntry);

                            match.matchEntries.forEach(function (me) {
                                if (matchEntry.pairedWithPeg == me.peg) {
                                    matchEntryPair.push(me);
                                }
                            }, this);

                            var pair = {
                                peg1: matchEntryPair[0].peg,
                                peg2: matchEntryPair[1].peg,
                                angler1: matchEntryPair[0].anglerName,
                                angler2: matchEntryPair[1].anglerName,
                                weight: matchEntryPair[0].weight + matchEntryPair[1].weight
                            }

                            if (pair.peg1 == pair.peg2) {
                                pair.peg2 = null
                                pair.angler2 = '(weight doubled)'
                            }

                            pairs.push(pair);
                        }
                    }
                    model.pairs = pairs;
                }
            });
        };
    };

    module.component('matchDetail', {
        templateUrl: "/areas/public/components/matches/match-details.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: controller
    });
}());