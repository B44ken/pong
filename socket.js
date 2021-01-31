const ws = require('ws')
const config = require('./config.json')

const clamp = (min, v, max) => Math.max(min, Math.min(max, v))

const randomTen = () => Math.round(Math.random() * 10) / 10

const speed = 0.3 / config.tickRate
var paddles = []
var ball = { "x": 0.5, "y": 0.5, "dirX": -1, "dirY": 1 }
var gameState = null

const gameTick = (ID) => {
    if(ID != 0) return gameState
    
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
        ball.dirY = 1
    }
    if(ball.y > 1) {
        ball.y = 0.5
        ball.dirY = -1
    }


    gameState = JSON.stringify({
        "event": "gameTick",
        "paddles": [ p1, p2 ],
        ball: { x: ball.y, y: ball.x }
    })
    return gameState
}



const server = new ws.Server({ port: 81 }) 

server.on('connection', socket => {
    if(paddles.length < 2) {
        paddles.push({y: 0.5, spd: 0, socket: socket})
        var ID = paddles.length - 1
    } else { ID = null }

    console.log(paddles.map(s => s.socket.isAlive ))
    
    socket.on('message', (text) => {
        message = JSON.parse(text)
        if(message.event == "input" && ID != null) {
            paddles[ID].spd = message.spd
        }
    })

    socket.send(JSON.stringify({"event": "start", "ID": ID, ...config})) 

    setInterval(() => {
        socket.send(gameTick(ID))
    }, 1000/config.tickRate)
})
