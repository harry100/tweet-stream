const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cors = require('cors');
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(cors());
app.options('*', cors());

const tweetRoute = require('./routes/tweets.route');
const searchRoute = require('./routes/search.route');

const server = http.createServer(app);

app.use(bodyParser.json());

app.use('/api/tweets', tweetRoute);
app.use('/api/search', searchRoute);

server.listen(port, () => {
    console.log('server is up');
});