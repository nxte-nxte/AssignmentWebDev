// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Create a class for ball
class Ball{
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;

  }
    // This function will tell the ball to draw itself on the screen
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // This function will tell the ball to update its position
  update() {
    this.x += this.velX;
    this.y += this.velY;

    // If the ball goes off the screen, reverse its velocity
    if (this.x + this.size > width || this.x - this.size < 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size > height || this.y - this.size < 0) {
      this.velY = -this.velY;
    }
  }

}




