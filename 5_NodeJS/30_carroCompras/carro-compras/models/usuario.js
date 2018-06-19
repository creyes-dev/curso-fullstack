var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var usuarioSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// Devolver el password encriptado
usuarioSchema.methods.encriptarPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// Validar que el password ingresado coincida con el hash
// que corresponde con el password de la instancia actual
// del usuario
usuarioSchema.methods.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Usuario',usuarioSchema);