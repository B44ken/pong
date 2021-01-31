var p1, p2, ball
function processGameTick(message) {
    p1y=message.players[0].y;
    p2y=message.players[1].y;
    bx=message.ball.x;
    by=message.ball.y;
    return p1y, p2y, bx, by;
}
