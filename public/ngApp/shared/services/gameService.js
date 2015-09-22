(function () {

	angular
		.module('app')
		.factory('GameService', GameService);

	function GameService () {
		var savedGameId = {};
		function set (id) {
			savedGameId =  {gameId: id};
		}
		function get() {
			returnedSavedGameId;
		}
		return {
			set: set,
			get: get
		};
	}

})();