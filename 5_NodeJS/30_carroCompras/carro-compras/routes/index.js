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
      console.log(producto);
      carroCompras.agregar(producto, producto.id);

      console.log(req.session.CarroCompras);
      req.session.CarroCompras = carroCompras;
      
      res.redirect('/');
    }
  });
});

/* GET dirigirse a la página que contiene el detalle del carro de compras */
router.get('/carro-compras', function(req, res, next){
  // Si no hay un carro de compras en la sesión entonces redirigir
  // a la página del carro de compras enviándo una variable de 
  // productos en null
  if (!req.session.CarroCompras){
    return res.render('tienda/carro-compras', {productos: null});
  } else {
    // De lo contrario si hay un carro de compras en la sesión
    var carroCompras = new CarroCompras(req.session.CarroCompras);
    res.render('tienda/carro-compras', {productos: carroCompras.generarArray(), precioTotal: carroCompras.precioTotal });
  }
});

router.get('/checkout', function(req, res, next){

  if (!req.session.CarroCompras){
    // Redireccionar a la función que atiende el GET de /carro-compras
    return res.redirect('tienda/carro-compras');
  }

  // De lo contrario si hay un carro de compras
  // cargarlo y mostrarlo en la vista del checkout
  var carroCompras = new CarroCompras(req.session.CarroCompras);
  res.render('tienda/checkout', {total: carroCompras.precioTotal });
});

module.exports = router;
