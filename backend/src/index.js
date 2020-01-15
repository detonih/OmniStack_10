const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('../src/routes');

const app = express();

//configura a connection string do MongoAtlas
mongoose.connect('mongodb+srv://detonih:@omnistack-yy56t.mongodb.net/semana10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({ origin: 'http://localhost:3000' }));
//Config utilização de json no express
app.use(express.json());
app.use(routes);

app.listen(3333);