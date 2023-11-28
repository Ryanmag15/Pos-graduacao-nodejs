const express = require('express');
const apiV2Router = express.Router();
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')('knexConfig')

apiV2Router.get('/produtos', (req, res) => {
  let sort = req.query.sort;
  if (sort) {
    produtosOrdenados = produtos.sort((a, b) => a[sort].localeCompare(b[sort]));
    res.status(200).json(produtosOrdenados);
  } else {
    res.status(200).json(produtos);
  }
});

// apiV2Router.get('/produtos/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let produto = produtos.find(p => p.id === id);
//   if (produto) {
//     res.status(200).json(produto);
//   } else {
//     res.status(404).json({ erro: 'Produto não encontrado.' });
//   }
// });

// apiV2Router.post('/produtos', express.json(), (req, res) => {
//   const novoProduto = req.body;

//   if (novoProduto && novoProduto.nome && novoProduto.marca && novoProduto.descricao && novoProduto.preco && novoProduto.quantidade_em_estoque) {
//     novoProduto.id = produtos.length + 1;
//     produtos.push(novoProduto);
//     res.status(201).json({ mensagem: 'Produto adicionado com sucesso.', produto: novoProduto });
//   } else {
//     res.status(400).json({ erro: 'Os dados do produto são obrigatórios.' });
//   }
// });

// apiV2Router.put('/produtos/:id', express.json(), (req, res) => {
//   const id = parseInt(req.params.id);
//   const produtoIndex = produtos.findIndex(p => p.id === id);

//   if (produtoIndex !== -1) {
//     produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
//     res.status(200).json({ mensagem: 'Produto atualizado com sucesso.', produto: produtos[produtoIndex] });
//   } else {
//     res.status(404).json({ erro: 'Produto não encontrado.' });
//   }
// });

// apiV2Router.delete('/produtos/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const produtoIndex = produtos.findIndex(p => p.id === id);
//   if (produtoIndex !== -1) {
//     const produtoRemovido = produtos.splice(produtoIndex, 1);
//     res.status(200).json({ mensagem: 'Produto removido com sucesso.', produto: produtoRemovido[0] });
//   } else {
//     res.status(404).json({ erro: 'Produto não encontrado.' });
//   }
// });

module.exports = apiV2Router;
