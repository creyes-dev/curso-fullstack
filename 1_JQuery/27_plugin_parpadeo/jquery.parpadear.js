jQuery.fn.parpadea = function(){
    // creamos un bucle para cada elemento que pueda 
    // haberse seleccionado
    this.each(function(){
        // on elem=$(this) conseguimos extender a this con todas las
        // funcionalidades del framework y el objeto jQuery 
        // resultante guardarlo en una variable.
        elem = $(this);
        elem.fadeOut(250, function(){
            $(this).fadeIn(250);
        })
    })
}