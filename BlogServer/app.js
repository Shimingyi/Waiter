//加载外部module
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var fs = require('fs');

var app = express();

//数据库
var dbUrl = 'mongodb://127.0.0.1/blog';
mongoose.connect(dbUrl);

//注册model
var models_path = __dirname + '/app/models';
var walk = function(path) {
  fs
      .readdirSync(path)
      .forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        // 如果是文件
        if (stat.isFile()) {
          if (/(.*)\.(js|coffee)/.test(file)) {
            require(newPath);
          }
          // 如果是文件夹则继续遍历
        }else if (stat.isDirectory()) {
          walk(newPath);
        }
      });
};
walk(models_path);

//Session
app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url: dbUrl,                                     // 本地数据库地址
    collection: 'sessions'                          // 存储到mongodb中的字段名
  })
}));

//加载路由事件
var routes = require('./routes/index');
app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json( { type: ['text/xml','application/json'] } ));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//开启监听
var port = process.env.port || 3000;
app.listen(port,function (err) {
  if(err)
      console(err);
  console.log('Server is running in ' +port );
});

module.exports = app;
