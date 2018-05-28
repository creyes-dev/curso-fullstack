var express = require('express');
var router = express.Router();

//Requerimos el módulo 'multer' y llamamos a la función multer pasando como dato el directorio donde se suben los archivos
var multer = require('multer');
var upload = multer({dest: './uploads/'});

//Requerimos el módulo 'fs' para la copia de archivos
var fs = require('fs');

/* GET home page. */
//Cuando accedemos a la raíz del sitio nos muestra la plantilla index.hbs
router.get('/', function(req, res, next) {
  res.render('index');
});


//Cuando seleccionamos 'Subir foto' se carga la plantilla subirfoto
router.get('/subirfoto', function(req, res, next) {
  res.render('subirfoto');
});


//Al seleccionar las dos imagenes y subibmitir el formulario se ejecuta:
//En el segundo parámetro que le pasamos a router.post indicamos el objeto upload que creamos en las primeras líneas llamando al método array y pasando como parámetro la propiedad name del formulario html y un 2 indicando la cantidad de archivos que llegarán.
router.post('/subirfoto', upload.array('foto', 2), function(req, res, next) {
    for(var x=0;x<req.files.length;x++) {
        //copiamos el archivo a la carpeta definitiva de fotos
       fs.createReadStream('./uploads/'+req.files[x].filename).pipe(fs.createWriteStream('./public/fotos/'+req.files[x].originalname)); 
       //borramos el archivo temporal creado
       fs.unlink('./uploads/'+req.files[x].filename); 
    }  
    var pagina='<!doctype html><html><head></head><body>'+
               '<p>Se subieron las fotos</p>'+
               '<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);        
});


//Cuando seleccionamos la opción 'Ver fotos' de la página principal del sitio se ejecuta
router.get('/verfotos', function(req, res, next) {
  //readdir obtiene una lista de los archivos contenidos en la carpeta que le pasamos en el primer parámetro
   fs.readdir('./public/fotos/', function(err, files) {  
      var pagina='<!doctype html><html><head></head><body>';
      //recorremos el vector y generamos todas los elementos HTML img con la propiedad src respectiva
      for(var x=0;x<files.length;x++) {
          pagina+='<img src="fotos/'+files[x]+'"><br>';
      }
      pagina+='<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);        
   });
});


module.exports = router;