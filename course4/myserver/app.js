var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport=require('passport');
var authenticate=require('./authenticate');
var config=require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishesRouter = require('./routes/dishRouter')
var promotionsRouter = require('./routes/promoRouter')
var leadersRouter = require('./routes/leaderRouter')
var uploadRouter=require('./routes/uploadRouter');
var favoritesRouter=require('./routes/favoritesRouter');
var commentRouter=require('./routes/commentRouters');

const mongoose = require('mongoose')

const Dishes = require('./models/dishes');
const Leaders = require('./models/leaders');
const Promotions = require('./models/promotions');

const url =config.mongoUrl;
const connect = mongoose.connect(url);

connect
  .then((db) => {
    console.log("Connected Correctly To Server");
  },
    (err) => {
      console.log(err);
    })

var app = express();

app.all('*',(req,res,next)=>{
  if(req.secure)
  {
    return next();
  }
  else
  {
    res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+req.url);

  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('sagar-konda'));
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishesRouter);
app.use('/promotions', promotionsRouter);
app.use('/leaders', leadersRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favorites',favoritesRouter);
app.use('/comments',commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
