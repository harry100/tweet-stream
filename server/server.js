const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
require('dotenv').config({ path: './../.env' })

const server = http.createServer(app);

app.use(bodyParser.json());

console.log(process.env.DB_USER)

server.listen(port, () => {
    console.log('server is up');
});
app.get('/', (req, res, next) => {
    res.send('Hello from server')
})
