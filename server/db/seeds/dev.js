exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_db').then(function () {
    // Inserts seed entries
    return knex('user_db').insert([
      {
        id: 2,
        nickname: 'seedUser',
        name: 'user',
        email: 'userh@com.ua',
        password: 'password1',
        token: '345g4w5gw4gsf,dgw54g',
      },
    ]);
  });
};
