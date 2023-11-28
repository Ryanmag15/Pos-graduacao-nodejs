const knex = require('knex')(require('../knexfile').development);
knex('produtos').select('*')
    .then(result => {
        console.log(result);
    })