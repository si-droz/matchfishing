(function () {
    'use strict';
    var module = angular.module('matchFishing');

    function controller() {
        var model = this;

        model.$onInit = function () {
            $("#imageCarousel").carousel();        
        };
    }

    module.component('home', {
        templateUrl: '/areas/public/components/home/home.component.html',
        controllerAs: 'model',
        controller: [controller]
    });
}());