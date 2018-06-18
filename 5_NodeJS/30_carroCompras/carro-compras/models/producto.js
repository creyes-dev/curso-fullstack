var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagen: {type: String, required: true},
    descripcion: {type: String, required :true},
    precio: {type: Number, required: true}
});

module.exports = mongoose.model('Producto', schema);
