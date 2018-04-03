﻿<?php
// USAR CON PARÁMETRO POR GET, NO ENTRAR DIRECTAMENTE: ej4.php?foto=1
/*

CREATE TABLE `frba`.`fotos_ajax` (
`id_foto` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`archivo` VARCHAR( 100 ) NOT NULL ,
`epigrafe` TINYTEXT NOT NULL
) ENGINE = MYISAM ;

INSERT INTO `frba`.`fotos_ajax` ( `archivo` ,`epigrafe`)
VALUES ( 'foto1.jpg', 'loguito de firefox comiendose a IE jejeje'), 
( 'foto2.jpg', 'la adicción a internet');

*/

if (!isset($_GET['foto']) ) exit;
if (!ctype_digit($_GET['foto']) ) exit;

$cn=mysqli_connect("localhost","phpmyadmin","myadmin123","frba");
$res=mysqli_query($cn, "select * from frba.fotos_ajax where id_foto=".$_GET['foto']);

if (mysqli_num_rows($res) != 1) exit;

$datos_foto=mysqli_fetch_assoc($res);

?>
<html>
<head>
<script type="text/javascript" src="jquery-1.10.2.min.js"></script>
<script type="text/javascript">

$(document).ready( function() {

	$("#text_epigrafe").click(function() {
		$(this).hide();
		$("#nuevo_epigrafe").show();
		$("#nuevo_epigrafe").focus();
	});
	
	$("#nuevo_epigrafe").blur(function() {
		$(this).hide();
		$("#text_epigrafe").text( $(this).val() );
		$("#text_epigrafe").show();
		
		//hacemos el ajax para guardar los datos en el servidor
		$.post("guardar.php", { foto: <?php echo $_GET['foto'] ?>, epigrafe: $(this).val() } ,
		   function(data){
			 alert("respuesta: " + data);
		   });
		
	});
	
} );


</script>

<style type="text/css">
body {font-family:Verdana;}
#epigrafe {width:300px; font-size:0.6em;text-align:center;padding-top:20px;border-top:1px solid gray;}
#foto {width:300px;}
#nuevo_epigrafe {display:none;width:200px;}
</style>

</head>

<body>

	<img src="<?php echo $datos_foto['archivo'] ?>" id="foto" />

	<div id="epigrafe">
	<span id="text_epigrafe"><?php echo $datos_foto['epigrafe'] ?></span>
	<input type="text" id="nuevo_epigrafe" />	
	</div>

</body>

</html>