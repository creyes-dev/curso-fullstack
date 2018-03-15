
jQuery.fn.creaTip = function(textoTip, opciones) {
	var configuracion = {
		velocidad: 500,
		animacionMuestra: {width: "show"},
		animacionOculta: {opacity: "hide"},
		claseTip: "tip"
	}
	jQuery.extend(configuracion, opciones);
	
	this.each(function(){
		elem = $(this);
		var miTip = $('<div class="' + configuracion.claseTip + '">' + textoTip + '</div>');
		$(document.body).append(miTip);
		elem.data("capatip", miTip);
		
		elem.mouseenter(function(e){
			var miTip = $(this).data("capatip");
			miTip.css({
				left: e.pageX + 10,
				top: e.pageY + 5	
			});
			miTip.animate(configuracion.animacionMuestra, configuracion.velocidad);
		});
		elem.mouseleave(function(e){
			var miTip = $(this).data("capatip");
			miTip.animate(configuracion.animacionOculta, configuracion.velocidad);
		});
	});
	
	return this;
};

/*
Explicacion del metodo data y objetivo de su uso:
A menudo encontrará que existe información acerca de un elemento que necesita guardar. En JavaScript es posible hacerlo añadiendo propiedades al DOM del elemento, pero esta práctica conlleva enfrentarse a consumos excesivos de memoria (en inglés memory leaks) en algunos navegadores. jQuery ofrece una manera sencilla para poder guardar información relacionada a un elemento, y la misma biblioteca se ocupa de manejar los problemas que pueden surgir por falta de memoria.

Guardar y recuperar información relacionada a un elemento

$('#myDiv').data('keyName', { foo : 'bar' });
$('#myDiv').data('keyName'); // { foo : 'bar' }

A través del método $.fn.data es posible guardar cualquier tipo de información sobre un elemento, y es difícil exagerar la importancia de este concepto cuando se está desarrollando una aplicación compleja.

Por ejemplo, si desea establecer una relación entre el ítem de una lista y el div que hay dentro de este ítem, es posible hacerlo cada vez que se interactúa con el ítem, pero una mejor solución es hacerlo una sola vez, guardando un puntero al div utilizando el método $.fn.data:

Establecer una relación entre elementos utilizando el método $.fn.data

$('#myList li').each(function() {
    var $li = $(this), $div = $li.find('div.content');
    $li.data('contentDiv', $div);
});
 
// luego, no se debe volver a buscar al div;
// es posible leerlo desde la información asociada al item de la lista
var $firstLi = $('#myList li:first');
$firstLi.data('contentDiv').html('nuevo contenido');

Además es posible pasarle al método un objeto conteniendo uno o más pares de conjuntos palabra clave-valor.
*/