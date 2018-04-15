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

	function CargarDatosPropiedad(){
		var propiedad = $("#IdPropiedad").value;
		var urlRecurso = "includes/obtener_propiedades.php?prop=" + propiedad;
		$.getJSON(urlRecurso, function(resultados){
			$(".title").value = resultados[0].calleAltura;
			$(".entreCalles").value = resultados[0].entreCalles;
			$(".localidad").value = resultados[0].barrio;
		});
	}

	function CargarImagenes(){
		var propiedad = $("#IdPropiedad").value;
		var urlRecurso = "includes/obtener_fotos_propiedad.php?prop=" + propiedad;

		$("#photoList ul").empty();
		var html = '';

		$.getJSON(urlRecurso, function(resultados){
			$.each(resultados, function(i, propiedad){
				html = '<li class="clearAfter">';
				html += '<span id="' + propiedad.id + '" class="photo" style="background: url("' + propiedad.ruta + '")"></span>';
				html += '<a href="#" class="delete">Eliminar</a>';
				html += '<a href="#" class="sort">Ordenar</a>';
				html += '</li>';

				$('#photoList ul').append(html);
			});
		});
	}
	
	$( document ).ready(function() {
		CargarDatosPropiedad();
		CargarImagenes();
		$( "#photoList ul" ).sortable({
			placeholder: "space",
			handle: "a.sort",
			axis: "y"
		});

	$("#frmImagen").submit(function(e) {
		var formObj = $(this);
		var formURL = formObj.attr("action");
		var formData = new FormData(this);
		$.ajax({
			url: formURL,
			type: 'POST',
			data:  formData,
			mimeType:"multipart/form-data",
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				CargarImagenes();
			}         
		});
		e.preventDefault(); //Prevent Default action.
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

					<form id="frmImagen" action="includes/subearchivo.php" method="post" enctype="multipart/form-data">
						<input id="IdPropiedad" name="IdPropiedad" type="hidden" value="
						<?php 
							if(isset($_REQUEST['prop'])){
								echo($_REQUEST['prop']);
							}
						?>
						">
						<input name="userfile" type="file">
						<br>
						<input type="submit" id="addImage" value="Cargar"/>
					</form> 
				</div>				
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
