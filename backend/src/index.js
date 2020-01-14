const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');

const app = express();

//configura a connection string do MongoAtlas
mongoose.connect('CONNECT_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Config utilização de json no express
app.use(express.json());
app.use(routes);

app.listen(3333);