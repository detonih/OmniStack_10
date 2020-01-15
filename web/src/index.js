// importamos o react em todo arquivo que for utilizar html
// < /> o html que esta dentro do react é chamado de JSX (javascrit + XMl (que é a sintax do hmtl))
import React from 'react';
// reactdom da habilidade para o react se cominicar com a arvore do dom (arvore de elementos)
import ReactDOM from 'react-dom';

import App from './App';

// ReactDOM esta mandando renderizar o que tem na função App do arquivo app.js, que é o JSX
ReactDOM.render(<App />, document.getElementById('root'));


