let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height / 2
let dx = -2
let dy = 2
let colorCount = 0

let noMusic = true
let rightPressed = false
let leftPressed = false

let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2

const ballRadius = 10
const COLORS = ['red', 'green', 'blue']
const PADDLE_SPEED = 10

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = COLORS[colorCount % COLORS.length]
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight)
  ctx.fillStyle = 'green'
  ctx.fill()
  ctx.closePath()
}

function updatePositions() {
  x += dx;
  if (x + ballRadius >= canvas.width || x - ballRadius <= 0) {
    dx = -dx;
    colorCount++
  }

  y += dy;
  if (y + ballRadius >= canvas.height || y - ballRadius <= 0) {
    dy = -dy;
    colorCount++
  }

  if (rightPressed) {
    paddleX = Math.min(paddleX + PADDLE_SPEED, canvas.width - paddleWidth - 3)
  }
  if (leftPressed) {
    paddleX = Math.max(paddleX - PADDLE_SPEED, 3)
  }
}

function draw() {
  clearCanvas()
  drawBall()
  drawPaddle()
  updatePositions()
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function keyDownHandler(e) {
  if (noMusic) {
    let sound = document.getElementById("musicPlayer")
    sound.play()
    noMusic = false
  }

  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false
  }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

setInterval(draw, 10);
