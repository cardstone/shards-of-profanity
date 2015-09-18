module.exports = function ( /*dependencies, services, etc*/ ) {
  return {
    restrict: 'E',
    controller: function ($scope) {
      console.log('loaded in shardCard');
    },
    //templateUrl: 'templates/directives/shardCard.html'
    //template: '<p> this is a shard card </p>'
  };
};
