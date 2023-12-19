const express = require('express');

const app = express();

//monte um array de produtos com nome e preco e 
 

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
});

app.get()