exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('login').notNullable();
      table.string('senha').notNullable();
      table.string('nome').notNullable();
      table.string('email').notNullable();
      table.string('roles').notNullable();
      table.string('numero');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  