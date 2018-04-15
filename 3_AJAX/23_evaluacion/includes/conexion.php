<?php 

//Variables de conexion
function getConexionMysqli()
{
    $servidor = "localhost";
    $usuario = "phpmyadmin";
    $pass = "myadmin123";
    $base = "jqueryfinal";
    
    $conexion = mysqli_connect($servidor, $usuario, $pass, $base) or die("Error de conexion!");
    mysqli_set_charset($conexion, "utf8");    

    return $conexion;
}

?>