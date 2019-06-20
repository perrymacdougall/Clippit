exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({id: 1, name: 'Alice', email: 'alice@sample.com', password: 'password'}),
    knex('users').insert({id: 2, name: 'Bob', email: 'bob@sample.com', password: 'password'}),
    knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@sample.com', password: 'password'})
  ]);
};
