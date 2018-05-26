var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    var pdf = "../doc/documento1.txt";
    fs.readFile(pdf, function (err, data){
        res.contentType("text/plain");
        res.end(data);
    });
});

module.exports = router;
