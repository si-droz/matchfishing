(function () {
  "use strict";

  var module = angular.module("matchFishing", [
    "ngComponentRouter"
    , "ngAnimate"
    , "ngMessages"    
  ]).constant("EnvironmentConfig",
  {
      "serviceApi": "http://localhost:61573"
  });

  module.config(function ($locationProvider) {

    $locationProvider.html5Mode({
      enabled: true
    });
  });

  module.value("$routerRootComponent", "matchFishingWeb");
}());