<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documento sin t&iacute;tulo</title>
</head>

<body>
<?php
echo '<pre>';
print_r($_POST);
echo '</pre>';

include ('conect.php');
for ($i=0;$i<count($_POST['idpersona']);$i++){
//	echo $_POST['orden'][$i].'<br />';
	$j=$i+1;
	$result = mysqli_query($conexion, "update personas set orden = ".$j." where id_persona = ".$_POST['idpersona'][$i]);
}
?>

</body>
</html>
