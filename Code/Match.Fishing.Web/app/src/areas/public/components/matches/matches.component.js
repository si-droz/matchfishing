(function () {
    'use strict';
    
    var module = angular.module('matchFishing');    

    function controller($http) {
        var model = this;        
    };

    module.component('matches', {
        templateUrl: '/areas/public/components/matches/matches.component.html',
        $routeConfig: [
            { path: '/list', component: 'matchList', name: 'MatchList', useAsDefault: 'true' },
            { path: '/:id', component: 'matchDetail', name: 'MatchDetail' }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', controller]
    });
}());