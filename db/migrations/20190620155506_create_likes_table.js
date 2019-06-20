exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', function (table) {
    table.increments('like_id');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('resource_id');
    table.foreign('resource_id').references('resource_id').inTable('resources');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes');
};