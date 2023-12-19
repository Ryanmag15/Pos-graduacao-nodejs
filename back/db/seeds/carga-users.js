const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users').del().then(async function () {
    const hashedPassword1 = await bcrypt.hash('password1', 10);
    const hashedPassword2 = await bcrypt.hash('password2', 10);

    return knex('users').insert([
      { id: 1, login: 'user4', senha: hashedPassword1, nome: 'User One', email: 'user1@example.com', roles: 'admin', numero: '123456789' },
      { id: 2, login: 'user3', senha: hashedPassword2, nome: 'User Two', email: 'user2@example.com', roles: 'user', numero: '987654321' },
    ]);
  });
};
