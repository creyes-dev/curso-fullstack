<?php
    
    include("conexion.php");

    $consulta = "SELECT id_carrera, nombre_carrera FROM carreras";
    
    $comando = mysqli_query($conexion,$consulta);
	$resultados = array();

	while($row = mysqli_fetch_array($comando))
	{
		$resultados[] = array(
			'id'          => $row['id_carrera'],
			'nombre'      => $row['nombre_carrera']
		);
	}
	// convertimos el array de datos a formato json
	echo json_encode($resultados);

?>