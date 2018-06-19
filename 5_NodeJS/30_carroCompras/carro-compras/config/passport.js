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
    // devolver null y el id del usuario
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
        Usuario.findOne({'email': email, function(err, user) {
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
        }});
}));