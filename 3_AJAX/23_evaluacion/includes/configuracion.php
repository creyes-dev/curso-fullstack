<?php 

function getDirectorioRaiz(){
    return 'http://localhost:8083/admin/';
}

//Variables de conexion
function getConexionMysqli()
{
    $servidor = "localhost";
    $usuario = "root";
    $pass = "";
    $base = "jqueryfinal";
    
    $conexion = mysqli_connect($servidor, $usuario, $pass, $base) or die("Error de conexion!");
    mysqli_set_charset($conexion, "utf8");    

    return $conexion;
}

?>