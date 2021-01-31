const express = require('express');
const ws = require('ws')

// simple file server from /front/
const app = express()
app.use(express.static('front'))
app.listen(80, () => console.log('up!'))

const server = new ws.Server({ port: 81 }) 
