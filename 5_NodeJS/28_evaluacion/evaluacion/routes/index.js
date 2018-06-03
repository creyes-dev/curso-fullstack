var express = require('express');
var router = express.Router();

/**
 * Si el usuario no posee sesión iniciada se redirecciona
 * a la página a la que van los usuarios sin sesión
 * que es la página de inicio de sesion
 */ 
function redireccionarUsuarioSinSesion(res, callback){
	var redir = false;

	redir = true;
	res.render('login'); 

  	callback(redir);
}

/*
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('user/list', {
					title: 'User List', 
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('user/list', {
					title: 'User List', 
					data: rows
				})
			}
		})
	})
})*/

/* GET home page. */
router.get('/', function(req, res, next) {
  redireccionarUsuarioSinSesion(res, function(redir) {
    if(!redir){
		res.render('index');    
	}
  });
});

module.exports = router;
