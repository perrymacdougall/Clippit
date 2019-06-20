exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function (table) {
    table.increments('tag_id');
    table.string('tag');
    table.integer('resource_id');
    table.foreign('resource_id').references('resource_id').inTable('resources');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
