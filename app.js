var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

// add route files
var indexRouter = require('./routes/index');
var managementRouter = require('./routes/management');
// var studyRouter = require('./routes/study');
// var activityRouter = require('./routes/activity');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use React static files
//app.use(express.static(path.join(__dirname, '/../CAUtion-Web-Front-End/public/')));

// 1. landing page
app.use('/', indexRouter);

// 2. Management page
app.use('/management', managementRouter);

// 3. Study page
//app.use('/study', studyRouter);

// 4. Activity page
//app.use('/activity', activityRouter);

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
