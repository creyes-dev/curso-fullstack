<?php 
include("conexion.php");
// aquí ordenaremos los articulos con ajax

// array con el nuevo orden de nuestros registros
$articulos_ordenados 	= $_POST['articulo'];

$pos = 1;
foreach ($articulos_ordenados as $key) {
	
	// actualizamos el campo orden_articulo
	$query = "UPDATE articulos SET orden_articulo = " . $pos . " WHERE id_articulo = " . $key;
	mysqli_query($cn, $query);
	
	$pos++;
}

echo "Los articulos se ordenaron con exito";
?>