<!DOCTYPE html>
<html>
	<head>
		<title>Ejemplo de Altas bajas y modificaciones con PHP y Ajax usando jQuery</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="js/abmc.js"></script>
		<link rel="stylesheet" type="text/css" href="css/screen.css" />
		<link rel="stylesheet" type="text/css" href="css/style.css" />
	</head>
	<body>
		<div id="block"></div>
		<div id="popupbox" style="left: 450px;">
			<form name="clientx" id="clientx" method="POST">
				<input type="hidden" name="id" id="id" value="">
				<div>
					<label>Nombre</label>
					<input type="text" name="nombre" id="nombre" value = "">
				</div>
				<div>
					<label>Apellido</label>
					<input type="text" name="apellido" id="apellido"value = "">
				</div>
				<div>
					<label>Fecha</label>
					<input type="text" name="fecha" id="fecha" value = "">
				</div>
				<div class="buttonsBar">
					<input id="cancel" type="button" value ="Cancelar" onclick="$('#popupbox').hide();$('#clientx').reset();$('#block').hide();"/>
					<input id="agregar" type="button" name="submit" value ="Guardar" onclick="guardar();"/>
					<input id="modificar" type="button" name="submit" value ="Modificar" onclick="modificarr();"/>
				</div>
			</form>
		</div>
		<div class="container">
			<h1 class="title">Ejemplo de Altas bajas y modificaciones con PHP y Ajax usando jQuery</h1>	 
			<div id="content">
			</div>
		</div>
	</body>
</html>