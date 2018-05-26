var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var pdf = "../public/clientes/clientes.html";
    fs.readFile(pdf, function (err, data){
        res.contentType("text/html");
        res.end(data);
    });
});

router.get('/:idCliente', function(req, res) {
    var idCliente = req.params.idCliente;
    var documentoCliente = '';

    switch(idCliente) {
        case 1:
            documentoCliente = '../public/clientes/cliente1.html';
            break;
        case 2:
            documentoCliente = '../public/clientes/cliente2.html';
            break;
    }

    fs.readFile(documentoCliente, function (err, data){
        res.contentType("text/html");
        res.end(data);
    });
});

module.exports = router;
