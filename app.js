const express = require('express');
const ws = require('ws')
const config = require('./config.json')

// simple file server from /front/
const app = express()
app.use(express.static('front'))
app.listen(80, () => console.log('up!'))

var players = []

const clamp = (min, v, max) => Math.max(min, Math.min(max, v))

const speed = 0.3 / config.tickRate
const gameTick = () => {
    var p1 = {"y": 0, "spd": 0}
    p1.y = players[0].y
    p1.spd = players[0].spd
    if(players[1])
        var p2 = { "y": players[1].y, "spd": players[1].spd }
    else var p2 = {"y": 0.5, "spd": 0}

    players[0].y = clamp(0, players[0].spd * speed + players[0].y, (1 - config.paddleHeight))
    if(players[1]) players[1].y = 
        clamp(0, players[1].spd * speed + players[1].y, (1 - config.paddleHeight))

    const randomTen = () => Math.round(Math.random() * 10) / 10
    return JSON.stringify({
        "event": "gameTick",
        "players": [ p1, p2 ],
        "ball": { 
            "x": randomTen(), 
            "y": randomTen()
        }
    })
}

const server = new ws.Server({ port: 81 }) 

server.on('connection', socket => {
    players = players.filter( s => s.socket.CLOSED )
    if(players.length < 2) {
        players.push({y: 0.5, spd: 0, socket: socket})
        var ID = players.length - 1
    } else { ID = null }


    console.log(players.map(s => s.socket.isAlive ))
    
    socket.on('message', (text) => {
        message = JSON.parse(text)
        if(message.event == "input" && ID != null) {
            players[ID].spd = message.spd
        }
    })
    socket.send(JSON.stringify({"event": "start", "ID": ID, ...config})) 
    socket.send(JSON.stringify({"event": "debug", "content": "id: " + ID})) 
    setInterval(() => {
        socket.send(gameTick())
    }, 1000/config.tickRate)
})
