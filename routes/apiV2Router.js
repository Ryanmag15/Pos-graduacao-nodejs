const express = require('express');
const apiV2Router = express.Router();
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);

apiV1Router.get('/', (req, res) => {
  res.send(`Hello to API World<br>
        <a href="/api/v2/produtos">API de Produtos</a>`);
});

apiV2Router.get('/produtos', async (req, res) => {
  try {
    const result = await knex.select('id', 'descricao', 'marca', 'valor').from('produtos');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao recuperar os produtos do banco de dados.' });
  }
});

apiV2Router.get('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await knex.select('id', 'descricao', 'marca', 'valor').from('produtos').where({ id: id }).first();
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ erro: 'Produto não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao recuperar o produto do banco de dados.' });
  }
});

apiV2Router.post('/produtos', async (req, res) => {
  const novoProduto = req.body;

  try {
    const [id] = await knex('produtos').insert(novoProduto);
    const produtoInserido = await knex.select('id', 'descricao', 'marca', 'valor').from('produtos').where({ id: id }).first();
    res.status(201).json({ mensagem: 'Produto adicionado com sucesso.', produto: produtoInserido });
  } catch (error) {
    res.status(400).json({ erro: 'Os dados do produto são obrigatórios.' });
  }
});

apiV2Router.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  try {
    const quantidadeAtualizada = await knex('produtos').where({ id: id }).update(dadosAtualizados);
    if (quantidadeAtualizada > 0) {
      const produtoAtualizado = await knex.select('id', 'descricao', 'marca', 'valor').from('produtos').where({ id: id }).first();
      res.status(200).json({ mensagem: 'Produto atualizado com sucesso.', produto: produtoAtualizado });
    } else {
      res.status(404).json({ erro: 'Produto não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar o produto no banco de dados.' });
  }
});

apiV2Router.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const produtoRemovido = await knex.select('id', 'descricao', 'marca', 'valor').from('produtos').where({ id: id }).first();
    const quantidadeRemovida = await knex('produtos').where({ id: id }).del();
    if (quantidadeRemovida > 0) {
      res.status(200).json({ mensagem: 'Produto removido com sucesso.', produto: produtoRemovido });
    } else {
      res.status(404).json({ erro: 'Produto não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover o produto do banco de dados.' });
  }
});

module.exports = apiV2Router;
