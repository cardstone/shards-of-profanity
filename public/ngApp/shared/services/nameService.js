(function () {
  'use strict';

  angular
    .module('app')
    .factory('NameService', [NameService]);

    function NameService() {

    var adjectives = [
      "anonymous",
      "random",
      "mysterious",
      "vulgar",
      "vile",
      "weak",
      "pathetic",
      "milquetoast",
      "rusty",
      "poopy",
      "crusty",
      "musty",
      "dusty"
    ];

    var nouns = [
        "shit-bag",
        "plumbus",
        "jerk-off",
        "butthole"
      ];

      return {
        get: function() {
          var randomAdj = Math.floor(Math.random() * adjectives.length);
          var randomNouns = Math.floor(Math.random() * nouns.length);
          return adjectives[randomAdj] + " " + nouns[randomNouns];
        }
      };
    }


})();
