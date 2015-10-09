(function() {
    'use strict';

    angular
        .module('app')
        .directive('joinGame', joinGame);

    function joinGame() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'components/home/cardButtons/joinGameView.html',
            scope: {
            },
            link: linkFunc,
            controller: JoinGameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    JoinGameController.$inject = [];

    function JoinGameController() {
        var vm = this;
        vm.faceUp = false;

        vm.expand = function() {
          vm.faceUp = true;
        };

        activate();

        function activate() {

        }
    }
})();
