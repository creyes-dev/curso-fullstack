// JavaScript Document
jQuery.fn.slider = function(opciones) {
    
    var configuracion = {
        efecto: 'fadeIn',
        velocidadEfecto: 1000,
        tiempoPausa: 3000,
        }

    jQuery.extend(configuracion, opciones);

	this.each(function(){
		$('#imagenes div:gt(0)').hide();
		setInterval(function(){
		  $('#imagenes div:first-child').fadeOut(0)
			 .next('div')[configuracion.efecto](configuracion.velocidadEfecto)
             .end().appendTo('#imagenes');}, configuracion.tiempoPausa);
	});
	
	return this;
};

/*

Descripción y configuración del slider:

El plugin muestra una sucesion de imágenes indefinidamente. El elemento del DOM que
ejecuta el método slider debe ser un elemento div que contenga en su interior 
elementos img cada uno dentro de su respectivo div. 

El objeto opciones que recibe el slider por parámetros es opcional y contiene algunos 
o todos los parámetros de configuración que usa el slider para mostrar sucesivamente
las imagenes contenidas. 

El objeto opciones puede contar con algunas o todas las propiedades que se detallan
a continuación:

efecto: Efecto utilizado para mostrar la aparición de la siguiente imágen. 
Por defecto el efecto utilizado es fadeIn, pero puede ser show o slideDown.

velocidadEfecto: Velocidad de la animación con la que se muestra la siguiente
imágen. Por defecto son 1000 milisegundos.

tiempoPausa: Velocidad en la que tarda el slider en cambiar la imágen que se muestra

Cómo funciona:

Por defecto las imágenes

$('#slider div:gt(0)').hide();
Con gt(x) seleccionamos todos los div a partir del número x. En este caso 0 es el primero, así que lo que hacemos con esta línea es esconder 
(hide) todas las cajas excepto la primera, que será la imagen inicialmente visible.

setInterval(function(){ [lo que haremos] }, 3000);
Necesitamos reiterar una serie de cosas cada cierto tiempo y eso lo hacemos con setInterval, indicando el tiempo de retardo entre cada serie.

$('#slider div:first-child').fadeOut(0)
Dentro de cada uno de esos intervalos hacemos desaparecer (fadeOut) la primera caja (div:first-child) que haya en la relación de imágenes...

.next('div').fadeIn(1000)
... y hacemos que la siguiente caja (next) aparezca poco a poco (fadeIn).

.end().appendTo('#slider');
Por último tomamos la que hasta ese momento es la primera imagen y la situamos al final (appendTo) de la "lista".

end() resetea el contador de elementos que hicimos avanzar con next(). De esa manera, el primer hijo que antes hicimos desaparecer es el que 
enviamos al final de la pila y no la imagen que ahora tenemos visible. Para el siguiente ciclo la que hasta este momento era visible 
(que era la segunda) será la primera y por tanto la que haremos desaparecer.

Referencias sobre las funciones usadas:

    :gt()
    .hide()
    setInterval()
    :first-child
    .fadeOut()
    .fadeIn()
    .end()
    .appendTo()

*/