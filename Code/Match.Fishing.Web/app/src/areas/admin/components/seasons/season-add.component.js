(function () {
    'use strict';
    
    var module = angular.module("matchFishing");    

    function controller($http) {
        var model = this;        
    };

    module.component("seasonAdd", {
        templateUrl: "/areas/admin/components/seasons/season-add.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ['$http', controller]
    });
}());