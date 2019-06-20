exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('tags').del(),
    knex('resources').del(),
    knex('users').del()
  ]);
};
