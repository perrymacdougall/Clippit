exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('comments').insert([
      { comment_id: 1,
        comment: 'Great Resource!',
        user_id: 1,
        resource_id: 1
      },
      { comment_id: 2,
        comment: 'Loved this! Thanks for sharing!',
        user_id: 1,
        resource_id: 2
      },
      { comment_id: 3,
        comment: 'Wonderful - great insights!',
        user_id: 2,
        resource_id: 3
      },
      { comment_id: 4,
        comment: 'Love watching CSS - easy to understand',
        user_id: 3,
        resource_id: 3
      }
    ])

  ]);

};
