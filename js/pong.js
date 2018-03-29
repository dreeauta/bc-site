
const Presets = {
  'width': window.innerWidth < 480 ? 300 : window.innerWidth,
  'height': window.innerHeight-32 < 320 ? 320 : window.innerHeight
}

var game = new Phaser.Game(Presets.width, Presets.height, Phaser.AUTO, 'pong-game', {
  preload:preload,
  create: create,
  update: update
});

  // paramaters
  // -canvas size 800x600
  // -Phaser.auto -phaser checks what's best render for browser canvas vs webgl,
  // - "" Dom
  // -create functions preload, create, update

  var paddle1;
  var paddle2;
  var ball;

  var ball_launched;  //check if ball has launched
  var ball_velocity; //speed of ball

  var score1_text;
  var score2_text;
  var score1;
  var score1;

  function preload(){
    game.load.image('paddle','./assets/pong/paddle.png');
    game.load.image('ball', './assets/pong/ball.png');

    game.load.audio('beep1', ['assets/pong/beep1.wav']);


  }

  function create(){

    //sets up position and placing on screen
    ball_launched = false;
    ball_velocity = 400;   //velocity speed

    paddle1 = create_paddle(0, game.world.centerY);  //center in middle of the screen
    paddle2 = create_paddle(game.world.width - 16, game.world.centerY);
    ball = create_ball(game.world.centerX, game.world.centerY);

    game.input.onDown.add(launch_ball, this);  //when input is down add event

    score1_text = game.add.text( 128, 128, '0', {
      font: '64px Gabriella',
      fill: "#ffffff",
      align: "center"
    });
    score2_text = game.add.text( game.world.width - 128, 128, '0', {
      font: '64px Gabriella',
      fill: "#ffffff",
      align: "center"
    });

    score1 = 0;
    score2 = 0;

  }

  function update(){
    score1_text.text = score1;
    score2_text.text = score2;

    control_paddle(paddle1, game.input.y);

    //check collision
    game.physics.arcade.collide(paddle1, ball, function(){
      game.sound.play('beep1');
    }); //3rd parameter is callback when function happens

    game.physics.arcade.collide(paddle2, ball, function(){
      game.sound.play('beep1');
    });

    if (ball.body.blocked.left) {
      score2+=1;
    }
    else if (ball.body.blocked.right) {
      score1+=1;
    }

    paddle2.body.velocity.setTo(ball.body.velocity.y);  //set AI
    paddle2.body.velocity.x = 0;
    // paddle2.body.maxVelocity.y = 350;

  }

  function create_paddle(x,y){
    var paddle = game.add.sprite(x,y, 'paddle');
    paddle.anchor.setTo(0.5,0.5); //setting position of anchor in the middle
    game.physics.arcade.enable(paddle); //enable body/physics , velocity & accelaration

    paddle.body.collideWorldBounds = true; //keep from going out of game screen
    paddle.body.immovable = true; //removes velocity acted on object

    return paddle;
  }

  function control_paddle(paddle, y) {
    paddle.y = y;

    //set boundaries
    if (paddle.y < paddle.height/2){
      paddle.y = paddle.height /2;
      }
    else if (paddle.y > game.world.height - paddle.height /2) {
      paddle.y = game.world.height - paddle.height/2
    }

  }

  function create_ball(x,y) {
    var ball = game.add.sprite(x,y, 'ball');
    ball.anchor.setTo(0.5,0.5); //set in middle
    game.physics.arcade.enable(ball); //enable physics

    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1,1); //when hits it returns with 100% velocity

    return ball
  }

  function launch_ball(){
    if (ball_launched) {
       ball.x = game.world.centerX;
       ball.y = game.world.centerY;
       ball.body.velocity.setTo(0);
       ball_launched = false;
    }
    else {
      ball.body.velocity.x = -ball_velocity; //going to left
      ball.body.velocity.y = ball_velocity;
    }
  }
