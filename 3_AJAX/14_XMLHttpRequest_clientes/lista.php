<?php
require('conexion.php');

//seleccionamos solo el nombre de los clientes
$sql=mysqli_query($con, "SELECT nombres FROM clientes");

?>
<select name="lista" onchange="pedirDatos()" >
  <option selected="selected">seleccionar...</option>
<?php
while($row = mysqli_fetch_array($sql)){
	echo "<option value=\"".$row['nombres']."\">".$row['nombres']."</option> \n";
}
?>
</select>
