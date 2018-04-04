<?php 

//Variables de conexion
$servidor = "localhost";
$usuario = "root";
$pass = "";
$base = "frba";

$conexion = mysqli_connect($servidor, $usuario, $pass, $base) or die("Error de conexion!");
mysqli_set_charset($conexion, "utf8");
?>