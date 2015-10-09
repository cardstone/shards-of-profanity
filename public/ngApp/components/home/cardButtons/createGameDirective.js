(function() {
    'use strict';

    angular
        .module('app')
        .directive('createGame', createGame);

    function createGame() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'components/home/cardButtons/createGameView.html',
            scope: {
            },
            link: linkFunc,
            controller: CreateGameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    CreateGameController.$inject = [];

    function CreateGameController() {
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
