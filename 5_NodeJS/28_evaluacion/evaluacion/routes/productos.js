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
  res.render("index");
}

/* Validación del producto */
function validarProducto(producto, modificacion, callback) {
  var valido = false;
  var mensajes = [];

  if (producto.nombre == "") {
    mensajes[mensajes.length] = {
      titulo: "Campo faltante: Nombre. ",
      mensaje: "Debe ingresar el nombre del producto"
    };
  }

  if (producto.descripcion == "") {
    mensajes[mensajes.length] = {
      titulo: "Campo faltante: Descripción. ",
      mensaje: "Debe ingresar una descripción del producto"
    };
  }

  if (producto.precio == "") {
    mensajes[mensajes.length] = {
      titulo: "Campo faltante: Precio. ",
      mensaje: "Debe ingresar el precio del producto"
    };
  } else {
    var rePrecio = /^\d{0,8}[.]?\d{1,2}$/;
    if (!rePrecio.test(producto.precio)) {
      mensajes[mensajes.length] = {
        titulo: "Campo no válido: Precio. ",
        mensaje: "Debe ingresar un precio válido"
      };
    }
  }

  if (modificacion == false) {
    if ((producto.imagen == "") && (modificacion == false)) {
      mensajes[mensajes.length] = {
        titulo: "Campo faltante: Archivo. ",
        mensaje: "Debe ingresar un archivo"
      };
    } else {
      if(producto.imagen != ""){
        var reFoto = /^.*\.(jpg|jpeg|png|gif)$/;
        if (!reFoto.test(producto.imagen)) {
          mensajes[mensajes.length] = {
            titulo: "Campo no válido: Imágen. ",
            mensaje: "Debe ingresar una imágen válida"
          };
        }
      }
    }
  }

  if (mensajes.length == 0) valido = true;
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
      var refFoto = "";
      if (req.files.length > 0) {
        refFoto = "fotos/" + req.files[0].originalname;
      }

      var data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: refFoto
      };

      // validar producto ingresado
      validarProducto(data, false, function(valido, mensajes) {
        if (valido) {
          // producto es válido

          // Obtener la foto del producto como archivo temporal
          fs.createReadStream("./uploads/" + req.files[0].filename).pipe(
            fs.createWriteStream("./public/fotos/" + req.files[0].originalname)
          );

          //borramos el archivo temporal creado
          fs.unlink("./uploads/" + req.files[0].filename, err => {
            if (err) throw err;
            console.log("./uploads/file.jpg fue subido");
          });

          // Registrar el producto en la base de datos
          req.getConnection(function(error, conn) {
            if (!error) {
              conn.query("INSERT INTO productos SET ?", data, function(
                error,
                resultado
              ) {
                if (!error) {
                  redireccionarPaginaPrincipal(res);
                } else {
                  mensajes[mensajes.length] = {
                    titulo: "ERROR: ",
                    mensaje: error.message
                  };
                  res.render("altaproducto", {
                    producto: data,
                    mensajes: mensajes
                  });
                }
              });
            } else {
              mensajes[mensajes.length] = {
                titulo: "ERROR: ",
                mensaje: error.message
              };
              res.render("altaproducto", {
                producto: data,
                mensajes: mensajes
              });
            }
          });
        } else {
          // producto no válido
          res.render("altaproducto", {
            producto: data,
            mensajes: mensajes
          });
        }
      });
    }
  });
});

/* GET: Redirección y relleno del formulario de modificación de un producto */
router.get('/editar/:id', function(req, res, next) {
  var idParametro = req.params.id;
  console.log("El parametro a mostrar! ");
  console.log(idParametro);
  redireccionarUsuarioSinSesion(req, res, function(redir) {
    if(!redir){
			req.getConnection(function(error, conn) {
				if(!error){
          conn.query("SELECT id, descripcion, imagen, nombre, precio FROM productos" + 
                     " WHERE id = " + idParametro, function(err, filas, campos) {
							if(!err){
                console.log(filas);

                var producto = null;
                if(filas.length > 0) {
                  producto = filas[0];
                }
								res.render('modificacionproducto', { producto: producto });
							}
					});
				}
			});	
		}
  });
});

/* POST Modificación de un producto */
router.post("/modificacion", upload.array("imagen", 1), function(req, res, next) {
  redireccionarUsuarioSinSesion(req, res, function(redir) {
    if (!redir) {

      var refFoto = "";
      if (req.files.length > 0) {
        refFoto = "fotos/" + req.files[0].originalname;
      }

      var producto = {
        id: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagenAnterior: req.body.imgAnterior,
        imagen: refFoto
      };

      validarProducto(producto, true, function(valido, mensajes) {
        if (valido) {

          // Los datos del producto son válidos

          // Si ha ingresado una imágen y es distinta a la que el producto posee 
          // entonces registrar la nueva imágen para que sea asociada al producto 
          if((producto.imagen != "") && (producto.imagen != producto.imagenAnterior)) {
              // Obtener la foto del producto como archivo temporal
            fs.createReadStream("./uploads/" + req.files[0].filename).pipe(
              fs.createWriteStream("./public/fotos/" + req.files[0].originalname)
            );
            //borramos el archivo temporal creado
            fs.unlink("./uploads/" + req.files[0].filename, err => {
              if (err) throw err;
              console.log("./uploads/file.jpg fue subido");
            });
          }

          // Eliminar el producto de la base de datos
          req.getConnection(function(error, conn) {
            if (!error) {
              var consulta = "UPDATE productos SET nombre = '" + producto.nombre + "', " +
                             "descripcion = '" + producto.descripcion + "'," +
                             "precio = " + producto.precio
              
              if(producto.imagen != ""){
                consulta = consulta + ", imagen = '" + producto.imagen + "'";
              }

              consulta = consulta + " WHERE id = ?";

              console.log(consulta);

              conn.query(consulta, id, function(error) {
                if (!error) {
                  redireccionarPaginaPrincipal(res);
                } else {
                  mensajes[mensajes.length] = {
                    titulo: "ERROR: ",
                    mensaje: error.message
                  };
                  res.render("modificacionproducto", {
                    producto: producto,
                    mensajes: mensajes
                  });
                }
              });
            } else {
              mensajes[mensajes.length] = {
                titulo: "ERROR: ",
                mensaje: error.message
              };
              res.render("modificacionproducto", {
                producto: producto,
                mensajes: mensajes
              });
            }
          });
        } else {
          // Datos del producto no válidos
          res.render("modificacionproducto", {
            producto: producto,
            mensajes: mensajes
          });
        }
      });
    }
  });
});

/* POST baja de un producto */
router.post("/baja", function(req, res, next) {
  redireccionarUsuarioSinSesion(req, res, function(redir) {
    if (!redir) {
      var id = req.body.codigo;
      // Eliminar el producto de la base de datos
      req.getConnection(function(error, conn) {
        if (!error) {
          conn.query("DELETE FROM productos WHERE id = ?", id, function(error) {
            if (!error) {
              redireccionarPaginaPrincipal(res);
            }
          });
        }
      });
    }
  });
});

module.exports = router;
