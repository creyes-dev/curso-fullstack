var eventos = require('events');

var EmisorEventos = eventos.EventEmitter; 

// Instanciar un EventEmitter
var ee = new EmisorEventos(); 

// Crear una funcion suscrita al evento datos
ee.on('datos', function(fecha){ 
   console.log(fecha); 
}); 

// Función de JavaScript que ejecuta el bloque interno
// cada 500 milisegundos
setInterval(function(){ 
   // Disparar el evento datos
   ee.emit('datos', Date.now()); 
}, 500); 