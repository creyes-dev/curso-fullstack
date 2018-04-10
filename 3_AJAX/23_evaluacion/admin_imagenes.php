<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />


<title>Admin Propiedades</title>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'>
<link href="styles/general.css" rel="stylesheet" type="text/css" />
<link href="styles/fonts.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="scripts/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="scripts/jquery-ui-1.9.2.custom.js"></script>


<script>
	$(function() {
		$( "#photoList ul" ).sortable({
			placeholder: "space",
			handle: "a.sort",
			axis: "y"
		});

	});
</script>

</head>
<body id="propiedad">
	<?php
		session_start();
		$_SESSION['seccion']= "propiedades";
	?>
	  
	 <!--Encabezado-->
	<?php  
	  include ('includes/admin_header.php');
	?>
	<div id="page" class="admin">
		<div class="pageWidth clearAfter">
		
			<ul id="subNav" class="clearAfter">
				<li class="active"><a href="#">Alquiler</a></li>
				<li><a href="#">Venta</a></li>
			</ul>
			
					
			<div id="ubicacion" class="clearAfter">
				<div class="titulo">
					<input type="text" class="title" placeholder="Calle y altura"/>
					<input type="text" class="entreCalles" placeholder="Entre calle y calle"/>
				</div>
				<input type="text" class="localidad" placeholder="Barrio - Localidad"/>
			</div>
						
			<div id="primaryContent">

				<div id="photoList">
					<ul>
						<li class="clearAfter">
							<span class="photo" style="background: url(photos/thumb_01.jpg)"></span>
							<a href="#" class="delete">Eliminar</a>
							<a href="#" class="sort">Ordenar</a>
						</li>
						<li class="clearAfter">
							<span class="photo" style="background: url(photos/thumb_02.jpg)"></span>
							<a href="#" class="delete">Eliminar</a>
							<a href="#" class="sort">Ordenar</a>
						</li>
						<li class="clearAfter">
							<span class="photo" style="background: url(photos/thumb_03.jpg)"></span>
							<a href="#" class="delete">Eliminar</a>
							<a href="#" class="sort">Ordenar</a>
						</li>
					</ul>
					<h2>Agregar imagen</h2>
					<input type="file">

					<input type="submit" id="addImage" value="Cargar"/>
				</div>

				<input type="submit" id="mainAction" value="Guardar"/>
				
			</div>
		
			<div id="secondaryContent" >
				<!--Ficha técnica-->
					

	    	</div>
		</div>
	</div>
	<!--Pie-->
	<?php  
    	include ('includes/footer.php');
	?>

        
</body>
</html>
