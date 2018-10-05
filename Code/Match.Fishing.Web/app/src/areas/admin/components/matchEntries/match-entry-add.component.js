(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http) {
        var model = this;        
    };

    module.component("matchEntryAdd", {
        templateUrl: "/areas/admin/components/matchEntries/match-entry-add.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', controller]
    });
}());