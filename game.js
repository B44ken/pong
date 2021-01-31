// there will only ever be two players
const playerA = null
const playerB = null

class Player {
    constructor(socket) {
        this.socket = socket
        this.Xpos = 0.50
    }
}

const addPlayer = socket => {
    if(!playerA && !playerB)
        return "Spectator"
        
    if(!playerA)
        playerA = new Player(socket)
    else 
        playerB = new Player(socket)
}