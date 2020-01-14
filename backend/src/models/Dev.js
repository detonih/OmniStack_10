const mongoose = require('mongoose');
//importa o schema para pegar as coordenadas do dev
const PointSchema = require('./utils/PointSchemas');
mongoose.set('useFindAndModify', false);

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema);