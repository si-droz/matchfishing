(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http) {
        var model = this;        
    };

    module.component("matchAdd", {
        templateUrl: "/areas/admin/components/matches/match-add.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', controller]
    });
}());