(function () {
    'use strict';
    var module = angular.module('matchFishing');

    function controller($http, anglersService) {
        var model = this;
        model.anglers = [];
        model.letters = [];
        model.selectedLetter = '';

        model.$onInit = function () {
            anglersService.getAnglers($http).then(function (anglers) {
                model.anglers = anglers;
            });

            model.letters = anglersService.getLetters();
        };

        model.onSelectLetter = function (letter) {
            if (letter === 'All') {
                letter = '';
            }

            model.selectedLetter = letter;
        };

        model.onSelectAngler = function (angler) {
            model.$router.navigate(['AnglerDetail', { id: angler.id }]);
        };

        model.isLetterSelected = function (letter) {
            if (letter === 'All') {
                letter = '';
            }

            return (model.selectedLetter === letter);
        };
    };

    

    module.component('anglerList', {
        templateUrl: '/areas/public/components/anglers/angler-list.component.html',
        bindings: {
            $router: '<'
        },
        controllerAs: 'model',
        controller: ['$http', 'anglersService', controller]
    });
}());