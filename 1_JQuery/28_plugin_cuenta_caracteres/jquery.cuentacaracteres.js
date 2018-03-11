jQuery.fn.cuentaCaracteres = function(){
    // Para cada uno de los elementos del objeto jquery
    this.each(function(){
        // crear una variable elem con el elemento actual,
        // suponemos un textarea
        elem = $(this);
        // crear un elemento div sobre la marcha
        var contador = $('<div>Contador caracteres:' + elem.prop("value").length + '</div>')
        // insertar el div después del elemento textarea
        elem.after(contador);
        // guardar una referencia al elemento div en los datos del objeto Jquery
        elem.data("campocontador", contador);

        // crear un evento keyup para este elemento actual
        elem.keyup(function(){
            // crear una variable elem con el elemento actual,
            // suponemos un textarea
            var elem = $(this);
            // recuperar el objeto que tiene el elemento div asociado al textarea
            var campocontador = elem.data("campocontador");
            // modificar el texto del contador, para actualizarlo con el 
            // número de caracteres escritos
            campocontador.text('Contador caracteres: ' + elem.prop("value").length);
        });
    });
    // siempre devolver todos los elementos con this
    return this;
};