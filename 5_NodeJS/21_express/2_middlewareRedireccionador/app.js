var path = require('path');
var express = require('express');

var routes = require('./routes/index');
var customers = require('./routes/customers');
var docs = require('./routes/docs');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	console.log('Recepción de solicitud para el host: ' + req.host);
	next(); 
});

// Debido a que el middleware de aplicación no se encargará
// del enrutamiento, dependiendo del recurso solicitado indicado 
// en el url se utilizará un enrutador distinto que utilizará 
// el middleware de enrutamiento para proveer el recurso indicado
app.use('/', routes);
app.use('/clientes', customers);
app.use('/documento', docs);

var server=app.listen(8888,function(){
	console.log('Servidor web iniciado');
});