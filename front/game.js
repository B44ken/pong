
var text = ''

const FPS = 60
setInterval(() => {
    ball.x += vx / FPS
    ball.y += vy / FPS
    if(text) drawText(text)
    text = ''
}, 1000/60)