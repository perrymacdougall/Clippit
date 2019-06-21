function singleResource () {
  let user = req.session.user_id;
  let name = req.session.user_name;

  if (!user) {
    res.redirect('/login');
  } else {
    console.log("user is", user);

    knex.select('title', 'description', 'url', 'resource_id')
      .from('resources')
      .where('user_id', '=', user)
      .asCallback(function(err, rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(rows);

          knex.select('l.like_id', 'r.resource_id', 'r.title', 'r.description', 'r.url')
            .from('likes AS l')
            .innerJoin('resources AS r', 'l.resource_id', '=', 'r.resource_id')
            .where('l.user_id', '=', user)
            .asCallback(function(err, likerows){
              if(err) {
                console.log(err);
              } else {
                console.log(likerows);

                let templateVars = { user, name, rows, likerows };
                res.render('resources_me', templateVars);

              }
            })

        }
      });
  }

  res.render('resource_single.ejs');
}
