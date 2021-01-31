const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;
context.fillStyle = "#abc";
function drawstuff() {

    setInterval (function () {
        player1.y = p1y;
        player2.y = p2y;
        context.clearRect(0,0,innerWidth,innerHeight);
        player1.update();
        player2.update();
        ball1.update();
        }, 20);
    }

const drawPaddle = (x, y) => {
    context.fillRect(
        x * innerHeight, 
        y * innerWidth, 
        config.paddleWidth * innerWidth,
        config.paddleHeight * innerHeight)
}

const drawBall = (x, y) => {
    var s = config.ballSize * innerHeight
    context.fillRect(
        x * innerWidth, 
        y * innerHeight, s, s)
}
