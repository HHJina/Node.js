var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var session=require('express-session');
app.use(session({
  secret: 'mykey',
  resave: false, //세션 데이터가 바뀌기 전에는 세션 저장소에 값을 저장하지 않음
  saveUninitialized: true //세션이 필요한 경우에만 구동
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food', require('./routes/food'));
app.use('/review',require('./routes/review'));

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
//데이터베이스연결
var db = require('./db');
db.connect(function (err) {
  console.log('데이터베이스 연결');
});

module.exports = app;
