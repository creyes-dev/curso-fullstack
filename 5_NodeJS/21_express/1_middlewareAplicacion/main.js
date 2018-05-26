var express=require('express');
var app=express();

// Middleware a nivel de aplicación:
// utilizamos las funciones app.use() y app.METHOD()
// donde METHOD es el método HTTP de la solicitud que maneja la función de middleware

console.log('Recepción de solicitud:');

// Todo código que se ejecute al recibir cualquier solicitud 
// debe estar en la función app.use
app.use(function(req, res, next){
	// req es el objeto IncommingMessage del módulo http
	// res es el objeto ServerResponse del módulo http
	console.log('Recepción de solicitud para el host: ' + req.host);
	next(); // si la función next no se ejecuta entonces no se ejecutarán más solicitudes
});

// app.get maneja las solicitudes get a la ruta de acceso especificada
app.get('/',function (req,res){
	var currentdate = new Date(); 
	var datetime = "Hora actual: " + currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1)  + "/" 
					+ currentdate.getFullYear() + " @ "  
					+ currentdate.getHours() + ":"  
					+ currentdate.getMinutes() + ":" 
					+ currentdate.getSeconds();

	res.send('<!doctype><html><head></head><body><h1>'+
			  datetime + '</h1></body></html>');
});

var server=app.listen(8888,function(){
	console.log('Servidor web iniciado');
});
