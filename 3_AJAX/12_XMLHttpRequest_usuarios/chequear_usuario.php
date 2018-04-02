<?php

sleep(1); //el retardo lo utilizo para que puedan ver la imagen .gif 

$con = mysqli_connect('localhost', 'phpmyadmin', 'myadmin123','usuarios2') or die (mysql_error()); 

$sql = "select * from claves where user = '".$_POST['usuario']."'";

$result = mysqli_query($con, $sql);
mysqli_fetch_array($result);

if (mysqli_num_rows($result)!=0){
	echo 'nodisp';
}
else{
	echo 'disp';
}



?>