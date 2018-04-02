<html>
<head>

<style type="text/css">
    body { font-family:Verdana; }
    span { font-size:0.6em; font-weight:bold; }
</style>

</head>
<body>

<h1>Registro de usuario</h1>

<?php
    $con = mysql_connect('localhost', 'phpmyadmin', 'myadmin123') or die (mysql_error()); 
    mysql_select_db('usuarios2', $con) or die (mysql_error()); 
  
    $sql = "insert into claves values ('".$_POST['nombre_usuario']."',' ".$_POST['clave']."')";

    $result = mysql_query($sql) or die (mysql_error());

    echo 'El usuario fue dado de alta';
?>

</body>