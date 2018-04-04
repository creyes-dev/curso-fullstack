<?php
    
    include("conexion.php");

    $resultados = array();

    if(isset($_GET['carrera'])) {

        $carrera = $_GET['carrera'];

        $consulta = "SELECT id_materia, nombre_materia FROM materias WHERE id_carrera = " . $carrera;
        $comando = mysqli_query($conexion,$consulta);

        while($row = mysqli_fetch_array($comando))
        {
            $resultados[] = array(
                'id'          => $row['id_materia'],
                'nombre'      => $row['nombre_materia']
            );
        }
    }

	// convertimos el array de datos a formato json
	echo json_encode($resultados);

?>