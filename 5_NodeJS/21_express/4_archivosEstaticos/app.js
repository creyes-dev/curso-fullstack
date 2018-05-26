var express=require('express');
var app=express();

/*
La variable global '__dirname' almacena el path donde se encuentra la aplicación Node.js
propiamente dicha, que es la carpeta donde está almacenado el proyecto. Le
concatenamos la subcarpeta donde se almacenan los archivos estáticos (la carpeta public).
*/

app.use(express.static(__dirname + '/public'));

var server=app.listen(8888,function(){
    console.log('Servidor web iniciado');
});