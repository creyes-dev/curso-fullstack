var express = require('express');
var router = express.Router();
var Producto = require('../models/producto');

/* GET home page. */
router.get('/', function(req, res, next) {
  var productos = Producto.find();
  res.render('tienda/index', { 
    title: 'Carro de compras',
    productos: productos });
});

module.exports = router;
