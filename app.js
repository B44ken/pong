const express = require('express');
const ws = require('ws')

// simple file server from /front/
const app = express()
app.use(express.static('front'))
app.listen(80, () => console.log('up!'))

var players = []

const gameTick = () => {
    
    const randomTen = e => Math.round(Math.random() * 10) / 10
    return JSON.stringify({
        "event": "gameTick",
        "players": [
            (players[0]), (players[1] || { "y": 0.5, "spd": 0 })
        ],
        "ball": { 
            "x": randomTen(), 
            "y": randomTen()
        }
    })
}

const server = new ws.Server({ port: 81 }) 

var tickRate = 4
server.on('connection', socket => {
    if(players.length < 2) {
        players.push({y: 0.5, spd: 0, socket: 'connected'})
        var ID = players.length - 1
    } else { ID = null }

    console.log(players)
    
    socket.on('message', (text) => {
        message = JSON.parse(text)
        if(message.event == "input") {
            players[ID].spd = message.spd
        }
    })
    socket.send(JSON.stringify({"event": "connect", "ID": ID})) 
    socket.send(JSON.stringify({"event": "debug", "content": "id: " + ID})) 
    setInterval(() => 
        socket.send(gameTick()), 
    1000/tickRate)
})