(function () {
    'use strict';
    
    var module = angular.module('matchFishing');    

    function controller($http) {
        var model = this;        
    };

    module.component('adminMatchEntries', {
        templateUrl: '/areas/admin/components/matchEntries/match-entries.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', controller]
    });
}());