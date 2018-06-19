var express = require('express');
var router = express.Router();
var Producto = require('../models/producto');
var csrf = require('csurf');

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
  res.render('usuario/registro', { csrfToken: req.csrfToken()});
});

/* POST registro de un usuario */
router.post('/usuario/registro', function( req, res, next){
  res.redirect('/');
});

module.exports = router;
