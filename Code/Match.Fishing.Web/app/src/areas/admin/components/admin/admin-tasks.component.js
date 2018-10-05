(function () {
    'use strict';
    var module = angular.module("matchFishing");

    function controller($http) {
        var model = this;

        model.$onInit = function () {
            
        };
    };

    module.component('adminTasks', {
        templateUrl: '/areas/admin/components/admin/admin-tasks.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', controller]
    });
}());