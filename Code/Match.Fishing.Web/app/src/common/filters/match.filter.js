(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.filter('matchFilter', function (helperService) {

        return function (items, seasonSearch, searchText) {
            var filtered = [];
            if (searchText === undefined) {
                searchText = '';
            }

            angular.forEach(items, function (item) {
                if (helperService.startsWith(item.season, seasonSearch) &&
                    (helperService.containsText(item.league, searchText) ||
                        helperService.containsText(item.trophyName, searchText))) {
                    filtered.push(item);
                }
            });

            return filtered;
        };
    });

}());

