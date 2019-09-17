var tileSize = 64;
var dRows = 10;
var dCols = 12;


var Game = {
  w: tileSize*dCols,
  h: tileSize*dRows,
};

// var w = 800;
// var h = 600;

Game.Boot = function(game) {
  this.game = game;
};

Game.Boot.prototype = {
  preload: function() {
		// this.game.stage.backgroundColor = '#FFF';
		// this.game.stage.backgroundColor = '#ececec';
		this.game.stage.backgroundColor = '#000';
		this.game.load.image('loading', 'assets/images/loading.png');
		this.game.load.image('title', 'assets/images/title.png');
    this.game.load.bitmapFont('minecraftia','assets/fonts/font.png','assets/fonts/font.xml');
		this.game.load.image('instructions', 'assets/images/instructions.png');
  },
  create: function() {
   this.game.state.start('Load');
  }
};

Game.Load = function(game) {
  this.game = game;
};

Game.Load.prototype = {
  preload: function() {
    
    //Debug Plugin
    // this.game.add.plugin(Phaser.Plugin.Debug);

    //Loading Screen Message/bar
    var loadingText = this.game.add.text(Game.w, Game.h, 'Loading...', { font: '30px Helvetica', fill: '#000' });
  	loadingText.anchor.setTo(0.5, 0.5);
  	var preloading = this.game.add.sprite(Game.w/2-64, Game.h/2+50, 'loading');
  	this.game.load.setPreloadSprite(preloading);

    this.game.load.tilemap('woods', 'assets/maps/woods.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('woods', 'assets/images/LD31_woods.png', tileSize, tileSize, 25);
    this.game.load.spritesheet('player', 'assets/images/LD31_player.png',78,78,25);
    this.game.load.spritesheet('snowman', 'assets/images/LD31_snowman.png',96,96,25);
    this.game.load.spritesheet('snowmanBoss', 'assets/images/LD31_snowmanBoss.png',192,192,25);
    this.game.load.spritesheet('snowball', 'assets/images/LD31_snowball.png',16, 16,25);
    this.game.load.spritesheet('snowflakes', 'assets/images/LD31_snowflakes.png',16, 16,25);

    this.game.load.image('twitter','assets/images/twitter.png');
    // Sound FX
    this.game.load.audio('hit', 'assets/audio/hit.wav');
    this.game.load.audio('dead', 'assets/audio/dead.wav');
    this.game.load.audio('throw', 'assets/audio/throw.wav');
    this.game.load.audio('playerHit', 'assets/audio/playerHit.wav');
    this.game.load.audio('playerDead', 'assets/audio/playerDead.wav');

    // Music Track
    // this.game.load.audio('music', 'assets/audio/ld31.wav');
    this.game.load.audio('music', 'assets/audio/ld31.mp3');
    // this.game.load.audio('music','soundtrack.mp3');


  },
  create: function() {
    this.game.state.start('Menu');
  }
};
