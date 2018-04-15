<?php

include('conexion.php');

$selectSql = "SELECT MAX(orden) AS Orden FROM `imagenes` WHERE id_propiedad = 1";

if($conexion = getConexionMysqli()){

    $resultado = mysqli_query($conexion, $selectSql);

    while ($row = $resultado->fetch_assoc()) {
        echo $row['Orden']."<br>";
    }
}



?>

