(function() {
  var app = angular.module('game', [ ]);

  app.controller('GameLibraryController', function() {
    this.games = games;
    this.onegameaweekgames = onegameaweekgames;
    this.onegameamonth = onegameamonth;
  });

  app.filter('partition', function() {
    var cache = {}; // holds old arrays for difference repeat scopes
    var filter = function(newArr, size, scope) {
      var i,
        oldLength = 0,
        newLength = 0,
        arr = [],
        id = scope.$id,
        currentArr = cache[id];
      if (!newArr) return;

      if (currentArr) {
        for (i = 0; i < currentArr.length; i++) {
          oldLength += currentArr[i].length;
        }
      }
      if (newArr.length == oldLength) {
        return currentArr; // so we keep the old object and prevent rebuild (it blurs inputs)
      } else {
        for (i = 0; i < newArr.length; i += size) {
          arr.push(newArr.slice(i, i + size));
        }
        cache[id] = arr;
        return arr;
      }
    };
    return filter;
  }); 

  var onegameamonth = [ 
    {
      name: 'Making Friends Is Easy',
      url:  'making_friends',
      github: "https://github.com/rantt/making_friends",
      number: 1,
      description: "Expore the Island, look at signs",
      postedOn:  "January 31st, 2017"
    }
  ];



  var onegameaweekgames = [ 
    {
      name: 'Geo Shift',
      url:  'LD35',
      number: 13,
      description: "Find Shapes to Unlock new abilities, make it to the end of the maze.",
      ludumdareSite: "http://ludumdare.com/compo/ludum-dare-34/?action=preview&uid=41103",
      postedOn:  "April 17, 2016"
    },
    {
      name: 'Space Duel',
      url:  'spaceduel',
      number: 12,
      description: "Simple multiplayer space shooter using firebase",
      github: "https://github.com/rantt/spaceduel",
      postedOn:  "April 1st, 2016"
    },

    {
      name: 'Multiplayer Part 1 & 2',
      url:  'mpp2',
      number: 11,
      description: "Multiplayer test",
      github: "https://github.com/rantt/mpp2",
      postedOn:  "Part 1: March 22nd, Part 2: March 28th, 2016"
    },


    {
      name: 'Memory Matcher',
      url:  'memorymatcher',
      number: 10,
      description: "Flip and match cards to win.",
      github: "https://github.com/rantt/memorymatcher",
      postedOn:  "March 12th, 2016"
    },

    {
      name: 'Extraction',
      url:  'extraction',
      number: 9,
      description: "Fly to each planet and extracts its survivors to win.",
      github: "https://github.com/rantt/extraction",
      postedOn:  "March 6th, 2016"
    },

    {
      name: 'Coin Collector',
      url:  'coincollector',
      number: 8,
      description: "Jump around and grab some square coins",
      github: "https://github.com/rantt/coincollector",
      postedOn:  "Feb 28th, 2016"
    },

    {
      name: 'Jigsaw',
      url:  'jigsaw',
      number: 7,
      description: "Relax with some fun jigsaw puzzles",
      github: "https://github.com/rantt/jigsaw",
      postedOn:  "Feb 20th, 2016"
    },
    {
      name: 'Slider',
      url:  'slider',
      number: 6,
      description: "Simple puzzle slider",
      github: "https://github.com/rantt/slider",
      postedOn:  "Feb 14th, 2016"
    },
    {
      name: 'Surf Dude',
      url:  'surfdude',
      number: 5,
      description: "Ride the waves and try to avoid the sharks and ducks.",
      github: "https://github.com/rantt/surfdude",
      postedOn:  "Feb 7th, 2016"
    },
    {
      name: 'Lost Fragments',
      url:  'lostfragments',
      number: 4,
      description: "Turn based micro RPG about mending a broken heart.",
      github: "https://github.com/rantt/lostfragments",
      postedOn:  "Jan 30th, 2016"
    },
    {
      name: 'Super Scoopers',
      url:  'superscoopers',
      number: 3,
      description: "Slinging Icecream",
      github: "https://github.com/rantt/Super-Scoopers",
      postedOn:  "Jan 23th, 2016"
    },
    {
      name: 'Rogue Slasher',
      url:  'rogueslasher',
      number: 2,
      description: "Simple hacknslash rogue-like.",
      github: "https://github.com/rantt/rogueslasher",
      postedOn:  "Jan 15th, 2016"
    },

    {
      name: 'PREfectionist',
      url:  'prefectionist',
      number: 1,
      description: "Match shapes with slots and try to beat the clock.",
      github: "https://github.com/rantt/prefectionist",
      postedOn:  "Jan 8th, 2016"
    },

  ];


  var games = [ 
    {
      name: 'Always a Bigger Fish...',
      url:  'LD34',
      number: 13,
      description: "It's a fish eat fish world.  Submitted for Ludum Dare 34, 48hr comp",
      ludumdareSite: "http://ludumdare.com/compo/ludum-dare-34/?action=preview&uid=41103",
      postedOn:  "Dec 13, 2015"
    },
    {
      name: 'Against Type',
      url:  'against_type',
      number: 12,
      description: "Click the button that's the same color as the word that appears on the screen...easy...right?",
      postedOn:  "Jul 27, 2015"
    },
    {
      name: 'Celery Samurai',
      url:  'LD32',
      number: 11,
      description: "The Carrot Clan has wiped out your brethren, it's up to you take revenge.  Celery Sword in hand you're off to slay the vile Carrot King. Submitted for Ludum Dare 32, 48hr comp",
      ludumdareSite: "http://ludumdare.com/compo/ludum-dare-32/?action=preview&uid=41103",
      postedOn:  "Apr 19, 2015"
    },
    {
      name: 'Connect The Dots',
      url:  'ctd',
      number: 10,
      description: "Connect The Dots To Score points, close a loop to score BIG!",
      postedOn:  "Mar 30, 2015"
    },
    {
      name: 'Match 3',
      url:  'match3',
      number: 9,
      description: "Basic Match 3 game",
      postedOn:  "Mar 3, 2015"
    },
    {
      name: 'If You Were Gone...',
      url:  'ifyouweregone',
      number: 8,
      description: "Playing with endless runners. Submitted for #1GAM (January)",
      postedOn:  "Feb 3, 2015"
    },
    {
      name: 'When Snowmen Attack',
      url:  'WhenSnowmenAttack',
      number: 7,
      description: "Those friendly snowmen have turned on us. It's time to fight back! It's time to cancel the Snowpocalypse!! Submitted for Ludum Dare 31, #LD48",
      ludumdareSite: "http://ludumdare.com/compo/ludum-dare-31/?action=preview&uid=41103",
      postedOn:  "Dec 7, 2014"
    },
    {
      name: 'RPS',
      url:  'RPS',
      number: 6,
      description: "Rock/Paper/Scissors...with wizards. Submitted for #1GAM",
      postedOn:  "Dec 2, 2014"
    },
    {
      name: 'The Well',
      url:  'the_well',
      number: 5,
      description: "Explore the darkness under the village. Submitted for #1GAM",
      postedOn:  "Nov 19, 2014"
    },
    {
      name: 'PRISM',
      url:  'prism',
      number: 4,
      description: "Jumping between worlds. Submitted for Ludum Dare 30, #LD48",
      ludumdareSite: "http://www.ludumdare.com/compo/ludum-dare-30/?action=preview&uid=41103", 
      postedOn:  "August 9, 2014"
    },
    {
      name: 'Reflektor',
      url:  'reflektor',
      number: 3,
      description: "Spinning around and reflecting lasers.",
      postedOn:  "August 9, 2014"
    },
    {
      name: 'Gravity Kills',
      url:  'gravity_kills',
      number: 2,
      description: "Simple platformer, playing with gravity and sharp objects.",
      postedOn:  "May 13, 2014"
    },
    {
      name: 'Tri',
      url:  'tri',
      number: 1,
      description: "Top down space shooter written using Phaser.js. First game I've ever made.",
      postedOn:  "April 15, 2014"
    },

  ]; 

})();
