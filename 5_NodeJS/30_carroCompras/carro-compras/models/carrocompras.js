// El modelo actual no es un modelo de mongoose debido a que
// por el momento no será almacenado en la base de datos

module.exports = function CarroCompras(carroComprasAnterior){
    // Si se agrega un nuevo item se vuelve a instanciar un nuevo carro
    // de compras que contenga los items que ya contenía la instancia del
    // carro de compras anterior
    this.items = carroComprasAnterior.items || {}; // si no tiene un carro de compra anterior inicializar los items como un objeto vacio
    this.cantidadTotal = carroComprasAnterior.cantidadTotal || 0;
    this.precioTotal = carroComprasAnterior.precioTotal || 0;

    // Agrega un nuevo item al carro de compras
    this.agregar = function(item, id){
        // Obtener el objeto producto dentro de la colección
        var itemAlmacenado = this.items[id];

        // si el item a agregar no está presente en el carro de 
        // compras entonces agregarlo, de lo contrario incrementar
        // la cantidad y el precio total por item que ya existe en el 
        // carro de compras
        if(!itemAlmacenado){
            itemAlmacenado = {item: item, cantidad: 0, precio: 0};
            this.items[id] = itemAlmacenado
        } // TODO: CAmbiar lo de arriba!

        itemAlmacenado.cantidad++;
        itemAlmacenado.precio = itemAlmacenado.item.precio * itemAlmacenado.cantidad;

        this.cantidadTotal++;
        this.precioTotal += itemAlmacenado.item.precio;
    };

    // Devolver un array de items consecutivos (los items del carro de compras se obtienen
    // por un indice)
    this.generarArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

}