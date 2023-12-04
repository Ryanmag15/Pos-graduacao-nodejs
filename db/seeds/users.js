exports.seed = function (knex) {
  return knex('users').del().then(function () {
    return knex('users').insert([
      { login: 'user4', senha: 'password1', nome: 'User One', numero: '123456789' },
      { login: 'user3', senha: 'password2', nome: 'User Two', numero: '987654321' },
    ]);
  });
};
