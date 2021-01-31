const ws = new WebSocket("ws://localhost:81")

const tickRate = 5
var debug = false

ws.addEventListener('open', () => {
    setInterval(serverTick, 1000/tickRate)
})

var ID = 0
ws.addEventListener('message', (response) => {
    var message = JSON.parse(response.data)

    if(message.event == 'connect') {
        ID = message.ID
    }

    if(message.event == 'debug' || debug) {
        console.log(message)
    }
    if(message.event == 'message' || debug) {
        text += message.content + '\n'
    }
    if(message.event == 'gameTick') {
        // update game if necessary
    }
    if(message.event == 'start') {
        // start the game
    }
})

var tick = 0
const serverTick = () => {
    tick++
    // ws.send(JSON.stringify({ tick: tick }))
}