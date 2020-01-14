//controller criado para atender o front do mobile, que irá pesquisar usuario
//por localização

const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        //Buscar todos devs num raio 10km
        //Filtrar por tecnologias
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);

        //Forma uma lista de devs
        const devs = await Dev.find({
            techs: {
                $in: techsArray,//  $in indica que queremos as "techs:" que esta dentro de "techsArray". Vai retornar apenas os devs que trabalham naquelas tecnologias
                //$in é um operador lógico dentro do mongoDB. 
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], //encontrar usuarios que estao perto desse ponto
                    },
                    $maxDistance: 10000, //em uma distancia de 10000 metros
                }, //$near encontra objetos perto de uma localização
            },
        });

        return res.json({ devs })

    }
}