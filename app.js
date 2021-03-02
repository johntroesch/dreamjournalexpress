require('dotenv').config();
const bcrypt=require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
const User = ('./models/user');


var DBhost = process.env.DBHOST;
mongoose.connect(DBhost, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('err', console.error.bind(console, "Mongo could not connect:"))




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(passport.initialize());
app.use(passport.session())

//saves local user throughout app
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//passport setup
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      const hash=user.password;
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }bcrypt.compare(password, hash, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
      return done(null, user);
    });
  }
));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

app.post('/user/login',
  passport.authenticate('local', {
  successRedirect: '/test',
  failureRedirect: '/user/login'
  })); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
