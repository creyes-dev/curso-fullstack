var express = require('express');
var router = express.Router();

/**
 * Si el usuario no posee sesión iniciada se redirecciona
 * a la página a la que van los usuarios sin sesión
 * que es la página de inicio de sesion
 */ 
function redireccionarUsuarioSinSesion(req, res, callback){
	var redir = false;
	
	console.log("sesion: ");
	console.log(req.session.usuario);

	if (req.session.usuario == null){
		redir = true;
		res.render('login', { layout: false });
	}
  	callback(redir);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  redireccionarUsuarioSinSesion(req, res, function(redir) {
    if(!redir){
		res.render('index');
		}
  });
});

module.exports = router;
