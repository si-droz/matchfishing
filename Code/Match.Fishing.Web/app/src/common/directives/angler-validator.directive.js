(function () {
    'use strict'
    var module = angular.module('matchFishing');

    module.directive('anglerValidator', function () {
        return {
            restrict: "AE",
            scope: {
                collection: '=',
                property: '@'
            },
            require: "ngModel",
            link: function (scope, element, attributes, ctrl) {
                ctrl.$validators.invalidAngler = function (modelValue) {
                    if (!ctrl.$isEmpty(modelValue)) {
                        var anglers = scope.$parent.model.match.matchEntries.filter(function (matchEntry) {
                            return matchEntry.anglerName === (modelValue.forename + ' ' + modelValue.surname);
                        });

                        return anglers.length === 0
                    }
                }
            }
        }

    });

}());