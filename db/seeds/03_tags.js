exports.seed = function(knex, Promise) {

  return Promise.all([
    knex('tags').insert([
      { tag_id: 1,
        tag: 'knex',
        resource_id: 1
      },
      { tag_id: 2,
        tag: 'jquery',
        resource_id: 2
      },
      { tag_id: 3,
        tag: 'git',
        resource_id: 3
      },
      { tag_id: 4,
        tag: 'css',
        resource_id: 4
      }
    ])

  ]);

};
