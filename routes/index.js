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
    knex('post').select('user.name as UserName', 'post.name as name', 'post.body as body', 'post.image as image', 'post.id as id').innerJoin('user', function() {
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
router.get('/:id', function(req, res, next) {
    knex('post').innerJoin('user', function() {
            this.on('user.id', '=', 'post.user_id')
        })
        .join('comment', function() {
            this.on('post.id', '=', 'comment.post_id')
        }).select().where('post.id', req.params.id).first()
        .then(function(details) {
            console.log(details)
            res.render('detail', {
                details: details
            })
        })
})
router.get('/:id/edit', function(req, res, next) {
    knex('post').where({
        id: req.params.id
    }).first().then(function(data) {
        res.render('edit', {
            data: data
        })
    })
})
router.post('/:id/edit', function(req, res, next) {
    console.log("here", req.body);
    knex('post').where('post.id', "=", req.params.id).update(req.body).then(function() {
        res.redirect('/posts')
    })
})

router.get('/:id/delete', function(req, res, next) {
    knex('post').where('post.id', req.params.id).del().then(function() {
        res.redirect('/posts')
    })
})
router.get('/:id/addComments', function(req, res, next) {
    knex('post').innerJoin('user', function() {
            this.on('user.id', '=', 'post.user_id')
        })
        .join('comment', function() {
            this.on('post.id', '=', 'comment.post_id')
        }).select().where('post.id', req.params.id).first()
        .then(function(details) {
            console.log(details)
            res.render('addComments', {
                title: 'hello world'
            })
        })
})
router.post('/addComments', function(req, res, next) {
    knex('comment').insert(req.body).then(function() {
        res.redirect('/posts')
    }).catch(function(error) {
        next(error)
    })
})
router.post('/addPost', function(req, res, next) {
    knex('post').insert(req.body).then(function() {
        res.redirect('/posts')
    }).catch(function(error) {
        next(error)
    })
})
module.exports = router;
