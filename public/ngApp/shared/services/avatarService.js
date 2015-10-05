(function () {
  'use strict';

  angular
    .module('app')
    .factory('AvatarService', [AvatarService]);

    function AvatarService() {

      // lol at this array format -Alvin
      var avatars = ["a-can-of-whoop-ass.svg", "a-cooler-full-of-organs.svg", "adderall.svg", "a-good-sniff.svg", "a-horse-with-no-legs.svg", "angelheaded-hipsters.svg", "badger.svg", "being-high.svg", "being-on-fire.svg",
"blood-squirting-lizard.svg", "boobs.svg", "booze.svg", "burning-flag.svg", "butler-2.svg", "butler.svg", "butt-plug.svg", "butt.svg", "buzfeed.svg", "cards-against-humanity.svg", "cd.svg",
"chainsaws-for-hands.svg", "chain.svg", "cheese.svg", "children-on-leashes.svg", "coffin-2.svg", "coffin.svg", "cool-up-in-the-front-hair.svg", "cowboy-boot.svg", "dead-eagle.svg", "eggnog.svg",
"exploding-bus.svg", "explosions.svg", "falcon-with-a-cap.svg", "farting-and-walking-away.svg", "fast-food.svg", "finger-painting.svg", "football-helmet.svg", "freeing-willy.svg", "geese.svg", "girl-power.svg",
"gloves.svg", "guns.svg", "invisible.svg", "jazz-hands.svg", "juice-bag.svg", "land-mine.svg", "lemon.svg", "lobotomy.svg", "lunchable.svg", "lust-for-lumberjacks.svg", "manhole.svg", "miracle-berry-2.svg",
"miracle-berry-3.svg", "miracle-berry-4.svg", "miracle-berry.svg", "money.svg", "monster-truck.svg", "movie-review.svg", "movie-ticket.svg", "muskox-2.svg", "muskox.svg", "nicolas-cage.svg", "nobel-prize.svg",
"obesity.svg", "pizza-bagel.svg", "pizza.svg", "pocket-constitution.svg", "poop.svg", "poo.svg", "raven.svg", "rising-sea-levels.svg", "robot.svg", "sad-cookie.svg", "sex-toy.svg", "silence.svg", "slap.svg",
"snowman.svg", "space-plane.svg", "sunshine-and-rainbows.svg", "taste.svg", "truck-nuts.svg", "vikings.svg", "vomiting.svg", "wearing-underwear-insideout.svg", "wine.svg", "y2k-bug.svg", "zine.svg"]

      return {
        get: function() {
          var random = Math.floor(Math.random() * avatars.length);
          return 'icons/' + avatars[random];
        }
      };
    }


})();


