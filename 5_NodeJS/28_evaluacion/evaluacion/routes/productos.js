var express = require("express");
var router = express.Router();

// Requerimos el módulo 'multer' y llamamos a la función
// multer pasando como dato el directorio donde se suben los archivos
var multer = require("multer");
var upload = multer({ dest: "./uploads/" });

var fs = require("fs");

/**
 * Si el usuario no posee sesión iniciada se redirecciona
 * a la página a la que van los usuarios sin sesión
 * que es la página de inicio de sesion
 */
function redireccionarUsuarioSinSesion(req, res, callback) {
  var redir = false;

  console.log("sesion: ");
  console.log(req.session.usuario);

  if (req.session.usuario == null) {
    redir = true;
    res.render("login", { layout: false });
  }
  callback(redir);
}

function redireccionarPaginaPrincipal(req) {
  res.render("index", { title: "oki sssss" });
}

/* GET redirección a la página de alta de productos */
router.get("/alta", upload.array("imagen", 1), function(req, res, next) {
	redireccionarUsuarioSinSesion(req, res, function(redir) {
		if (!redir) {
			res.render("altaproducto");
		}
	});
});

/* POST alta de un producto */
router.post("/alta", upload.array("imagen", 1), function(req, res, next) {
  redireccionarUsuarioSinSesion(req, res, function(redir) {
    if (!redir) {

      var data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: "public/fotos/" + req.files[0].originalname
      };

      console.log(data);

      // Obtener la foto del producto como archivo temporal
	  fs.createReadStream("./uploads/" + req.files[0].filename).pipe(fs.createWriteStream("./fotos/" + req.files[0].originalname));
	  
	  //borramos el archivo temporal creado
	  fs.unlink('./uploads/'+req.files[0].filename, (err) => {
	  if (err) throw err;
	  console.log('./uploads/file.jpg fue subido');
	  });

	  // Registrar el producto en la base de datos
	  /*
	  req.getConnection(function(error, conn){
		if(!error){
			conn.query("INSERT INTO Productos(nombre, descripcion, precio, imagen)" + 
						"VALUES('')");



			insert into productos(nombre, descripcion, precio, imagen) values ('pr1', 'es un producto', 20, '/algo')


		}
	  });
*/
/*
	  req.getConnection(function(error, conn) {
		if(!error){
			conn.query("SELECT COUNT(*) AS cant FROM usuarios WHERE usuario = '" 
			+ usuario + "' AND clave = '" + clave + "'", function(err, filas, campos) {
				if(!err){
					if(filas.length > 0){
						if(filas[0].cant > 0){
              // Registrar el usuario en la sesión
              req.session.usuario = usuario;
							sesionIniciada = true;
						}
					}
				} else {
					errMsg = err.message;
				}
				callback(sesionIniciada, errMsg);
			});
		} else {
			errMsg = error.message;
			callback(sesionIniciada, errMsg);
		}
	  });
*/	  
    }
  });
});

/*

router.post('/subirfoto', upload.array('foto', 2), function(req, res, next) {
    console.log(req.body.texto);
    console.log(req.files);
    for(var x=0;x<req.files.length;x++) {
        //copiamos el archivo a la carpeta definitiva de fotos
       fs.createReadStream('./uploads/'+req.files[x].filename).pipe(fs.createWriteStream('./public/fotos/'+req.files[x].originalname)); 
       //borramos el archivo temporal creado
       fs.unlink('./uploads/'+req.files[x].filename, (err) => {
          if (err) throw err;
          console.log('./uploads/file.jpg was deleted');
        }); 
    }  
    var pagina='<!doctype html><html><head></head><body>'+
               '<p>Se subieron las fotos</p>'+
               '<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);        
});

*/

module.exports = router;
