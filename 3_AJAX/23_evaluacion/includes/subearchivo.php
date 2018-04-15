<?php

include('conexion.php'); 

//tomo el valor de un elemento de tipo texto del formulario
$idPropiedad = $_POST["IdPropiedad"];

$nombre_archivo =  $_FILES['userfile']['name'];
$tipo_archivo = $_FILES['userfile']['type'];
$tamano_archivo = $_FILES['userfile']['size'];
$uploads_dir = 'photos';
//compruebo si las características del archivo son las que deseo
if (!((strpos($tipo_archivo, "gif") || strpos($tipo_archivo, "jpeg")) && ($tamano_archivo < 100000))) {
    echo "La extensi&oacute;n o el tamaño de los archivos no es correcta. <br><br><table><tr><td><li>Se permiten archivos .gif o .jpg</li><li>se permiten archivos de 100 Kb m&aacute;ximo.</li></td></tr></table>";
}else{

    $rutaArchivo = $uploads_dir . "/" . $nombre_archivo;
    if (move_uploaded_file($_FILES['userfile']['tmp_name'], $rutaArchivo)){
        
        // Obtener el ultimo número de orden de las fotos de la propiedad
        $orden = 0;
        $selectSql = "SELECT MAX(orden) AS Orden FROM `imagenes` WHERE id_propiedad = 1";

        if($conexion = getConexionMysqli()){
            $resultado = mysqli_query($conexion, $selectSql);
        
            while ($row = $resultado->fetch_assoc()) {
                $orden = $row['Orden'];
            }
        }

        $orden = $orden + 1;
        
        // registrar la imagen subida en la base de datos
        $insertSql = "INSERT INTO `imagenes`(`id_propiedad`, `ruta_imagen`, `orden`)";
        $insertSql.= " VALUES (" . $idPropiedad . ", '" . $rutaArchivo . "'," ;
        $insertSql.= $orden;

        if($conexion = getConexionMysqli()){
            $comando = mysqli_query($conexion, $insertSql);
        }

       echo "El archivo ha sido cargado correctamente.<br/><img src='photos/".$_FILES['userfile']['name']."'/><br/><hr>";
    }else{
       echo "Ocurri&oacute; alg&uacute;n error al subir el fichero. No pudo guardarse.";
    }
}
?> 
