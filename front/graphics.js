const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
canvas.style.background = "#000";

canvas.height = innerHeight;
canvas.width = innerWidth;
function drawstuff() {

    setInterval (function () {
        player1.y = p1y;
        player2.y = p2y;
        context.clearRect(0,0,innerWidth,innerHeight);
        player1.update();
        player2.update();
        ball1.update();
        }, 20);
        

player1 = new paddle(config.paddle1Pos, 0.1);
player2 = new paddle(config.paddle2Pos, 0.1);
ball1 = new ball(0.5,0.5);


function ball (x, y) {
    this.height= config.ballSize*innerHeight;
    this.width= config.ballSize*innerHeight;
    this.x = x;
    this.y = y;
    this.update = () => {
        this.x=blx;
        this.y=bly;
        x_value = innerWidth * this.x;
        y_value = innerHeight * this.y;
        context.fillStyle = "#FFF";
        context.fillRect(x_value,y_value, this.width, this.height);
    }
}

function paddle (x, y) {
    this.height= config.paddleHeight*innerHeight;
    this.width= config.paddleWidth*innerWidth;
    this.x= x;
    this.y= y;
    this.update = () => {
        drawPaddle(this.x,this.y,this.width, this.height)
    }
}

function drawPaddle (x, y, w, h) {
    x_value = innerWidth * x;
    y_value = innerHeight * y;
    context.fillStyle = "#FFF";
    context.fillRect(x_value,y_value, w, h);
}
}