function rand(t,e){return Math.floor(Math.random()*(e-t+1))+t}function rand(t,e){return Math.floor(Math.random()*(e-t+1))+t}function Automata(t,e){this.width=Math.floor(t),this.height=Math.floor(e),this.lifeCycles=0,this.cells=[],this.minimumLifeCycles=30,this.spawnChance=7,this.floorCount=0,this.resetMap()}function rand(t,e){return Math.floor(Math.random()*(e-t+1))+t}var TILE_SIZE=64,ROWS=12,COLS=12,Game={w:TILE_SIZE*COLS,h:TILE_SIZE*ROWS};Game.Boot=function(t){this.game=t},Game.Boot.prototype={preload:function(){this.game.stage.backgroundColor="#000",this.game.load.image("loading","assets/images/loading.png"),this.game.load.image("title","assets/images/title.png"),this.game.load.image("instructions","assets/images/instructions.png"),this.game.load.bitmapFont("minecraftia","assets/fonts/font.png","assets/fonts/font.xml"),this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.game.scale.maxHeight=window.innerHeight,this.game.scale.maxWidth=window.innerHeight*(Game.w/Game.h)},create:function(){this.game.state.start("Load")}},Game.Load=function(t){this.game=t},Game.Load.prototype={preload:function(){var t=(this.game.add.bitmapText(Game.w/2,Game.h/2,"minecraftia","Loading...",30).anchor.setTo(.5),this.game.add.sprite(Game.w/2-64,Game.h/2+50,"loading"));this.game.load.setPreloadSprite(t),this.game.load.image("twitter","assets/images/twitter.png"),this.game.load.image("background","assets/images/background.png"),this.game.load.spritesheet("tiles","assets/images/tiles.png",20,20,7),this.game.load.image("ship","assets/images/ship.png"),this.game.load.image("enemy","assets/images/enemy.png"),this.game.load.image("ebullet","assets/images/bullet.png"),this.game.load.image("pbullet","assets/images/pbullet.png"),this.game.load.audio("hit","assets/audio/hit.wav"),this.game.load.audio("hit_shield","assets/audio/hit_shield.wav"),this.game.load.audio("explosion","assets/audio/explosion.wav"),this.game.load.audio("laser","assets/audio/laser.wav"),this.game.load.audio("elaser","assets/audio/elaser.wav"),this.game.load.audio("music","assets/audio/put_yourself_in_my_place.mp3")},create:function(){this.game.state.start("Menu")}},Game.Menu=function(t){this.game=t},Game.Menu.prototype={create:function(){for(var t=0;1e3>t;t++){var e=["#FFF","#dcdcdc","#efefef","#ffff00","#00ff00"],i=[1,1,1,1,1,2,2,2,3,3,3,4,4,5,6,7,8],s=i[rand(0,16)];this.game.add.sprite(rand(0,4*COLS*TILE_SIZE),rand(0,4*ROWS*TILE_SIZE),this.makeBox(s,s,e[rand(0,2)]))}this.titleText=this.game.add.bitmapText(Game.w/2,Game.h/2-100,"minecraftia","EXTRACTION",42),this.titleText.anchor.setTo(.5),this.titleText.tint=16711680,this.game.add.tween(this.titleText).to({y:300},1e3,Phaser.Easing.Linear.In,!0,0,-1).yoyo(!0);var a=this.game.add.bitmapText(Game.w/2,Game.h-200,"minecraftia","Fly to each planet, extract all the surviviros to win.\nControls:\nWASD/Arrows to steer\nClick to Shoot",18);a.anchor.setTo(.5);var h=this.game.add.bitmapText(Game.w/2,Game.h-10,"minecraftia","Music: Put Yourself In My Place (PSG Version) by Snabish",18);h.anchor.setTo(.5),h.inputEnabled=!0,h.events.onInputDown.add(function(){window.open("http://opengameart.org/content/put-yourself-in-my-place-psg-version")},this),h.events.onInputOver.add(function(){h.tint=16776960},this),h.events.onInputOut.add(function(){h.tint=16777215},this);this.game.add.bitmapText(Game.w/2,Game.h/2+50,"minecraftia","~click to start~",24).anchor.setTo(.5)},makeBox:function(t,e,i){var s=this.game.add.bitmapData(t,e);return s.ctx.beginPath(),s.ctx.rect(0,0,t,e),s.ctx.fillStyle=i,s.ctx.fill(),s},update:function(){this.game.input.activePointer.isDown&&this.game.state.start("Play")}},Game.Win=function(t){this.game=t},Game.Win.prototype={create:function(){this.game.stage.backgroundColor="#000",enemies=[];for(var t=0;1e3>t;t++){var e=["#FFF","#dcdcdc","#efefef","#ffff00","#00ff00"],i=[1,1,1,1,1,2,2,2,3,3,3,4,4,5,6,7,8],s=i[rand(0,16)];this.game.add.sprite(rand(0,4*COLS*TILE_SIZE),rand(0,4*ROWS*TILE_SIZE),this.makeBox(s,s,e[rand(0,2)]))}this.wKey=this.game.input.keyboard.addKey(Phaser.Keyboard.W),this.cursors=this.game.input.keyboard.createCursorKeys(),this.twitterButton=this.game.add.button(Game.w/2,Game.h/2+100,"twitter",this.twitter,this),this.twitterButton.fixedToCamera=!0,this.twitterButton.anchor.set(.5),this.twitterButton.visible=!1,this.playAgainText=this.game.add.bitmapText(Game.w+200,Game.h/2,"minecraftia","You WIN!\nPlay Again?",48),this.playAgainText.anchor.set(.5),this.game.time.events.add(.5*Phaser.Timer.SECOND,function(){this.game.add.tween(this.playAgainText).to({x:Game.w/2},355,Phaser.Easing.Linear.None).start(),this.twitterButton.visible=!0},this)},update:function(){(this.game.input.activePointer.isDown||this.wKey.isDown||this.cursors.up.isDown)&&this.game.state.start("Play")},makeBox:function(t,e,i){var s=this.game.add.bitmapData(t,e);return s.ctx.beginPath(),s.ctx.rect(0,0,t,e),s.ctx.fillStyle=i,s.ctx.fill(),s},twitter:function(){var t="http://www.divideby5.com/games/extraction/",e="rantt_",i=[""];window.open("http://twitter.com/share?text=Try+to+escape+the+invasion+playing+Extraction.+at&via="+e+"&url="+t+"&hashtags="+i.join(","),"_blank")}},Game.Lose=function(t){this.game=t},Game.Lose.prototype={create:function(){this.game.stage.backgroundColor="#000",enemies=[];for(var t=0;1e3>t;t++){var e=["#FFF","#dcdcdc","#efefef","#ffff00","#00ff00"],i=[1,1,1,1,1,2,2,2,3,3,3,4,4,5,6,7,8],s=i[rand(0,16)];this.game.add.sprite(rand(0,4*COLS*TILE_SIZE),rand(0,4*ROWS*TILE_SIZE),this.makeBox(s,s,e[rand(0,2)]))}this.wKey=this.game.input.keyboard.addKey(Phaser.Keyboard.W),this.cursors=this.game.input.keyboard.createCursorKeys(),this.twitterButton=this.game.add.button(Game.w/2,Game.h/2+100,"twitter",this.twitter,this),this.twitterButton.fixedToCamera=!0,this.twitterButton.anchor.set(.5),this.twitterButton.visible=!1,this.playAgainText=this.game.add.bitmapText(Game.w+200,Game.h/2,"minecraftia","You LOSE!\nPlay Again?",48),this.playAgainText.anchor.set(.5),this.game.time.events.add(.5*Phaser.Timer.SECOND,function(){this.game.add.tween(this.playAgainText).to({x:Game.w/2},355,Phaser.Easing.Linear.None).start(),this.twitterButton.visible=!0},this)},update:function(){(this.game.input.activePointer.isDown||this.wKey.isDown||this.cursors.up.isDown)&&this.game.state.start("Play")},makeBox:function(t,e,i){var s=this.game.add.bitmapData(t,e);return s.ctx.beginPath(),s.ctx.rect(0,0,t,e),s.ctx.fillStyle=i,s.ctx.fill(),s},twitter:function(){var t="http://www.divideby5.com/games/extraction/",e="rantt_",i=[""];window.open("http://twitter.com/share?text=Try+to+escape+the+invasion+playing+Extraction.+at&via="+e+"&url="+t+"&hashtags="+i.join(","),"_blank")}},Automata.prototype.resetMap=function(){this.map=[];for(var t=0;t<this.height;t++){this.map.push([]),this.map[t].push(new Array(this.width));for(var e=0;e<this.width;e++)this.map[t][e]=WALL}},Automata.prototype.countTile=function(t){for(var e=0,i=0;i<this.height;i++)for(var s=0;s<this.width;s++)this.map[i][s]===t&&e++;return e},Automata.prototype.print=function(){for(var t="",e=0;e<this.height;e++){for(var i=0;i<this.width;i++){var s="";s=this.map[e][i]===WALL?"#":".",t+=s}t+="\n"}return t},Automata.prototype.csv=function(){for(var t="",e=0;e<this.height;e++){for(var i=0;i<this.width;i++)t+=this.map[e][i],i<this.width-1&&(t+=",");t+="\n"}return t},Automata.prototype.addCell=function(t,e){var i=t||Math.floor(this.width/2),s=e||Math.floor(this.height/2),a=new Cell(i,s,this.map[s][i]);this.map[a.y][a.x]=FLOOR,this.floorCount++,this.cells.push(a)},Automata.prototype.step=function(){for(var t=0;t<this.cells.length;t++){var e=this.cells[t];if(e.alive){if(this.lifeCycles+=1,this.map=e.cycle(this.map),Math.floor(100*Math.random())<=this.spawnChance&&e.neighbours(this.map).length>0){var i=e.neighbours(this.map)[Math.floor(Math.random()*e.neighbours(this.map).length)];this.addCell(i.x,i.y)}}else{var s=this.cells.indexOf(e);s>-1&&this.cells.splice(s,1)}}},Automata.prototype.generate=function(){for(0===this.cells.length&&this.addCell();this.cells.length>0;)for(var t=0;t<this.cells.length;t++){var e=this.cells[t];if(e.alive){if(this.lifeCycles+=1,this.map=e.cycle(this.map),Math.floor(100*Math.random())<=this.spawnChance&&e.neighbours(this.map).length>0){var i=e.neighbours(this.map)[Math.floor(Math.random()*e.neighbours(this.map).length)];this.addCell(i.x,i.y)}}else{var s=this.cells.indexOf(e);s>-1&&this.cells.splice(s,1)}}this.lifeCycles<this.minimumLifeCycles&&(console.log("reset lifecycle =>"+this.lifeCycles),this.lifeCycles=0,this.resetMap(),this.generate())},Automata.prototype.cleanup=function(){for(var t=0;t<this.height;t++)for(var e=0;e<this.width;e++){var i=new Cell(e,t,this.map[t][e]);i.allowDiagonals=!0,i.neighbours(this.map).length<1&&(this.map[t][e]=FLOOR)}};var Cell=function(t,e,i){this.alive=!0,this.allowDiagonals=!1,this.cycleLimit=30,this.x=t,this.y=e};Cell.prototype={north:function(){var t=this.x,e=this.y-1,i="north";return{x:t,y:e,direction:i}},north_east:function(){var t=this.x+1,e=this.y-1,i="north east";return{x:t,y:e,direction:i}},east:function(){var t=this.x+1,e=this.y,i="east";return{x:t,y:e,direction:i}},south_east:function(){var t=this.x+1,e=this.y+1,i="south east";return{x:t,y:e,direction:i}},south:function(){var t=this.x,e=this.y+1,i="south";return{x:t,y:e,direction:i}},south_west:function(){var t=this.x-1,e=this.y+1,i="south west";return{x:t,y:e,direction:i}},west:function(){var t=this.x-1,e=this.y,i="west";return{x:t,y:e,direction:i}},north_west:function(){var t=this.x-1,e=this.y-1,i="north west";return{x:t,y:e,direction:i}},moveTo:function(t){this.x=t.x,this.y=t.y},cycle:function(t){var e=this.neighbours(t)[Math.floor(Math.random()*this.neighbours(t).length)];return this.alive&&(this.x=e.x,this.y=e.y,t[e.y][e.x]=FLOOR),t}},Cell.prototype.checkNeighbour=function(t,e){var i=e[0].length,s=e.length;try{return!(t.x<0||t.y<0||t.x>i||t.y>s||e[t.y][t.x]===FLOOR)}catch(a){}},Cell.prototype.neighbours=function(t){var e=[];return this.checkNeighbour(this.north(),t)&&e.push(this.north()),this.checkNeighbour(this.east(),t)&&e.push(this.east()),this.checkNeighbour(this.south(),t)&&e.push(this.south()),this.checkNeighbour(this.west(),t)&&e.push(this.west()),0===e.length&&(this.alive=!1),e};var wKey,aKey,sKey,dKey,score=0,enemies=[],enemyBullets,enemiesTotal=25,enemiesAlive=0;Game.Play=function(t){this.game=t},Game.Play.prototype={init:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE)},create:function(){this.sizeMult=4,this.game.world.setBounds(0,0,Game.w*this.sizeMult,Game.h*this.sizeMult);for(var t=0;1e3>t;t++){var e=["#FFF","#dcdcdc","#efefef","#ffff00","#00ff00"],i=[1,1,1,1,1,2,2,2,3,3,3,4,4,5,6,7,8],s=i[rand(0,16)];this.game.add.sprite(rand(0,COLS*this.sizeMult*TILE_SIZE),rand(0,ROWS*this.sizeMult*TILE_SIZE),this.makeBox(s,s,e[rand(0,2)]))}var a=Phaser.Color.HSVColorWheel();this.transferDelay=this.game.time.now,this.transferInc=0,this.planets=this.game.add.group();var h=6;this.pickupCount=0;for(var t=0;h>t;t++){var r=rand(100,COLS*this.sizeMult*TILE_SIZE-100),n=rand(100,ROWS*this.sizeMult*TILE_SIZE-100),o=a[rand(0,300)].rgba,l=this.game.add.sprite(r,n,this.makeCircle(rand(128,256),o));l.color=o,l.passengers=rand(5,12),l.total=l.passengers,this.pickupCount+=l.total,this.planets.add(l)}this.music=this.game.add.sound("music"),this.music.volume=.3,this.music.loop=!0,this.music.play(),this.miniPixel=4;var m=this.game.add.bitmapData(COLS*this.sizeMult*this.miniPixel,ROWS*this.sizeMult*this.miniPixel);m.rect(0,0,COLS*this.sizeMult*this.miniPixel,ROWS*this.sizeMult*this.miniPixel,"#213D5E"),this.planets.forEach(function(t){m.rect(t.x*this.miniPixel/TILE_SIZE,t.y*this.miniPixel/TILE_SIZE,this.miniPixel,this.miniPixel,t.color)},this),this.map=this.game.add.sprite(0,0,m),this.map.fixedToCamera=!0,this.miniMapOverlay=this.game.add.bitmapData(COLS*this.sizeMult*this.miniPixel,ROWS*this.sizeMult*this.miniPixel),this.mapOverlay=this.game.add.sprite(0,0,this.miniMapOverlay),this.mapOverlay.fixedToCamera=!0,this.player=new Player(this.game,Game.w/2,Game.h/2),this.circ=this.game.add.sprite(this.player.x,this.player.y,this.makeCircle(128,"#fff")),this.game.physics.enable(this.circ,Phaser.Physics.ARCADE),this.circ.anchor.setTo(.5),this.circ.alpha=.5,this.circ.tint=65280,enemyBullets=game.add.group(),enemyBullets.enableBody=!0,enemyBullets.physicsBodyType=Phaser.Physics.ARCADE,enemyBullets.createMultiple(100,"ebullet"),enemyBullets.setAll("anchor.x",.5),enemyBullets.setAll("anchor.y",.5),enemyBullets.setAll("outOfBoundsKill",!0),enemyBullets.setAll("checkWorldBounds",!0),enemyBullets.setAll("tint","0x00ff00");for(var t=0;enemiesTotal>t;t++)enemies.push(new Enemy(t,this.game,this.player,enemyBullets));this.pickupBar=this.game.add.sprite(this.player.x,this.player.y-32,this.makeBox(80,7,"#ffff00")),this.pickupBar.anchor.setTo(.5),this.pickupBar.visible=!1,this.healthBar=this.game.add.sprite(this.player.x,this.player.y-52,this.makeBox(80,7,"#00ff00")),this.healthBar.anchor.setTo(.5),this.passengerText=this.game.add.bitmapText(Game.w-320,20,"minecraftia","Passengers: "+this.player.passengers+"/"+this.pickupCount,24),this.passengerText.fixedToCamera=!0},update:function(){if(this.player.passengers==this.pickupCount)this.music.stop(),this.game.state.start("Win");else if(this.player.alive){this.passengerText.setText("Passengers: "+this.player.passengers+"/"+this.pickupCount,24),this.miniMapOverlay.context.clearRect(0,0,this.miniMapOverlay.width,this.miniMapOverlay.height),this.miniMapOverlay.rect(Math.floor(this.player.x*this.miniPixel/TILE_SIZE),Math.floor(this.player.y*this.miniPixel/TILE_SIZE),this.miniPixel,this.miniPixel,"#ff0000"),this.planets.forEach(function(t){t.passengers<=0&&this.miniMapOverlay.rect(Math.floor(t.x*this.miniPixel/TILE_SIZE),Math.floor(t.y*this.miniPixel/TILE_SIZE),this.miniPixel+1,this.miniPixel+1,"#fff"),this.miniMapOverlay.rect(Math.floor(this.player.x*this.miniPixel/TILE_SIZE),Math.floor(this.player.y*this.miniPixel/TILE_SIZE),this.miniPixel,this.miniPixel,"#ff0000"),this.game.physics.arcade.distanceBetween(this.player,t)<300&&(t.passengers>0?(this.transferDelay<this.game.time.now&&(this.transferInc+=1,this.player.passengers+=1,t.passengers-=1,this.transferDelay=this.game.time.now+500),this.pickupBar.visible=!0,this.pickupBar.x=this.player.x,this.pickupBar.y=this.player.y-32,this.pickupBar.scale.x=this.transferInc/t.total):(this.pickupBar.visible=!1,this.transferInc=0))},this),this.miniMapOverlay.dirty=!0;for(var t=0;t<enemies.length;t++)enemies[t].alive&&(enemiesAlive++,this.game.physics.arcade.overlap(this.player.bullets,enemies[t],this.bulletHitEnemy,null,this));this.game.physics.arcade.overlap(enemyBullets,this.player,this.bulletHitPlayer,null,this),this.healthBar.x=this.player.x,this.healthBar.y=this.player.y-52,this.circ.x=this.player.x,this.circ.y=this.player.y,this.player.health<5?this.circ.visible=!1:this.player.health<10?this.circ.tint=16777215:this.player.health<15&&(this.circ.tint=16776960)}else this.music.stop(),this.game.state.start("Lose")},bulletHitPlayer:function(t,e){e.kill(),this.player.damage(),this.healthBar.scale.x=this.player.health/10},bulletHitEnemy:function(t,e){e.kill(),enemies[t.name].damage()},makeTiles:function(t){for(var e=game.make.bitmapData(25*t,2*t),i=Phaser.Color.HSVColorWheel(),s=0,a=0;2>a;a++)for(var h=0;25>h;h++)e.rect(h*t,a*t,t,t,i[s].rgba),s+=6;return e},makeCircle:function(t,e){var i=this.game.add.bitmapData(t,t);return i.circle(t/2,t/2,t/2,e),i},makeBox:function(t,e,i){var s=this.game.add.bitmapData(t,e);return s.ctx.beginPath(),s.ctx.rect(0,0,t,e),s.ctx.fillStyle=i,s.ctx.fill(),s}};var Enemy=function(t,e,i,s){this.game=e,this.name=t,this.player=i;var a=this.game.world.randomX,h=this.game.world.randomY;Phaser.Sprite.call(this,e,a,h,"enemy"),this.game.physics.enable(this,Phaser.Physics.ARCADE),this.anchor.setTo(.5),this.health=3,this.bullets=s,this.fireRate=500,this.nextFire=0,this.alive=!0,this.angle=this.game.rnd.angle(),this.body.immovable=!1,this.body.collideWorldBounds=!0,this.body.bounce.setTo(1,1),this.scale.x=.9,this.scale.y=.9,this.hitSnd=this.game.add.sound("hit"),this.hitSnd.volume=.2,this.explosionSnd=this.game.add.sound("explosion"),this.explosionSnd.volume=.2,this.shootSnd=this.game.add.sound("elaser"),this.shootSnd.volume=.2,this.game.add.existing(this),this.game.physics.arcade.velocityFromRotation(this.rotation,100,this.body.velocity);var r=this.game.add.bitmapData(4,4);r.ctx.beginPath(),r.ctx.rect(0,0,a,h),r.ctx.fillStyle="#ffff00",r.ctx.fill(),this.emitter=e.add.emitter(0,0,200),this.emitter.makeParticles(r),this.emitter.gravity=0,this.emitter.minParticleSpeed.setTo(-200,-200),this.emitter.maxParticleSpeed.setTo(200,200)};Enemy.prototype=Object.create(Phaser.Sprite.prototype),Enemy.prototype.update=function(){if(this.rotation=this.game.physics.arcade.angleBetween(this,this.player),this.game.physics.arcade.distanceBetween(this,this.player)<300&&this.alive&&this.game.time.now>this.nextFire&&this.bullets.countDead()>0&&this.player.alive===!0){this.shootSnd.play(),this.nextFire=this.game.time.now+this.fireRate;var t=this.bullets.getFirstDead();t.reset(this.x,this.y),t.rotation=this.game.physics.arcade.moveToObject(t,this.player,500)}},Enemy.prototype.damage=function(){this.hitSnd.play(),this.health-=1,this.health<=0&&(this.emitter.x=this.x,this.emitter.y=this.y,this.emitter.start(!0,1e3,null,128),this.explosionSnd.play(),this.alive=!1,this.kill())},Enemy.prototype.constructor=Enemy;var Player=function(t,e,i){this.game=t,Phaser.Sprite.call(this,t,e,i,"ship"),this.anchor.setTo(.5),this.passengers=0,this.game.physics.enable(this,Phaser.Physics.ARCADE),this.body.drag.set(.5),this.body.maxVelocity.setTo(800,800),this.body.collideWorldBounds=!0,this.scale.x=1.2,this.scale.y=1.2,this.fireRate=250,this.nextFire=0,this.health=20,this.game.camera.follow(this,Phaser.Camera.FOLLOW_TOPDOWN),this.game.add.existing(this),this.hitSnd=this.game.add.sound("hit_shield"),this.hitSnd.volume=.2,this.explosionSnd=this.game.add.sound("explosion"),this.explosionSnd.volume=.2,this.shootSnd=this.game.add.sound("laser"),this.shootSnd.volume=.2,this.bullets=this.game.add.group(),this.bullets.enableBody=!0,this.bullets.physicsBodyType=Phaser.Physics.ARCADE,this.bullets.createMultiple(30,"pbullet",0,!1),this.bullets.setAll("anchor.x",0),this.bullets.setAll("anchor.y",.5),this.bullets.setAll("outOfBoundsKill",!0),this.bullets.setAll("checkWorldBounds",!0),this.cursors=t.input.keyboard.createCursorKeys(),wKey=this.game.input.keyboard.addKey(Phaser.Keyboard.W),aKey=this.game.input.keyboard.addKey(Phaser.Keyboard.A),sKey=this.game.input.keyboard.addKey(Phaser.Keyboard.S),dKey=this.game.input.keyboard.addKey(Phaser.Keyboard.D),this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT,Phaser.Keyboard.UP,Phaser.Keyboard.DOWN])};Player.prototype=Object.create(Phaser.Sprite.prototype),Player.prototype.update=function(){if(this.cursors.left.isDown||aKey.isDown?this.angle-=4.5:(this.cursors.right.isDown||dKey.isDown)&&(this.angle+=4.5),this.cursors.up.isDown||wKey.isDown?this.currentSpeed=550:this.cursors.down.isDown||sKey.isDown?this.currentSpeed=0:this.currentSpeed>0&&(this.currentSpeed-=12),this.currentSpeed>0&&this.game.physics.arcade.velocityFromRotation(this.rotation,this.currentSpeed,this.body.velocity),this.game.input.activePointer.isDown&&1==this.alive&&this.game.time.now>this.nextFire&&this.bullets.countDead()>0){this.shootSnd.play(),this.nextFire=this.game.time.now+this.fireRate;var t=this.bullets.getFirstExists(!1);t.reset(this.x,this.y),t.rotation=this.game.physics.arcade.moveToPointer(t,2e3)}},Player.prototype.damage=function(){this.hitSnd.play(),this.health-=1,this.health<=0&&(this.explosionSnd.play(),this.alive=!1,this.kill())},Player.prototype.constructor=Player;var game=new Phaser.Game(Game.w,Game.h,Phaser.AUTO,"game");game.state.add("Boot",Game.Boot),game.state.add("Load",Game.Load),game.state.add("Menu",Game.Menu),game.state.add("Play",Game.Play),game.state.add("Win",Game.Win),game.state.add("Lose",Game.Lose),game.state.start("Boot");