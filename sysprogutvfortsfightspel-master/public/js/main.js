var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update});

var bk;
var player;
var arrows;
var fireRate = 200;
var nextFire = 0;
var platform;
var facing = 'left';
var fx;
var rifle;
var x = game.world.randomX;
var y = game.world.randomY;
function preload () {
	game.load.image('logo', 'assets/phaser.png');
	game.load.spritesheet('player','assets/dude.png', 32, 48);
	game.load.image('arrow', 'assets/arrow.png');
	game.load.image('background','assets/game-state-1.png');
	game.load.audio('j','assets/jump.ogg');
	game.load.image('rifle','assets/Ion_Rifle.png');
}

function create () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	bk = game.add.sprite(0,0,'background');
	platform = game.add.group();
	platform.enableBody = true;

	var david = platform.create(400,200,'arrow');
	david.body.allowGravity = false;
	david.body.immovable = true;


	arrows = game.add.group();
	arrows.enableBody = true;

	arrows.createMultiple(50, 'arrow', 0, false);
	arrows.setAll('anchor.x', 0.5);
	arrows.setAll('anchor.y', 0.5);
	arrows.setAll('outOfBoundsKill', true);
	arrows.setAll('checkWorldBounds', true);
	
	player = game.add.sprite(x,y,'player');
	game.physics.enable( [ player,arrows ], Phaser.Physics.ARCADE);

	player.body.bounce.y = 0.2;
	player.body.collideWorldBounds = true;
	player.body.setSize(20, 32, 5, 16);

	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('turn', [4], 20, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.collideWorldBounds = true;
	rifle = player.addChild(game.make.sprite(16,29,'rifle'));

	fx = game.add.audio('j');
	fx.allowMultiple = true;



	rifle.anchor.set(.85,.3);
    //rifle.anchor.set(.5);
	rifle.scale.y = -1;
	rifle.scale.x = -1;



	game.physics.arcade.gravity.y = 100;
	player.body.gravity.y = 100;
	fx.addMarker('jump',0,1);

}

/*// Sending data to the server "AY".

var someData = prompt("What is your name?", "Your name...");
//window.alert("Welcome!");

var exSocket = new WebSocket("http://46.101.102.50:1337");
exSocket.send(someData);
*/
function update() {


	var playerDirection = game.physics.arcade.angleToPointer(player);
	game.physics.arcade.collide(player,platform);
	if(facing==='left'&&(playerDirection<1.5&&playerDirection>-1.5)) {
		facing = 'right';
		rifle.scale.y*=-1;

	}

	else if(facing=='right') {


		if ((playerDirection < -1.5) || (playerDirection > 1.5 && playerDirection < 3)) {
			facing = "left";
			rifle.scale.y *= -1;

		}
	}




	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)&&player.body.onFloor()	) {
		player.body.velocity.y = -400;
		fx.play('jump');
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		player.x -= 4;

	}

	
	else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		player.x += 4;

	}


		
	else
	{
		player.animations.stop();
		if(facing == 'left'&&player.frame!=0) {
			player.frame = 0;
		}
			
		else if(player.frame!=5) {
			player.frame = 5;
		}

	}
	
	if (facing == 'left')
		player.animations.play('left');
	else
		player.animations.play('right');
	if(game.input.activePointer.isDown) {
		fire();
	}
	rifle.rotation=game.physics.arcade.angleToPointer(rifle.previousPosition);
    game.debug.text(rifle.previousPosition, 32, 350);
    game.debug.text(rifle.angle, 32, 370);



}
function fire () {

	if (game.time.now > nextFire && arrows.countDead() > 0)
	{
        var p = new Phaser.Point(rifle.previousPosition.x, rifle.previousPosition.y);

        p.rotate(p.x, p.y, rifle.rotation, false, 32);


		nextFire = game.time.now + fireRate;
		var arrow = arrows.getFirstExists(false);


		arrow.reset(p.x, p.y+7);
        arrow.angle = rifle.angle;

        game.physics.arcade.velocityFromAngle(rifle.angle, 300, arrow.body.velocity); // gör så att projektilerna skjuts med samma vinkel
                                                                                        //som vapnet
	}
}
//var socket = io();
