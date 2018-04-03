<?php

if (!isset($_POST['foto']) ) exit;
if (!ctype_digit($_POST['foto']) ) exit;


$cn=mysqli_connect("localhost","phpmyadmin","myadmin123","frba");

$epigrafe=mysqli_real_escape_string($_POST['epigrafe']);


$res=mysqli_query($cn, 'update frba.fotos_ajax set 
				epigrafe="'.$epigrafe.'" 
				where id_foto='.$_POST['foto']);

if (!mysqli_error($cn) ) echo 'ok';
else echo 'err';

?>