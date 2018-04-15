<?php

include('conexion.php');   

if(isset($_POST['barrio']) && isset($_POST['calle_altura']) && isset($_POST['descripcion']) && 
   isset($_POST['descripcionCorta']) && isset($_POST['entreCalles']) && 
   isset($_POST['valor']))
{
    $resultado = 0;
            
    // Registrar la propiedad
    $insertSql = "INSERT INTO propiedad(barrio, calle_altura, ";
    $insertSql.= " descripcion, descripcion_corta, ";
    $insertSql.= " entre_calles, valor)";
    $insertSql.= " VALUES ('" . $_POST['barrio']. "','" . $_POST['calle_altura'] . "',";
    $insertSql.= "          '" . $_POST['descripcion'] .  "', '" . $_POST['descripcionCorta'] . "',";
    $insertSql.= "          '" . $_POST['entreCalles'] . "', " . $_POST['valor'] . ")";
    
    if($conexion = getConexionMysqli()){
        $comando = mysqli_query($conexion, $insertSql);
        $resultado = mysqli_insert_id($conexion);
    }
    
    // Redireccionar a la página de imágenes de la propiedad
    header('Location: /admin_imagenes.php?prop=' . $resultado);
}

?>