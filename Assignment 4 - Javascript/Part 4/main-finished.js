/*

NAME: NATHAN C. BETTON
DATE: 2025-04-02
DESCRIPTION: Create a simple HTML5 canvas application that draws a ball on the screen. However, more interaction is implemented
              where user can use the empty circle to remove the balls from the screen. 
*/

// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
// This class serves as parent class for both Ball and EvilCircle classes
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = true;

  }
}
// Ball class inherits from Shape class
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.shapeType = 'Circle'; 
  }
// Draws the ball on the canvas if it exists
  draw() {
    if (!this.exists) {
      return;
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
// Animates the ball by updating its position
  update() {
    if (!this.exists) {
      return;
    }
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }
// Changes ball color when colliding with other ball
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
  
}
// EvilCircle class inherits from Shape class
class EvilCircle extends Shape {
// Constructor intializes the EvilCircle properties
  constructor(x,y){
    super(x, y, 0, 0);
    this. velX = 20;
    this.velY = 20;
    this.color = 'white';
    this.size = 10;
  }
// Renders the Evil circle as an outline
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
//  Checks if the EvilCircle is within the bounds of the canvas
  checkBounds() {

    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }
  }
// Checks if evil circle touches any other ball and removes them from the canvas
  collisionDetect() {
      for (const ball of balls) {
        if (ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + ball.size) {
            ball.exists = false;
            count--;
          }
        }
      }
    }
// Allows players to move the EvilCircle using the keyboard
    setControls() {
      window.onkeydown = (e) => {
        switch (e.key) {
          case "a":
            this.x -= this.velX;
            break;
          case "d":
            this.x += this.velX;
            break;
          case "w":
            this.y -= this.velY;
            break;
          case "s":
            this.y += this.velY;
            break;
        }
      };
    }
}
// Creates a paragraph element to display the number of balls
const para = document.createElement("p");
para.style.position = "absolute";
para.style.margin = "10px";
para.style.color = "white";
document.body.appendChild(para);

// Creates an array to hold the balls
const balls = [];
let count = 0;

// Generates 25 balls with random properties
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  count++;
}

// Display the number of balls on the screen
para.textContent = `Number of Balls: ${count}`;

// Creates an instance of EvilCircle at a random position
const evilCircle = new EvilCircle(
  random(0, width),
  random(0, height)
);
evilCircle.setControls(); 
// Coordinate drawing, updates, and animated timing
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
  }
      evilCircle.draw();
      evilCircle.checkBounds();
      evilCircle.collisionDetect();
      para.textContent = `Number of Balls: ${count}`;

      requestAnimationFrame(loop);
 
}

loop();
