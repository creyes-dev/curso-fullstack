var createError = require('http-errors');
var session = require('express-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');

var app = express();

/**
 * Middleware que provee accesibilidad a conexiones con 
 * MySql durante el ciclo de vida de toda solicitud 
 */ 
 var myConnection = require('express-myconnection');

/**
 * Obtener los datos requeridos para el acceso a 
 * la base de datos MySql que se encuentran en el archivo
 * config.js 
 */ 
var config = require('./config');
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
};

/**
 * 3 estrategias pueden ser usadas
 * single: Crea una sola conexión de base de datos que nunca está cerrada
 * pool: Crea un conjunto de conexiones. La conexión es liberada luego de que finaliza.
 * request: Crea una nueva conexión para cada nueva solicitud. La conexión se cierra cuando la respuesta finaliza. 
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'));

 // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Todos los entornos
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'calabaza', resave: true, saveUninitialized: true}));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/login', usersRouter);
app.use('/productos', productosRouter);

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
