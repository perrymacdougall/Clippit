exports.seed = function(knex, Promise) {
    return knex('comments').insert([
      {
        comment: 'Great Resource!',
        user_id: 1,
        resource_id: 1
      },
      {
        comment: 'Loved this! Thanks for sharing!',
        user_id: 1,
        resource_id: 2
      },
      {
        comment: 'Wonderful - great insights!',
        user_id: 2,
        resource_id: 3
      },
      {
        comment: 'Love watching CSS - easy to understand',
        user_id: 3,
        resource_id: 3
      }
    ]);
};
