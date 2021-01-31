// simple file server from /front/
const express = require('express');
const app = express()
app.use(express.static('front'))
app.listen(80)

const socketServer = require('./socket')