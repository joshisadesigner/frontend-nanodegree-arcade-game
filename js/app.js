var tileh = 101,
    tilew = 80;
    canvasw = tilew * 5;
    canvash = tileh * 6;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60;
    this.speed = Math.floor(Math.random() * 1000);
};

var Player = function() {
  this.sprite = 'images/char-boy.png';
  // Placing on the center of the canvas
  // as the canvas width is 505 and each tile o cupy an area of 101 height and
  // 80px width with a tilew variable
  this.x = ( canvasw / 2 ) - ( tilew / 2 ) + 40 ;
  this.y = ( canvash - tileh ) - ( tileh + 20 ); // placed on the first grass row
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += ( this.speed * dt );
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function( key ) {
  switch( key ){
    case 'up' :
      if ( this.y > 0 ){ this.y -= 80; }
      console.log( 'Boy is at y = ' + this.y + '(up)');
      break;
    case 'down' :
    if ( this.y < 350 ){ this.y += 80 ; }
      console.log( 'Boy is at y = ' + this.y + '(down)');
      break;
    case 'left' :
      if ( this.x > 0 ){ this.x -= 101; }
      console.log( 'Boy is at x = ' + this.x + '(right)');
      break;
    case 'right' :
    if ( this.x < 350 ){ this.x += 101 ; }
      console.log( 'Boy is at x = ' + this.x + '(left)');
      break;
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();

var allEnemies = [ bug1 ];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
