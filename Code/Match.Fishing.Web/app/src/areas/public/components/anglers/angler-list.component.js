(function () {
    'use strict';
    var module = angular.module("matchFishing");

    // this would normally be a service
    function fetchAnglers($http) {
        return $http.get("/json/anglers.json")
            .then(function (response) {
                return response.data;
            });
    };

    // this would normally be a service
    function fetchLetters() {
        return ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    };

    function controller($http) {
        var model = this;
        model.anglers = [];
        model.letters = [];
        model.selectedLetter = '';

        model.$onInit = function () {
            fetchAnglers($http).then(function (anglers) {
                model.anglers = anglers;
            });

            model.letters = fetchLetters();
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

    module.filter('anglerFilter', function (helperService) {

        return function (items, letter, searchText) {
            var filtered = [];
            if (searchText === undefined) {
                searchText = '';
            }

            angular.forEach(items, function (item) {
                if (helperService.startsWith(item.forename, letter) &&
                    (helperService.containsText(item.forename, searchText) ||
                        helperService.containsText(item.surname, searchText))) {
                    filtered.push(item);
                }
            });

            return filtered;
        };
    });

    module.component("anglerList", {
        templateUrl: "/areas/public/components/anglers/angler-list.component.html",
        bindings: {
            $router: '<'
        },
        controllerAs: "model",
        controller: ["$http", controller]
    });
}());