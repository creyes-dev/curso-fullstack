
/*
 * GET users listing.
 */

// verificar que las variables de session existan
exports.mostrar = function(req, res){
    if (req.session.user) {
      res.render('pagina1.jade',{page_title:"Admin", user: req.session.user});
    } else {
      res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
      }
  };
  
  exports.logout = function(req, res){
    // La sesión se destruye en el logout
    req.session.destroy(function(err){
      if(err){
        console.log(err);
      }
      else
      {
        res.redirect('/');
      }
    });
  };
  
  exports.contenido1 = function(req, res){
    if (req.session.user) {
      res.render('opcion1.jade',{page_title:"Admin", user: req.session.user});
    } else {
      res.render('index.jade', { page_title: 'Login de usuarios', msj: 'Para acceder a este contenido tiene que estar logueado' });
      }
  };
  
  exports.contenido2 = function(req, res){
    if (req.session.user) {
      res.render('opcion2.jade',{page_title:"Admin", user: req.session.user});
    } else {
      res.render('index.jade', { page_title: 'Login de usuarios', msj: 'Para acceder a este contenido tiene que estar logueado' });
      }
  };
  
  exports.contenido3 = function(req, res){
    if (req.session.user) {
      res.render('opcion3.jade',{page_title:"Admin", user: req.session.user});
    } else {
      res.render('index.jade', { page_title: 'Login de usuarios', msj: 'Para acceder a este contenido tiene que estar logueado' });
      }
  };