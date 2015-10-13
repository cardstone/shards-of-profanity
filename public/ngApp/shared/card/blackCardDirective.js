(function () {
  'use strict';

  angular
    .module('app')
    .directive('blackCard', blackCard);
  // this is the directive
  function blackCard() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'shared/card/blackCardTemplate.html',
      scope: true,
      link: linkFunc,
      controller: BlackCardController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
    // this is where you put dom manipulation ??
    function linkFunc(scope, el, attr, ctrl) {
      
    }
  }
  // this is where you inject dependencies for controller
  BlackCardController.$inject = [];
  // this is the controller
  function BlackCardController() {
    var vm = this;
    vm.faceUp = true;
    activate();
    // this is the activate function
    function activate() {

    }
  }
})();
