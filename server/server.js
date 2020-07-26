const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cors = require('cors');

const app = express();
require('dotenv').config()

app.use(cors());
app.options('*', cors());

const tweetRoute = require('./routes/tweets.route');

const server = http.createServer(app);

app.use(bodyParser.json());

app.use('/api/tweets', tweetRoute)

server.listen(port, () => {
    console.log('server is up');
});