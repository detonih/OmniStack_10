const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);


module.exports = routes;

/* Tipos de parametros:
query params: req.query (filtros, ordenação, paginação, quase sempre usados com metodos get);

route params: req.params(usados quase exclusivamente em metodos put e delete)
nas rotas http://localhost:3333/users/:id (identificar um recurso na alteracao ou remoção)
Serve para quando queremos alterar ou deletar apenas um unico "objeto", seja usuario, produto...

Body: req.body (bastnte usado com post e put, dados para criação ou alteração de um resgistro)
*/