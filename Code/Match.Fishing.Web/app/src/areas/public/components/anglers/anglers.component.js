(function () {
    'use strict';
    
    var module = angular.module('matchFishing');    

    function controller($http) {
        var model = this;        
    };

    module.component('anglers', {
        templateUrl: '/areas/public/components/anglers/anglers.component.html',
        $routeConfig: [
            { path: '/list', component: 'anglerList', name: 'AnglerList', useAsDefault: 'true' },
            { path: '/:id', component: 'anglerDetail', name: 'AnglerDetail' }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', controller]
    });
}());