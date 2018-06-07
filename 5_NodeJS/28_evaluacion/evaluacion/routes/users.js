var express = require('express');
var router = express.Router();

/**
 * Si el usuario posee una sesión activa entonces
 * redireccionarlo a la página que corresponda
 */
function redireccionarUsuarioConSesion(req, res, callback){
  if (req.session.usuario != null){
		redir = true;
		redireccionarUsuarioPaginaPrincipal(res);
	} 
  callback(redir);
}

/**
 * Redireccionar al usuario a la página principal
 */
function redireccionarUsuarioPaginaPrincipal(res){
  res.render('index');
}

/**
 * devuelve si el usuario es válido, en caso de 
 * que sea válido se registra una sesión 
 */ 
function iniciarSesion(req, usuario, clave, callback){
	var sesionIniciada = false;
	var errMsg = null;
  // Verificar si el usuario y clave ingresada coincide con un
  // usuario registrado en la base de datos
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
}

/* GET página login */
router.get('/', function(req, res, next) {
  redireccionarUsuarioConSesion(req, res, function(redir){
    if(!redir){
      res.render('login', { layout: false });
    }
  });
});

/* POST inicio de sesión */
router.post("/", function(req, res, next) {
  
  // Utilizar body-parser para obtener los campos del formulario
  var usuario = {
    nombre: req.body.nombre,
    clave: req.body.clave
  };

  // Inicio de sesión
  iniciarSesion(req, usuario.nombre, usuario.clave, function(auth, err){
    console.log(auth);
    if(!err){
      if(auth){
        // Sesion iniciada, redireccionar a la página principal
        res.render('index', {title: 'oki sssss'});
      } else {
        res.render('login', { alerta: {
          titulo : 'Usuario o contraseña incorrectos',
          mensaje: ' El usuario y contraseña ingresados no corresponden a un usuario válido'},
          us: { nombre : usuario.nombre }, layout: false
        });
      }
    } else {
      res.render('login', { alerta: {
        titulo: ' Ha ocurrido un error',
        mensaje: err },
        us: { nombre : usuario.nombre }, 
        layout: false
      });
    }
  });

});

module.exports = router;
