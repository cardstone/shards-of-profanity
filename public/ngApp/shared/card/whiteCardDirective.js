(function () {
  'use strict';

  angular
    .module('app')
    .directive('whiteCard', whiteCard);
  // this is the directive
  function whiteCard() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'shared/card/whiteCardTemplate.html',
      scope: {},
      link: linkFunc,
      controller: WhiteCardController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
    // this is where you put dom manipulation ??
    function linkFunc(scope, el, attr, ctrl) {

    }
  }
  // this is where you inject dependencies for controller
  WhiteCardController.$inject = [];
  // this is the controller
  function WhiteCardController() {
    var vm = this;
    vm.faceUp = true;
    activate();
    // this is the activate function
    function activate() {

    }
  }
})();
