var createError = require('http-errors');
var express = require('express');
// var http = require('http');         // Utilizar el módulo http directamente
var mongoose = require('mongoose'); // Referenciar mongoose
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var path = require('path');
var logger = require('morgan');

var showsRouter = require('./routes/tvshows');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el middleware de express con body-parser, methodOverride
app.use(bodyParser.urlencoded({extended : false})); //con bodyParser permitimmos que pueda parsear JSON
app.use(methodOverride()); //methodOverride nos permite implementar y personalizar metodos HTTP
app.use(cors()); // utilizar el middleware cors para evitar restricciones de seguridad para la ejecución de métodos http GET, POST, PUT

app.use('/tvshows', showsRouter);

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

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
