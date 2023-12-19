const express = require('express');
const apiSeg = express.Router();
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

apiSeg.post('/register', (req, res) => {
  res.status(200).json({ message: 'Registro realizado com sucesso' });
});

apiSeg.post('/login', (req, res) => {
  const { login, senha } = req.body;

  knex('users')
    .where({ login: login })
    .then((ret) => {
      if (ret.length === 0) {
        res.status(401).json({ erro: 'Usuário inválido' });
      } else {
        const usuario = ret[0];

        if (bcrypt.compareSync(senha, usuario.senha)) {
          const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
            expiresIn: 30,
          });

          res.status(200).json({ token: token });
        } else {
          res.status(401).json({ error: 'Senha incorreta' });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Erro interno do servidor' });
    });
});

module.exports = apiSeg;
