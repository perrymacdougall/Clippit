
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          resource_id: 1,
          title: 'resource 1',
          description: 'description 1',
          url: 'https://knexjs.org/',
          user_id: 1
        },
        {
          resource_id: 2,
          title: 'resource 2',
          description: 'description 2',
          url: 'https://jquery.com/',
          user_id: 2
        },
        {
          resource_id: 3,
          title: 'resource 3',
          description: 'description 3',
          url: 'https://git-scm.com/docs/git-fetch',
          user_id: 3
        },
        {
          resource_id: 4,
          title: 'resource 4',
          description: 'description 4 CSS Video',
          url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
          user_id: 1
        }
      ]);
    });
};
