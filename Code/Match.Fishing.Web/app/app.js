(function () {
  "use strict";

  var module = angular.module("matchFishing", [
    "ngComponentRouter"
    , "ngAnimate"
    , "ui.bootstrap"
  ]);

  module.config(function ($locationProvider) {

    $locationProvider.html5Mode({
      enabled: true
    });
  });

  module.value("$routerRootComponent", "matchFishingWeb");
}());