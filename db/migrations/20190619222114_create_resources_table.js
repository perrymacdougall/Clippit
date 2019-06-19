exports.up = function(knex, Promise) {
  return knex.schema.createTable('resources', function (table) {
    table.increments('resource_id');
    table.string('title');
    table.string('description');
    table.string('url');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('resources');
};
