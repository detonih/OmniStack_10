//utils que contem uma função que vai transformar strings em arrays
//utilizada para remover virgulas e espaços do que é recebido do front pelo usuario

module.exports = function parseStringAsArray(arrayAsString) {
    return  arrayAsString.split(',').map(tech => tech.trim());
}
