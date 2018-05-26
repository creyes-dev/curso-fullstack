var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    var pdf = "../public/inicio.html";
    fs.readFile(pdf, function (err, data){
        res.contentType("text/html");
        res.end(data);
    });
});

router.get('/about', function(req, res) {
    var pdf = "../public/acerca.html";
    fs.readFile(pdf, function (err, data){
        res.contentType("text/html");
        res.end(data);
    });
});

module.exports = router;
