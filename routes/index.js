var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Dream = require('../models/dream');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/incorrect', function(req, res, next){
  res.send('incorrect.  Try again');
})

router.get('/test', function(req, res, next){
  var testvar = process.env.TESTVAR;
  res.render('test', {title: 'Test page', testvar: testvar})
})

//Dreams routes
/*GET dreams form*/
router.get('/dreams/new', function(req, res, next){
  res.render('dreamcreate', {title: 'New Dream'})
})

/*POST dreams form*/
router.post('/dreams/new', function(req, res, next){
  const dream = new Dream({
    title: req.body.title,
    content: req.body.content,
    user: 'anonymous'
  })
  dream.save(function(err){
    if(err){return next(err);}
    res.redirect('/dreams')
  })
})

/*GET dreams list*/
router.get('/dreams', function(req, res, next){
  Dream.find().exec(function(err, dreams){
    if (err){return next (err)};
  res.render('dreamlist', {title: "Dreams", dreams: dreams}); 
  });
})

/*GET dream detail*/
router.get('/dreams/:id', function(req, res, next){
  const dreamid = req.params.id
  Dream.findById(dreamid, function(err, dream){
    if (err){return next(err)};
    console.log(dream)
    res.render('dreamdetail', {title: "Dream detail", dream: dream})
  })
})

/*GET dream update*/
router.get('/dreams/:id/update', function(req, res, next){
  const dreamid = req.params.id;
  Dream.findById(dreamid).exec(function(err, dream){
    if (err) {return next(err)};
    res.render('dreamupdate', {title: "Update Dream", dream: dream})
  })
});

/*POST dream update*/
router.post('/dreams/:id/update', function(req, res, next){
  const dreamid = req.params.id;
  Dream.findByIdAndUpdate(dreamid, {title: req.body.title, content: req.body.content}).exec(function(err){
    if (err) {return next(err)};
    res.redirect('/dreams/' + dreamid)
  })
});

/*GET dream delete*/
router.get('/dreams/:id/delete', function(req, res, next){
  res.render('dreamdelete', {title: "Delete Dream"})
})
/*POST dream delete*/
router.post('/dreams/:id/delete', function(req, res, next){
  const dreamid = req.params.id;
  Dream.findByIdAndDelete(dreamid).exec(function(err){
    if (err) {return next(err)};
    res.redirect('/dreams')
  })
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

  //GET login form
  router.get('/user/login', function(req, res, next){
    res.render('login', {title: "Login"})
  });

  //GET userlist for testing
  router.get('/userlist', function(req, res, next){
      User.find().exec(function(err, users){
        if (err){return next (err)}
    res.render('userlist', {title: "user list: for testing only", users: users})
    })
  });
    
 


  


module.exports = router;
