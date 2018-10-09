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
            { path: '/anglers', component: 'adminAnglers', name: 'AdminAnglers' },
            { path: '/anglers/add', component: 'adminAnglerAdd', name: 'AdminAnglerAdd' },
            { path: '/seasons', component: 'adminSeasons', name: 'AdminSeasons' },
            { path: '/seasons/add', component: 'adminSeasonAdd', name: 'AdminSeasonAdd' },
            { path: '/leagues', component: 'adminLeagues', name: 'AdminLeagues' },
            { path: '/leagues/add', component: 'adminLeagueAdd', name: 'AdminLeagueAdd' },
            { path: '/matches/...', component: 'adminMatches', name: 'AdminMatches' },
            { path: '/matches/add', component: 'adminMatchAdd', name: 'AdminMatchAdd' },
            { path: '/matchEntries', component: 'adminMatchEntries', name: 'AdminMatchEntries' },
            // { path: '/matchEntries/:matchId', component: 'adminMatchEntryAdd', name: 'AdminMatchEntryAdd' }
        ],
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: [controller]
    });
}());