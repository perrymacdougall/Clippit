exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('comment_id');
    table.string('comment');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('resource_id');
    table.foreign('resource_id').references('resource_id').inTable('resources');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
