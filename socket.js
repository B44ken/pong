const ws = require('ws')
const config = require('./config.json')

const clamp = (min, v, max) => Math.max(min, Math.min(max, v))

const randomTen = () => Math.round(Math.random() * 10) / 10

const speed = 0.3 / config.tickRate
var paddles = []
score = [0,0]
var ball = { "x": 0.5, "y": 0.5, "dirX": -1, "dirY": 1 }
var gameState = null
var started = 0

const gameTick = (ID) => {
    if(ID != 0) return JSON.stringify(gameState)

    var scores = {"p1": 0, "p2": 0};
    var p1 = {"y": 0, "spd": 0}
    p1.y = paddles[0].y
    p1.spd = paddles[0].spd
    if(paddles[1])
    var p2 = { "y": paddles[1].y, "spd": paddles[1].spd }
    else var p2 = {"y": 0.5, "spd": 0}
    
    paddles[0].y = clamp(0, paddles[0].spd * speed + paddles[0].y, (1 - config.paddleHeight))
    if(paddles[1]) paddles[1].y = 
    clamp(0, paddles[1].spd * speed + paddles[1].y, (1 - config.paddleHeight))

    ball.x += config.ballSpeed * ball.dirX / config.tickRate
    ball.y += config.ballSpeed * ball.dirY / config.tickRate

    if(ball.x > (1 - config.ballSize)) ball.dirX = -1
    if(ball.x < 0) ball.dirX =  1

    if(ball.y < 0) {
        ball.y = 0.5
        ball.dirY = clamp(0.2, Math.random(), 0.8)
        scores.p2+=1
        score[0]++
    }
    if(ball.y > 1) {
        ball.y = 0.5
        ball.dirY = -clamp(0.2, Math.random(), 0.8)
        scores.p1+=1
        score[1]++
    }
    if (ball.y > config.paddle1Pos && ball.y < config.paddle1Pos + config.paddleWidth) {
        if (ball.x+(config.ballSize/2) > paddles[0].y && ball.x+(config.ballSize/2) < paddles[0].y + config.paddleHeight) {
            ball.dirY = 1;
        }
    } else if (paddles[1] && ball.y+config.ballSize > config.paddle2Pos && ball.y+config.ballSize < config.paddle2Pos + config.paddleWidth) {
        if (ball.x > paddles[1].y && ball.x < paddles[1].y + config.paddleHeight) {
            ball.dirY = -1;
        }
}


    gameState = {
        "event": "gameTick",
        "paddles": [ p1, p2 ],
        "ball": { x: ball.y, y: ball.x },
        "score": score.join(' - ')
    }
    return JSON.stringify(gameState)
}



const server = new ws.Server({ port: 81 }) 
server.on('connection', socket => {
    paddles = paddles.filter(p => (Date.now() - p.lastMsg) < config.serverTimeout)
    
    if(!paddles[0] && !paddles[1]) {
        paddles[0] = {y: 0.5, spd: 0, socket: socket, lastMsg: Date.now()}
        var ID = 0
    }
    else if(!paddles[1]) {
        paddles[1] = {y: 0.5, spd: 0, socket: socket, lastMsg: Date.now()}
        var ID = 1
    }
    else { ID = null }
    
    socket.on('message', (text) => {
        message = JSON.parse(text)
        if(message.event == "keepAlive" && ID != null)
            paddles[ID].lastMsg = Date.now()
        if(message.event == "input" && ID != null)
            paddles[ID].spd = message.spd
    })
    
    socket.send(JSON.stringify({"event": "start", "ID": ID, ...config})) 
    
    setInterval(() => {
        socket.send(gameTick(ID))
    }, 1000/config.tickRate)
})
