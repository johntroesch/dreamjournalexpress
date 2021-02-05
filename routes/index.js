var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Dream = require('../models/dream');
var bcrypt = require('bcryptjs');
var async = require('async');
const { body,validationResult } = require("express-validator");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next){
  var testvar = process.env.TESTVAR;
  res.render('test', {title: 'Test page', testvar: testvar})
})

//Dreams routes
/*GET dreams form*/
router.get('/dream/new', function(req, res, next){
  res.send('dream create: not yet implemented')
})

//User routes
/*GET user form*/
router.get('/user/create', function(req, res, next){
  res.render('usercreate', {title: 'New User'})
})

//POST user form
router.post('/user/create', function(req, res, next){
  var getname = req.body.username;
  var unhashed = req.body.password;
  const hashed = bcrypt.hashSync(unhashed, 10);
  console.log(hashed);
    const user = new User({
      username: getname,
      password: hashed
    });
    user.save(function(err){
      if(err) {return next (err);}
      res.redirect('/')
    });
    
  });



module.exports = router;
