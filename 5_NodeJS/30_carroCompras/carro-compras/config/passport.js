/*
 Configurar la estrategia del Middleware de
 autenticación passport
 Debido a que nos interesa que sea local
 (el usuario es almacenado en el servidor)
 se ha instalado el paquete passport-local
*/

var passport = require('passport');
var Usuario = require('../models/usuario');
var estrategiaLocal = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    // almacenar solo el id del usuario
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    // Utilizar el esquema Usuario que utiliza mongoose
    // para que al recibir el id de un usuario 
    // devolver los datos del usuario
    Usuario.findById(id, function(err, user){
        done(err,user);
    });
});

passport.use('local.signup', new estrategiaLocal(
    { usernameField: 'email', 
      passwordfield: 'password',  
      passReqToCallback: true }, 
    function(req, email, password, done){
        // Utilzar express-validator para definir
        // cuales campos no son validos
        req.checkBody('email', 'mail no válido').notEmpty().isEmail();
        req.checkBody('password', 'password no válido').notEmpty().isLength({min:4});
        // Extraer los errores que surjan segun las reglas
        // definidas en las lineas anteriores 
        var errores = req.validationErrors();
        if(errores){
            var mensajes = [];
            errores.forEach(function(error){
                mensajes.push(error.msg);
            });

            return done(null, false, req.flash('error', mensajes));
        }

        Usuario.findOne({'email': email}, function(err, user) {
            if(err){
                return done(err);
            }
            if(user){
                return done(null,false, {message: 'Email ingresado ya está en uso'});
            }
            var nuevoUsuario = new Usuario();
            nuevoUsuario.email = email;
            nuevoUsuario.password = nuevoUsuario.encriptarPassword(password);
            // almacenar el nuevo usuario en la base de datos
            nuevoUsuario.save(function(err, result){
                if(err){
                    return done(err);
                } else { 
                    return done(null, nuevoUsuario);
                }
            });
        });
}));