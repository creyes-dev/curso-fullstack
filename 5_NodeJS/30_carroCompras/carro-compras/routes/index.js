var express = require('express');
var router = express.Router();

var Producto = require('../models/producto');
var CarroCompras = require('../models/carrocompras');

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

/* GET Agregar al carro de compras un producto 
   cuyo id proviene por un parámetro */
router.get('/agregarcarrocompras/:id', function(req, res, next){
  var idProducto = req.params.id;
  // Si hay un carro de compras almacenado en la sesión
  // volver a instanciar un nuevo carro de compras enviandole
  // el carro de compras actual, si no hay un carro de compras
  // almacenado se obtiene un objeto vacío
  var carroCompras = new CarroCompras(req.session.CarroCompras ? req.session.CarroCompras : {});

  Producto.findById(idProducto, function(err, producto) {
    if(err){
      return res.redirect('/');
    } else {
      carroCompras.agregar(producto, producto.id);
      req.session.CarroCompras = carroCompras;
      console.log(req.session.CarroCompras);
      res.redirect('/');
    }
  });

});

module.exports = router;
