const ws = new WebSocket('ws://' + location.host + ':81')

const tickRate = 15
var debug = false

ws.addEventListener('open', () => {
    console.log('socket connected')
    setInterval(serverTick, 1000/tickRate)
})
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
    if(message.event == 'message' || debug) {
        text += message.content + '\n'
    }
    if(message.event == 'gameTick') {
        // update game if necessary
        p1y, p2y, blx, bly = processGameTick(message);

    }
    if(message.event == 'start') {
        // start the game
        delete message.event
        config = message
    }
})

var tick = 0
const serverTick = () => {
    tick++
    // ws.send(JSON.stringify({ tick: tick }))
}
