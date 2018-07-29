var express = require('express');
var router = express.Router();

  /* GET productos */
  router.get('/', function(req, res, next){

    var productos = [ 
        { "id" : 1, "imagen": "/assets/img/1.jpg", "titulo" : "Spray para el cabello", "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!" },
        { "id" : 2, "imagen": "/assets/img/2.png", "titulo" : "Suplementos", "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!" }, 
        { "id" : 3, "imagen": "/assets/img/3.jpg", "titulo" : "Placa de video", "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!" }, 
        { "id" : 4, "imagen": "/assets/img/4.jpg", "titulo" : "Tappers", "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!" },
        { "id" : 5, "imagen": "/assets/img/5.jpg", "titulo" : "Aquaflesh", "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!" },
        { "id" : 6, "imagen": "/assets/img/6.jpg", "titulo" : "Nitromax", "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!" }
    ];

    res.send(JSON.stringify(productos));
  });

  module.exports = router;