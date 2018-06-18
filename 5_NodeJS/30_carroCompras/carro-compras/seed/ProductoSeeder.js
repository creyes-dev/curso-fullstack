var Producto = require('../models/producto.js');

// Conectarse a la base de datos
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/carrocompras');


var productos = [ new Producto({
    imagen: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
    titulo: 'Videojuego Gothic',
    descripcion: 'Genial juego!!!!',
    precio: 10
}), 
new Producto({
    imagen: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Resi4-gc-cover.jpg/220px-Resi4-gc-cover.jpg',
    titulo: 'Videojuego Resident Evil 4',
    descripcion: 'Otro genial juego!!!!',
    precio: 8
}), 
new Producto({
    imagen: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Dark_souls_3_cover_art.jpg/220px-Dark_souls_3_cover_art.jpg',
    titulo: 'Videojuego Dark souls 3',
    descripcion: 'he muerto!',
    precio: 20
}), 
new Producto({
    imagen: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/220px-Witcher_3_cover_art.jpg',
    titulo: 'Videojuego Witcher 3',
    descripcion: 'Gran juego! muy extenso!',
    precio: 40
})
];

var filasAfectadas = 0;

for (var i = 0; i < productos.length; i++) {
    productos[i].save(function(err, result){
        filasAfectadas++;
        if(filasAfectadas === productos.length){
            salir();
        }
    });
}

function salir(){
    mongoose.disconnect();
}