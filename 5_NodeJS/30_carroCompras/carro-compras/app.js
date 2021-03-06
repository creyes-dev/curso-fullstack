var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

// para que la sesión pueda ser persistida por mongodb 
// debemos pasarle la sesión 
var mongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');

var app = express();

// conexión a la base de datos 
mongoose.connect('mongodb://localhost:27017/carrocompras');

// acceso global a las opciones de configuración 
// de estrategia de autenticación con passport
require('./config/passport');

// view engine setup

// configurar el motor de vistas
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json()); // app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Luego de que el body es parseado se debe ejecutar el 
// middleware de validaciones
app.use(validator());
app.use(cookieParser());

// Configurar el middleware del manejo de sesiones
//app.use(session({secret:'calabaza', resave: false, saveUninitialized: false}));

// Configurar el middleware del manejo de sesiones
// para que las sesiones sean persistidas por mongodb
app.use(session({
  secret:'calabaza', 
  resave: false, 
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection }), // utilizar la conexión actual
  cookie: { maxAge: 180 * 60 * 1000 }
}));

//app.use(express.urlencoded({ extended: false })); ???
// El middleware Flash utilizará la sesión para mostrar mensajes 
// por ejemplo alertas o resultados de validaciones
app.use(flash());
// Inicializar el middleware para solicitudes de autenticación 
app.use(passport.initialize());
// El middleware passport.session altera el objeto de la solicitud
// y cambia la id de sesión (en los cookies del cliente) en un objeto
// usuario deserializado
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Login es una variable global que en cada solicitud o respuesta
// tendrá almacenado si el usuario está autenticado, esto es util
// para mostrar o no el menú de usuario en la barra superior,
// También se exponen las variables de sesión 
// para que las mismas sean accesibles desde las vistas
app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);

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
