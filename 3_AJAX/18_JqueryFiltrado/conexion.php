<?php 

//Variables de conexion
$server = "localhost";
$user	= "phpmyadmin";
$pwd    = "myadmin123";
$bd     = "jqueryajax";

$cn = mysqli_connect($server, $user, $pwd, $bd) or die("Error de conexion!");

?>