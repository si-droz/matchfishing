(function () {
    'use strict'
    var module = angular.module('matchFishing');

    module.directive('pegValidator', function () {
        return {
            restrict: "AE",
            scope: {
                collection: '=',
                property: '@'
            },
            require: "ngModel",
            link: function (scope, element, attributes, ctrl) {
                ctrl.$validators.invalidPeg = function (modelValue) {
                    if (!ctrl.$isEmpty(modelValue)) {
                        var pegs = scope.$parent.model.match.matchEntries.filter(function (matchEntry) {
                            return matchEntry.peg === modelValue;
                        });

                        return pegs.length === 0
                    }
                }
            }
        }

    });

}());