exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('ratings').insert([
      { rating_id: 1,
        rating: 5,
        user_id: 1,
        resource_id: 1
      },
      { rating_id: 2,
        rating: 4,
        user_id: 1,
        resource_id: 2
      },
      { rating_id: 3,
        rating: 3,
        user_id: 2,
        resource_id: 3
      },
      { rating_id: 4,
        rating: 5,
        user_id: 3,
        resource_id: 3
      }
    ])

  ]);

};