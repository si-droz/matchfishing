(function () {
    'use strict';
    
    var module = angular.module('matchFishing');    

    function controller($http) {
        var model = this;        
    };

    module.component('adminSeasons', {
        templateUrl: '/areas/admin/components/seasons/seasons.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', controller]
    });
}());