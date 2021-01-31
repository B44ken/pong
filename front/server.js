const ws = new WebSocket('ws://' + location.host + ':81')

var debug = false

var p1y, p2y, blx, bly;
var config = {}
window.p1y=0;
window.p2y=0;
window.blx=0;
window.bly=0;
ws.addEventListener('message', (response) => {
    var message = JSON.parse(response.data)

    if(message.event == 'debug' || debug) {
        console.log(message)
    }
    if(message.event == 'message') {
        text += message.content + '\n'
    }
    if(message.event == 'gameTick') {
        // update game if necessary
        // p1y, p2y, blx, bly = processGameTick(message);
        delete message.event
        gameState = message
        
    }
    if(message.event == 'start') {
        // start the game
        delete message.event;
        config = message;
        // drawstuff();
        setInterval(serverTick, 1000 / config.tickRate);
    }
})

var tick = 0
const serverTick = () => {
    tick++
    context.clearRect(0, 0, innerWidth, innerHeight)
    drawPaddle(config.paddle1Pos, gameState.paddles[0].y)
    drawPaddle(config.paddle2Pos, gameState.paddles[1].y)
    drawBall(gameState.ball.x, gameState.ball.y)
}
