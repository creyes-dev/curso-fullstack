var fs = require('fs');

// 1. Abrir el archivo en modo lectura
var handle = fs.openSync('README.md', 'r');

// 2. Crear un espacio en memoria para registrar 
// en el los bytes del texto que contiene el archivo
var buf = new Buffer(100000);

// 3. Cargar los bytes del teto que contiene el archivo
// en el buffer
var read = fs.readSync(handle, buf, 0, 10000, null);

// Mostrar el contenido del archivo en pantalla
console.log(buf.toString('utf8', 0, read));

// 4. Cerrar el archivo
fs.closeSync(handle);

fs.readfileSync