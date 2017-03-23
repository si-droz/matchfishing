(function () {
    'use strict';

    var module = angular.module('matchFishing');

    module.filter('weightToText', function () {
        return function (input) {
            var parts = input.toString().split('.');
            var pounds = parts[0];
            var ouncesInPound = 16;
            var ounces = 0;
            if (parts[1] !== undefined) {
                ounces = ('.' + parts[1]) * ouncesInPound;
            }

            return pounds + 'lb ' + ounces + 'oz';
        };
    });
}());