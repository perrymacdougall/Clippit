exports.seed = function(knex, Promise) {
  return knex('tags').insert([
      {
        tag: 'knex',
        resource_id: 1
      },
      {
        tag: 'jquery',
        resource_id: 2
      },
      {
        tag: 'git',
        resource_id: 3
      },
      {
        tag: 'css',
        resource_id: 4
      }
    ]);
};
