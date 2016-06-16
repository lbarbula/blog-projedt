exports.seed = function(knex, Promise) {

    // Deletes ALL existing entries
    return knex('comment').del()
        .then(function() {
            return knex('post').del()
        })
        .then(function() {
            return knex('user').del()
        })
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('user').insert({
                    name: 'William Thomas'
                }),
                knex('user').insert({
                    name: 'Laney Jane the Main Frame'
                }),
                knex('user').insert({
                    name: 'Danny Fritz'
                })
            ]);
        })
        .then(function() {
            return knex('user').select()
        }).then(function(users) {
                // Inserts seed entries

            return Promise.all([
                knex('post').insert({
                    name: 'Crumpets',
                    body: 'Crumpets are often consumed with afternoon. They are a savory treat. I try to enjoy 5 or 6 per day.',
                    image: 'http://3.bp.blogspot.com/-4V1nyf-th0Y/UMPmqVH4psI/AAAAAAAABrU/HVtyavai-M0/s1600/crumpets+yum.JPG',
                    user_id: findFromList('William Thomas', users)
                })
            ]).then(function(){
              return users
            })
        })
        .then(function (users) {
            return
            knex('post').select().then(function(posts) {

                return Promise.all([
                    knex('comment').insert({
                        user_id: findFromList('Laney Jane the Main Frame', users),
                        post_id: findFromList('Crumpets', posts),
                        body: 'I think that crumpets are the greatest thing ever! Not english muffins for all you noobs.'
                    }),
                    knex('comment').insert({
                        user_id: findFromList('Danny Fritz', users),
                        post_id: findFromList('Crumpets', posts),
                        body: 'I dont need food, im a robot'
                    })
                ])
            })
        })
};
function findFromList(name, list) {
    for (var i = 0; i < list.length; i++) {
        if (name === list[i].name) {
            return list[i].id
        }
    }
}
