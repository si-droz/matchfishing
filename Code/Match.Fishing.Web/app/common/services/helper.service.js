(function () {
    'use strict';

    var module = angular.module("matchFishing");

    module.service('helperService', function () {
        var service = this;

        service.startsWith = function (value, prefix) {
            return value.toString().toLowerCase().indexOf(prefix.toString().toLowerCase()) === 0;
        };

        service.containsText = function (value, searchText) {
            return value.toString().toLowerCase().includes(searchText.toString().toLowerCase());
        }
    });
}());