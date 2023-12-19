require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const apiV1Router = require('./routes/apiV1Router');
app.use('/api/v1', apiV1Router);

const apiV2Router = require('./routes/apiV2Router');
app.use('/api/v2', apiV2Router);

const apiSeg = require('./routes/apiSeg');
app.use('/api/apiSeg', apiSeg);

app.get('/', (req, res) => {
  res.redirect('/api/v1'); 
  // res.redirect('/api/v1'); 
});

app.use((req, res, next) => {
  console.log(`Data: ${new Date()} - Method: ${req.method} - URL: ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
