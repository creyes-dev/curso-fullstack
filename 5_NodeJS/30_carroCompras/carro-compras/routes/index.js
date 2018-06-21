var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Producto = require('../models/producto');

// Usar como middleware la protección 
// contra CSRF
var proteccionCsrf = csrf();

// Todas las rutas incluidas en este enrutador
// deben estar protegidas contra CSRF
router.use(proteccionCsrf);

/* GET home page. */
router.get('/', function(req, res, next) {
  Producto.find(function(err, docs){
    var agrupacionesProductos = [];
    var tamanioAgrupacion = 3;
    for (var i=0; i < docs.length; i += tamanioAgrupacion){
      agrupacionesProductos.push(docs.slice(i, i + tamanioAgrupacion));
    }
    res.render('tienda/index', { 
      title: 'Carro de compras',
      productos: agrupacionesProductos });
  });
});

/* GET página de registro de usuarios */
router.get('/usuario/registro', function(req,res,next){
  var mensajes = req.flash('error');
  res.render('usuario/registro', { csrfToken: req.csrfToken(), mensajes: mensajes, tieneErrores: mensajes.length > 0});
});

/* POST registro de un usuario */
router.post('/usuario/registro', passport.authenticate('local.signup', {
  successRedirect: '/usuario/perfil', 
  failureRedirect: '/usuario/registro',
  failureFlash: true
}));

/* GET página de perfil del usuario */
router.get('/usuario/perfil', function(req, res, next){
  res.render('usuario/perfil');
});

/* GET página de inicio de sesión del usuario */
router.get('/usuario/iniciosesion', function(req, res, next){
  var mensajes = req.flash('error');
  res.render('usuario/iniciosesion', { csrfToken: req.csrfToken(), mensajes: mensajes, tieneErrores: mensajes.length > 0});
});

router.post('/usuario/iniciosesion', passport.authenticate('local.signin', {
  successRedirect: '/usuario/perfil', 
  failureRedirect: '/usuario/iniciosesion',
  failureFlash: true
}));

module.exports = router;
