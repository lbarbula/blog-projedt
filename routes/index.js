var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Bollocks: A British Culture Blog'
    });
});

router.get('/posts', function(req, res, next) {
    knex('post').select(['user.name as UserName', 'post.name as name', 'post.body as body', 'post.image as image', 'post.id as id'])
        .join('user', function() {
            this.on('user.id', '=', 'post.user_id')
        })
        .then(function(data) {
            console.log(data)
            res.render('posts', {
                title: 'Hello World',
                data: data
            })
        })
})
router.get('/addPost', function(req, res, next){
knex('user').select()
.then(function(users){
  res.render('addPost', {users: users, title: 'hello World'})

  })
})
router.get('/:id', function(req, res, next) {
  return Promise.all([
    knex('post')
        .join('user', function() {
            this.on('user.id', '=', 'post.user_id')
        }).select(['post.name as name','user.name as userName', 'post.body as postBody', 'post.id as postId', 'user.id as userId', 'post.image as image']).where('post.id', req.params.id).first(),
        knex('user')
        .join('comment', function() {
            this.on('user.id', '=', 'comment.user_id')
        })
        .select('comment.id as id', 'user.id as cuId').where({post_id: req.params.id}).first(),
        knex('user').select(),
        knex('comment').select().where({post_id: req.params.id})
      ])
        .then(function(details) {
            console.log(details)
            res.render('detail', {
                details: details[0],
                expanded: details[1],
                names: details[2],
                comments: details[3]
            })
        }).catch(function(error){
          next(error)
        })
})
router.get('/:id/edit', function(req, res, next) {
    knex('post').where('post.id', req.params.id
  ).first().then(function(data) {
        res.render('edit', {
            data: data
        })
    })
})
router.post('/:id/edit', function(req, res, next) {
    knex('post').where('post.id', req.params.id).update(req.body).then(function() {
        res.redirect('/posts')
    })
})

router.get('/:id/delete', function(req, res, next) {
    knex('post').where('post.id', req.params.id).del().then(function() {
        res.redirect('/posts')
    })
})

router.post('/:id', function(req, res, next) {
    console.log(req.body)
    knex('comment').insert(req.body).then(function() {
        res.redirect('/posts')
    }).catch(function(error) {
        next(error)
    })
})
router.post('/addPost', function(req, res, next) {
    knex('post').insert(req.body).then(function() {
        res.redirect('/' + req.params.id)
    }).catch(function(error) {
        next(error)
    })
})
module.exports = router;
