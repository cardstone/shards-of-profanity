(function () {
  'use strict';

  angular
    .module('app')
    .directive('shardCard', shardCard);

  function shardCard( /*dependencies, services, etc*/ ) {
    return {
      restrict: 'E',
      controller: function ($scope) {
        console.log('loaded in shardCard');
      },
      // this templateUrl breaks the site
      templateUrl: 'shared/card/CardTemplate.html'
    };
  }
})();
