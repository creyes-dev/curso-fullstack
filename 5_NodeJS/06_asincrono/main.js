var fs = require("fs");

// 1. Primer mensaje
console.log("cual de los siguientes mensajes se ejecutará primero?");

// 2. Lectura de un archivo
fs.readFile("README.md", function(error, archivo){
    // 3. Mensaje que notifica la carga completa del archivo en memoria
    console.log("Archivo cargado en memoria");
});

// 4. Mensaje de fin de la aplicación
console.log("Fin de aplicación!");