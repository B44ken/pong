const ws = new WebSocket("ws://localhost:81")

ws.addEventListener('connected', () => {
    console.log('socket connected')
})

ws.addEventListener('message', (response) => {
    var message = JSON.parse(response.data)
    console.log(message)
    if(message.type = 'message') {
        // update splash text
        text += message.content + '\n'
    }
    if(message.type = 'gameTick') {
        // update game if necessary
    }
    if(message.type = 'start') {
        // start the game
    }
})