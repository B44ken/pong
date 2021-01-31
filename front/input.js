document.addEventListener('keydown', (e) => {
    var spd = {"w": -1, "s": 1, "q": 0}[e.key]
    if(spd != undefined) ws.send(JSON.stringify({
        "event": "input", "spd": spd
    }))
})