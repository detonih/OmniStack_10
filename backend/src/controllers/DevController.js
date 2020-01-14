const axios = require('axios'); //axios faz chamadas para outras apis
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    //lista todos os devs cadastrados no db
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    //cadastra um dev no db
    async store(req, res) {
        //cria variavel que pega nome do usuario github no front
        const { github_username, techs, latitude, longitude } = req.body;

        //verifica se já existe um usuario igual
        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            //cria variavel que pega o user na api do github através da variável github_username. A resposta vem em json
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);

            //Pega apenas as infos que precisamos da resposta da api do github
            const { name = login, avatar_url, bio} = apiResponse.data;
            //name = login -> se não existir a info name no github, troca por login. No github nao é obrigatorio name.
            
            //remove virgulas e espaços do que é recebido do front pelo usuario
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        return res.json(dev);
    },

    async update(req, res) {
        //dar update em nome, avatar, bio, localizaçao e techs. Nao atualizar github_username
        const { name, techs, _id, bio } = req.body;
        
        const techsArray = parseStringAsArray(techs);

        const dev = await Dev.findByIdAndUpdate(_id, {
            $set: {
                name,
                techs: techsArray,
                bio,
            }
        });
        console.log(dev);

        return await res.json(dev);
    },

    async destroy(req, res) {

        const { _id } = req.body;
        const dev = await Dev.findOneAndRemove({
            _id
        });

        console.log(dev);
        return res.json(dev);
    }
}