var fs = require('fs');

// Abrir el archivo en modo lectura, en el último argumento
// el método open recibe una función callback que tiene dos argumentos:
// un objeto de la clase Error y un número entero fd
fs.open('README.md','r', function(err, handle){
    if(err) {
        // Mostrar el mensaje de error
        console.log("ERROR:" + err.code 
                    + err.message + ")");
        return;
    }
    
    // Reservar el espacio en memoria en donde alojar los bytes
    // del contenido del archivo que se mostrará en pantalla
    var buf = new Buffer(100000);

    // Cargar el contenido del archivo abierto en memoria,
    // en el último argumento el método read recibe una función
    // callback que tiene tres argumentos: un objeto de la clase 
    // Error, la cantidad de bytes leídos y el objeto de la clase
    // Buffer 
    fs.read(handle, buf, 0, 100000, null, 
            function(err,lenght){
                if(err){
                    // Mostrar el mensaje de error
                    console.log("ERROR:" + err.code 
                                + err.message + ")");
                    return;
                }

                console.log(buf.toString('utf8',0, lenght));
                fs.close(handle, function() { 
                    /* Archivo cerrado */ 
                });
            });
});