import React, { useEffect, useState } from 'react';
//useEffect serve para disparar-mos uma função toda vez que uma info alterar

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

/* 3 conceitos principais do react:
Componente: é uma função que retorna algum conteúdo HTML, pode retornar CSS ou até JS. ex: App()
Toda vez que precisarmos repetir parte do código, criamos componentes que são independentes de outros.
Por ex: time line do facebook nao depende das barras laterais, cabeçálhos, etc, podemos rolar ela toda sem
influenciar em outros componentes. Posso utilizar componentes dentro de componentes.
Regra do react: só podemos ter 1 componente por arquivo.
Portanto, componente é um bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação.

Propriedade: sempre que utilizamos html estamos utilizando propriedades. No html puro isso é chamado de atributo.
Assim, sao informações que um componente PAI passa para o componente filho. Por ex: App() é pai e os outros
componentes que estiverem dentro dele serao filhos.

Estado: uma informação que o componente vai manipular.
Toda função que é propria de um componente, criamos dentro dele mesmo.
É uma função que será lida e atualizada pelo proprio componente. Para isso precisamos importar um função do react:
import { useState } from 'react'; é uma função utilizada pelo react para criar um estado
Depois criar o estado dentro do componente.
São informações mantidas pelo componente (Lembrar: imutabilidade)
onChange={e => setLatitude(e.target.value)} armazena um valor de um input dentro de um valor no estado



*/
//Não posso ter componentes um em baixo do outro. Preciso de um "container" em volta, uma div.
//porem no react utilizar divs pode quebrar a estilização, assim utilizamos o conceito de fragmente,
//que nada mais é do que uma tag sem nomebclatura <></>
//React utiliza conceito de imutabilidade: nunca vou alterar um dado, sempre vou criar um novo a partir do valor anterior
// <aside></aside> -> tag para fazer sidebar

//handleAddDev(e) função que vai ser disparada quando o user clicar no submit do form
//e.preventDefault(); previne que o usuario seja redirecionado


//para pegar os dados de localização precisamos acessar uma função do navegador
//ela precisa ser executada uma unica vez assim que nosso componente for exibido em tela
//navigator.geolocation.getCurrentPosition

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    
    const response = await api.post('/devs', data);

    //adiciona dev na lista automaticamente na lista que aparece na tela
    //incluimos response.data (que é o que ta retornando após cadastrar um dev) no final do array devs
    // é assim que fazemos adição no react, mesmo esquema da imutabilidade
    setDevs([...devs, response.data]);
    //se fosse uma remoção poderiamos utilizar filter
    //alteração map
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => {
            return (
              <DevItem key={dev._id} dev={dev} />
            );
          })}

        </ul>
      </main>
    </div>
  );
}

export default App;
