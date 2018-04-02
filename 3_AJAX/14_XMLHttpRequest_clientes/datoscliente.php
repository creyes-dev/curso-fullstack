
<?php
require('conexion.php');
//capturar el nombre del cliente
$nom=$_POST['nombres'];
//seleccionamos los datos del cliente por su nombre
$sql=mysqli_query($con, "SELECT * FROM clientes WHERE nombres='".$nom."'");
$row = mysqli_fetch_array($sql);
//mostrando el resultado
echo 	"<p><strong>Direccion</strong></p><p>".$row['direccion']."</p>";
echo 	"<p><strong>Telefono</strong></p><p>".$row['telefono']."</p>";
echo 	"<p><strong>Email</strong></p><p>".$row['email']."</p>";
?>



