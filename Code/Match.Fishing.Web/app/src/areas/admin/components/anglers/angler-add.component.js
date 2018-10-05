(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http) {
        var model = this;        
    };

    module.component("anglerAdd", {
        templateUrl: "/areas/admin/components/anglers/angler-add.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', controller]
    });
}());