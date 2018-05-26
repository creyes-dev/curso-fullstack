var express=require('express');
var app=express();

/*
Las funciones de middleware son funciones que tienen acceso al objeto de solicitud
(req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de
solicitud/respuestas de la aplicación. La siguiente función de middleware se denota
normalmente con una variable denominada next.
*/

app.get('/',function (req,res){
	res.send('<!doctype><html><head></head><body><h1>Hola mundo</h1></body></html>');
});

var server=app.listen(8888,function(){
	console.log('Servidor web iniciado');
});