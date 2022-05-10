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

process.on('uncaughtException', (err) => {
  // catch error and wait for service is done, exit the procc
  console.error('uncaughtException!');
  console.error(err);
  process.exti(1);
});

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
app.use((req, res, next) => {
  // next(createError(404));
  res.status(404).json({ status: 'error', message: '無此路由資訊' });
});

// express error
const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    // log
    console.error('出現重大錯誤', err);

    // not sure the issue, this is default error message
    res.status(500).json({
      status: 'error',
      message: '系統錯誤，請恰系統管理員',
    });
  }
  // developement error message
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  });
};


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // dev
  err.statusCode = err.statusCode || 500;

  if(process.env.NODE_ENV === 'dev'){
    return resErrorDev(err, res)
  }

  // production
  if(err.name === 'ValidationError'){
    err.message = "資料欄位未填寫正確，請重新輸入！"
    err.isOperational = true
    return resErrorProd(err, res)
  }

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  resErrorProd(err, res)
});

app.use((req, res, next) => {
  res.status(404).send('找不到頁面');
});

module.exports = app;
