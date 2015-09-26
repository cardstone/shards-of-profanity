(function () {
  'use strict';

  angular
    .module('app')
    .directive('whiteCard', whiteCard);

  function whiteCard( /*dependencies, services, etc*/ ) {
    return {
      restrict: 'E',
      controller: function ($scope) {},
      // this templateUrl breaks the site
      templateUrl: 'shared/card/WhiteCardTemplate.html'
    };
  }
})();
