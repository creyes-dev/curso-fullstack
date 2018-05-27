var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  if (req.cookies.mail)
    res.render('login',{mail:req.cookies.mail});
  else
    res.render('login');      
});

router.post('/login', function(req, res, next) {
  // creamos una cookie llamada mail
  // y guardamos como valor el dato ingresado en el formulario que lo recuperamos con
  // req.body.mail
  res.cookie('mail', req.body.mail,{ expires: new Date(Date.now() + (60*60*24*365*3)) });
  var pagina='<!doctype html><html><head></head><body>'+
             '<p>Se creo la cookie</p>'+
             '<a href="/">Retornar</a></body></html>';
  res.send(pagina); 
});

module.exports = router;
