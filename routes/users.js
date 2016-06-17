var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
/* GET users listing. */
router.get('/', function(req, res, next) {
knex('user').select().then(function(users){
  res.render('user', {user: users});

  })
});

router.get('/adduser', function(req, res, next){
  res.render('addUser', {title: 'hello world'})
})

router.post('/', function(req, res, next){
  knex('user').insert(req.body).then(function(){
    res.redirect('/users')
  }).catch(function(error){
    next(error)
  })
})
module.exports = router;
