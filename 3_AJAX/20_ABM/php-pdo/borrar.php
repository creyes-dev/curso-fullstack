<?php require_once('cfg/core.php') ?>
<?php
	$clientes=new Clientes();
	$clientes->borrar($_POST['id']);
?>
