var tileSize=20,rows=10,cols=12,Game={w:tileSize*cols,h:tileSize*rows};Game.Boot=function(t){this.game=t},Game.Boot.prototype={preload:function(){this.game.stage.backgroundColor="#ececec",this.game.load.image("loading","assets/images/loading.png"),this.game.load.image("title","assets/images/title.png"),this.game.load.image("instructions","assets/images/instructions.png"),this.game.load.bitmapFont("minecraftia","assets/fonts/font.png","assets/fonts/font.xml"),this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.game.scale.maxHeight=window.innerHeight,this.game.scale.maxWidth=window.innerHeight*(Game.w/Game.h)},create:function(){this.game.state.start("Load")}},Game.Load=function(t){this.game=t},Game.Load.prototype={init:function(){this.game.renderer.renderSession.roundPixels=!0,this.physics.startSystem(Phaser.Physics.ARCADE),this.physics.arcade.gravity.y=750},preload:function(){var t=this.game.add.text(Game.w,Game.h,"Loading...",{font:"30px Helvetica",fill:"#000"});t.anchor.setTo(.5,.5);var i=this.game.add.sprite(Game.w/2-64,Game.h/2+50,"loading");this.game.load.setPreloadSprite(i),this.game.load.image("background_day","assets/images/day.png"),this.game.load.spritesheet("tiles","assets/images/tiles.png",20,20,13),this.game.load.spritesheet("crate_debris","assets/images/crate.png",4,4,5),this.game.load.tilemap("level1","assets/maps/level1.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap("level2","assets/maps/level2.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap("map_day","assets/maps/day.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap("map_carrot","assets/maps/king_carrot.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap("map_cage","assets/maps/the_cage.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.spritesheet("ninja","assets/images/Ninja2.png",18,18,25),this.game.load.spritesheet("ninja_mob","assets/images/NinjaMob.png",18,18,25),this.game.load.spritesheet("carrot_king","assets/images/carrot_king.png",100,160,4),this.game.load.spritesheet("celery","assets/images/celery.png",18,18,7),this.game.load.spritesheet("carrot","assets/images/carrot_dagger.png",18,18,1),this.game.load.audio("music","assets/audio/LD32.mp3"),this.game.load.audio("boss_dead","assets/audio/boss_dead.wav"),this.game.load.audio("jump","assets/audio/jump.wav"),this.game.load.audio("mob_hit","assets/audio/mob_hit.wav"),this.game.load.audio("player_hit","assets/audio/player_hit.wav"),this.game.load.audio("slash","assets/audio/slash.wav"),this.game.load.audio("stomp","assets/audio/stomp.wav")},create:function(){this.game.state.start("Menu")}};var wKey,aKey,sKey,dKey,Player=function(t,i,e){this.game=t,this.ninja=null,this.jumpSnd=this.game.add.sound("jump"),this.jumpSnd.volume=.5,this.slashSnd=this.game.add.sound("slash"),this.slashSnd.volume=.2,this.edgeTimer=0,this.jumpSpeed=350,this.jumpTimer=0,this.moveSpeed=150,this.facing="right",this.wasStanding=!1,this.isAttacking=!1,this.currentWeaponName="celery",this.currentWeapon=null,this.standing=!1,this.ninja=this.game.add.sprite(i,e,"ninja"),this.ninja.health=100,this.game.physics.arcade.enable(this.ninja),this.ninja.anchor.setTo(.5,.5),this.ninja.body.setSize(10,18),this.ninja.animations.add("right",[2,3],10,!0),this.ninja.animations.add("left",[4,5],10,!0),this.ninja.body.collideWorldBounds=!0,this.ninja.body.gravity.y=750,this.game.camera.follow(this.ninja,Phaser.Camera.FOLLOW_PLATFORMER),this.celery=this.game.add.sprite(0,0,"celery"),this.game.physics.arcade.enable(this.celery),this.celery.anchor.setTo(.5,.5),this.celery.alive=!1,this.celery.body.immovable=!0,this.celery.animations.add("swing",[0,1,2,3,4,5,6],30,!1),wKey=this.game.input.keyboard.addKey(Phaser.Keyboard.W),aKey=this.game.input.keyboard.addKey(Phaser.Keyboard.A),sKey=this.game.input.keyboard.addKey(Phaser.Keyboard.S),dKey=this.game.input.keyboard.addKey(Phaser.Keyboard.D),spaceKey=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),this.cursors=this.game.input.keyboard.createCursorKeys()};Player.prototype={movements:function(){this.standing=this.ninja.body.blocked.down||this.ninja.body.touching.down,this.ninja.body.velocity.x=0,aKey.isDown||this.cursors.left.isDown?(this.ninja.body.velocity.x=-this.moveSpeed,this.ninja.body.setSize(10,18,2,0),this.ninja.play("left"),"left"!==this.facing&&(this.facing="left"),this.standing===!1&&(this.ninja.frame=7)):dKey.isDown||this.cursors.right.isDown?(this.ninja.body.velocity.x=this.moveSpeed,this.ninja.body.setSize(10,18,-2,0),this.ninja.play("right"),"right"!==this.facing&&(this.facing="right"),this.standing===!1&&(this.ninja.frame=6)):(this.ninja.animations.stop(),this.ninja.body.setSize(10,18,0,0),this.ninja.frame="left"===this.facing?1:0),spaceKey.isDown&&(this.ninja.frame="left"===this.facing?this.ninja.body.blocked.down===!1?11:9:this.ninja.body.blocked.down===!1?10:8,this.attack()),!this.standing&&this.wasStanding&&(this.edgeTimer=this.game.time.now+250),(this.standing||this.game.time.now<=this.edgeTimer)&&(wKey.isDown||this.cursors.up.isDown)&&this.game.time.now>this.jumpTimer&&(this.jumpSnd.play(),this.ninja.body.velocity.y=-this.jumpSpeed,this.jumpTimer=this.game.time.now+750),this.wasStanding=this.standing,wKey.onUp.add(function(){this.ninja.body.velocity.y<-150&&(this.ninja.body.velocity.y=-100)},this),this.cursors.up.onUp.add(function(){this.ninja.body.velocity.y<-150&&(this.ninja.body.velocity.y=-100)},this)},attack:function(){this.celery.x="right"===this.facing?this.ninja.x+18:this.ninja.x-18,this.celery.y=this.ninja.y,"celery"===this.currentWeaponName&&(this.currentWeapon=this.celery,spaceKey.isDown&&this.isAttacking===!1&&(this.slashSnd.play(),this.celery.scale.x="right"===this.facing?1:-1,this.celery.reset(this.ninja.x,this.ninja.y),this.celery.play("swing"),this.isAttacking=!0,this.celery.events.onAnimationComplete.add(function(){this.celery.kill()},this))),spaceKey.onUp.add(function(){this.isAttacking=!1,this.currentWeapon=null},this)}},Game.Day=function(t){this.game=t},Game.Day.prototype={create:function(){this.game.world.setBounds(0,0,Game.w,Game.h),this.hitSnd=this.game.add.sound("player_hit"),this.hitSnd.volume=.5,this.mobSnd=this.game.add.sound("mob_hit"),this.mobSnd.volume=.5,this.game.physics.startSystem(Phaser.Physics.ARCADE),this.map=this.game.add.tilemap("map_day"),this.game.add.tileSprite(0,0,this.map.tileWidth*this.map.width,this.map.tileWidth*this.map.height,"background_day"),this.map.addTilesetImage("tiles","tiles"),this.map.setCollision(2),this.map.setCollision(3),this.map.setCollision(4),this.map.setCollision(5),this.map.setCollision(6),this.map.setCollision(11),this.map.setCollision(12),this.layer=this.map.createLayer("layer1"),this.layer.resizeWorld(),this.crates=this.game.add.group(),this.crates.enableBody=!0,this.exits=this.game.add.group(),this.exits.enableBody=!0,this.mobs=this.game.add.group(),this.mobs.enableBody=!0,this.mobSpeed=70,this.map.createFromObjects("objects",8,"tiles",7,!0,!1,this.crates),this.map.createFromObjects("objects",9,"ninja_mob",0,!0,!1,this.mobs),this.map.createFromObjects("objects",10,"tiles",9,!0,!1,this.exits),this.crates.forEach(function(t){t.body.immovable=!0,t.anchor.setTo(.5,.5),t.x=t.x+this.map.tileWidth/2,t.y=t.y+this.map.tileWidth/2},this),this.mobs.forEach(function(t){t.x=t.x+t.width/2,t.y=t.y+t.height/2,t.body.immovable=!0,t.anchor.setTo(.5,.5),t.body.setSize(10,18),t.initialx=t.x,t.minX=t.x-this.map.tileWidth*t.patrol,t.maxX=t.x+this.map.tileWidth*t.patrol,t.tint=16774034,t.body.velocity.x=-this.mobSpeed,t.direction=-1,t.animations.add("right",[2,3],10,!0),t.animations.add("left",[4,5],10,!0),t.play("left")},this),this.startX=32,this.startY=180,this.player=new Player(this.game,this.startX,this.startY),this.playerHealthBar=this.game.add.sprite(8,8,this.drawRect(64,4,"#33ff00")),this.playerHealthBar.fixedToCamera=!0,this.crate_emitter=this.game.add.emitter(0,0,100),this.crate_emitter.makeParticles("crate_debris"),this.crate_emitter.gravity=500,this.crate_emitter.minParticleSpeed.setTo(-100,-100),this.crate_emitter.maxParticleSpeed.setTo(100,100)},drawRect:function(t,i,e){var a=this.game.add.bitmapData(t,i);return a.ctx.beginPath(),a.ctx.rect(0,0,t,i),a.ctx.fillStyle=e,a.ctx.fill(),a},update:function(){this.player.ninja.y>=this.map.tileWidth*this.map.height-this.player.ninja.height&&this.playerDead(),this.playerHealthBar.scale.x=this.player.ninja.health/100,this.game.physics.arcade.collide(this.player.ninja,this.layer),this.game.physics.arcade.collide(this.player.ninja,this.crates),this.game.physics.arcade.overlap(this.player.ninja,this.mobs,this.playerHit,null,this),this.game.physics.arcade.overlap(this.player.ninja,this.exits,this.nextLevel,null,this),this.game.physics.arcade.collide(this.mobs,this.layer),this.game.physics.arcade.overlap(this.player.currentWeapon,this.mobs,this.killMobs,null,this),this.game.physics.arcade.overlap(this.player.currentWeapon,this.crates,this.breakCrate,null,this),this.mobs.forEach(function(t){t.patrol&&(t.x<t.minX?(t.body.velocity.x=this.mobSpeed,t.play("right")):t.x>t.maxX&&(t.body.velocity.x=-this.mobSpeed,t.play("left")))},this),this.player.movements(this.layer)},nextLevel:function(t,i){this.game.state.start(i.destination)},playerHit:function(t,i){if(!this.takingDmg){this.takingDmg=!0,this.hitSnd.play(),i.alive===!0&&(t.health-=10);var e=this.game.add.tween(t).to({alpha:0},200).to({alpha:1},200).start();e.onComplete.add(function(){this.takingDmg=!1,t.health<=0&&this.playerDead()},this)}},playerDead:function(){this.player.ninja.reset(this.startX,this.startY),this.player.ninja.health=100},breakCrate:function(t,i){this.crate_emitter.x=i.x,this.crate_emitter.y=i.y,this.crate_emitter.start(!0,500,null,32),i.kill()},mobBounce:function(t,i){console.log("gotta bounce homie"+t.body.velocity.x),t.direction<0?(t.body.velocity.x=this.mobSpeed,t.play("right")):(t.body.velocity.x=-this.mobSpeed,t.play("left")),t.direction*=-1},killMobs:function(t,i){this.mobSnd.play(),i.alive=!1;var e=this.game.add.tween(i).to({tint:16711680},10).to({tint:16774034},10).start();e.onComplete.add(function(){i.kill()},this)},render:function(){}},Game.Carrot=function(t){this.game=t},Game.Carrot.prototype={create:function(){this.game.world.setBounds(0,0,Game.w,Game.h),this.stompSnd=this.game.add.sound("stomp"),this.stompSnd.volume=.5,this.hitSnd=this.game.add.sound("player_hit"),this.hitSnd.volume=.5,this.deadSnd=this.game.add.sound("boss_dead"),this.deadSnd.volume=.5,this.mobSnd=this.game.add.sound("mob_hit"),this.mobSnd.volume=.5,this.game.physics.startSystem(Phaser.Physics.ARCADE),this.attackTimer=this.game.time.now,this.attackAnimTimer=0,this.map=this.game.add.tilemap("map_carrot"),this.game.add.tileSprite(0,0,this.map.tileWidth*this.map.width,this.map.tileWidth*this.map.height,"background_day"),this.map.addTilesetImage("tiles","tiles"),this.map.setCollision(10),this.map.setCollision(11),this.layer=this.map.createLayer("layer1"),this.layer.resizeWorld(),this.crates=this.game.add.group(),this.crates.enableBody=!0,this.map.createFromObjects("objects",8,"tiles",7,!0,!1,this.crates),this.reflectors=this.game.add.group(),this.reflectors.enableBody=!0,this.map.createFromObjects("objects",1,"tiles",0,!0,!1,this.reflectors),this.crates.forEach(function(t){t.body.immovable=!0,t.anchor.setTo(.5,.5),t.x=t.x+this.map.tileWidth/2,t.y=t.y+this.map.tileWidth/2},this),this.carrotKing=this.game.add.sprite(170,700,"carrot_king"),this.game.physics.arcade.enable(this.carrotKing),this.carrotKing.frame=0,this.carrotKing.health=100,this.carrotKing.anchor.setTo(.5,.5),this.carrotKing.body.setSize(28,18,-28,-48),this.carrotKing.animations.add("idle",[0,1],1,!0),this.carrotKing.animations.add("attack",[2,3],10,!0),this.carrotKing.play("idle"),this.carrots=this.game.add.group(),this.carrots.enableBody=!0,this.carrots.physicsBodyType=Phaser.Physics.ARCADE,this.carrots.createMultiple(30,"carrot",0,!1),this.carrots.setAll("body.gravity.y",350),this.carrots.setAll("anchor.x",.5),this.carrots.setAll("anchor.y",.5),this.mobSpeed=70,this.mobs=this.game.add.group(),this.mobs.enableBody=!0,this.mobs.physicsBodyType=Phaser.Physics.ARCADE,this.mobs.createMultiple(30,"ninja_mob",0,!1),this.mobs.setAll("body.gravity.y",350),this.mobs.setAll("anchor.x",.5),this.mobs.setAll("anchor.y",.5),this.mobs.callAll("animations.add","animations","right",[2,3],10,!0,!0),this.mobs.callAll("animations.add","animations","left",[4,5],10,!0,!0),this.mobs.forEach(function(t){t.direction=-1},this),this.startX=50,this.startY=180,this.player=new Player(this.game,this.startX,this.startY),this.player.direction=1,this.playerHealthBar=this.game.add.sprite(8,8,this.drawRect(64,4,"#33ff00")),this.enemyHealthBar=this.game.add.sprite(160,8,this.drawRect(64,4,"#ff0000")),this.playerHealthBar.fixedToCamera=!0,this.enemyHealthBar.fixedToCamera=!0,this.crate_emitter=this.game.add.emitter(0,0,100),this.crate_emitter.makeParticles("crate_debris"),this.crate_emitter.gravity=500,this.crate_emitter.minParticleSpeed.setTo(-100,-100),this.crate_emitter.maxParticleSpeed.setTo(100,100),this.carrot_emitter=this.game.add.emitter(0,0,100),this.carrot_emitter.makeParticles("carrot"),this.carrot_emitter.gravity=500,this.carrot_emitter.minParticleSpeed.setTo(-100,-100),this.carrot_emitter.maxParticleSpeed.setTo(100,100)},mobBounce:function(t,i){console.log("gotta bounce homie"+t.body.velocity.x),t.direction<0?(t.body.velocity.x=this.mobSpeed,t.play("right")):(t.body.velocity.x=-this.mobSpeed,t.play("left")),t.direction*=-1},drawRect:function(t,i,e){var a=this.game.add.bitmapData(t,i);return a.ctx.beginPath(),a.ctx.rect(0,0,t,i),a.ctx.fillStyle=e,a.ctx.fill(),a},update:function(){if(this.mobs.forEach(function(t){t.body.velocity.x=t.direction*this.mobSpeed,t.play(t.direction<0?"left":"right")},this),this.player.ninja.x>=235&&this.carrotKing.alive===!1&&this.game.state.start("Cage"),this.game.time.now>this.attackTimer+5e3&&this.carrotKing.alive&&(this.attackAnimTimer=this.game.time.now+2e3,this.carrotAttack(),console.log(this.carrotKing.animations.currentAnim.name)),this.attackAnimTimer<this.game.time.now&&"idle"!==this.carrotKing.animations.currentAnim.name&&(this.carrotKing.play("idle"),this.carrotKing.alive)){var t=this.mobs.getFirstDead();t.body.velocity.x=this.mobSpeed,t.reset(160,760)}this.playerHealthBar.scale.x=this.player.ninja.health/100,this.enemyHealthBar.scale.x=this.carrotKing.health/100,this.game.physics.arcade.overlap(this.player.ninja,this.carrots,this.playerHit,null,this),this.game.physics.arcade.overlap(this.player.ninja,this.mobs,this.playerHit,null,this),this.game.physics.arcade.overlap(this.player.currentWeapon,this.carrotKing,this.kingHit,null,this),this.game.physics.arcade.overlap(this.mobs,this.reflectors,this.mobBounce,null,this),this.game.physics.arcade.collide(this.mobs,this.layer),this.game.physics.arcade.overlap(this.carrots,this.layer,this.carrotKill,null,this),this.game.physics.arcade.collide(this.player.ninja,this.layer),this.game.physics.arcade.collide(this.player.ninja,this.crates),this.game.physics.arcade.overlap(this.player.currentWeapon,this.crates,this.breakCrate,null,this),this.game.physics.arcade.overlap(this.player.currentWeapon,this.mobs,this.killMobs,null,this),this.player.movements(this.layer)},kingHit:function(t,i){if(!this.kingTakingDmg){this.kingTakingDmg=!0,i.health-=2;var e=this.game.add.tween(i).to({alpha:0},100).to({alpha:1},100).start();e.onComplete.add(function(){this.kingTakingDmg=!1,i.health<=0&&(this.carrot_emitter.x=i.x,this.carrot_emitter.y=i.y,this.carrot_emitter.start(!0,1e3,null,128),i.kill(),this.deadSnd.play())},this)}},killMobs:function(t,i){this.mobSnd.play(),i.alive=!1;var e=this.game.add.tween(i).to({tint:16711680},10).to({tint:16774034},10).start();e.onComplete.add(function(){i.kill()},this)},carrotKill:function(t,i){t.kill()},carrotAttack:function(){this.carrotKing.animations.stop(),this.carrotKing.play("attack"),this.attackTimer=this.game.time.now+1e3,this.stompSnd.play();for(var t=0;10>t;t++){var i=this.carrots.getFirstDead();i.reset(24*t+40,420)}},playerHit:function(t,i){if(!this.takingDmg){this.takingDmg=!0,this.hitSnd.play(),i.alive===!0&&(t.health-="carrot"===i.key?25:10);var e=this.game.add.tween(t).to({alpha:0},200).to({alpha:1},200).start();e.onComplete.add(function(){this.takingDmg=!1,t.health<=0&&this.playerDead()},this)}},playerDead:function(){this.player.ninja.reset(this.startX,this.startY),this.player.ninja.health=100,this.carrotKing.health=100,this.mobs.callAll("kill"),this.carrots.callAll("kill")},breakCrate:function(t,i){this.crate_emitter.x=i.x,this.crate_emitter.y=i.y,this.crate_emitter.start(!0,500,null,32),i.kill()}},Game.Cage=function(t){this.game=t},Game.Cage.prototype={create:function(){this.game.world.setBounds(0,0,Game.w,Game.h),this.killCount=0,this.attackTimer=this.game.time.now+1500,this.game.physics.startSystem(Phaser.Physics.ARCADE),this.directionLock=!1,this.map=this.game.add.tilemap("map_cage"),this.game.add.tileSprite(0,0,this.map.tileWidth*this.map.width,this.map.tileWidth*this.map.height,"background_day"),this.map.addTilesetImage("tiles","tiles"),this.map.setCollision(2),this.map.setCollision(3),this.map.setCollision(4),this.map.setCollision(5),this.map.setCollision(6),this.reflectors=this.game.add.group(),this.reflectors.enableBody=!0,this.map.createFromObjects("objects",1,"tiles",0,!0,!1,this.reflectors),this.layer=this.map.createLayer("layer1"),this.layer.resizeWorld(),this.crates=this.game.add.group(),this.crates.enableBody=!0,this.mobs=this.game.add.group(),this.mobs.enableBody=!0,this.mobSpeed=70,this.map.createFromObjects("objects",8,"tiles",7,!0,!1,this.crates),this.map.createFromObjects("objects",9,"ninja_mob",0,!0,!1,this.mobs),this.mobSpeed=70,this.mobs=this.game.add.group(),this.mobs.enableBody=!0,this.mobs.physicsBodyType=Phaser.Physics.ARCADE,this.mobs.createMultiple(30,"ninja_mob",0,!1),this.mobs.setAll("body.gravity.y",350),this.mobs.setAll("anchor.x",.5),this.mobs.setAll("anchor.y",.5),this.mobs.callAll("animations.add","animations","right",[2,3],10,!0,!0),this.mobs.callAll("animations.add","animations","left",[4,5],10,!0,!0),this.mobs.forEach(function(t){t.direction=1},this),this.startX=32,this.startY=180,this.player=new Player(this.game,this.startX,this.startY),this.playerHealthBar=this.game.add.sprite(8,8,this.drawRect(64,4,"#33ff00")),this.playerHealthBar.fixedToCamera=!0,this.crate_emitter=this.game.add.emitter(0,0,100),this.crate_emitter.makeParticles("crate_debris"),this.crate_emitter.gravity=500,this.crate_emitter.minParticleSpeed.setTo(-100,-100),this.crate_emitter.maxParticleSpeed.setTo(100,100),this.score=this.game.add.bitmapText(Game.w/2+50,10,"minecraftia","Kills:",12),this.winner=this.game.add.bitmapText(Game.w/2-40,Game.h/2,"minecraftia","You WIN!",12)},drawRect:function(t,i,e){var a=this.game.add.bitmapData(t,i);return a.ctx.beginPath(),a.ctx.rect(0,0,t,i),a.ctx.fillStyle=e,a.ctx.fill(),a},update:function(){if(this.score.setText("Kills: "+this.killCount),this.mobs.forEach(function(t){t.body.velocity.x=t.direction*this.mobSpeed,t.play(t.direction<0?"left":"right")},this),this.game.time.now>this.attackTimer){var t=this.mobs.getFirstDead();t.body.velocity.x=this.mobSpeed,t.reset(Game.w/2,40),this.attackTimer=this.game.time.now+2e3}this.player.ninja.y>=this.map.tileWidth*this.map.height-this.player.ninja.height&&this.playerDead(),this.playerHealthBar.scale.x=this.player.ninja.health/100,this.game.physics.arcade.overlap(this.mobs,this.reflectors,this.mobBounce,null,this),this.game.physics.arcade.collide(this.player.ninja,this.layer),this.game.physics.arcade.collide(this.player.ninja,this.crates),this.game.physics.arcade.overlap(this.player.ninja,this.mobs,this.playerHit,null,this),this.game.physics.arcade.collide(this.mobs,this.layer),this.game.physics.arcade.overlap(this.player.currentWeapon,this.mobs,this.killMobs,null,this),this.game.physics.arcade.overlap(this.player.currentWeapon,this.crates,this.breakCrate,null,this),this.player.movements(this.layer)},hitReflector:function(t,i){console.log("that happened")},playerHit:function(t,i){if(!this.takingDmg){this.takingDmg=!0,i.alive===!0&&(t.health-=10);var e=this.game.add.tween(t).to({alpha:0},200).to({alpha:1},200).start();e.onComplete.add(function(){this.takingDmg=!1,t.health<=0&&this.playerDead()},this)}},playerDead:function(){this.player.ninja.reset(this.startX,this.startY),this.player.ninja.health=100,this.killCount=0,this.mobs.callAll("kill")},breakCrate:function(t,i){this.crate_emitter.x=i.x,this.crate_emitter.y=i.y,this.crate_emitter.start(!0,500,null,32),i.kill()},mobBounce:function(t,i){console.log("gotta bounce homie"+t.body.velocity.x),t.direction<0?(t.body.velocity.x=this.mobSpeed,t.play("right")):(t.body.velocity.x=-this.mobSpeed,t.play("left")),t.direction*=-1},killMobs:function(t,i){i.alive=!1,i.kill(),this.killCount+=1},render:function(){this.game.debug.body(this.reflectors)}},Game.Menu=function(t){this.game=t},Game.Menu.prototype={create:function(){this.title=this.game.add.sprite(Game.w/2,Game.h/2,"title"),this.title.anchor.setTo(.5,.5)},update:function(){this.game.input.activePointer.isDown&&(this.game.state.start("Day"),this.music=this.game.add.sound("music"),this.music.play("",0,.3,!0))}},Game.Play=function(t){this.game=t},Game.Play.prototype={create:function(){this.game.world.setBounds(0,0,Game.w,Game.h),this.game.add.tileSprite(0,0,240,240,"background"),this.game.physics.startSystem(Phaser.Physics.ARCADE),this.map=this.game.add.tilemap("level2"),this.map.addTilesetImage("tiles","tiles"),this.map.setCollision(2),this.map.setCollision(3),this.map.setCollision(4),this.map.setCollision(5),this.map.setCollision(6),this.layer=this.map.createLayer("layer1"),this.layer.resizeWorld(),this.player=new Player(this.game)},update:function(){this.player.movements(this.layer)},render:function(){}};var game=new Phaser.Game(Game.w,Game.h,Phaser.AUTO,"game");game.state.add("Boot",Game.Boot),game.state.add("Load",Game.Load),game.state.add("Menu",Game.Menu),game.state.add("Day",Game.Day),game.state.add("Carrot",Game.Carrot),game.state.add("Cage",Game.Cage),game.state.add("Play",Game.Play),game.state.start("Boot");