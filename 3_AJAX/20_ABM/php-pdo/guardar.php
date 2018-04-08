<?php require_once('cfg/core.php') ?>
<?php
	var_dump($_POST);
	$clientes=new Clientes();
	$clientes->guardar($_POST['nombre'],$_POST['apellido'],$_POST['fecha']);
?>
