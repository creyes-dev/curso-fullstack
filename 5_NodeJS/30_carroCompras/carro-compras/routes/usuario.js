var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

// Usar como middleware la protección 
// contra CSRF
var proteccionCsrf = csrf();

// Todas las rutas incluidas en este enrutador
// deben estar protegidas contra CSRF
router.use(proteccionCsrf);

  /* GET página de perfil del usuario */
  router.get('/perfil', sesionEstaIniciada, function(req, res, next){
    res.render('usuario/perfil');
  });

  router.get('/logout', sesionEstaIniciada, function(req, res, next){
    // Si la sesión está autenticada entonces redireccionar
    req.logout();
    res.redirect('/');
  });

// a excepción de la página del perfil, para todas las siguientes 
// solicitudes si hay una sesión iniciada entonces la 
// redirección solicitada no ocurrirá. Por ejemplo si el usuario
// ya ha iniciado sesión y escribe el url para iniciar sesion o registrar
// un usuario entonces el recurso solicitado será denegado y se mostrará
// la página principal
router.use('/', sesionNoIniciada, function(req, res, next){
    next();
});

/* GET página de registro de usuarios */
router.get('/registro', function(req,res,next){
    var mensajes = req.flash('error');
    res.render('usuario/registro', { csrfToken: req.csrfToken(), mensajes: mensajes, tieneErrores: mensajes.length > 0});
  });
  
  /* POST registro de un usuario */
  router.post('/registro', passport.authenticate('local.signup', {
    successRedirect: '/usuario/perfil', 
    failureRedirect: '/usuario/registro',
    failureFlash: true
  }));
   
  /* GET página de inicio de sesión del usuario */
  router.get('/iniciosesion', function(req, res, next){
    var mensajes = req.flash('error');
    res.render('usuario/iniciosesion', { csrfToken: req.csrfToken(), mensajes: mensajes, tieneErrores: mensajes.length > 0});
  });
 
  router.post('/iniciosesion', passport.authenticate('local.signin', {
    successRedirect: '/usuario/perfil', 
    failureRedirect: '/usuario/iniciosesion',
    failureFlash: true
  }));

  module.exports = router;
  
function sesionEstaIniciada(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/');
}

function sesionNoIniciada(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    } 
    res.redirect('/');
}
