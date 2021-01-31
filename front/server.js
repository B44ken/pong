const ws = new WebSocket("ws://localhost:81")

const tickRate = 5
var debug = false

ws.addEventListener('open', () => {
    console.log('socket connected')
    setInterval(serverTick, 1000/tickRate)
})

ws.addEventListener('message', (response) => {
    var message = JSON.parse(response.data)

    if(message.type == 'debug' || debug) {
        console.log(message)
    }
    if(message.type == 'message' || debug) {
        text += message.content + '\n'
    }
    if(message.type == 'gameTick') {
        // update game if necessary
    }
    if(message.type == 'start') {
        // start the game
    }
})

var tick = 0
const serverTick = () => {
    tick++
    // ws.send(JSON.stringify({ tick: tick }))
}