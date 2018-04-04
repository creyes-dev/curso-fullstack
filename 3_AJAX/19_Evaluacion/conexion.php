<?php 

//Variables de conexion
$servidor = "localhost";
$usuario = "phpmyadmin";
$pass = "myadmin123";
$base = "frba";

$conexion = mysqli_connect($servidor, $usuario, $pass, $base) or die("Error de conexion!");

?>