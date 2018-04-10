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
		
		$( "#dataSheet ul" ).sortable({
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
	<form action="admin_imagenes.php" method="post" onsubmit="return validar();">
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
			
			<div id="ficha" class="clearAfter">
				<div id="detalle">
					<input class="ambientes"  placeholder="Características destacadas"/>
					<textarea class="descripcion" placeholder="Descripción corta"></textarea>
					<!-- <p class="descripcion">Amplia cocina, 13 años, Vsta, Piscina - Solarium - Gim, Seguridad</p> -->
				</div>
				<div id="oferta">
					<input class="valor" placeholder="$ Valor"/>
					<p class="tipo">Alquiler</p>
				</div>
			</div>
			
			<div id="estado">
				<strong>Estado:</strong>
				<input type="radio" name="estado" value="publicado" id="publicado" checked="checked"/>
				<label for="publicado">Publicado</label>

				<input type="radio" name="estado" value="reservado" id="reservado" />
				<label for="reservado">Reservado</label>

				<input type="radio" name="estado" value="suspendido" id="suspendido" />
				<label for="suspendido">Suspendido</label>

				<input type="radio" name="estado" value="oculto" id="oculto" />
				<label for="oculto">Oculto</label>
			</div>
			
			<div id="primaryContent">
			
				<div id="description">
					<textarea placeholder="Descripción detallada"></textarea>
				</div>

				<input type="submit" id="mainAction" value="Cargar imagenes"/>
				
				<input type="submit" id="mainAction" value="Cancelar"/>
			</div>
		
			<div id="secondaryContent" >
				<!--Ficha técnica-->
				<div id="dataSheet">
					<ul>
						<li class="clearAfter">
							<input class="caption" type="text" value="Tipo de inmueble" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Ambientes" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Superficie total" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Superficie cubierta" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Antiguedad" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Apto profesional" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Balcón" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Terraza" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Cochera" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Ascensores" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
						<li class="clearAfter">
							<input class="caption" type="text" value="Seguridad" />
							<input class="description" type="text" value="" />
							<a class="sort hideText">Ordenar</a>
						</li>
					</ul>
				</div>	

	    	</div>
		</div>
		</form>
	</div>
	<!--Pie-->
	<?php  
    	include ('includes/footer.php');
	?>

        
</body>
</html>
