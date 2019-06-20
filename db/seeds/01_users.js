exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({name: 'Alice', email: 'alice@sample.com', password: 'password'}),
    knex('users').insert({name: 'Bob', email: 'bob@sample.com', password: 'password'}),
    knex('users').insert({name: 'Charlie', email: 'charlie@sample.com', password: 'password'})
  ]);
};
