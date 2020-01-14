//Arquivo de utilidade criado para pegar a localização dos usuarios
//manterá as configurações necessárias para ser enviado ao DevSchema

const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = PointSchema;