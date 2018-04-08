<?php require_once('cfg/core.php') ?>
<?php
	$clientes=new Clientes();
	$clientes->modificar($_POST['id'],$_POST['nombre'],$_POST['apellido'],$_POST['fecha']);
?>
