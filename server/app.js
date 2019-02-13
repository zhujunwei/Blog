const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const config = require('./config');
const cookieSession=require('cookie-session');
const multer=require('multer');
const mysql = require("mysql");

let app = express();
app.listen(config.port);

//数据库连接
const db = mysql.createPool({
  host: config.mysql_host, 
  user: config.mysql_user, 
  password: config.mysql_password, 
  port: config.mysql_port, 
  database: config.mysql_dbname
});

app.use((req, res, next)=>{
  req.db=db;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

//文件POST数据
let multerObj=multer({dest: './upload/'});
app.use(multerObj.any());
//使用cookie
app.use(cookieParser(require('./secret/cookie_key')));
// 使用 session 中间件
app.use(cookieSession({
  keys: require('./secret/sess_key'),
  maxAge: 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

app.use(express.static(path.join(__dirname, 'public')));
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
  // res.render('error');
});

module.exports = app;
