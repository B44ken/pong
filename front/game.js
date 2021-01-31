var p1, p2, ball
function processGameTick(message) {
    p1y=message.paddles[0].y;
    p2y=message.paddles[1].y;
    bx=message.ball.x;
    by=message.ball.y;
    return p1y, p2y, bx, by;
}
