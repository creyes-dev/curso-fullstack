var express = require('express');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var path = require('path');
var logger = require('morgan');

// Enrutadores
var productosRouter = require('./routes/productos');
var configMsgRouter = require('./routes/configMsg');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el middleware de express con body-parser, methodOverride
app.use(bodyParser.urlencoded({extended : false})); //con bodyParser permitimmos que pueda parsear JSON
app.use(methodOverride()); //methodOverride nos permite implementar y personalizar metodos HTTP
app.use(cors()); // utilizar el middleware cors para evitar restricciones de seguridad para la ejecución de métodos http GET, POST, PUT

// Redireccionamiento
app.use('/productos', productosRouter);
app.use('/notificaciones', configMsgRouter);

module.exports = app;
