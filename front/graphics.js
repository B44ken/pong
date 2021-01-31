const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;
context.fillStyle = "#abc";
context.font = "60px Courier New";
context.textAlign = "center"

const drawPaddle = (x, y) => {
    context.fillRect(
        x * innerWidth, 
        y * innerHeight, 
        config.paddleWidth * innerWidth,
        config.paddleHeight * innerHeight)
}

const drawBall = (x, y) => {
    var s = config.ballSize * innerHeight
    context.fillRect(
        x * innerWidth, 
        y * innerHeight, s, s)
}

const drawScore = score => {
    context.fillText(score, innerWidth/2, innerHeight/2);
}
