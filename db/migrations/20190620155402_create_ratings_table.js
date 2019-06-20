exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function (table) {
    table.increments('rating_id');
    table.integer('rating');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('resource_id');
    table.foreign('resource_id').references('resource_id').inTable('resources');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
