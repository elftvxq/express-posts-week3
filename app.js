var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

// const mongoose = require('mongoose');
// mongoose
//   .connect('mongodb://localhost:27017/test')
//   .then(() => {
//     console.log('連線成功');
//   })
//   .catch((error) => {
//     console.log(error);
//   });

var app = express();

require('./connections');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router import
app.use('/users', usersRouter);
app.use('/api/posts', postsRouter);
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

app.use((req, res, next) => {
  res.status(404).send('找不到頁面');
});

module.exports = app;
