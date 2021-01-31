document.addEventListener('keydown', (e) => {
    if(e.key == "w") ws.send(JSON.stringify({
        "event": "input", "spd": 1
    }))
    if(e.key == "s") ws.send(JSON.stringify({
        "event": "input", "spd": -1
    }))
    if(e.key == "q") ws.send(JSON.stringify({
        "event": "input", "spd": 0
    }))
})