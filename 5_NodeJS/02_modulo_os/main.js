var os = require('os');

console.log('Sistema operativo: ' + os.platform);
console.log('Versión del sistema operativo: ' + os.release);
console.log('Memoria total: ' + Math.round(os.totalmem()/1000000) + ' Mb');
console.log('Memoria libre: '+ Math.round(os.freemem()/1000000)+ ' Mb');
console.log('Directorio temporal: '+os.tmpdir());
