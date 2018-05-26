// For serving static files
var express = require('express');
var app = express();

app.use(express.static('public'));

// For parses incoming post request data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());