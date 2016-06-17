var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bollocks: A British Culture Blog'});
});

router.get('/posts', function(req, res, next){
  knex('post').select().innerJoin('user', function() {
    this.on('user.id', '=', 'post.user_id')
  })
.then(function(data){
  console.log(data)
    res.render('posts', {title: 'Hello World', data: data})
  })
})
router.get('/addPost', function(req, res, next){
  knex('user').select().then(function (users){
    res.render('addPost', {title: 'Hello World', users: users})
  })
})
router.post('/addPost', function(req, res, next){
  knex('post').insert(req.body).then(function(){
    res.redirect('/posts')
  }).catch (function (error){
    next(error)
  })
})
module.exports = router;
