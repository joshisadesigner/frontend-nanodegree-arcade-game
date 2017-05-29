var tileh = 101,
  tilew = 80,
  canvasw = tilew * 5,
  canvash = tileh * 6,
  playerStartPositionX = (canvasw / 2) - (tilew / 2) + 40,
  playerStartPositionY = (canvash - tileh) - (tileh + 10);


// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.speed = Math.floor(Math.random() * 500);
};

var Player = function () {
  this.sprite = 'images/char-boy.png';
  // Placing on the center of the canvas
  // as the canvas width is 505 and each tile o cupy an area of 101 height and
  // 80px width with a tilew variable
  this.x = playerStartPositionX;
  this.y = playerStartPositionY; // placed on the first grass row
}

function isCollide(ax, ay, bx, by) {
  if (
    ax < bx + 85 && // bx + 85 sets the right border of the enemy
    ax + 85 > bx &&
    by < ay + 70 &&
    by + 70 > ay
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
  if (player.y > 20) {
    this.x += (this.speed * dt);

    if (this.x > (canvasw + tilew)) {
      this.x = -100;
    }
    if (isCollide(player.x, player.y, this.x, this.y)) {
      player.reset();
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case 'up':
      if (this.y > 0) {
        this.y -= tilew;
      }
      break;
    case 'down':
      if (this.y > 20 && this.y < 350) {
        this.y += tilew;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= tileh;
      }
      break;
    case 'right':
      if (this.x < 350) {
        this.x += tileh;
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
  allEnemies[i].y = (i * 80 + 65);
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
