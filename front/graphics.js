const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
canvas.style.background = "#000";

canvas.height = innerHeight;
canvas.width = innerWidth;

player1 = new paddle(0.1, 0.1);
player2 = new paddle(0.85, 0.1);
ball1 = new ball(0.5,0.5);

setInterval(() => {
    player1.y = p1y;
    player2.y = p2y;
    context.clearRect(0,0,innerWidth,innerHeight);
    player1.update();
    player2.update();
    ball1.update();
}, 20);

function ball (x, y) {
    this.height= innerWidth/20;
    this.width= innerWidth/20;
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
    this.height= innerHeight/4;
    this.width= innerWidth/20;
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
