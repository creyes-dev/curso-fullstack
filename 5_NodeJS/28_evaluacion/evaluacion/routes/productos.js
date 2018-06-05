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

function redireccionarPaginaPrincipal(res) {
  res.render("index", { title: "oki sssss" });
}

/* Validación del producto */
function validarProducto(producto, modificacion, callback){
	var valido = false;
	var mensajes = [];

	if(producto.nombre == ""){
		mensajes[mensajes.length] = { 
			titulo: "Campo faltante: Nombre. ",
			mensaje: "Debe ingresar el nombre del producto"};
	}

	if(producto.descripcion == ""){
		mensajes[mensajes.length] = { 
			titulo: "Campo faltante: Descripción. ",
			mensaje: "Debe ingresar una descripción del producto" }
		}

		if(producto.precio == ""){
			mensajes[mensajes.length] = { 
				titulo: "Campo faltante: Precio. ",
				mensaje: "Debe ingresar el precio del producto" }
		} else {
			var rePrecio = /^\d{0,8}[.]?\d{1,2}$/;
			if (!rePrecio.test(producto.precio)) {
				mensajes[mensajes.length] = { 
					titulo: "Campo no válido: Precio. ",
					mensaje: "Debe ingresar un precio válido" }
			}
		}

		if(modificacion){
			if(producto.imagen == ""){
				mensajes[mensajes.length] = { 
					titulo: "Campo faltante: Archivo. ",
					mensaje: "Debe ingresar un archivo" }
				} else {
					var reFoto = /^.*\.(jpg|jpeg|png|gif)$/;
					if (!reFoto.test(producto.imagen)) {
						mensajes[mensajes.length] = { 
							titulo: "Campo no válido: Imágen. ",
							mensaje: "Debe ingresar una imágen válida" }
					}
				}
		}
		
		if(mensajes.length == 0) valido = true;
		callback(valido, mensajes);
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
			
			// validar producto ingresado
			validarProducto(data,false,function(valido, mensajes){
				if(valido){
					// producto es válido

					// Obtener la foto del producto como archivo temporal
					fs.createReadStream("./uploads/" + req.files[0].filename).pipe(fs.createWriteStream("./public/fotos/" + req.files[0].originalname));

					//borramos el archivo temporal creado
					fs.unlink('./uploads/'+req.files[0].filename, (err) => {
						if (err) throw err;
						console.log('./uploads/file.jpg fue subido');
					});
					
					// Registrar el producto en la base de datos
					req.getConnection(function(error, conn){
						if(!error){
							conn.query("INSERT INTO productos SET ?", data, function(error, resultado){
								if(!error){
									redireccionarPaginaPrincipal(res);
								} else {
									mensajes[mensajes.length] = {
										titulo: "ERROR: ",
										mensaje: error.message
									}
									res.render("/alta", { producto: data, mensajes: mensajes });
								}
							});
						} else {
							mensajes[mensajes.length] = {
								titulo: "ERROR: ",
								mensaje: error.message
							}
							res.render("/alta", { producto: data, mensajes: mensajes });
						}
					});
				} else {
					// producto no válido
					res.render("/alta", { producto: data, mensajes: mensajes });
				}
			});
    }
  });
});

module.exports = router;
