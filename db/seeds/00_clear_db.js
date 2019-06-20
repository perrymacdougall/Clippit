exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('comments').del(),
    knex('ratings').del(),
    knex('likes').del(),
    knex('tags').del(),
    knex('resources').del(),
    knex('users').del()
  ]);
};
