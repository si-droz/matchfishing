(function () {
    'use strict';
    
    var module = angular.module('matchFishing');    

    function controller($http) {
        var model = this;
    };

    module.component('admin', {
        templateUrl: '/areas/admin/components/admin/admin.component.html',
        $routeConfig: [
            { path: '/tasks', component: 'adminTasks', name: 'AdminTasks', useAsDefault: 'true' },
            { path: '/anglers/add', component: 'adminAnglerAdd', name: 'AdminAnglerAdd' },
            { path: '/seasons/add', component: 'adminSeasonAdd', name: 'AdminSeasonAdd' },
            { path: '/leagues/add', component: 'adminLeagueAdd', name: 'AdminLeagueAdd' },
            { path: '/matches/...', component: 'adminMatchAdd', name: 'AdminMatchAdd' },
            { path: '/:matchId/results', component: 'adminMatchEntryAdd', name: 'AdminMatchEntryAdd'}
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: [controller]
    });
}());