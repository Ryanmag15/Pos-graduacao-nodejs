const express = require('express');
const apiSeg = express.Router();
const session = require('express-session');
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Certifique-se de definir uma chave secreta única e segura para sua aplicação
const SESSION_SECRET = 'sua_chave_secreta_aqui';

apiSeg.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

apiSeg.post('/register', (req, res) => {
  res.status(200).json({ message: 'Registro realizado com sucesso' });
});

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

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

          req.session.token = token;

          const redirectTo = `${BASE_URL}/crud.html`;

          res.status(200).json({ token: token, redirectTo: redirectTo });
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
