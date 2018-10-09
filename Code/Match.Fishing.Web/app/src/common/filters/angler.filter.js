(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.filter('anglerFilter', function (helperService) {

        return function (items, letter, searchText) {
            var filtered = [];
            if (searchText === undefined) {
                searchText = '';
            }
    
            angular.forEach(items, function (item) {
                if (helperService.startsWith(item.forename, letter) &&
                    (helperService.containsText(item.forename, searchText) ||
                        helperService.containsText(item.surname, searchText))) {
                    filtered.push(item);
                }
            });
    
            return filtered;
        };
    });

}());

