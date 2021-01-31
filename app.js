const express = require('express');
const ws = require('ws')

// simple file server from /front/
const app = express()
app.use(express.static('front'))
app.listen(80, () => console.log('up!'))

const tickRate = 5
const gameTick = () => {
    const randomTen = e => Math.round(Math.random() * 10) / 10
    return JSON.stringify({
        "event": "gameTick",
        "p1": { "y": randomTen() }, 
        "p2": { "y": randomTen() },
        "ball": { 
            "x": randomTen(), 
            "y": randomTen()
        }
    })
}

const server = new ws.Server({ port: 81 }) 
server.on('connection', socket => {
    socket.on('message', () => {
    })
    socket.send(JSON.stringify({"event": "debug", "message": "hello, world!"}))
    setInterval(() => 
        socket.send(gameTick()), 
    1000/tickRate)
})