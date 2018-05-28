var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
  connection(mysql,{
      host: 'localhost',
      user: 'root',
      password : '',
      port : 3306, //port mysql
      database:'basenode'
  },'pool') 
);

// No hacer esto: es mala práctica 
// definir el enrutamiento en el app.js 

// asociamos cada ruta con el módulo que va a tratar cada una

app.get('/', routes.index);
app.post('/', routes.login);

app.get('/admin', admin.mostrar);
app.get('/admin/logout', admin.logout);

app.get('/admin/opcion1', admin.contenido1);
app.get('/admin/opcion2', admin.contenido2);
app.get('/admin/opcion3', admin.contenido3);

app.use(app.router);

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;