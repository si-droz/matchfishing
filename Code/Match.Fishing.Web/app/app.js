(function () {
  "use strict";

  var module = angular.module("matchFishing", [
    "ngComponentRouter"
    ,"ngAnimate"
    ,"ui.bootstrap"
  ]);

  module.value("$routerRootComponent", "matchFishingWeb");

}());