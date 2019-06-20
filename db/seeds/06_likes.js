exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('likes').insert([
      { like_id: 1,
        user_id: 1,
        resource_id: 1
      },
      { like_id: 2,
        user_id: 1,
        resource_id: 2
      },
      { like_id: 3,
        user_id: 1,
        resource_id: 2
      },
      { like_id: 4,
        user_id: 2,
        resource_id: 3
      }
    ])
  ]);
};