var express = require('express');
var router = express.Router();
var Producto = require('../models/producto');

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

module.exports = router;
