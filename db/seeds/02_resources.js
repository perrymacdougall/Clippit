
exports.seed = function(knex, Promise) {
  return knex('resources').insert([
    {
      title: 'Knex',
      description: 'Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.',
      url: 'https://knexjs.org/',
      user_id: 1
    },
    {
      title: 'Jquery',
      description: 'jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.',
      url: 'https://jquery.com/',
      user_id: 2
    },
    {
      title: 'Git Fetch',
      description: 'Fetch branches and/or tags (collectively, "refs") from one or more other repositories, along with the objects necessary to complete their histories. Remote-tracking branches are updated (see the description of <refspec> below for ways to control this behavior).',
      url: 'https://git-scm.com/docs/git-fetch',
      user_id: 3
    },
    {
      title: 'CSS Tutorial',
      description: 'description 4 CSS Video',
      url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
      user_id: 1
    },
    {
      title: 'freeCodeCamp',
      description: 'Our mission: to help people learn to code for free. We accomplish this by creating thousands of videos, articles, and interactive coding lessons - all freely available to the public. We also have thousands of freeCodeCamp study groups around the world.',
      url: 'https://www.freecodecamp.org/',
      user_id: 1
    },
    {
      title: 'JavaScript Tutorial for Beginners: Learn JavaScript Basics in 1 Hour [2019]',
      description: 'Watch this JavaScript tutorial for beginners to learn JavaScript basics in one hour.',
      url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
      user_id: 1
    },
    {
      title: 'freeCodeCamp',
      description: 'Our mission: to help people learn to code for free. We accomplish this by creating thousands of videos, articles, and interactive coding lessons - all freely available to the public. We also have thousands of freeCodeCamp study groups around the world.',
      url: 'https://www.freecodecamp.org/',
      user_id: 2
    }
  ]);
};
