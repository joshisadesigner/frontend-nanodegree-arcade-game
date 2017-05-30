// Variables to reuse on the code, width and height of tiles, widh and height of
// canvas and starting position for player;
var tileh = 83,
    tilew = 101,
    canvasw = tilew * 5,
    canvash = tileh * 6,
    playerStartPositionX = (canvasw / 2) - (tilew / 2),
    // Places player vertical center in the tile, the number 6 places it on the
    // 6th row and - 10 takes 10px over the top to place it correctly inside the tile
    playerStartPositionY = tileh * 5 - 10;


// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  // Place the enemy -100px of the canvas
  this.x = -100;
  // Generates random number to set the movement velocity
  this.speed = Math.floor(Math.random() * 1000);
};

var Player = function () {
  this.sprite = 'images/char-boy.png';
  // Placing on the center of the canvas
  this.x = playerStartPositionX; // placed on the horizontal center
  this.y = playerStartPositionY; // placed on the first grass row
}

function isCollide(ax, ay, bx, by) {
  if (
    ax + 18 < bx + 99 && // Calculates if left border of player is touching Enemy
    ax + 84 > bx && // Calculates if right border of player is touching Enemy
    by + 77 < ay + 139 && // Calculates if bottom border of player is touching Enemy
    by + 70 > ay    // Calculates if top border of player is touching Enemy
  ) {
    return true;
  }
}

Player.prototype.reset = function () {
  // Positioning the player on the first grass row in the middle of the screen
  this.x = playerStartPositionX;
  this.y = playerStartPositionY;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (player.y > tileh - 11) { // Stops enemy movement if the Player reaches water
    this.x += (this.speed * dt); // Updates the place of the Enemy

    if (this.x > (canvasw + tilew)) { // retuns the Enemy to the initial position
      this.x = -100;
    }
    // Checks if Player touches the enemy based on its dimentions
    if (isCollide(player.x, player.y, this.x, this.y)) {
      player.reset(); // Replace the player at the starting position
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Updates the player position
Player.prototype.update = function (dt) {};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case 'up':
      // Moves up the player only if its pass the water
      if (this.y > 0) {
        this.y -= tileh;
      }
      break;
    case 'down':
      // Moves down the player onli if it's inside the canvas and before the
      // water row
      if (this.y > tileh - 11 && this.y < ( canvash - tileh * 2 )) {
        this.y += tileh;
      }
      break;
    case 'left':
      // Moves left the player only inside the canvas
      if (this.x > 0) {
        this.x -= tilew;
      }
      break;
    case 'right':
      // Moves right the player only inside the canvas
      if (this.x < canvasw - tilew) {
        this.x += tilew;
      }
      break;
    case 'enter':
      player.reset();
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];

for (var i = 0; i < allEnemies.length; i++) {
  // positioning each enemy on each rock row
  allEnemies[i].y = ( ( tileh ) * ( i + 1 ) - 20 );
  // console.log(allEnemies[i].speed);
}

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    13: 'enter'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
