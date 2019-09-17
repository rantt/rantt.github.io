function rand(e,t){return Math.floor(Math.random()*(t-e+1))+e}var Fish=function(e,t,i,s,a){var h=t.world.randomX,r=t.world.randomY;s>1&&(h=1==rand(0,1)?Game.w:0),this.player=i,this.game=t,this.baseSpeed=200,this.speed=this.baseSpeed/s,this.alive=!0,this.enemies=a||[],this.sprite=this.game.add.sprite(h,r,"fishy"),this.sprite.animations.add("swim",[0,1],10,!0),this.sprite.anchor.setTo(.5,.5),this.sprite.scale.x=s,this.sprite.scale.y=s,this.game.physics.arcade.enable(this.sprite),this.sprite.body.setSize(40,40),this.sprite.name=e.toString(),this.sprite.angle=this.game.rnd.angle(),this.game.physics.arcade.velocityFromRotation(this.game.physics.arcade.angleBetween(this.sprite,this.player),150,this.sprite.body.velocity)};Fish.prototype={update:function(){this.speed=this.baseSpeed/this.sprite.scale.x,this.sprite.animations.play("swim"),this.player.scale.x<this.sprite.scale.x?this.sprite.tint=16711680:this.player.scale.x==this.sprite.scale.x?this.sprite.tint=16747520:this.sprite.tint=65280,this.game.physics.arcade.distanceBetween(this.sprite,this.player)<300&&this.player.alive===!0&&(this.player.scale.x<this.sprite.scale.x?(this.sprite.rotation=this.game.physics.arcade.angleBetween(this.sprite,this.player),this.game.physics.arcade.moveToObject(this.sprite,this.player,this.speed)):(this.sprite.rotation=this.game.physics.arcade.angleBetween(this.player,this.sprite),this.game.physics.arcade.velocityFromRotation(this.sprite.rotation,100,this.sprite.body.velocity)))}};var Game={w:1024,h:768};Game.Boot=function(e){this.game=e},Game.Boot.prototype={preload:function(){this.game.stage.backgroundColor="#FFF",this.game.load.image("loading","assets/images/loading.png"),this.game.load.image("title","assets/images/title.png"),this.game.load.image("instructions","assets/images/instructions.png"),this.game.load.bitmapFont("minecraftia","assets/fonts/font.png","assets/fonts/font.xml"),this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.game.scale.maxHeight=window.innerHeight,this.game.scale.maxWidth=window.innerHeight*(Game.w/Game.h)},create:function(){this.game.state.start("Load")}},Game.Load=function(e){this.game=e},Game.Load.prototype={preload:function(){var e=this.game.add.text(Game.w,Game.h,"Loading...",{font:"30px Helvetica",fill:"#000"});e.anchor.setTo(.5,.5);var t=this.game.add.sprite(Game.w/2-64,Game.h/2+50,"loading");this.game.load.setPreloadSprite(t),this.game.load.image("background","assets/images/background2.png"),this.game.load.spritesheet("fishy","assets/images/fishy.png",72,72,2),this.game.load.audio("music","assets/audio/ld34.mp3"),this.game.load.audio("mob_hit","assets/audio/mob_hit.wav"),this.game.load.audio("player_hit","assets/audio/player_hit.wav"),this.game.load.image("twitter","assets/images/twitter.png")},create:function(){this.game.state.start("Menu")}},Game.Menu=function(e){this.game=e},Game.Menu.prototype={create:function(){this.space=this.game.add.tileSprite(0,0,boundedX,boundedY,"background"),this.title=this.game.add.sprite(Game.w/2,Game.h/2-100,"title"),this.title.anchor.setTo(.5,.5);this.game.add.bitmapText(Game.w/2-100,Game.h/2+100,"minecraftia","~click to start~",24)},update:function(){this.game.input.activePointer.isDown&&this.game.state.start("Play")}};var wKey,aKey,sKey,dKey,fishes=[],fishesAlive=0,boundedX=1024,boundedY=768,level=1,levels=[[.75],[.75,.75,.75,.75,.75,.75,.75,.75,.75],[.75,1,1,1,1],[.75,.5,1,1.5],[.75,.75,.75,.75,.75,2,2],[.5,.75,.75,1.25,1.5,2],[.5,.75,.75,.75,.75,.75,.75,.75,.75,.75,.75,.75,.75,4]],levelNames=["Oh, it's just you","Big fish, little pond","Hey, we're all friend here...","Where did you come from","Double Trouble","Three's a crowd","Oh, now that's just getting rediculous","Big Boss Bass"],score=0;Game.Play=function(e){this.game=e},Game.Play.prototype={create:function(){this.game.world.setBounds(0,0,boundedX,boundedY),this.space=this.game.add.tileSprite(0,0,boundedX,boundedY,"background"),this.game.physics.startSystem(Phaser.Physics.ARCADE),this.currentSpeed=0,this.player=this.game.add.sprite(Game.w/2,Game.h/2,"fishy"),this.player.animations.add("swim",[0,1],10,!0),this.player.anchor.setTo(.5,.5),this.player.alive=!0,this.player.health=10,this.game.physics.arcade.enable(this.player),this.player.body.setSize(40,40),this.game.physics.arcade.setBoundsToWorld(!0,!0,!0,!0,!1),this.loadLevel(level),this.music=this.game.add.sound("music"),this.music.volume=.5,this.music.play("",0,1,!0),this.playerHitSnd=this.game.add.sound("player_hit"),this.playerHitSnd.volume=.2,this.mobHitSnd=this.game.add.sound("mob_hit"),this.mobHitSnd.volume=.2,wKey=this.game.input.keyboard.addKey(Phaser.Keyboard.W),aKey=this.game.input.keyboard.addKey(Phaser.Keyboard.A),sKey=this.game.input.keyboard.addKey(Phaser.Keyboard.S),dKey=this.game.input.keyboard.addKey(Phaser.Keyboard.D),this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_TOPDOWN),this.cursors=game.input.keyboard.createCursorKeys(),this.scoreText=this.game.add.bitmapText(Game.w-100,32,"minecraftia","Score: "+score,32),this.scoreText.anchor.setTo(.5,.5),this.lvlText=this.game.add.bitmapText(32,32,"minecraftia","Lvl: "+levelNames[0],32),this.winText=this.game.add.bitmapText(Game.w/2-100,Game.h/2+100,"minecraftia","YOU WIN!",24),this.winText.anchor.setTo(.5,.5),this.winText.visible=!1,this.twitterButton=this.game.add.button(this.game.world.centerX,this.game.world.centerY+200,"twitter",this.twitter,this),this.twitterButton.anchor.set(.5),this.twitterButton.visible=!1},loadLevel:function(e){fishes=[],fishesAlive=0,this.player.scale.x=1,this.player.scale.y=1,this.player.x=Game.w/2,this.player.y=Game.h/2;for(var t=levels[e-1],i=0;i<t.length;i++)fishes.push(new Fish(i,this.game,this.player,t[i])),fishesAlive+=1},update:function(){if(1==this.player.alive){this.game.input.activePointer.isDown&&(this.currentSpeed=500,(this.player.y>this.game.input.activePointer.y+20||this.player.y<this.game.input.activePointer.y-20||this.player.y>this.game.input.activePointer.y+20||this.player.y<this.game.input.activePointer.y-20)&&(this.game.physics.arcade.moveToPointer(this.player,this.currentSpeed),this.player.rotation=this.game.physics.arcade.angleBetween(this.player,this.game.input.activePointer))),this.cursors.left.isDown||aKey.isDown?this.player.angle-=4.5:(this.cursors.right.isDown||dKey.isDown)&&(this.player.angle+=4.5),this.cursors.up.isDown||wKey.isDown?this.currentSpeed=500:this.cursors.down.isDown||sKey.isDown?this.currentSpeed=0:this.currentSpeed>0&&(this.currentSpeed-=12),this.currentSpeed>0?(this.player.play("swim"),this.game.physics.arcade.velocityFromRotation(this.player.rotation,this.currentSpeed,this.player.body.velocity)):(this.player.frame=0,this.player.animations.stop()),this.wrapSprite(this.player);for(var e=0;e<fishes.length;e++)fishes[e].alive&&(fishes[e].update(),this.wrapSprite(fishes[e].sprite),this.game.physics.arcade.overlap(this.player,fishes[e].sprite,this.fishEatFish,null,this));0===fishesAlive&&(level+=1,level>7?(this.twitterButton.visible=!0,this.winText.setText("YOU WIN!!"),this.winText.visible=!0):(this.lvlText.setText("Lvl: "+levelNames[level-1]),this.loadLevel(level)))}else if(this.game.input.activePointer.isDown){this.player.reset(Game.w/2,Game.h/2),this.player.alive=!0;for(var e=0;e<fishes.length;e++)fishes[e].sprite.kill();this.winText.visible=!1,this.loadLevel(level)}},fishEatFish:function(e,t){e.scale.x<t.scale.x?(this.playerHitSnd.play(),this.winText.setText("YOU LOSE!, Click to Play Again"),this.winText.visible=!0,score=0,e.kill()):e.scale.x>t.scale.x&&(this.mobHitSnd.play(),score+=1,this.scoreText.setText("Score: "+score),t.kill(),fishesAlive-=1,e.scale.x+=.25,e.scale.y+=.25)},twitter:function(){window.open("http://twitter.com/share?text=My+best+score+is+"+score+"+playing+Always+A+Bigger+Fish+See+if+you+can+beat+it.+at&via=rantt_&url=http://www.divideby5.com/games/LD34/&hashtags=LDJAM,LD48","_blank")},wrapSprite:function(e){e.x<0?e.x=boundedX:e.x>boundedX&&(e.x=0),e.y<0?e.y=boundedY:e.y>boundedY&&(e.y=0)}};var game=new Phaser.Game(Game.w,Game.h,Phaser.AUTO,"game");game.state.add("Boot",Game.Boot),game.state.add("Load",Game.Load),game.state.add("Menu",Game.Menu),game.state.add("Play",Game.Play),game.state.start("Boot");