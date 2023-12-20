/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('produtos').del()
  await knex('produtos').insert([
    {id: 1, descricao: 'teste', marca: 'tiaju', valor: 200.00},
    {id: 2, descricao: 'feijao', marca: 'shein', valor: 100.00},
    {id: 3, descricao: 'farinha', marca: 'aurora', valor: 50.00},
  ]);
};
